<script setup lang="ts">
import { computed, ref, toRaw, type ComputedRef, type Ref } from 'vue';
import { InputAddressDto, InputCompareAddress, type InputAddressDtoInterface } from '../../..';

//仮
// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// メッセージボックス表示定数
//const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
//const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
//const title: Ref<string> = ref(BLANK);
//const message: Ref<string> = ref(BLANK);

const inputAddressDto: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
inputAddressDto.value.postalcode1 = "111";
inputAddressDto.value.postalcode2 = "222";
inputAddressDto.value.addressPostal = "和歌山県架空市";
inputAddressDto.value.addressBlock = "100番地の7";
inputAddressDto.value.addressBuilding = "三角ビル";

const inputAddressDtoBack: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());

const isInput: Ref<boolean> = ref(false);
const allPostalCode: ComputedRef<string> = computed(() => inputAddressDto.value.postalcode1 + inputAddressDto.value.postalcode2);


/**
* 関連者検索コンポーネント表示
*/
function onInputAddress() {
    inputAddressDtoBack.value = structuredClone(toRaw(inputAddressDto.value));
    isInput.value = true;
}

/**
 * 関連者検索キャンセル
 */
function recieveCancelInputAddress() {

    inputAddressDto.value.addressAll = inputAddressDtoBack.value.addressAll;
    inputAddressDto.value.orginAddressAll = inputAddressDtoBack.value.orginAddressAll;

    inputAddressDto.value.postalcode1 = inputAddressDtoBack.value.postalcode1;
    inputAddressDto.value.postalcode2 = inputAddressDtoBack.value.postalcode2;

    inputAddressDto.value.addressPostal = inputAddressDtoBack.value.addressPostal;
    inputAddressDto.value.isPostalEdit = inputAddressDtoBack.value.isPostalEdit;
    inputAddressDto.value.addressBlock = inputAddressDtoBack.value.addressBlock;
    inputAddressDto.value.isBlockEdit = inputAddressDtoBack.value.isBlockEdit;
    inputAddressDto.value.addressBuilding = inputAddressDtoBack.value.addressBuilding;
    inputAddressDto.value.isBuildingEdit = inputAddressDtoBack.value.isBuildingEdit;

    inputAddressDto.value.lgCode = inputAddressDtoBack.value.lgCode;
    inputAddressDto.value.machiazaId = inputAddressDtoBack.value.machiazaId;
    inputAddressDto.value.prcId = inputAddressDtoBack.value.prcId;
    inputAddressDto.value.blkId = inputAddressDtoBack.value.blkId;
    inputAddressDto.value.rsdtId = inputAddressDtoBack.value.rsdtId;
    inputAddressDto.value.rsdt2Id = inputAddressDtoBack.value.rsdt2Id;

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
    inputAddressDto.value.prcId = sendDto.prcId;
    inputAddressDto.value.blkId = sendDto.blkId;
    inputAddressDto.value.rsdtId = sendDto.rsdtId;
    inputAddressDto.value.rsdt2Id = sendDto.rsdt2Id;

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
    <h3>比較住所入力</h3>

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
        <InputCompareAddress :edit-dto="inputAddressDto" @send-cancel-input-address="recieveCancelInputAddress"
            @send-input-address-interface="recieveInputAddressInterface"></InputCompareAddress>
    </div>

</template>
<style scoped></style>
