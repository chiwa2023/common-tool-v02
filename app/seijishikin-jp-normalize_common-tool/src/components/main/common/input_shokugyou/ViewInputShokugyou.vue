<script setup lang="ts">
import { ref, type Ref, toRaw } from 'vue';
import type { InputShokugyouDtoInterface } from '../../dto/input_shokugyou/inputShokugyouDto';
import InputShokugyou from './InputShokugyou.vue';

// props,emits
const props = defineProps<{ editDto: InputShokugyouDtoInterface }>();

// 編集Dto
const inputShokugyouDto: Ref<InputShokugyouDtoInterface> = ref(structuredClone(toRaw(props.editDto)));

// コンポーネント表示
const isInput: Ref<boolean> = ref(false);
function onInputOrgnName() {
    // 表示
    isInput.value = true;
}

function recieveCancelInputShokugyou() {
    // 非表示
    isInput.value = false;
}

function recieveInputShokugyouInterface(sendDto: InputShokugyouDtoInterface) {

    // 変数の複写(propsなのでdtoコピーができない)
    inputShokugyouDto.value.allShokugyou = sendDto.allShokugyou;
    inputShokugyouDto.value.gyoushu = sendDto.gyoushu;
    inputShokugyouDto.value.yakushoku = sendDto.yakushoku;
    inputShokugyouDto.value.shokugyouUserWrite = sendDto.shokugyouUserWrite;

    // 企業団体情報
    inputShokugyouDto.value.houjinNo = sendDto.houjinNo;
    inputShokugyouDto.value.houjinName = sendDto.houjinName;
    inputShokugyouDto.value.houjinAddress = sendDto.houjinAddress;

    // 非表示
    isInput.value = false;
}

</script>
<template>
    <br>
    <h3 class="indent-h3">職業</h3>
    <div class="one-line">
        <div class="left-area">
            職業
        </div>
        <div class="right-area">
            <input type="text" v-model="inputShokugyouDto.allShokugyou" class="name-input" disabled="true"><button
                class="left-space" @click="onInputOrgnName">編集</button>
        </div>
    </div>

    <!-- 職業詳細入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <InputShokugyou v-if="isInput" :edit-dto="inputShokugyouDto"
            @send-input-shokugyou-interface="recieveInputShokugyouInterface"
            @send-cancel-input-shokugyou="recieveCancelInputShokugyou"></InputShokugyou>
    </div>

</template>
<style scoped></style>
