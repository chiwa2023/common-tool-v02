# コンポーネント設計書: ViewInputOrgName.vue

## 1. 概要

- 組織名称（団体名、団体名かな）を表示・管理し、編集を呼び出すための親画面表示用コンポーネントです。
- 画面上には「団体名かな」「団体名」がテキスト入力枠（disabled状態）として表示されます。
- 「編集」ボタンを押下すると、子コンポーネント `InputOrgName.vue` がモーダル表示されます。
- 子コンポーネント側で編集結果が確定された際は、通知された変更内容（`InputOrgNameDtoInterface`）を検知して、保持する DTO の値を安全に更新します。

## 2. 依存子コンポーネント

- `InputOrgName.vue`

## 3. 画面レイアウトイメージ

![画面イメージ](./ViewInputOrgName.png "団体名称表示親画面画面イメージ")

## 4. インターフェース仕様

### Props

| プロパティ名 |            型             | 必須  |                       説明                       |
| :----------- | :------------------------ | :---: | :----------------------------------------------- |
| `editDto`    | `InputOrgNameDtoInterface` |  Yes  | 親コンポーネントから渡される初期値オブジェクト。 |

### Emits

- なし（Props として渡された reactive な DTO オブジェクト `editDto` の参照を介して状態の更新を共有します）

## 5. データ構造 (DTO)

コンポーネント間のデータ受け渡しには `InputOrgNameDtoInterface` を使用します。

### `InputOrgNameDtoInterface` 仕様

| プロパティ名  |    型    | 桁数 |       説明       |
| :------------ | :------- | :--: | :--------------- |
| `orgNameKana` | `string` | 100  | 団体名かな       |
| `orgName`     | `string` | 100  | 団体名           |

## 6. 処理ロジック (ライフサイクル & イベントハンドラ)

### 6.1 `onInputOrgnName()`

- **契機**：団体名かな入力枠横の「編集」ボタンクリック時
- **処理内容**：
  1. 組織名称入力用モーダル（子コンポーネント `InputOrgName`）の表示制御フラグ `isInput.value` を `true` に設定します。

### 6.2 `recieveCancelInputOrgName()`

- **契機**：組織名称入力（子コンポーネント `InputOrgName`）から `sendCancelInputOrgName` イベント受信時
- **処理内容**：
  1. 組織名称入力用モーダルの表示制御フラグ `isInput.value` を `false`（非表示）に設定します。

### 6.3 `recieveInputOrgNameInterface(sendDto)`

- **契機**：組織名称入力（子コンポーネント `InputOrgName`）から `sendInputOrgNameInterface` イベント受信時
- **引数**：`sendDto: InputOrgNameDtoInterface`
- **処理内容**：
  1. 子コンポーネントから受信した `sendDto` の `orgNameKana`, `orgName` を、親側の `inputOrgNameDto.value` にコピーして更新を適用します（Props であるため DTO 自体の再代入を避け、個別のプロパティ単位で書き換えを行います）。
  2. 組織名称入力用モーダルの表示制御フラグ `isInput.value` を `false`（非表示）に設定します。

### 6.4 計算プロパティ (Computed)

- **`inputOrgNameDto`**：
  - `props.editDto` へのリアクティブなバインディング定義。
