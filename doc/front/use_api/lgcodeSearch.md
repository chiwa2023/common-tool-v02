# 使用API設計書: lgcode-search 地方公共団体コード検索API

## 1. 概要

- 全国地方公共団体（JIS/LGコード。都道府県、市区町村）のコードおよび自治体名称を検索・取得します。
- このAPIは都道府県および市区町村の連動選択セレクトボックスのオプション項目として利用されます。

## 2. API仕様

- **HTTPメソッド**: `POST`
- **認証有無**: 要（X-AUTH-TOKENヘッダーによるJWTトークン認証）
- **共通ヘッダー**:
  - `Accept`: `application/json`
  - `Content-Type`: `application/json`
  - `X-AUTH-TOKEN`: `Bearer {jwt_token}`

---

## 3. 個別API仕様

### 3.1 都道府県一覧取得: `/lgcode-pref/search`

全国47都道府県のコード（上位2桁）と名称のリストを一括取得します。

- **URL**: `https://kanrensha.normalize-jp-seijishikin.net/api/lgcode-pref/search`
- **リクエストボディ**: `FrameworkCapsuleDtoInterface` (パラメータなしの空 of オブジェクト)

```json
{}
```

- **レスポンスボディ**: `SelectOptionStringDtoInterface[]` (都道府県オプションリスト)

#### レスポンスデータ（JSON）の例3.1

```json
[
  {
    "value": "13",
    "text": "東京都"
  },
  {
    "value": "14",
    "text": "神奈川県"
  }
]
```

---

### 3.2 都道府県配下 市区町村検索: `/lgcode-city/search`

指定された都道府県コードに属する市区町村のリストを取得します。

- **URL**: `https://kanrensha.normalize-jp-seijishikin.net/api/lgcode-city/search`
- **リクエストボディ**: `SearchAllCityLgcodeCapsuleDtoInterface`

#### プロパティ仕様

|   プロパティ名   |    型     | 必須  |                              説明                              |
| :--------------- | :-------- | :---: | :------------------------------------------------------------- |
| `lgCode`         | `string`  |  Yes  | 都道府県コード（2桁）                                          |
| `isSearch5Digit` | `boolean` |  Yes  | 5桁(チェックデジットなし)で取得するか、6桁(あり)で取得するか。 |

```json
{
  "lgCode": "13",
  "isSearch5Digit": false
}
```

- **レスポンスボディ**: `SelectOptionStringDtoInterface[]` (市区町村オプションリスト)

#### レスポンスデータ（JSON）の例3.2

```json
[
  {
    "value": "13101",
    "text": "千代田区"
  },
  {
    "value": "13102",
    "text": "中央区"
  }
]
```

---

## 4. 認証・トークンの取り扱い

- 本API群を呼び出す前に、共通のトークン取得処理を行う必要があります。
- 詳細は [トークン取得共通関数: getAuthorizedPromiseArea()](./getAuthorizedPromiseArea.md) を参照してください。

## 5. エラーハンドリング・例外処理

- **認証エラー**: トークンが無効な場合や有効期限が切れている場合は、401エラー（または `getAuthorizedPromiseArea` による例外）で処理されます。
- **実処理エラー**: DB接続エラーや通信障害発生時は、呼び出し元コンポーネント（`InputLgcode.vue`）側で例外がキャッチされ、システムエラーメッセージ（「システム管理者にお問い合わせください」）が画面上に表示されます。
