// コンポーネントカタログに入っているimportを素通しでexport

/** framework */
import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from './main/dto/frameworkCapsuleDto';
export { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface }
import { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface } from './main/dto/frameworkMessageAndResultDto';
export { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface }
import DtoEntityConstants from './main/dto/dtoEntityConstants.ts';
export { DtoEntityConstants }

/** メッセージ表示 */
import { MessageConstants } from './main/dto/message/messageConstants';
export { MessageConstants }

import MessageView from './main/common/message/MessageView.vue';
import ToastMessage from './main/common/message/ToastMessage.vue';
export { MessageView, ToastMessage }

/** ページング */
import PagingControl from './main/common/paging/PagingControl.vue';
export { PagingControl }
import { type FrameworkPagingDtoInterface, FrameworkPagingDto } from './main/dto/paging/frameworkPagingDto';
export { type FrameworkPagingDtoInterface, FrameworkPagingDto }

/** 団体名称入力 */
import { InputOrgNameDto, type InputOrgNameDtoInterface } from './main/dto/input_org_name/inputOrgNameDto';
export { InputOrgNameDto, type InputOrgNameDtoInterface }

/** 個人姓名入力 */
import { InputPersonNameDto, type InputPersonNameDtoInterface } from './main/dto/input_person_name/inputPersonNameDto';
export { InputPersonNameDto, type InputPersonNameDtoInterface }


/** 住所入力 */
import { InputAddressDto, type InputAddressDtoInterface } from './main/dto/Input_address/inputAddressDto';
export { InputAddressDto, type InputAddressDtoInterface }
import { AddressRsdtTemplateDto, type AddressRsdtTemplateDtoInterface } from './main/dto/Input_address/addressRsdtTemplateDto';
export { AddressRsdtTemplateDto, type AddressRsdtTemplateDtoInterface }
import InputAddress from './main/common/input_address/InputAddress.vue';
import ViewInputAddress from './main/common/input_address/ViewInputAddress.vue';
import MockInputAddress from './test/common/input_address/MockInputAddress.vue';
import MockViewInputAddress from './test/common/input_address/MockViewInputAddress.vue';
export { InputAddress, ViewInputAddress, MockInputAddress, MockViewInputAddress }
import InputAddressShort from './main/common/input_address_short/InputAddressShort.vue';
import ViewInputAddressShort from './main/common/input_address_short/ViewInputAddressShort.vue';
import MockInputAddressShort from './test/common/input_address_short/MockInputAddressShort.vue';
import MockViewInputAddressShort from './test/common/input_address_short/MockViewInputAddressShort.vue';
export { InputAddressShort, ViewInputAddressShort, MockInputAddressShort, MockViewInputAddressShort }
import EditAddress from './main/common/input_address/EditAddress.vue';
import InputBuildingAddress from './main/common/input_address/InputBuildingAddress.vue';
import InputCompareAddress from './main/common/input_address/InputCompareAddress.vue';
export { EditAddress, InputBuildingAddress, InputCompareAddress }

/** 連絡先入力 */
import { InputAccessDto, type InputAccessDtoInterface } from './main/dto/input_access/inputAccessDto';
export { InputAccessDto, type InputAccessDtoInterface }
import ViewInputAccess from './main/common/input_access/ViewInputAccess.vue';
import InputAccess from './main/common/input_access/InputAccess.vue';
export { ViewInputAccess, InputAccess }
import MockViewInputAccess from './test/common/input_access/MockViewInputAccess.vue';
import MockInputAccess from './test/common/input_access/MockInputAccess.vue';
export { MockViewInputAccess, MockInputAccess }

/** 職業入力 */
import { InputShokugyouDto, type InputShokugyouDtoInterface } from './main/dto/input_shokugyou/inputShokugyouDto';
export { InputShokugyouDto, type InputShokugyouDtoInterface }
import ViewInputShokugyou from './main/common/input_shokugyou/ViewInputShokugyou.vue';
import InputShokugyou from './main/common/input_shokugyou/InputShokugyou.vue';
import InputCompareShokugyou from './main/common/input_shokugyou/InputCompareShokugyou.vue';
export { ViewInputShokugyou, InputShokugyou, InputCompareShokugyou }

