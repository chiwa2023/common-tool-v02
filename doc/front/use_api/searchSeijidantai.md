# 使用API設計書: user-kanrensha/search-seijidantai

## 1. 概要

- 登録されている関連者（政治団体）マスタのレコードを、前方一致および区分フィルター検索します。
- 検索条件として「政治団体番号」「団体名」「全住所」「代表者名」による前方一致検索が可能です。
- さらに「政治団体区分」コードの配列を指定することで、該当する団体区分の政治団体のみを対象としてフィルタリング検索を行えます。
- 本APIはページングをサポートしており、指定されたリミット件数およびページ番号に基づいて一部の検索結果のみを配列で返却します。

## 2. API仕様

- **エンドポイントURL**: `[BASE_PATH]/user-kanrensha/search-seijidantai`
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
- **データ型**: `SearchKanrenshaSeijidantaiCapsuleDtoInterface`

#### プロパティ仕様

|  プロパティ名   |     型     | 必須  |                      説明                      |
| :-------------- | :--------- | :---: | :--------------------------------------------- |
| `poliOrgNo`     | `string`   |  No   | 政治団体番号（前方一致）                       |
| `name`          | `string`   |  No   | 政治団体名（前方一致）                         |
| `address`       | `string`   |  No   | 全住所（前方一致）                             |
| `delegate`      | `string`   |  No   | 代表者名（前方一致）                           |
| `listDantaiKbn` | `string[]` |  Yes  | 対象とする政治団体区分のリスト（空は制限なし） |
| `allCount`      | `number`   |  Yes  | 総件数（クライアント側状態引き継ぎ用）         |
| `limit`         | `number`   |  Yes  | 1ページあたりの件数（上限値）                  |
| `pageNumber`    | `number`   |  Yes  | 取得対象ページ番号（0から開始）                |

#### リクエストボディ（JSON）の例

```json
{
  "poliOrgNo": "00000001",
  "name": "未来創生会",
  "address": "東京都千代田区",
  "delegate": "創生 三郎",
  "listDantaiKbn": ["1", "2", "3"],
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
- **データ型**: `SearchKanrenshaSeijidantaiResultDtoInterface`

#### オブジェクトのプロパティ仕様

|      プロパティ名       |                      型                       |                説明                |
| :---------------------- | :-------------------------------------------- | :--------------------------------- |
| `listMasterSeijidantai` | `KanrenshaSeijidantaiMasterEntityInterface[]` | 検索条件にマッチした政治団体リスト |
| `allCount`              | `number`                                      | 検索条件に該当する全体の総件数     |
| `limit`                 | `number`                                      | 1ページあたりの取得件数リミット    |
| `pageNumber`            | `number`                                      | 取得されたページ番号               |

#### 政治団体オブジェクト仕様 (`KanrenshaSeijidantaiMasterEntityInterface`)

|          プロパティ名          |    型    |             説明              |
| :----------------------------- | :------- | :---------------------------- |
| `kanrenshaSeijidantaiMasterId` | `number` | 政治団体マスタテーブルのID    |
| `seijidantaiKanrenshaCode`     | `string` | 政治団体関連者固有コード      |
| `poliOrgNo`                    | `string` | 政治団体番号                  |
| `kanrenshaName`                | `string` | 政治団体名                    |
| `allAddress`                   | `string` | 全住所                        |
| `seijidantaiDelegate`          | `string` | 代表者名                      |
| `dantaiKbn`                    | `string` | 政治団体区分（"1"、"2" など） |
| `compareNameText`              | `string` | 名称比較用正規化テキスト      |

#### レスポンスデータ（JSON）の例

```json
{
  "listMasterSeijidantai": [
    {
      "kanrenshaSeijidantaiMasterId": 5,
      "seijidantaiKanrenshaCode": "S00005",
      "poliOrgNo": "00000001",
      "kanrenshaName": "未来創生政治研究会",
      "allAddress": "東京都千代田区永田町1-1-1",
      "seijidantaiDelegate": "創生 三郎",
      "dantaiKbn": "5",
      "compareNameText": "みらいそうせいせいじけんきゅうかい"
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
- **実処理側エラー**: ネットワーク問題やDBアクセス不具合などによりAPIアクセスが失敗した場合は、エラー（catch）として呼び出し元コンポーネント（`SearchKanrenshaSeijidantai.vue`）側に伝播し、コンポーネントにて適切なシステムエラーポップアップが表示されます。
