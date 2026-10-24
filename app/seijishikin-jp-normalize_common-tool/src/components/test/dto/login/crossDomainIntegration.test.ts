import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import getAuthorizedPromiseArea, {
    fetchWithAuth,
    _resetRefreshPromiseForTest,
} from '../../../main/dto/login/getAuthorizedPromiseArea';
import useUserInfoStoreCommon from '../../../main/stores/storeUserInfo';
import { TokenRefreshError } from '../../../main/dto/login/errors';

describe('クロスドメイン・サブドメイン結合検証テスト', () => {
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

    it('別サブドメイン（例: app.example.com -> api.example.com）からのAPIアクセスで正しいCORS対応ヘッダー（X-AUTH-TOKEN）が送信されること', async () => {
        const userInfo = useUserInfoStoreCommon();
        userInfo.jwtDto.accessToken = 'subdomain-jwt-access-token';
        userInfo.jwtDto.expiresAt = new Date(Date.now() + 600000);

        const fetchMock = vi.fn().mockResolvedValue({
            status: 200,
            headers: new Headers({
                'Access-Control-Allow-Origin': 'https://app.example.com',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Expose-Headers': 'X-AUTH-TOKEN',
            }),
            json: async () => ({
                success: true,
                data: [{ id: 1, name: 'テスト政治団体' }],
            }),
        });
        globalThis.fetch = fetchMock;

        // APIリクエストの実行
        const targetApiUrl = 'https://api.example.com/lgcode-pref/search';
        const response = await fetchWithAuth(targetApiUrl, {
            method: 'POST',
            body: JSON.stringify({ isDigit5: false }),
        });

        expect(response.status).toBe(200);
        expect(fetchMock).toHaveBeenCalledWith(targetApiUrl, {
            method: 'POST',
            body: JSON.stringify({ isDigit5: false }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'Bearer subdomain-jwt-access-token',
            },
        });
    });

    it('別ドメイン（APIパートナー連携: partner-site.jp -> seijishikin.jp）での長期トークンからのアクセストークン自動取得とローテーション', async () => {
        const userInfo = useUserInfoStoreCommon();
        // パートナーサイト側で保持している長期トークンを初期セット
        const initialLongToken = 'partner-initial-long-term-token';
        userInfo.jwtDto.accessToken = initialLongToken;
        userInfo.jwtDto.refreshToken = initialLongToken;
        // 初期状態は有効期限過去（即時リフレッシュをトリガー）
        userInfo.jwtDto.expiresAt = new Date(0);

        // 1回目のリフレッシュ（初回APIアクセス時）
        const fetchMock = vi.fn()
            // 1回目のリフレッシュ呼び出し
            .mockResolvedValueOnce({
                status: 200,
                json: async () => ({
                    accessToken: 'jwt-access-token-step1',
                    refreshToken: 'jwt-refresh-token-step1',
                    expiresAt: new Date(Date.now() + 1800000).toISOString(), // 30分有効
                }),
            });
        globalThis.fetch = fetchMock;

        const token1 = await getAuthorizedPromiseArea();
        expect(token1).toBe('jwt-access-token-step1');
        expect(userInfo.jwtDto.refreshToken).toBe('jwt-refresh-token-step1');

        // 2回目のAPI呼び出し時はトークン有効期限内なのでリフレッシュせずそのままトークン利用
        const token2 = await getAuthorizedPromiseArea();
        expect(token2).toBe('jwt-access-token-step1');
        expect(fetchMock).toHaveBeenCalledTimes(1); // リフレッシュのみ1回

        // 3回目: トークン有効期限が迫った（残り1分）とシミュレート
        userInfo.jwtDto.expiresAt = new Date(Date.now() + 60000); // 1分後

        // 2回目のリフレッシュ（ローテーションされたrefresh-token-step1を使用）
        fetchMock.mockResolvedValueOnce({
            status: 200,
            json: async () => ({
                accessToken: 'jwt-access-token-step2',
                refreshToken: 'jwt-refresh-token-step2',
                expiresAt: new Date(Date.now() + 1800000).toISOString(),
            }),
        });

        const token3 = await getAuthorizedPromiseArea();
        expect(token3).toBe('jwt-access-token-step2');
        expect(userInfo.jwtDto.refreshToken).toBe('jwt-refresh-token-step2');
    });

    it('リフレッシュトークンが無効化された場合（リプレイ検知やセッション破棄）、適切にTokenRefreshErrorがスローされること', async () => {
        const userInfo = useUserInfoStoreCommon();
        userInfo.jwtDto.accessToken = 'compromised-access-token';
        userInfo.jwtDto.refreshToken = 'reused-refresh-token';
        userInfo.jwtDto.expiresAt = new Date(0);

        // バックエンド側でリプレイ検知され401が返るケース
        globalThis.fetch = vi.fn().mockResolvedValue({
            status: 401,
            headers: new Headers({
                'WWW-Authenticate': 'Bearer error="invalid_token", error_description="The refresh token has been revoked"',
            }),
        });

        await expect(getAuthorizedPromiseArea()).rejects.toThrow(TokenRefreshError);
        await expect(getAuthorizedPromiseArea()).rejects.toThrow('認証セッションが失効しました');
    });
});