/** 組織名称入力 */
import ViewInputOrgName from './main/common/input_org_name/ViewInputOrgName.vue';
import InputOrgName from './main/common/input_org_name/InputOrgName.vue';
export { ViewInputOrgName, InputOrgName }

/** 個人氏名入力 */
import ViewInputPersonName from './main/common/input_person_name/ViewInputPersonName.vue';
import InputPersonName from './main/common/input_person_name/InputPersonName.vue';
export { ViewInputPersonName, InputPersonName }

/** ユーザ */
import { type LeastUserDtoInterface, LeastUserDto } from './main/dto/user/leastUserDto';
export { type LeastUserDtoInterface, LeastUserDto }
import useUserInfoStoreCommon from './main/stores/storeUserInfo';
export { useUserInfoStoreCommon }

/** 関連者最小限 */
import ViewInputKanrenshaLeast from './main/common/input_person_name/ViewInputKanrenshaLeast.vue';
import SearchKanrenshaPerson from './main/common/search_kanrensha/SearchKanrenshaPerson.vue';
export { ViewInputKanrenshaLeast, SearchKanrenshaPerson }
import { type InputKanrenshaPersonLeastDtoInterface, InputKanrenshaPersonLeastDto } from './main/dto/input_person_name/inputKanrenshaPersonLeastDto';
export { type InputKanrenshaPersonLeastDtoInterface, InputKanrenshaPersonLeastDto }
import { type KanrenshaPersonMasterEntityInterface, KanrenshaPersonMasterEntity } from './main/entity/kanrenshaPersonMasterEntity';
export { type KanrenshaPersonMasterEntityInterface, KanrenshaPersonMasterEntity }

/** 企業団体検索 */
import SearchKanrenshaKigyouDt from './main/common/search_kanrensha/SearchKanrenshaKigyouDt.vue';
export { SearchKanrenshaKigyouDt }
import { type KanrenshaKigyouDtMasterEntityInterface, KanrenshaKigyouDtMasterEntity } from './main/entity/kanrenshaKigyouDtMasterEntity';
export { type KanrenshaKigyouDtMasterEntityInterface, KanrenshaKigyouDtMasterEntity }

/** 政治団体検索 */
import SearchKanrenshaSeijidantai from './main/common/search_kanrensha/SearchKanrenshaSeijidantai.vue';
export { SearchKanrenshaSeijidantai }
import { type KanrenshaSeijidantaiMasterEntityInterface, KanrenshaSeijidantaiMasterEntity } from './main/entity/kanrenshaSeijidantaiMasterEntity';
export { type KanrenshaSeijidantaiMasterEntityInterface, KanrenshaSeijidantaiMasterEntity }

/** 日付 */
import InputDate from './main/common/date/InputDate.vue';
import InputDateAndNull from './main/common/date/InputDateAndNull.vue';
import InputDatetime from './main/common/date/InputDatetime.vue';
import InputDatetimeAndNull from './main/common/date/InputDatetimeAndNull.vue';
import convertDateText from './main/common/date/convertDateText';
import convertDatetimeText from './main/common/date/convertDatetimeText';
export { InputDate, InputDatetime, InputDateAndNull, InputDatetimeAndNull }
export { convertDateText, convertDatetimeText }

/** 地方自治体コード検索 */
import InputLgcode from './main/common/input_lgcode/InputLgcode.vue';
import InputPref from './main/common/input_lgcode/InputPref.vue';
import { SearchAllCityLgcodeCapsuleDto, type SearchAllCityLgcodeCapsuleDtoInterface } from './main/dto/postal/searchAllCityLgcodeCapsuleDto.ts';
export { InputLgcode, InputPref }
export { SearchAllCityLgcodeCapsuleDto, type SearchAllCityLgcodeCapsuleDtoInterface }
