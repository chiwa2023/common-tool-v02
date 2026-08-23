# 設計書目次

## 1.fromt

### 1.1 コンポーネント設計書

#### 1.1.1 個人姓名入力機能

- [個人姓名親画面表示(ViewInputPersonName)](./component/input_person_name/ViewInputPersonName.md)

- [個人姓名編集モーダル(ViewInputPersonName)](./component/input_person_name/InputPersonName.md)

#### 1.1.2 組織名称入力機能

- [組織名称親画面表示(ViewInputOrgName)](./component/input_org_name/ViewInputOrgName.md)

- [組織名称編集モーダル(InputOrgName)](./component/input_org_name/InputOrgName.md)

#### 1.1.3 連絡先入力機能

- [連絡先親画面表示(ViewInputAccess)](./component/input_access/ViewInputAccess.md)

- [連絡先編集モーダル(InputAccess)](./component/input_access/InputAccess.md)

#### 1.1.4 住所入力機能

- [住所親画面表示(ViewInputAddress)](./component/input_address/ViewInputAddress.md)

- [住所編集モーダル(InputAddress)](./component/input_address/InputAddress.md)

#### 1.1.5 地方自治体コード入力機能

- [地方自治体コード指定モーダル(InputLgcode)](./component/input_lgcode/InputLgcode.md)

- [県コード指定モーダル(InputPref)](./component/input_lgcode/InputPref.md)

#### 1.1.6 職業入力機能

- [職業編集親画面表示(ViewInputShokugyou)](./component/input_shokugyou/ViewInputShokugyou.md)

- [職業編集モーダル(InputShokugyou)](./component/input_shokugyou/InputShokugyou.md)

- [法人番号検索モーダル(SearchHoujinNo)](./component/search_houjin_no/SearchHoujinNo.md)

#### 1.1.7 関連者検索機能

- [関連者企業団体検索モーダル(SearchKanrenshaKigyouDt)](./component/search_kanrensha/SearchKanrenshaKigyouDt.md)

- [関連者個人検索モーダル(SearchKanrenshaKigyouDt)](./component/search_kanrensha/SearchKanrenshaPerson.md)

- [関連者政治団体検索モーダル(SearchKanrenshaKigyouDt)](./component/search_kanrensha/SearchKanrenshaSeijidantai.md)

### 1.2 使用API設計書

- [はじめに：APIアクセストークン管理(getAuthorizedPromiseArea関数)](./use_api/getAuthorizedPromiseArea.md)

- [SNS選択肢取得API(sns-service/get-options)](./use_api/snsServiceGetOptions.md)

- [地方公共団体コード検索API(/lgcode-search)](./use_api/lgcodeSearch.md)
- [郵便番号検索API(/postal-search)](./use_api/postalSearch.md)

- [法人番号検索API(/houjin-no/get-external)](./use_api/houjinNoGetExternal.md)

- [関連者企業団体検索API(/user-kanrensha/search-seijidantai)](./use_api/searchKigyouDt.md)
- [関連者個人検索API(/user-kanrensha/search-seijidantai)](./use_api/searchPerson.md)
- [関連者政治団体検索API(/user-kanrensha/search-seijidantai)](./use_api/searchSeijidantai.md)

## 2.back

- TODO 基本的に共通Dto類が多いので、このまま作成しない可能性が高い。
