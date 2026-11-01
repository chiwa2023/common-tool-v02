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
import { getErrorMessage, getErrorUniqueIdMessage } from './main/dto/errorFunction';
export { MessageConstants, getErrorMessage, getErrorUniqueIdMessage }

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
export { InputAddress, ViewInputAddress }
import InputAddressShort from './main/common/input_address_short/InputAddressShort.vue';
import ViewInputAddressShort from './main/common/input_address_short/ViewInputAddressShort.vue';
export { InputAddressShort, ViewInputAddressShort }
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

/** 職業入力 */
import { InputShokugyouDto, type InputShokugyouDtoInterface } from './main/dto/input_shokugyou/inputShokugyouDto';
export { InputShokugyouDto, type InputShokugyouDtoInterface }
import ViewInputShokugyou from './main/common/input_shokugyou/ViewInputShokugyou.vue';
import InputShokugyou from './main/common/input_shokugyou/InputShokugyou.vue';
import InputCompareShokugyou from './main/common/input_shokugyou/InputCompareShokugyou.vue';
export { ViewInputShokugyou, InputShokugyou, InputCompareShokugyou }

/** 法人番号検索 */
import SearchHoujinNo from './main/common/search_houjin_no/SearchHoujinNo.vue';
import HoujinShoriKbnConstants from './main/dto/houjin_no/houjinShoriKbnConstants';
import HoujinSbtsConstants from './main/dto/houjin_no/houjinSbtsConstants';
import { HoujinNoDto, type HoujinNoDtoInterface } from './main/dto/houjin_no/houjinNoDto';
import { SearchHoujinNoCapsuleDto, type SearchHoujinNoCapsuleDtoInterface } from './main/dto/houjin_no/searchHoujinNoCapsuleDto.ts';
import { SearchHoujinNoResultDto, type SearchHoujinNoResultDtoInterface } from './main/dto/houjin_no/searchHoujinNoResultDto.ts';
export { SearchHoujinNo, HoujinNoDto, type HoujinNoDtoInterface, HoujinShoriKbnConstants, HoujinSbtsConstants }
export { SearchHoujinNoCapsuleDto, type SearchHoujinNoCapsuleDtoInterface,SearchHoujinNoResultDto, type SearchHoujinNoResultDtoInterface,  }

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
export * from './main/util/getLoginUser';
export * from './main/util/logout';
import { type GetUserDtoResultDtoInterface, GetUserDtoResultDto } from './main/dto/user/getUserDtoResultDto';
export { type GetUserDtoResultDtoInterface, GetUserDtoResultDto }
import  UserRoleConstants  from './main/dto/user/userRoleConstants';
export { UserRoleConstants }

/** 関連者最小限 */
import ViewInputKanrenshaLeast from './main/common/input_person_name/ViewInputKanrenshaLeast.vue';
import SearchKanrenshaPerson from './main/common/search_kanrensha/SearchKanrenshaPerson.vue';
export { ViewInputKanrenshaLeast, SearchKanrenshaPerson }
import { type InputKanrenshaPersonLeastDtoInterface, InputKanrenshaPersonLeastDto } from './main/dto/input_person_name/inputKanrenshaPersonLeastDto';
export { type InputKanrenshaPersonLeastDtoInterface, InputKanrenshaPersonLeastDto }
import { type KanrenshaPersonMasterEntityInterface, KanrenshaPersonMasterEntity } from './main/entity/kanrenshaPersonMasterEntity';
export { type KanrenshaPersonMasterEntityInterface, KanrenshaPersonMasterEntity }

/** 個人登録 */
import KanrenshaPersonEdit from './main/common/regist_kanrensha/KanrenshaPersonEdit.vue';
export { KanrenshaPersonEdit }
import { type KanrenshaPersonDtoInterface, KanrenshaPersonDto } from './main/dto/kanrensha/kanrenshaPersonDto';
export { type KanrenshaPersonDtoInterface, KanrenshaPersonDto }
import { type GetKanrenshaPersonCapsuleDtoInterface, GetKanrenshaPersonCapsuleDto } from './main/dto/kanrensha/getKanrenshaPersonCapsuleDto';
import { type GetKanrenshaPersonResultDtoInterface, GetKanrenshaPersonResultDto } from './main/dto/kanrensha/getKanrenshaPersonResultDto';
export { type GetKanrenshaPersonCapsuleDtoInterface, GetKanrenshaPersonCapsuleDto, type GetKanrenshaPersonResultDtoInterface, GetKanrenshaPersonResultDto }
import { type SaveKanrenshaPersonCapsuleDtoInterface, SaveKanrenshaPersonCapsuleDto } from './main/dto/kanrensha/saveKanrenshaPersonCapsuleDto';
export { type SaveKanrenshaPersonCapsuleDtoInterface, SaveKanrenshaPersonCapsuleDto}

/** 企業団体検索 */
import SearchKanrenshaKigyouDt from './main/common/search_kanrensha/SearchKanrenshaKigyouDt.vue';
export { SearchKanrenshaKigyouDt }
import { type KanrenshaKigyouDtMasterEntityInterface, KanrenshaKigyouDtMasterEntity } from './main/entity/kanrenshaKigyouDtMasterEntity';
export { type KanrenshaKigyouDtMasterEntityInterface, KanrenshaKigyouDtMasterEntity }

