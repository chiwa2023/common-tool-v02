# 親コンポーネント設計書: ViewInputShokugyou.vue

> [!WARNING]
> このコンポーネントでは国税庁法人番号システム Web-APIで使用するAPIキーが必須となります。コンポーネント利用をする場合は各自取得をお願いいたします。

## 1. 概要

- ユーザーの職業情報（自動生成・組み立てされた「職業(全表記)」など）を読み取り専用フィールドで画面表示します。
- 「編集」ボタンを押下することで、職業情報の詳細構成および入力を行うための `InputShokugyou.vue` をモーダルダイアログとしてオーバーレイ表示します。
- 子コンポーネントからの編集決定・キャンセル通知を受け取り、Propsを直接破壊しないよう個別にプロパティコピーすることで安全なデータ同期およびダイアログの表示制御を行います。

## 2. 依存子コンポーネント

本機能は、呼び出し元画面に配置される「表示用親コンポーネント」と、モーダルダイアログとして動作する「編集用子コンポーネント」の親子構造で構成されています。

| コンポーネントファイル名 |                                                 役割                                                 |        備考        |
| :----------------------- | :--------------------------------------------------------------------------------------------------- | :----------------- |
| `InputShokugyou.vue`     | 子コンポーネント。業種、役職、自由入力、法人情報を組み合わせて職業全表記を組み立てるためのフォーム。 | モーダル形式で表示 |

## 3. 画面レイアウトイメージ

![画面イメージ](./ViewInputShokugyou.png "職業入力画面イメージ")

※ [編集] ボタン押下時、背面を半透明ブラックアウトさせ（`overBackground`）、前面に子コンポーネントをモーダル表示（`overComponent`）します。

## 4. インターフェース仕様

### Props

|  プロパティ名  |              型              | 必須  |                            説明                             |
| :------------- | :--------------------------- | :---: | :---------------------------------------------------------- |
| `editDto`      | `InputShokugyouDtoInterface` |  Yes  | 編集対象となる職業情報データ。                              |
| `houjinApiKey` | `string`                     |  Yes  | 子コンポーネントの法人番号検索で使用する外部APIキー文字列。 |

### Emits

なし

## 5. 算出プロパティ (Computed)

### 5.1 `inputShokugyouDto`

- **処理内容**：Props の `editDto` を読み取り専用の `ComputedRef` でそのまま返却します。

## 6. 処理ロジック (イベントハンドラ)

### 6.1 `onInputOrgnName()`

- **契機**：「編集」ボタン押下時
- **処理内容**：
  1. `isInput.value` を `true` に設定し、詳細編集用のモーダルを表示します。

### 6.2 `recieveCancelInputShokugyou()`

- **契機**：子コンポーネント（`InputShokugyou.vue`）からのキャンセルイベント `sendCancelInputShokugyou` 検知時
- **処理内容**：
  1. `isInput.value` を `false` に設定し、編集モーダルを非表示にします（変更内容は破棄されます）。

### 6.3 `recieveInputShokugyouInterface(sendDto)`

- **契機**：子コンポーネントからのデータ決定・決定イベント `sendInputShokugyouInterface` 検知時
- **引数**：`sendDto: InputShokugyouDtoInterface` (子コンポーネントで編集されたデータ)
- **処理内容**：
  1. Vue の Props 直接変更の不具合を回避するため、引数 `sendDto` の各プロパティを、Props経由の `inputShokugyouDto.value` の各プロパティへ個別に代入（コピー）して同期します。
     - `allShokugyou` ← `sendDto.allShokugyou`
     - `gyoushu` ← `sendDto.gyoushu`
     - `yakushoku` ← `sendDto.yakushoku`
     - `shokugyouUserWrite` ← `sendDto.shokugyouUserWrite`
     - `houjinNo` ← `sendDto.houjinNo`
     - `houjinName` ← `sendDto.houjinName`
     - `houjinAddress` ← `sendDto.houjinAddress`
  2. 同期完了後、`isInput.value` を `false` に設定し、編集モーダルを非表示にします。
