# 使用API設計書: houjin-no/get-external (国税庁法人番号システム Web-API 連携)

## 1. 概要

- 国税庁法人番号システム Web-API（外部API）へバックエンド経由でリクエストを中継送信し、指定された検索条件（商号・法人名称、および地方自治体コード）に基づいて合致する法人の詳細情報（13桁の法人番号、商号、本店所在地など）を取得します。
- 国税庁APIの制限である1回あたり最大2,000件のレスポンスに対応し、分割取得（`divide` 番号による指定）が可能です。

## 2. API仕様

- **エンドポイントURL**: `[BASE_PATH]/houjin-no/get-external`
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
- **データ型**: `SearchHoujinNoCapsuleDtoInterface`

#### プロパティ仕様

| プロパティ名 |    型    | 必須  |                             説明                             |
| :----------- | :------- | :---: | :----------------------------------------------------------- |
| `appId`      | `string` |  Yes  | ユーザーが個別に取得した国税庁 Web-API のアプリID（APIキー） |
| `type`       | `string` |  Yes  | レスポンスデータ形式（例: `"02"` - Unicode CSV形式など）     |
| `name`       | `string` |  Yes  | 検索対象 of 法人名・商号（前方一致等、必須）                 |
| `mode`       | `string` |  Yes  | 検索モード（"1": 前方一致、"2": 部分一致など）               |
| `address`    | `string` |  No   | 絞り込みを行う5桁の地方自治体コード（JIS/LGコード、任意）    |
| `close`      | `string` |  Yes  | 閉鎖登記された法人を含むか否か（"1": 含める、"0": 含めない） |
| `divide`     | `number` |  Yes  | 分割取得位置。1始まりのインデックス（最大2,000件単位の分割） |

#### リクエストボディ（JSON）の例

```json
{
  "appId": "YOUR_EXTERNAL_COV_API_KEY",
  "type": "02",
  "name": "サンプル商事",
  "mode": "1",
  "address": "13101",
  "close": "1",
  "divide": 1
}
```

## 4. レスポンス仕様

### ステータスコード (Status Code)

- `200 OK`: 正常終了

### レスポンスボディ (Body)

- **形式**: JSON (Object)
- **データ型**: `SearchHoujinNoResultDtoInterface`

#### オブジェクトのプロパティ仕様

|  プロパティ名  |            型            |                          説明                           |
| :------------- | :----------------------- | :------------------------------------------------------ |
| `totalCount`   | `number`                 | 条件に合致する総ヒット数（外部API全体での件数）         |
| `isFailure`    | `boolean`                | 外部APIリクエストが失敗、または例外が発生したかのフラグ |
| `message`      | `string`                 | 失敗時のエラー内容テキスト                              |
| `houjinNoList` | `HoujinNoDtoInterface[]` | 取得された法人情報オブジェクトリスト（最大2,000件）     |

#### 法人情報オブジェクト仕様 (`HoujinNoDtoInterface`)

|   プロパティ名   |    型    |                       説明                        |
| :--------------- | :------- | :------------------------------------------------ |
| `houjinNo`       | `string` | 13桁の法人番号                                    |
| `kind`           | `string` | 法人種別コード（"101": 国の機関、"301": 会社 等） |
| `houjinName`     | `string` | 商号・法人名                                      |
| `prefectureName` | `string` | 本店所在地の都道府県名                            |
| `cityName`       | `string` | 本店所在地の市区町村名                            |
| `process`        | `string` | 処理区分コード（"01": 新規、"11": 商号変更等）    |

#### レスポンスデータ（JSON）の例

```json
{
  "totalCount": 1,
  "isFailure": false,
  "message": "",
  "houjinNoList": [
    {
      "houjinNo": "1000000000001",
      "kind": "301",
      "houjinName": "サンプル商事株式会社",
      "prefectureName": "東京都",
      "cityName": "千代田区",
      "process": "01"
    }
  ]
}
```

## 5. 認証・トークンの取り扱い

- 本APIを呼び出す前に、バックエンド認証トークン取得処理を行う必要があります。
- 詳細は [トークン取得共通関数: getAuthorizedPromiseArea()](./getAuthorizedPromiseArea.md) を参照してください。

## 6. エラーハンドリング・例外処理

- **外部API接続エラーまたはAPIキー不整合**: `isFailure` が `true` となり、レスポンス内の `message` にエラー理由が格納され、コンポーネント側でそのメッセージ内容が表示されます。
- **実処理エラー**: DB接続エラーや通信障害発生時は、呼び出し元コンポーネント（`SearchHoujinNo.vue`）側で例外がキャッチされ、システムエラーメッセージ（「システム管理者にお問い合わせください」）が画面上に表示されます。
