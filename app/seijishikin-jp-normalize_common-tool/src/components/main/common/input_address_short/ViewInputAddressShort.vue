<script setup lang="ts">
import { computed, onMounted, ref, toRaw, type ComputedRef, type Ref } from "vue";
import { InputAddressDto, type InputAddressDtoInterface } from "../../../main/dto/Input_address/inputAddressDto";
import InputAddressShort from "./InputAddressShort.vue";

// props,emit
const props = defineProps<{ editDto: InputAddressDtoInterface }>();

// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ACCEPTED: number = 202;
// const SERVER_STATUS_ERROR: number = 400;

// 入力用Dto
const inputAddressDto: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputAddressDtoBack: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());

const isInput: Ref<boolean> = ref(false);
const allPostalCode: ComputedRef<string> = computed(() => inputAddressDto.value.postalcode1 + inputAddressDto.value.postalcode2);

onMounted(() => {
    inputAddressDto.value = structuredClone(toRaw(props.editDto));
    inputAddressDtoBack.value = structuredClone(toRaw(inputAddressDto.value));
});

/**
* 関連者検索コンポーネント表示
*/
function onInputAddress() {
    isInput.value = true;
}

/**
 * 関連者検索キャンセル
 */
function recieveCancelInputAddress() {
    //非表示
    isInput.value = false;
}

/**
 * 関連者検索選択
 * @param sendDto 選択Dto
 */
function recieveInputAddressInterface(sendDto: InputAddressDtoInterface) {

    inputAddressDto.value.addressAll = sendDto.addressAll;
    inputAddressDto.value.orginAddressAll = sendDto.orginAddressAll;

    inputAddressDto.value.postalcode1 = sendDto.postalcode1;
    inputAddressDto.value.postalcode2 = sendDto.postalcode2;

    inputAddressDto.value.addressPostal = sendDto.addressPostal;
    inputAddressDto.value.isPostalEdit = sendDto.isPostalEdit;
    inputAddressDto.value.addressBlock = sendDto.addressBlock;
    inputAddressDto.value.isBlockEdit = sendDto.isBlockEdit;
    inputAddressDto.value.addressBuilding = sendDto.addressBuilding;
    inputAddressDto.value.isBuildingEdit = sendDto.isBuildingEdit;

    inputAddressDto.value.lgCode = sendDto.lgCode;
    inputAddressDto.value.machiazaId = sendDto.machiazaId;
    inputAddressDto.value.rsdtId = sendDto.rsdtId;
    inputAddressDto.value.blkId = sendDto.blkId;

    //非表示
    isInput.value = false;
}

const addressCodeText: ComputedRef<string> = computed(() => {
    const split: string = "-";
    const space: string = " ";
    if (BLANK === inputAddressDto.value.lgCode) {
        return BLANK;
    } else {
        return inputAddressDto.value.lgCode + split
            + space + inputAddressDto.value.machiazaId + space + split
            + space + inputAddressDto.value.blkId + space + split
            + space + inputAddressDto.value.prcId + space + split
            + space + inputAddressDto.value.rsdtId + space + split
            + space + inputAddressDto.value.rsdt2Id;
    }
});
</script>
<template>
    <h3 class="indent-h3">住所</h3>
    <div class="one-line">
        <div class="left-area">
            郵便番号
        </div>
        <div class="right-area">
            <input v-model="allPostalCode" type="text" class="name-input" disabled="true"><button
                @click="onInputAddress" class="left-space"> 編集</button>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            住所
        </div>
        <div class="right-area">
            <textarea v-model="inputAddressDto.addressAll" disabled="true" class="max-input"></textarea>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            コード
        </div>
        <div class="right-area">
            {{ addressCodeText }}
        </div>
    </div>

    <!-- 住所入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <InputAddressShort v-if="isInput" :edit-dto="inputAddressDto"
            @send-cancel-input-address="recieveCancelInputAddress"
            @send-input-address-interface="recieveInputAddressInterface">
            ></InputAddressShort>
    </div>

</template>
<style scoped></style>
