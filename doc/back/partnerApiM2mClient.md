# バックエンド間（Server-to-Server / M2M）API連携 設計書

## 1. 概要

本設計書は、外部ドメイン（例: `https://example.com`）を運営するパートナー事業者が、自社サービス内に本プロジェクト（`net.seijishikin.jp.normalize` / 関連者管理基盤）の正規化・検索APIを組み込むにあたり、**バックエンドサーバー間（Server-to-Server / Machine-to-Machine: M2M）通信**を用いて安全にAPIを利用するためのアーキテクチャおよび実装仕様を定義します。

外部サービスのフロントエンド（エンドユーザーのブラウザ）には本サービスの認証情報（長期トークン）やAPIエンドポイントを一切露出させず、外部サービスのバックエンド（Spring Boot等）が中継・プロキシ・データ加工を行う構成を前提とします。

---

## 2. アーキテクチャ

### 2.1 全体構成図

```text
[ 一般エンドユーザー ]
       │
       │ (1) 業務画面操作・自社APIリクエスト
       ▼
[ 外部サービス フロントエンド ] (https://example.com)
       │
       │ (2) 自社バックエンドAPI呼び出し (セッション / 自社JWT)
       ▼
[ 外部サービス バックエンド ] (Spring Boot サーバー)
   ┌─────────────────────────────────────────────────────────────┐
   │ - 長期APIトークン（Partner Access Token）を秘密裏に保持     │
   │ - 固定IPアドレス / CIDRブロックから送信                     │
   │ - Spring Boot WebClient / RestClient による通信制御         │
   │ - レスポンスの検証・ドメインエンティティへのマッピング      │
   └─────────────────────────────────────────────────────────────┘
       │
       │ (3) M2M通信: X-AUTH-TOKEN: Bearer {long_token}
       │     (HTTPS / TLS 1.3, 送信元IPアドレス検証)
       ▼
[ 提供側 APIサーバー ] (https://kanrensha.normalize-jp-seijishikin.net)
   ┌─────────────────────────────────────────────────────────────┐
   │ - 送信元IPアドレス ホワイトリスト照合（CIDR対応）           │
   │ - パートナー長期トークン検証（有効期限・失効状態チェック）  │
   │ - レートリミット制御（Bucket4j）                            │
   │ - 政治資金・住所正規化・関連者検索ロジック実行              │
   └─────────────────────────────────────────────────────────────┘
```

### 2.2 構成のメリット

1. **クレデンシャルの完全秘匿**:
   - 長期APIトークン（APIキー）がエンドユーザーのブラウザに渡らないため、トークンの漏洩・盗難リスクを完全に排除できます。
2. **IPアドレス制限（CIDR）の確実な適用**:
   - 不特定多数のエンドユーザー端末からではなく、外部サービスのバックエンドサーバー（固定IPまたは特定VPC/NATゲートウェイ）から送信されるため、IPホワイトリスト照合が確実に機能します。
3. **パスキー（WebAuthn）認証との役割分離**:
   - 外部サービス運営者が自サイト（管理画面）でAPIキーを発行・更新する際にはパスキーによる強固な本人認証（2FA）を行い、発行後のシステム間バッチ・API呼び出しにはM2M通信を適用することで、セキュリティと自動化を両立します。

---

## 3. セキュリティ仕様

### 3.1 認証・認可方式

- **認証ヘッダー**: `X-AUTH-TOKEN: Bearer {partner_access_token}`
- **トークン種別**: APIパートナー長期トークン（管理画面の `ReplacePartnerApiToken.vue` より発行されたJWT）。
- **有効期限**: トークン発行時に定められた期間（通常1年〜複数年）。

### 3.2 接続元IP制限

- 提供側APIサーバーは、トークンに紐付けられた登録済みのIPアドレス（またはCIDR範囲）以外からのリクエストを `403 Forbidden` として拒否します。
- 外部サービス側は、発信元IPが固定IP（またはAWS NAT Gateway等の許可されたElastic IP）となるネットワーク経路を設定してください。

### 3.3 レートリミット（Rate Limiting）対応

