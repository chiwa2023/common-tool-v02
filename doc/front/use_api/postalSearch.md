# 使用API設計書: postal-search 住所検索API群

## 1. 概要

- 郵便番号、地方自治体コード（LGコード）などをキーとして、正規化された住所情報や番地・建物・住居表示（アドレス・ベース・レジストリ）の構成要素を階層的に検索・取得します。
- 以下の5つのAPIエンドポイントが連携して一連の住所検索機能（ドリルダウン選択）を構築します：
  1. `/postal-search/postal` (郵便番号住所検索)
  2. `/postal-search/block` (番地検索)
  3. `/postal-search/building` (建物検索)
  4. `/postal-search/rsdt-detail-block` (住居表示街区詳細)
  5. `/postal-search/rsdt-detail-id` (住居表示詳細ID検索)

## 2. 共通API仕様

- **HTTPメソッド**: `POST`
- **認証有無**: 要（X-AUTH-TOKENヘッダーによるJWTトークン認証）
- **リクエストヘッダー**:
  - `Accept`: `application/json`
  - `Content-Type`: `application/json`
  - `X-AUTH-TOKEN`: `Bearer {jwt_token}`

---

## 3. 個別API仕様

### 3.1 郵便番号住所検索: `/postal-search/postal`

郵便番号（前3桁・後4桁）から、対応する大字・町字（郵便番号レベルの住所）の選択肢を取得します。

- **URL**: `[BASE_PATH]/postal-search/postal`
- **リクエストボディ**: `PostalCodeCapsuleDtoInterface`

```json
{
  "postal1": "100",
  "postal2": "0001",
  "isGyouseikuData": false
}
```

- **レスポンスボディ**: `PostalCodePostalResultDtoInterface`
  - `isGyouseikuData`: `boolean` (行政区検索フラグ)
  - `listOptions`: `SelectOptionNumberDtoInterface[]` (住所候補リスト)
    - `value`: `number` (郵便番号ID)
    - `text`: `string` (大字・町字までの住所テキスト)

---

### 3.2 番地検索: `/postal-search/block`

選択された郵便番号IDから、該当する番地（街区・地番）の選択肢を取得します。

- **URL**: `[BASE_PATH]/postal-search/block`
- **リクエストボディ**: `PostalCodeCapsuleDtoInterface`
  - `selectedPostal`: `number` (郵便番号住所検索で取得した `value`)

```json
{
  "selectedPostal": 12345,
  "isGyouseikuData": false
}
```

- **レスポンスボディ**: `PostalCodeBlockResultDtoInterface`
  - `isGyouseikuData`: `boolean`
  - `lgCode`: `string` (地方公共団体コード)
  - `listOptions`: `SelectOptionStringDtoInterface[]` (番地候補リスト)
    - `value`: `string` (番地コード)
    - `text`: `string` (番地・街区テキスト)

---

### 3.3 建物検索: `/postal-search/building`

選択された番地コードおよびLGコードから、該当する建物名・テナントの選択肢リストを取得します。

- **URL**: `[BASE_PATH]/postal-search/building`
- **リクエストボディ**: `PostalCodeCapsuleDtoInterface`
  - `lgCode`: `string` (地方公共団体コード)
  - `selectedBlock`: `string` (番地検索で取得した `value`)

```json
{
  "lgCode": "131016",
  "selectedBlock": "1-1",
  "isGyouseikuData": false
}
```

- **レスポンスボディ**: `PostalCodeBuildingResultDtoInterface`
  - `lgCode`: `string`
  - `listOptions`: `SelectOptionNumberDtoInterface[]` (建物候補リスト)
    - `value`: `number` (建物ID)
    - `text`: `string` (建物・部屋名称テキスト)

---

### 3.4 住居表示街区詳細: `/postal-search/rsdt-detail-block`

街区表示（番地）に基づき、住居表示レジストリ（アドレス・ベース・レジストリ）からより詳細な住居表示テキストを取得します。

- **URL**: `[BASE_PATH]/postal-search/rsdt-detail-block`
- **リクエストボディ**: `PostalCodeCapsuleDtoInterface`
  - `lgCode`: `string`
  - `selectedBlock`: `string`

```json
{
  "lgCode": "131016",
  "selectedBlock": "1-1"
}
```

- **レスポンスボディ**: `PostalCodeBlockResultDtoInterface` (街区詳細のリストを格納)

---

### 3.5 住居表示詳細ID検索: `/postal-search/rsdt-detail-id`

指定された住居テーブルIDから、アドレス・ベース・レジストリの完全な構造化住所オブジェクトを取得します。

- **URL**: `[BASE_PATH]/postal-search/rsdt-detail-id`
- **リクエストボディ**: `PostalCodeCapsuleDtoInterface`
  - `selectedRsdtId`: `number` (住居テーブルId)

```json
{
  "selectedRsdtId": 98765
}
```

- **レスポンスボディ**: `AddressRsdtResultDtoInterface`
  - `addressRsdtEntity`: `AddressRsdtTemplateEntityInterface` (住居表示情報)
    - `addressRsdtTemplateId`: `number` (住居表示テンプレートID)
    - `lgCode`: `string`
    - `machiazaId`: `string`
    - `blkId`: `string`
    - `prcId`: `string`
    - `rsdtId`: `string`
    - `rsdt2Id`: `string`
    - `addressAll`: `string` (完全な日本語住所文字列)

---

## 4. 認証・トークンの取り扱い

- 本API群を呼び出す前に、共通のトークン取得処理を行う必要があります。
- 詳細は [トークン取得共通関数: getAuthorizedPromiseArea()](./getAuthorizedPromiseArea.md) を参照してください。

## 5. エラーハンドリング・例外処理

- **認証エラー**: トークンが無効な場合や有効期限が切れている場合は、401エラー（または `getAuthorizedPromiseArea` による例外）で処理されます。
- **検索エラー**: ネットワーク問題やバックエンドでの例外発生時は、呼び出し元コンポーネント（`InputAddress.vue` 等）側でキャッチされ、共通メッセージダイアログを介して「システムエラーが発生しました。システム管理者にお問い合わせください」が表示されます。
