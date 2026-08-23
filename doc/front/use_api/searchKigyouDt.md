# 使用API設計書: user-kanrensha/search-kigyou-dt

## 1. 概要

- 登録されている関連者（企業・団体）マスタのレコードを、前方一致検索します。
- 検索条件として「法人番号」「企業・団体名」「企業・団体全住所」「代表者名」を指定可能です。
- 本APIはページングをサポートしており、指定されたリミット件数およびページ番号に基づいて一部の検索結果のみを配列で返却します。

## 2. API仕様

- **エンドポイントURL**: `https://kanrensha.normalize-jp-seijishikin.net/api/user-kanrensha/search-kigyou-dt`
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
- **データ型**: `SearchKanrenshaKigyouDtCapsuleDtoInterface`

#### プロパティ仕様

| プロパティ名 |    型    | 必須  |                  説明                  |
| :----------- | :------- | :---: | :------------------------------------- |
| `houjinNo`   | `string` |  No   | 法人番号（前方一致）                   |
| `name`       | `string` |  No   | 企業・団体名（前方一致）               |
| `address`    | `string` |  No   | 住所（前方一致）                       |
| `delegate`   | `string` |  No   | 代表者名（前方一致）                   |
| `allCount`   | `number` |  Yes  | 総件数（クライアント側状態引き継ぎ用） |
| `limit`      | `number` |  Yes  | 1ページあたりの件数（上限値）          |
| `pageNumber` | `number` |  Yes  | 取得対象ページ番号（0から開始）        |

#### リクエストボディ（JSON）の例

```json
{
  "houjinNo": "1000000000001",
  "name": "サンプル商事",
  "address": "東京都新宿区",
  "delegate": "政治 太郎",
  "allCount": 0,
  "limit": 20,
  "pageNumber": 0
}
```

## 4. レスポンス仕様

### ステータスコード (Status Code)

- `200 OK`: 正常終了

### レスポンスボディ (Body)

- **形式**: JSON (Object)
- **データ型**: `SearchKanrenshaKigyouDtResultDtoInterface`

#### オブジェクトのプロパティ仕様

|     プロパティ名     |                     型                     |                 説明                 |
| :------------------- | :----------------------------------------- | :----------------------------------- |
| `listMasterKigyouDt` | `KanrenshaKigyouDtMasterEntityInterface[]` | 検索条件にマッチした企業・団体リスト |
| `allCount`           | `number`                                   | 検索条件に該当する全体の総件数       |
| `limit`              | `number`                                   | 1ページあたりの取得件数リミット      |
| `pageNumber`         | `number`                                   | 取得されたページ番号                 |

#### 企業・団体オブジェクト仕様 (`KanrenshaKigyouDtMasterEntityInterface`)

|        プロパティ名         |    型    |             説明             |
| :-------------------------- | :------- | :--------------------------- |
| `kanrenshaKigyouDtMasterId` | `number` | 企業・団体マスタテーブルのID |
| `kigyouDtKanrenshaCode`     | `string` | 企業・団体関連者固有コード   |
| `houjinNo`                  | `string` | 法人番号                     |
| `kanrenshaName`             | `string` | 企業・団体名                 |
| `allAddress`                | `string` | 全住所                       |
| `kigyouDtDelegate`          | `string` | 代表者名                     |
| `compareNameText`           | `string` | 名称比較用正規化テキスト     |

#### レスポンスデータ（JSON）の例

```json
{
  "listMasterKigyouDt": [
    {
      "kanrenshaKigyouDtMasterId": 1,
      "kigyouDtKanrenshaCode": "K00001",
      "houjinNo": "1000000000001",
      "kanrenshaName": "サンプル商事株式会社",
      "allAddress": "東京都新宿区西新宿1-1-1",
      "kigyouDtDelegate": "政治 太郎",
      "compareNameText": "さんぷるしょうじかぶしきがいしゃ"
    }
  ],
  "allCount": 1,
  "limit": 20,
  "pageNumber": 0
}
```

## 5. 認証・トークンの取り扱い

- **認証トークン取得**: このAPIを呼び出す前に、共通のトークン取得処理を行う必要があります。
- トークンの詳細な仕様やエラーハンドリングについては、[トークン取得共通関数: getAuthorizedPromiseArea()](./getAuthorizedPromiseArea.md) を参照してください。

## 6. エラーハンドリング・例外処理

- **認証エラー**: トークンが無効な場合や有効期限が切れている場合は、401等（または getAuthorizedPromiseArea がエラーをスロー）で処理されます。
- **実処理側エラー**: ネットワーク問題やDBアクセス不具合などによりAPIアクセスが失敗した場合は、エラー（catch）として呼び出し元コンポーネント（`SearchKanrenshaKigyouDt.vue`）側に伝播し、コンポーネントにて適切なシステムエラーポップアップが表示されます。