- 提供側APIサーバーでは、DoS攻撃・過剰リクエスト防止のため `Bucket4j` によるトークンバケット制限（例: 1クライアントあたり 60 req/min）が適用されています。
- 制限を超過した場合、HTTPステータス `429 Too Many Requests` が返却されます。外部バックエンド側では後述の指数バックオフ（Exponential Backoff）による再試行やキューイングを設計に含めてください。

---

## 4. 提供側 API 通信仕様

### 4.1 共通リクエスト仕様

- **ベースURL**: `https://kanrensha.normalize-jp-seijishikin.net/api` （環境に応じて変更）
- **HTTPメソッド**: `POST`
- **共通ヘッダー**:

  ```
  http
  Accept: application/json
  Content-Type: application/json
  X-AUTH-TOKEN: Bearer eyJhbGciOi...（長期トークン）
  ```

### 4.2 主要エンドポイント一覧

|         機能分類         |            エンドポイント            |               説明               |          リクエストDTO (Java)          |
| ------------------------ | ------------------------------------ | -------------------------------- | -------------------------------------- |
| **都道府県一覧検索**     | `/lgcode-pref/search`                | 全47都道府県コードと名称を取得   | `FrameworkCapsuleDto` (空)             |
| **市区町村検索**         | `/lgcode-city/search`                | 指定都道府県配下の自治体一覧取得 | 自治体検索用CapsuleDto                 |
| **郵便番号検索**         | `/postal-search`                     | 郵便番号から住所候補を取得       | 郵便番号検索用CapsuleDto               |
| **法人番号検索**         | `/houjin-no/get-external`            | 国税庁API連携による法人情報検索  | 法人検索用CapsuleDto                   |
| **関連者(企業団体)検索** | `/user-kanrensha/search-kigyou-dt`   | 企業・団体マスタの前方一致検索   | `SearchKanrenshaKigyouDtCapsuleDto`    |
| **関連者(個人)検索**     | `/user-kanrensha/search-person`      | 個人関連者マスタの前方一致検索   | `SearchKanrenshaPersonCapsuleDto`      |
| **関連者(政治団体)検索** | `/user-kanrensha/search-seijidantai` | 政治団体マスタの前方一致検索     | `SearchKanrenshaSeijidantaiCapsuleDto` |

---

## 5. Spring Boot クライアント実装設計

Spring Boot 3.x / 4.x では、ノンブロッキングな通信や高スループットに適した **`WebClient`**、または宣言的・同期的な記述に適した **`RestClient`**（Spring Boot 3.2以降標準）の利用を推奨します。

### 5.1 設定ファイル (`application.yml`)

```yaml
partner:
  api:
    base-url: "https://kanrensha.normalize-jp-seijishikin.net/api"
    # 環境変数から注入（本番環境では絶対にソースコードに直書きしない）
    token: "${PARTNER_API_TOKEN}"
    timeout:
      connect-ms: 5000
      read-ms: 10000
    max-in-memory-size-mb: 16
```

### 5.2 WebClient Bean定義クラス (`PartnerApiClientConfig.java`)

```java
package com.example.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class PartnerApiClientConfig {

    @Value("${partner.api.base-url}")
    private String baseUrl;

    @Value("${partner.api.token}")
    private String partnerApiToken;

    @Value("${partner.api.timeout.connect-ms:5000}")
    private int connectTimeoutMs;

    @Value("${partner.api.timeout.read-ms:10000}")
    private int readTimeoutMs;

    @Value("${partner.api.max-in-memory-size-mb:16}")
    private int maxInMemorySizeMb;

    @Bean(name = "partnerApiWebClient")
    public WebClient partnerApiWebClient() {
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectTimeoutMs)
                .responseTimeout(Duration.ofMillis(readTimeoutMs))
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS)));

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .codecs(configurer -> configurer.defaultCodecs()
                        .maxInMemorySize(maxInMemorySizeMb * 1024 * 1024))
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // 長期トークンを自動でX-AUTH-TOKENヘッダーへ付与
                .defaultHeader("X-AUTH-TOKEN", "Bearer " + partnerApiToken)
                .build();
    }
}
```

### 5.3 M2Mサービスクラス実装例 (`PartnerApiM2mClientService.java`)

