<script setup lang="ts">
import { ref, type Ref } from 'vue';
import InputLgcode from '../../../main/common/input_lgcode/InputLgcode.vue';
import type { SelectOptionStringDtoInterface } from '../../../main/dto/select_options/selectOptionStringDto.ts';
import InputPref from '../../../main/common/input_lgcode/InputPref.vue';

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

const lgCode5: Ref<string> = ref(BLANK);
const lgCode6: Ref<string> = ref(BLANK);
const lgPref: Ref<string> = ref(BLANK);
const lgName5: Ref<string> = ref(BLANK);
const lgName6: Ref<string> = ref(BLANK);
const prefName: Ref<string> = ref(BLANK);

function onLgcode5() {
    alert(lgCode5.value + ":" + lgName5.value);
}
function onLgcode6() {
    alert(lgCode6.value + ":" + lgName6.value);
}
function onPref() {
    alert(lgPref.value + ":" + prefName.value);
}
function recieveLgCode5(optionDto: SelectOptionStringDtoInterface) {
    lgCode5.value = optionDto.value;
    lgName5.value = optionDto.text;
}
function recieveLgCode6(optionDto: SelectOptionStringDtoInterface) {
    lgCode6.value = optionDto.value;
    lgName6.value = optionDto.text;
}
const init: string = "11";

function recievePrefCode(optionDto: SelectOptionStringDtoInterface) {
    lgPref.value = optionDto.value;
    prefName.value = optionDto.text;
}

</script>
<template>

    <div class="one-line">
        <div class="left-area">
            コード指定(5桁)<br>
            <button @click="onLgcode5">確認</button>
        </div>
        <div class="right-area">
            <InputLgcode :is-digit5="true" :lg-code="init" @send-lg-code="recieveLgCode5"></InputLgcode>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            コード指定(6桁)<br>
            <button @click="onLgcode6">確認</button>
        </div>
        <div class="right-area">
            <InputLgcode :is-digit5="false" :lg-code="init" @send-lg-code="recieveLgCode6"></InputLgcode>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            県選択
            <button @click="onPref">確認</button>
        </div>
        <div class="right-area">
            <InputPref :lg-code="init" @send-pref-code="recievePrefCode"></InputPref>
        </div>
    </div>

</template>
<style scoped></style>