/** 企業団体登録 */
import KanrenshaKigyouDtEdit from './main/common/regist_kanrensha/KanrenshaKigyouDtEdit.vue';
export { KanrenshaKigyouDtEdit }
import { type KanrenshaKigyouDtDtoInterface, KanrenshaKigyouDtDto } from './main/dto/kanrensha/kanrenshaKigyouDtDto';
export { type KanrenshaKigyouDtDtoInterface, KanrenshaKigyouDtDto }
import { type GetKanrenshaKigyouDtCapsuleDtoInterface, GetKanrenshaKigyouDtCapsuleDto } from './main/dto/kanrensha/getKanrenshaKigyouDtCapsuleDto';
import { type GetKanrenshaKigyouDtResultDtoInterface, GetKanrenshaKigyouDtResultDto } from './main/dto/kanrensha/getKanrenshaKigyouDtResultDto';
export { type GetKanrenshaKigyouDtCapsuleDtoInterface, GetKanrenshaKigyouDtCapsuleDto, type GetKanrenshaKigyouDtResultDtoInterface, GetKanrenshaKigyouDtResultDto }
import { type SaveKanrenshaKigyouDtCapsuleDtoInterface, SaveKanrenshaKigyouDtCapsuleDto } from './main/dto/kanrensha/saveKanrenshaKigyouDtCapsuleDto';
export { type SaveKanrenshaKigyouDtCapsuleDtoInterface, SaveKanrenshaKigyouDtCapsuleDto}

/** 政治団体検索 */
import SearchKanrenshaSeijidantai from './main/common/search_kanrensha/SearchKanrenshaSeijidantai.vue';
export { SearchKanrenshaSeijidantai }
import { type KanrenshaSeijidantaiMasterEntityInterface, KanrenshaSeijidantaiMasterEntity } from './main/entity/kanrenshaSeijidantaiMasterEntity';
export { type KanrenshaSeijidantaiMasterEntityInterface, KanrenshaSeijidantaiMasterEntity }
import SeijidantaiDantaiKbnConstants from './main/dto/kanrensha/seijidantaiDantaiKbnConstants';
export { SeijidantaiDantaiKbnConstants }

/** 政治団体登録 */
import KanrenshaSeijidanatiEdit from './main/common/regist_kanrensha/KanrenshaSeijidanatiEdit.vue';
export { KanrenshaSeijidanatiEdit }
import { type KanrenshaSeijidantaiDtoInterface, KanrenshaSeijidantaiDto } from './main/dto/kanrensha/kanrenshaSeijidantaiDto';
export { type KanrenshaSeijidantaiDtoInterface, KanrenshaSeijidantaiDto }
import { type GetKanrenshaSeijidantaiCapsuleDtoInterface, GetKanrenshaSeijidantaiCapsuleDto } from './main/dto/kanrensha/getKanrenshaSeijidantaiCapsuleDto';
import { type GetKanrenshaSeijidantaiResultDtoInterface, GetKanrenshaSeijidantaiResultDto } from './main/dto/kanrensha/getKanrenshaSeijidantaiResultDto';
export { type GetKanrenshaSeijidantaiCapsuleDtoInterface, GetKanrenshaSeijidantaiCapsuleDto, type GetKanrenshaSeijidantaiResultDtoInterface, GetKanrenshaSeijidantaiResultDto }
import { type SaveKanrenshaSeijidantaiCapsuleDtoInterface, SaveKanrenshaSeijidantaiCapsuleDto } from './main/dto/kanrensha/saveKanrenshaSeijidantaiCapsuleDto';
export { type SaveKanrenshaSeijidantaiCapsuleDtoInterface, SaveKanrenshaSeijidantaiCapsuleDto}

/** 関連者編集 */
import KanrenshaManage from './main/common/regist_kanrensha/KanrenshaManage.vue';
export { KanrenshaManage }

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

/** 認証・トークン管理 */
import getAuthorizedPromiseArea, { createAuthorizedHeaders, fetchWithAuth } from './main/dto/login/getAuthorizedPromiseArea';
import { JwtTokenDto, type JwtTokenDtoInterface } from './main/dto/login/jwtTokenDto';
import { LoginUserResultDto, type LoginUserResultDtoInterface } from './main/dto/login/loginUserResultDto';
import {
    AccessTokenNotFoundError,
    TokenRefreshError,
    PasskeyAuthenticationError,
    PasskeyNotSupportedError,
    PasskeyCancellationError,
    PreAuthTokenExpiredError
} from './main/dto/login/errors';
export {
    getAuthorizedPromiseArea,
    createAuthorizedHeaders,
    fetchWithAuth,
    JwtTokenDto,
    type JwtTokenDtoInterface,
    LoginUserResultDto,
    type LoginUserResultDtoInterface,
    AccessTokenNotFoundError,
    TokenRefreshError,
    PasskeyAuthenticationError,
    PasskeyNotSupportedError,
    PasskeyCancellationError,
    PreAuthTokenExpiredError
}

/** パスキー/WebAuthn DTO */
export * from './main/dto/passkey';
export * from './main/util/passkeyService';
export * from './main/util/useApi';