```java
package com.example.service;

import net.seijishikin.jp.normalize.common_tool.dto.FrameworkCapsuleDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class PartnerApiM2mClientService {

    private static final Logger log = LoggerFactory.getLogger(PartnerApiM2mClientService.class);

    private final WebClient partnerApiWebClient;

    public PartnerApiM2mClientService(@Qualifier("partnerApiWebClient") WebClient partnerApiWebClient) {
        this.partnerApiWebClient = partnerApiWebClient;
    }

    /**
     * 都道府県一覧を取得する
     */
    public List<Map<String, String>> getPrefectures() {
        FrameworkCapsuleDto requestDto = new FrameworkCapsuleDto();

        return partnerApiWebClient.post()
                .uri("/lgcode-pref/search")
                .bodyValue(requestDto)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response -> {
                    if (response.statusCode().value() == 403) {
                        log.error("APIアクセス権限エラー: IPアドレスまたは長期トークンが無効です");
                    } else if (response.statusCode().value() == 429) {
                        log.warn("APIレートリミット到達: リクエスト頻度を制御してください");
                    }
                    return response.createException().flatMap(Mono::error);
                })
                .bodyToFlux(Map.class)
                .map(map -> (Map<String, String>) map)
                .collectList()
                // レートリミット (429) や一時的なネットワーク障害時の指数バックオフリトライ
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                        .filter(throwable -> throwable instanceof WebClientResponseException.TooManyRequests)
                        .doBeforeRetry(retrySignal -> log.warn("429検知によりリトライ実行 (試行回数: {})", retrySignal.totalRetries() + 1)))
                .block(); // 同期処理として結果を待つ場合（コントローラー内など）
    }

    /**
     * 企業・団体マスタを前方一致検索する
     *
     * @param searchCondition 検索条件（商号、住所等）
     * @return 検索結果オブジェクト
     */
    public <T> T searchKigyouDt(Object searchCondition, Class<T> responseType) {
        try {
            return partnerApiWebClient.post()
                    .uri("/user-kanrensha/search-kigyou-dt")
                    .bodyValue(searchCondition)
                    .retrieve()
                    .bodyToMono(responseType)
                    .block();
        } catch (WebClientResponseException e) {
            log.error("API呼び出し失敗: HTTP {} - {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new PartnerApiException("関連者検索APIの実行に失敗しました", e);
        }
    }
}
```

---

## 6. エラーハンドリング・フォールバック設計

|      HTTPステータス       |                原因                |                                                  外部バックエンドでの推奨対処方針                                                  |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **401 Unauthorized**      | トークンの構文エラー、未設定       | 設定ファイル・環境変数の `PARTNER_API_TOKEN` を確認。管理者にアラート通知。                                                        |
| **403 Forbidden**         | トークン失効、または送信元IP不一致 | 接続元IPが登録済みCIDR内か確認。管理画面から長期トークンを再発行・更新。                                                           |
| **429 Too Many Requests** | レートリミット（Bucket4j）超過     | 指数バックオフ（Exponential Backoff）による自動リトライ（最大3回程度）。頻発する場合はバッチ処理の分散または提供側へ上限緩和申請。 |
| **500 / 503**             | 提供側サーバー障害・メンテナンス   | サーキットブレーカー（Resilience4j等）を作動させ、自社フロントへ「外部データ取得中につき一時利用不可」の縮退メッセージを返却。     |
| **Read Timeout**          | レスポンス遅延                     | 自社バックエンドのタイムアウト（10秒）で切断し、ユーザーに再試行を促す。                                                           |

---

## 7. 運用・保守手順

### 7.1 長期トークンの更新（ローテーション）手順

1. 提供サービスの管理画面（`ReplacePartnerApiToken.vue`）にログインし、パスキー認証を実施。
2. 送信元IPアドレス（CIDR）を確認の上、「長期トークン発行」を実行し、新しいJWTを取得。
3. 外部バックエンドの環境変数（`PARTNER_API_TOKEN`）を新しいトークンに差し替え。
4. Spring Boot アプリケーションを再起動（または Spring Cloud Config / Actuator Refresh でホットリロード）。
5. 正常疎通を確認後、旧トークンは管理画面側で失効日時（`revokedAt`）を迎えて安全に無効化されます。
