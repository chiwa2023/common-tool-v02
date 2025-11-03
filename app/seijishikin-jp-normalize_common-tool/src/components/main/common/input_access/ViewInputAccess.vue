<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import type { InputAccessDtoInterface } from '../../dto/input_access/inputAccessDto';
import InputAccess from './InputAccess.vue';

// props,emits
const props = defineProps<{ editDto: InputAccessDtoInterface }>();

// 編集Dto
const inputAccessDto: ComputedRef<InputAccessDtoInterface> = computed(() => { return props.editDto });

const allPhon: ComputedRef<string> =
    computed(() => {
        return inputAccessDto.value.phon1 + inputAccessDto.value.phon2 + inputAccessDto.value.phon3;
    });


const isInput: Ref<boolean> = ref(false);

function onInputAccess() {
    // 表示
    isInput.value = true;
}

function recieveCancelInputAccess() {
    // 非表示
    isInput.value = false;
}

function recieveInputAccessInterface(sendDto: InputAccessDtoInterface) {

    // 変数の複写(propsなのでdtoコピーができない)
    inputAccessDto.value.phon1 = sendDto.phon1;
    inputAccessDto.value.phon2 = sendDto.phon2;
    inputAccessDto.value.phon3 = sendDto.phon3;
    inputAccessDto.value.email = sendDto.email;
    inputAccessDto.value.myPortalUrl = sendDto.myPortalUrl;
    inputAccessDto.value.snsServiceName = sendDto.snsServiceName;
    inputAccessDto.value.snsPortalUrl = sendDto.snsPortalUrl;
    inputAccessDto.value.snsAccount = sendDto.snsAccount;

    // 非表示
    isInput.value = false;
}

</script>
<template>
    <h3 class="indent-h3">連絡先</h3>
    <div class="one-line">
        <div class="left-area">
            電話番号
        </div>
        <div class="right-area">
            <input type="text" v-model="allPhon" class="max-input" disabled="true"> <button
                @click="onInputAccess">編集</button>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            メールアドレス
        </div>
        <div class="right-area">
            <input type="email" v-model="inputAccessDto.email" class="max-input" disabled="true">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            自身のポータルサイト
        </div>
        <div class="right-area">
            <input type="url" v-model="inputAccessDto.myPortalUrl" class="max-input" disabled="true">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            SNS
        </div>
        <div class="right-area">
            <div class="form-group-vertical">
                <div>
                    <input type="text" v-model="inputAccessDto.snsServiceName" class="max-input" disabled="true">
                </div>
                <div>
                    <input type="url" v-model="inputAccessDto.snsPortalUrl" class="max-input" disabled="true">
                </div>
                <div>
                    <input type="text" v-model="inputAccessDto.snsAccount" class="name-input" disabled="true">
                </div>
            </div>
        </div>
    </div>

    <!-- 連絡先詳細入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <InputAccess :edit-dto="inputAccessDto" @send-cancel-input-access="recieveCancelInputAccess"
            @send-input-access-interface="recieveInputAccessInterface"></InputAccess>
    </div>

</template>
<style scoped></style>
