export * from './components'

/** framework */
import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from './components/main/dto/frameworkCapsuleDto';
export { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface }
import { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface } from './components/main/dto/frameworkMessageAndResultDto';
export { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface }

/** メッセージ表示 */
import { MessageConstants } from './components/main/dto/message/messageConstants';
export { MessageConstants }
import MessageView from './components/main/common/message/MessageView.vue';
import ToastMessage from './components/main/common/message/ToastMessage.vue';
export { MessageView, ToastMessage }

/** ページング */
import PagingControl from './components/main/common/paging/PagingControl.vue';
export { PagingControl }
import { type FrameworkPagingDtoInterface, FrameworkPagingDto } from './components/main/dto/paging/frameworkPagingDto';
export { type FrameworkPagingDtoInterface, FrameworkPagingDto }


/** 団体名称入力 */
import { InputOrgNameDto, type InputOrgNameDtoInterface } from './components/main/dto/input_org_name/inputOrgNameDto';
export { InputOrgNameDto, type InputOrgNameDtoInterface }
import ViewInputOrgName from './components/main/common/input_org_name/ViewInputOrgName.vue';
import InputOrgName from './components/main/common/input_org_name/InputOrgName.vue';
export { ViewInputOrgName, InputOrgName }

/** 個人姓名入力 */
import ViewInputPersonName from './components/main/common/input_person_name/ViewInputPersonName.vue';
import InputPersonName from './components/main/common/input_person_name/InputPersonName.vue';
export { ViewInputPersonName, InputPersonName }
import { InputPersonNameDto, type InputPersonNameDtoInterface } from './components/main/dto/input_person_name/inputPersonNameDto';
export { InputPersonNameDto, type InputPersonNameDtoInterface }

/** 連絡先入力 */
import { InputAccessDto, type InputAccessDtoInterface } from './components/main/dto/input_access/inputAccessDto';
export { InputAccessDto, type InputAccessDtoInterface }
import ViewInputAccess from './components/main/common/input_access/ViewInputAccess.vue';
import InputAccess from './components/main/common/input_access/InputAccess.vue';
export { ViewInputAccess, InputAccess }

/** 住所入力 */
import { InputAddressDto, type InputAddressDtoInterface } from './components/main/dto/Input_address/inputAddressDto';
export { InputAddressDto, type InputAddressDtoInterface }
import MockViewInputAddress from './components/test/common/input_address/MockViewInputAddress.vue';
export { MockViewInputAddress }
import MockViewInputAddressShort from './components/test/common/input_address_short/MockViewInputAddressShort.vue';
export { MockViewInputAddressShort }

/** 職業入力 */
import { InputShokugyouDto, type InputShokugyouDtoInterface } from './components/main/dto/input_shokugyou/inputShokugyouDto';
export { InputShokugyouDto, type InputShokugyouDtoInterface }
import ViewInputShokugyou from './components/main/common/input_shokugyou/ViewInputShokugyou.vue';
import InputShokugyou from './components/main/common/input_shokugyou/InputShokugyou.vue';
export { ViewInputShokugyou, InputShokugyou }

/** 法人番号検索 */
import SearchHoujinNo from './components/main/common/search_houjin_no/SearchHoujinNo.vue';
import HoujinShoriKbnConstants from './components/main/dto/houjin_no/houjinShoriKbnConstants';
import HoujinSbtsConstants from './components/main/dto/houjin_no/houjinSbtsConstants';
import { HoujinNoDto, type HoujinNoDtoInterface } from './components/main/dto/houjin_no/houjinNoDto';
export { SearchHoujinNo, HoujinNoDto, type HoujinNoDtoInterface, HoujinShoriKbnConstants, HoujinSbtsConstants }
