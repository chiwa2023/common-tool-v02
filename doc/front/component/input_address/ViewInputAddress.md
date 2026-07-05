# コンポーネント設計書: ViewInputAddress.vue

## 1. 概要

- 住所情報を閲覧および編集呼び出しするための親画面表示用コンポーネントです。
- 画面上には「郵便番号（全郵便番号）」「住所（住所全体）」「住所コード」が表示されます。
- 「編集」ボタンを押下すると、子コンポーネント `InputAddress.vue` がモーダル（ダイアログ）として立ち上がり、詳細な住所入力・編集を行うことができます。
- 子コンポーネント内部で行われる住所情報の非同期ドリルダウン取得処理や詳細取得については、[使用API設計書: postal-search 住所検索API群](../../use_api/postalSearch.md) を参照してください。
- 子コンポーネント側での「編集」が確定、またはキャンセルされた場合は、それぞれイベントを検知して親コンポーネントの状態（`InputAddressDtoInterface`）を適切に更新、あるいは元の状態へ復元します。

## 2. 依存子コンポーネント

- `InputAddress.vue`

## 3. 画面レイアウトイメージ

![画面イメージ](./ViewInputAddress.png "住所親画面表示画面イメージ")

## 4. インターフェース仕様

### Props

| プロパティ名 |             型             | 必須  |                       説明                       |
| :----------- | :------------------------- | :---: | :----------------------------------------------- |
| `editDto`    | `InputAddressDtoInterface` |  Yes  | 親コンポーネントから渡される初期値オブジェクト。 |

### Emits

- なし（親から Props として渡された reactive な DTO オブジェクト `editDto` の参照を介して状態の更新を共有します）

## 5. データ構造 (DTO)

コンポーネント間のデータ受け渡しには `InputAddressDtoInterface` を使用します。

### `InputAddressDtoInterface` 仕様

|     プロパティ名      |    型     |  桁数  |                     説明                     |
| :-------------------- | :-------- | :----: | :------------------------------------------- |
| `addressAll`          | `string`  | 制限無 | 住所全体                                     |
| `orginAddressAll`     | `string`  | 制限無 | 元住所全体                                   |
| `postalcode1`         | `string`  |   3    | 郵便番号1                                    |
| `postalcode2`         | `string`  |   4    | 郵便番号2                                    |
| `addressPostal`       | `string`  | 制限無 | 住所郵便番号まで1                            |
| `addressBlock`        | `string`  | 制限無 | 住所番地                                     |
| `addressBuilding`     | `string`  | 制限無 | 住所建物                                     |
| `lgCode`              | `string`  |   6    | 地方公共団体コード                           |
| `machiazaId`          | `string`  |   -    | 町字Id                                       |
| `blkId`               | `string`  |   -    | 街区Id                                       |
| `prcId`               | `string`  |   -    | 地番Id                                       |
| `rsdtId`              | `string`  |   -    | 住居Id                                       |
| `rsdt2Id`             | `string`  |   -    | 住居2Id                                      |
| `isPostalEdit`        | `boolean` |   -    | 住所郵便番号まで編集有無1                    |
| `isBlockEdit`         | `boolean` |   -    | 住所番地編集有無                             |
| `isBuildingEdit`      | `boolean` |   -    | 住所建物編集有無                             |
| `rsdtAddressPostl`    | `string`  | 制限無 | アドレス・ベース・レジストリ住所郵便番号まで |
| `rsdtAddressBlock`    | `string`  | 制限無 | アドレス・ベース・レジストリ住所番地まで     |
| `rsdtAddressBuilding` | `string`  | 制限無 | アドレス・ベース・レジストリ住所建物         |

## 6. 処理ロジック (ライフサイクル & イベントハンドラ)

### 6.1 `onMounted()`

- **契機**：コンポーネントマウント時
- **処理内容**：
  1. `props.editDto` を `toRaw` および `structuredClone` を用いてディープコピーし、バックアップ用状態変数 `inputAddressDtoBack.value` に退避（保持）します。

### 6.2 `onInputAddress()`

- **契機**：郵便番号入力横の「編集」ボタンクリック時
- **処理内容**：
  1. キャンセル時に元の状態を復元できるよう、現在の `inputAddressDto.value` を `structuredClone` を用いてディープコピーし、`inputAddressDtoBack.value` に保存します。
  2. 住所入力用モーダル（子コンポーネント `InputAddress`）の表示制御フラグ `isInput.value` を `true` に設定します。

### 6.3 `recieveCancelInputAddress()`

- **契機**：住所入力（子コンポーネント `InputAddress`）から `send-cancel-input-address` イベント受信時
- **処理内容**：
  1. 編集前のバックアップ `inputAddressDtoBack.value` の内容を、現在の `inputAddressDto.value` の各プロパティに書き戻し、値を復元します。
  2. 住所入力用モーダルの表示制御フラグ `isInput.value` を `false`（非表示）に設定します。

### 6.4 `recieveInputAddressInterface(sendDto)`

- **契機**：住所入力（子コンポーネント `InputAddress`）から `send-input-address-interface` イベント受信時
- **引数**：`sendDto: InputAddressDtoInterface`
- **処理内容**：
  1. 子コンポーネントから受信した `sendDto` の各プロパティ値を、親コンポーネント側で管理する `inputAddressDto.value` にコピーします。
  2. 住所入力用モーダルの表示制御フラグ `isInput.value` を `false`（非表示）に設定します。

### 6.5 計算プロパティ (Computed)

- **`inputAddressDto`**：
  - `props.editDto` へのリアクティブなバインディング定義。
- **`allPostalCode`**：
  - `inputAddressDto.value.postalcode1` と `inputAddressDto.value.postalcode2` を結合した文字列（画面表示用郵便番号）を返します。
- **`addressCodeText`**：
  - アドレス・ベース・レジストリに準じた住所コード（`lgCode`, `machiazaId`, `blkId`, `prcId`, `rsdtId`, `rsdt2Id`）をハイフンとスペースで連結した視覚的なコード文字列を作成します。
  - `inputAddressDto.value.lgCode` が空（`BLANK`）の場合は、空文字（`BLANK`）を返します。
