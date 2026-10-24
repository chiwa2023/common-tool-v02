import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import getAuthorizedPromiseArea, {
    createAuthorizedHeaders,
    fetchWithAuth,
    _resetRefreshPromiseForTest,
} from '../../../main/dto/login/getAuthorizedPromiseArea';
import useUserInfoStoreCommon from '../../../main/stores/storeUserInfo';
import {
    AccessTokenNotFoundError,
    TokenRefreshError,
    PasskeyAuthenticationError,
    PasskeyNotSupportedError,
    PasskeyCancellationError,
    PreAuthTokenExpiredError,
} from '../../../main/dto/login/errors';
import RoutePathConstants from '../../../../routePathConstants';

describe('getAuthorizedPromiseArea and Auth Utilities', () => {
    let originalFetch: typeof globalThis.fetch;

    beforeEach(() => {
        setActivePinia(createPinia());
        _resetRefreshPromiseForTest();
        originalFetch = globalThis.fetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
        vi.restoreAllMocks();
    });

    describe('getAuthorizedPromiseArea', () => {
        it('アクセストークンが存在しない場合、AccessTokenNotFoundErrorをスローすること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = '';

            await expect(getAuthorizedPromiseArea()).rejects.toThrow(AccessTokenNotFoundError);
        });

        it('有効期限内のアクセストークンがある場合、リフレッシュAPIを叩かずに即座にトークンを返却すること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'current-valid-access-token';
            // 現在から10分後（有効期限に十分余裕あり）
            const futureDate = new Date();
            futureDate.setMinutes(futureDate.getMinutes() + 10);
            userInfo.jwtDto.expiresAt = futureDate;

            const fetchMock = vi.fn();
            globalThis.fetch = fetchMock;

            const token = await getAuthorizedPromiseArea();

            expect(token).toBe('current-valid-access-token');
            expect(fetchMock).not.toHaveBeenCalled();
        });

        it('有効期限切れ間近（2分以内）の場合、リフレッシュAPIを呼び出し、新しいトークンとリフレッシュトークンを更新保存すること（ローテーション対応）', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'expiring-access-token';
            userInfo.jwtDto.refreshToken = 'current-refresh-token';
            // 現在から1分後（2分以内のためリフレッシュ対象）
            const soonExpireDate = new Date();
            soonExpireDate.setMinutes(soonExpireDate.getMinutes() + 1);
            userInfo.jwtDto.expiresAt = soonExpireDate;

            const newExpiresAtString = '2026-10-24T15:30:00.000Z';
            const fetchMock = vi.fn().mockResolvedValue({
                status: 200,
                json: async () => ({
                    accessToken: 'newly-rotated-access-token',
                    refreshToken: 'newly-rotated-refresh-token',
                    expiresAt: newExpiresAtString,
                }),
            });
            globalThis.fetch = fetchMock;

            const token = await getAuthorizedPromiseArea();

            expect(token).toBe('newly-rotated-access-token');
            expect(fetchMock).toHaveBeenCalledTimes(1);

            // リクエスト先URLと内容の確認
            const expectedUrl = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH + '/refresh-token';
            expect(fetchMock).toHaveBeenCalledWith(
                expectedUrl,
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accessToken: 'expiring-access-token',
                        refreshToken: 'current-refresh-token',
                        expiresAt: soonExpireDate,
                    }),
                })
            );

            // storeUserInfoの更新確認
            expect(userInfo.jwtDto.accessToken).toBe('newly-rotated-access-token');
            expect(userInfo.jwtDto.refreshToken).toBe('newly-rotated-refresh-token');
            expect(userInfo.jwtDto.expiresAt).toBeInstanceOf(Date);
            expect(userInfo.jwtDto.expiresAt.toISOString()).toBe(new Date(newExpiresAtString).toISOString());
        });

        it('複数のAPIが同時に呼び出された場合でも、リフレッシュAPIは1度しか叩かれず排他制御されること（Race Condition防止）', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'expired-token';
            userInfo.jwtDto.refreshToken = 'refresh-token-for-concurrent';
            // 過去の日時（期限切れ）
            userInfo.jwtDto.expiresAt = new Date(Date.now() - 10000);

            let resolveFetch: (value: any) => void;
            const fetchPromise = new Promise((resolve) => {
                resolveFetch = resolve;
            });

            const fetchMock = vi.fn().mockImplementation(() => fetchPromise);
            globalThis.fetch = fetchMock;

            // 3つの並行リクエストを実行
            const promise1 = getAuthorizedPromiseArea();
            const promise2 = getAuthorizedPromiseArea();
            const promise3 = getAuthorizedPromiseArea();

            // fetchMockは1回しか呼ばれていないことを確認
            expect(fetchMock).toHaveBeenCalledTimes(1);

            // fetchレスポンスを解決
            resolveFetch!({
                status: 200,
                json: async () => ({
                    accessToken: 'concurrent-refreshed-token',
                    refreshToken: 'concurrent-new-refresh-token',
                    expiresAt: new Date(Date.now() + 1800000).toISOString(),
                }),
            });

            const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

            expect(result1).toBe('concurrent-refreshed-token');
            expect(result2).toBe('concurrent-refreshed-token');
            expect(result3).toBe('concurrent-refreshed-token');
            expect(fetchMock).toHaveBeenCalledTimes(1);

            // リフレッシュ完了後、再度の呼び出しでは有効期限内なのでfetchは呼ばれない
            const nextResult = await getAuthorizedPromiseArea();
            expect(nextResult).toBe('concurrent-refreshed-token');
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        it('リフレッシュAPIが401または403を返した場合、認証失効メッセージとともにTokenRefreshErrorをスローすること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'invalid-token';
            userInfo.jwtDto.refreshToken = 'revoked-refresh-token';
            userInfo.jwtDto.expiresAt = new Date(Date.now() - 10000);

            globalThis.fetch = vi.fn().mockResolvedValue({
                status: 401,
            });

            await expect(getAuthorizedPromiseArea()).rejects.toThrow(TokenRefreshError);
            await expect(getAuthorizedPromiseArea()).rejects.toThrow('認証セッションが失効しました');
        });

        it('リフレッシュAPIが500を返した場合、TokenRefreshErrorをスローすること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'invalid-token';
            userInfo.jwtDto.refreshToken = 'refresh-token';
            userInfo.jwtDto.expiresAt = new Date(Date.now() - 10000);

            globalThis.fetch = vi.fn().mockResolvedValue({
                status: 500,
            });

            await expect(getAuthorizedPromiseArea()).rejects.toThrow(TokenRefreshError);
        });

        it('ネットワーク障害等でfetchが拒否された場合、TokenRefreshErrorをスローし次回呼び出し可能にリセットされること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'invalid-token';
            userInfo.jwtDto.refreshToken = 'refresh-token';
            userInfo.jwtDto.expiresAt = new Date(Date.now() - 10000);

            globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network disconnected'));

            await expect(getAuthorizedPromiseArea()).rejects.toThrow('Network disconnected');

            // 失敗後もキャッシュが解放されており、再実行できること
            globalThis.fetch = vi.fn().mockResolvedValue({
                status: 200,
                json: async () => ({
                    accessToken: 'recovered-token',
                    refreshToken: 'recovered-refresh-token',
                    expiresAt: new Date(Date.now() + 1800000).toISOString(),
                }),
            });

            const recoveredToken = await getAuthorizedPromiseArea();
            expect(recoveredToken).toBe('recovered-token');
        });
    });

    describe('createAuthorizedHeaders', () => {
        it('トークンを渡すと、X-AUTH-TOKENにBearer付与されたヘッダーが生成されること', () => {
            const headers = createAuthorizedHeaders('sample-jwt-token');
            expect(headers).toEqual({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'Bearer sample-jwt-token',
            });
        });

        it('追加のカスタムヘッダーを合成できること', () => {
            const headers = createAuthorizedHeaders('sample-jwt-token', {
                'X-Custom-Header': 'custom-value',
                'Content-Type': 'application/x-www-form-urlencoded',
            });

            expect(headers).toEqual({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-AUTH-TOKEN': 'Bearer sample-jwt-token',
                'X-Custom-Header': 'custom-value',
            });
        });

        it('Headersインスタンスを渡した場合も正しく合成されること', () => {
            const customHeaders = new Headers();
            customHeaders.append('x-request-id', 'req-12345');

            const headers = createAuthorizedHeaders('sample-jwt-token', customHeaders);
            expect(headers['x-request-id']).toBe('req-12345');
            expect(headers['X-AUTH-TOKEN']).toBe('Bearer sample-jwt-token');
        });
    });

    describe('fetchWithAuth', () => {
        it('認証トークンと共通ヘッダーを自動付与してfetchを実行すること', async () => {
            const userInfo = useUserInfoStoreCommon();
            userInfo.jwtDto.accessToken = 'valid-jwt-token';
            userInfo.jwtDto.expiresAt = new Date(Date.now() + 600000);

            const fetchMock = vi.fn().mockResolvedValue({
                status: 200,
                json: async () => ({ data: 'ok' }),
            });
            globalThis.fetch = fetchMock;

            const response = await fetchWithAuth('https://api.example.com/data', {
                method: 'POST',
                body: JSON.stringify({ key: 'value' }),
            });

            expect(response.status).toBe(200);
            expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/data', {
                method: 'POST',
                body: JSON.stringify({ key: 'value' }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': 'Bearer valid-jwt-token',
                },
            });
        });
    });

    describe('エラークラスの定義', () => {
        it('各エラークラスが正しくインスタンス化できること', () => {
            const err1 = new AccessTokenNotFoundError();
            expect(err1.name).toBe('AccessTokenNotFoundError');

            const err2 = new TokenRefreshError('カスタム');
            expect(err2.name).toBe('TokenRefreshError');
            expect(err2.message).toBe('カスタム');

            const err3 = new PasskeyAuthenticationError();
            expect(err3.name).toBe('PasskeyAuthenticationError');

            const err4 = new PasskeyNotSupportedError();
            expect(err4.name).toBe('PasskeyNotSupportedError');

            const err5 = new PasskeyCancellationError();
            expect(err5.name).toBe('PasskeyCancellationError');

            const err6 = new PreAuthTokenExpiredError();
            expect(err6.name).toBe('PreAuthTokenExpiredError');
        });
    });
});
