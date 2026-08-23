# 使用API設計書: sns-service/get-options

## 1. 概要

- アプリケーションで利用可能なSNSサービスの選択肢一覧を取得します。
- このAPIは、SNSサービス選択用のドロップダウンリスト（セレクトボックス）のオプション項目となります。
- データベースに1件の登録もなくても未選択選択肢リストが戻ります。接続が切れていない限り、1項目は返却されるので空であるケースはあり得ません。

## 2. API仕様

- **エンドポイントURL**: `https://kanrensha.normalize-jp-seijishikin.net/api/sns-service/get-options`
- **HTTPメソッド**: `POST`
- **認証有無**: 要（X-AUTH-TOKENヘッダーによるJWTトークン認証）

## 3. リクエスト仕様

### ヘッダー (Headers)

|   ヘッダー名   |        設定値        |                 説明                 |
| :------------- | :------------------- | :----------------------------------- |
| `Accept`       | `application/json`   | レスポンスとしてJSON形式を期待する。 |
| `Content-Type` | `application/json`   | リクエストのコンテンツタイプを指定。 |
| `X-AUTH-TOKEN` | `Bearer {jwt_token}` | 認証用のJWTアクセストークン。        |

### リクエストボディ (Body)

- **形式**: JSON (Object)
- **パラメータ**: なし (空のオブジェクト `{}`)

```json
{}
```

## 4. レスポンス仕様

### ステータスコード (Status Code)

- `200 OK`: 正常終了

### レスポンスボディ (Body)

- **形式**: JSON (Array of Object)
- **データ型**: `SnsServiceOptionDtoInterface[]`

#### オブジェクトのプロパティ仕様 (`SnsServiceOptionDtoInterface`)

| プロパティ名  |    型    |                                  説明                                   |
| :------------ | :------- | :---------------------------------------------------------------------- |
| `value`       | `number` | SNSサービスの識別子（Id）。ドロップダウンの内部値。                     |
| `text`        | `string` | SNSサービス名。ドロップダウンの表示用テキスト（例: X, Facebook など）。 |
| `serviceCode` | `number` | SNSサービスコード。システム内部管理用の固有コード。                     |
| `portalUrl`   | `string` | SNSサービスのポータルトップURL。                                        |

#### レスポンスデータ（JSON）の例

```json
[
  {
    "value": 0,
    "text": "独自入力",
    "serviceCode": 0,
    "portalUrl": ""
  },
  {
    "value": 1,
    "text": "X（旧Twitter）",
    "serviceCode": 100,
    "portalUrl": "https://x.com/"
  },
  {
    "value": 2,
    "text": "Facebook",
    "serviceCode": 200,
    "portalUrl": "https://www.facebook.com/"
  }
]
```

## 5. 認証・トークンの取り扱い

- **認証トークン取得**: このAPIを呼び出す前に、共通のトークン取得処理を行う必要があります。
- トークンの詳細な仕様やエラーハンドリングについては、[トークン取得共通関数: getAuthorizedPromiseArea()](./getAuthorizedPromiseArea.md) を参照してください。

## 6. エラーハンドリング・例外処理

- **認証エラー**: トークンが無効な場合や有効期限が切れている場合は、401等（または getAuthorizedPromiseArea がエラーをスロー）で処理されます。
- **実処理側エラー**: API呼び出し自体に失敗した場合（ネットワークエラーなど）は、呼び出し元コンポーネント（`InputAccess.vue`）側でキャッチされ、「システム管理者にお問い合わせください」というエラーメッセージが表示されます。
