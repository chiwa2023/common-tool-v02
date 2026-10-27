import RoutePathConstants from "../../../../routePathConstants";
import useUserInfoStoreCommon from "../../stores/storeUserInfo";
import { type JwtTokenDtoInterface, JwtTokenDto } from "./jwtTokenDto";
import { AccessTokenNotFoundError, TokenRefreshError } from "./errors";

/**
 * リフレッシュ処理が並行して複数走るのを防止するためのPromiseキャッシュ
 * （排他制御 / In-flight Promise deduplication）
 */
let refreshPromise: Promise<string> | null = null;

/**
 * テスト用にPromiseキャッシュを初期化する関数
 */
export function _resetRefreshPromiseForTest(): void {
    refreshPromise = null;
}

/**
 * クロスドメイン・サブドメインAPIアクセス用の認証ヘッダーを生成するユーティリティ関数
 *
 * @param token アクセストークン文字列
 * @param additionalHeaders 追加または上書きするカスタムヘッダー（省略可能）
 * @returns 認証ヘッダーを含んだヘッダーオブジェクト
 */
export function createAuthorizedHeaders(
    token: string,
    additionalHeaders?: HeadersInit
): Record<string, string> {
    const baseHeaders: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': 'Bearer ' + token,
    };

    if (!additionalHeaders) {
        return baseHeaders;
    }

    if (additionalHeaders instanceof Headers) {
        additionalHeaders.forEach((value, key) => {
            baseHeaders[key] = value;
        });
    } else if (Array.isArray(additionalHeaders)) {
        additionalHeaders.forEach(([key, value]) => {
            baseHeaders[key] = value;
        });
    } else {
        Object.assign(baseHeaders, additionalHeaders);
    }

    return baseHeaders;
}

/**
 * トークン取得共通関数: getAuthorizedPromiseArea()
 *
 * - 保存されているトークンの有効期限（直前2分前）を検証し、必要に応じて自動的にリフレッシュを行います。
 * - リフレッシュトークン・ローテーションに対応し、取得した新しいアクセストークンおよびリフレッシュトークンを保存します。
 * - 複数箇所から同時に呼び出された場合でも、排他制御によりリフレッシュAPIの多重呼び出し（Race condition）を防止します。
 *
 * @returns 有効なJWTアクセストークン文字列を解決するPromise
 * @throws {AccessTokenNotFoundError} アクセストークンが保存されていない場合
 * @throws {TokenRefreshError} トークンの再取得・リフレッシュに失敗した場合
 */
export default async function getAuthorizedPromiseArea(): Promise<string> {
    // back側アクセスURL
    const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;
    const SERVER_STATUS_OK: number = 200;

    // 保存していたアクセストークンと有効期限を取得
    const userInfo = useUserInfoStoreCommon();
    const jwtDto: JwtTokenDtoInterface = userInfo.jwtDto;
    const accessToken = jwtDto.accessToken;
    const refreshToken = jwtDto.refreshToken;

    if (!accessToken) {
        if (!refreshToken) {
            // 万が一双方が空文字未入力の場合はAPIアクセスさせない
            throw new AccessTokenNotFoundError();
        } else {
            // 長期トークンで初回アクセスの場合は強制トークンリフレッシュ
            userInfo.jwtDto.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 仮で1年後
            jwtDto.accessToken = refreshToken;
        }
    } else {
        // 有効期限から仮値2分余裕があるならアクセス可能として引き続きアクセストークンを使用する
        const dateExpires: Date = new Date(jwtDto.expiresAt);
        if (!isNaN(dateExpires.getTime())) {
            dateExpires.setMinutes(dateExpires.getMinutes() - 2);
            if (new Date() < dateExpires) {
                return accessToken;
            }
        }
    }




    // すでに他の並行リクエストがリフレッシュ処理を実行中であれば、その完了を待つ
    // （リフレッシュトークン・ローテーションによる再利用検知エラーを防止）
    if (refreshPromise) {
        return refreshPromise;
    }

    // アクセストークンが期限切れ(直前)で利用できない場合は
    // リフレッシュトークンを使ってアクセストークンを再取得
    refreshPromise = (async () => {
        try {
            const url = urlBack + "/refresh-token";
            const method = "POST";
            const body = JSON.stringify({
                accessToken: jwtDto.accessToken,
                refreshToken: jwtDto.refreshToken,
                expiresAt: jwtDto.expiresAt
            });
            const headers: Record<string, string> = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, { method, headers, body });
            if (SERVER_STATUS_OK === response.status) {
                const refreshedJwt = await response.json();

                // 新しいトークン情報をDTOに反映（リフレッシュトークン・ローテーション）
                const newJwtDto = new JwtTokenDto();
                newJwtDto.accessToken = refreshedJwt.accessToken || "";
                newJwtDto.refreshToken = refreshedJwt.refreshToken || "";
                newJwtDto.expiresAt = refreshedJwt.expiresAt ? new Date(refreshedJwt.expiresAt) : new Date(0);

                userInfo.jwtDto = newJwtDto;
                return newJwtDto.accessToken;
            }

            // 401 Unauthorized / 403 Forbidden などの認証失効エラー
            if (response.status === 401 || response.status === 403) {
                throw new TokenRefreshError('認証セッションが失効しました。再度ログインしてください。');
            }

            throw new TokenRefreshError(`トークンのリフレッシュに失敗しました。(HTTP ${response.status})`);
        } catch (error) {
            if (error instanceof TokenRefreshError) {
                throw error;
            }
            throw new TokenRefreshError(
                error instanceof Error ? error.message : 'トークンリフレッシュ中に予期しないエラーが発生しました。'
            );
        } finally {
            // 処理完了（成功・失敗問わず）後にPromiseキャッシュを解放
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/**
 * 認証トークンを付与して fetch API を実行するヘルパー関数
 *
 * @param input リクエストURLまたはRequestオブジェクト
 * @param init fetchオプション
 * @returns レスポンスPromise
 */
export async function fetchWithAuth(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    const token = await getAuthorizedPromiseArea();
    const headers = createAuthorizedHeaders(token, init.headers);
    return fetch(input, {
        ...init,
        headers,
    });
}
