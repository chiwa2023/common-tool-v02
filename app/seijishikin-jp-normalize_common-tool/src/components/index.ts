// コンポーネントカタログに入っているimportを素通しでexport
import { MessageConstants } from './main/dto/message/messageConstants';
export { MessageConstants }

import MessageView from './main/common/message/MessageView.vue';
import ToastMessage from './main/common/message/ToastMessage.vue';
export { MessageView, ToastMessage }

import PagingControl from './main/common/paging/PagingControl.vue';
export { PagingControl }

import { InputOrgNameDto, type InputOrgNameDtoInterface } from './main/dto/input_org_name/inputOrgNameDto';
export { InputOrgNameDto, type InputOrgNameDtoInterface }

import { InputPersonNameDto, type InputPersonNameDtoInterface } from './main/dto/input_person_name/inputPersonNameDto';
export { InputPersonNameDto, type InputPersonNameDtoInterface }

import { InputAccessDto, type InputAccessDtoInterface } from './main/dto/input_access/inputAccessDto';
export { InputAccessDto, type InputAccessDtoInterface }

import { InputAddressDto, type InputAddressDtoInterface } from './main/dto/Input_address/inputAddressDto';
export { InputAddressDto, type InputAddressDtoInterface }

import { InputShokugyouDto, type InputShokugyouDtoInterface } from './main/dto/input_shokugyou/inputShokugyouDto';
export { InputShokugyouDto, type InputShokugyouDtoInterface }

import MockViewInputAddress from './test/common/input_address/MockViewInputAddress.vue';
export { MockViewInputAddress }

import MockViewInputAddressShort from './test/common/input_address_short/MockViewInputAddressShort.vue';
export { MockViewInputAddressShort }

import ViewInputAccess from './main/common/input_access/ViewInputAccess.vue';
import InputAccess from './main/common/input_access/InputAccess.vue';
export { ViewInputAccess, InputAccess }

import ViewInputShokugyou from './main/common/input_shokugyou/ViewInputShokugyou.vue';
import InputShokugyou from './main/common/input_shokugyou/InputShokugyou.vue';
export { ViewInputShokugyou, InputShokugyou }

import ViewInputOrgName from './main/common/input_org_name/ViewInputOrgName.vue';
import InputOrgName from './main/common/input_org_name/InputOrgName.vue';
export { ViewInputOrgName, InputOrgName }

import ViewInputPersonName from './main/common/input_person_name/ViewInputPersonName.vue';
import InputPersonName from './main/common/input_person_name/InputPersonName.vue';
export { ViewInputPersonName, InputPersonName }




