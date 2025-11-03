<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import InputPersonName from './InputPersonName.vue';
import type { InputPersonNameDtoInterface } from '../../../main/dto/input_person_name/inputPersonNameDto';

// props,emit
const props = defineProps<{ editDto: InputPersonNameDtoInterface }>();

// 編集Dto
const inputPersonNameDto: ComputedRef<InputPersonNameDtoInterface> = computed(() => { return props.editDto });

const isInput: Ref<boolean> = ref(false);
function onInputPersonName() {
    // 表示
    isInput.value = true;
}

function recieveCancelInputPersonName() {
    // 非表示
    isInput.value = false;
    console.log("recieveCancelInputPersonName: isInput.value:", isInput.value); // 追加
}

function recieveInputPersonNameInterface(sendDto: InputPersonNameDtoInterface) {

    // 変数の複写(propsなのでdtoコピーができない)
    inputPersonNameDto.value.firstName = sendDto.firstName;
    inputPersonNameDto.value.lastName = sendDto.lastName;
    inputPersonNameDto.value.middleName = sendDto.middleName;
    inputPersonNameDto.value.firstNameKana = sendDto.firstNameKana;
    inputPersonNameDto.value.lastNameKana = sendDto.lastNameKana;
    inputPersonNameDto.value.middleNameKana = sendDto.middleNameKana;
    inputPersonNameDto.value.allNameKana = sendDto.allNameKana;
    inputPersonNameDto.value.allName = sendDto.allName;

    // 非表示
    isInput.value = false;
    console.log("recieveInputPersonNameInterface: isInput.value:", isInput.value); // 追加
}

</script>
<template>
    <br>
    <h3 class="indent-h3">個人姓名</h3>
    <div class="one-line">
        <div class="left-area">
            姓名かな
        </div>
        <div class="right-area">
            <input type="text" v-model="inputPersonNameDto.allNameKana" class="max-input" disabled="true"><button
                @click="onInputPersonName">編集</button>
            <br>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            姓名漢字
        </div>
        <div class="right-area">
            <input type="text" v-model="inputPersonNameDto.allName" class="max-input" disabled="true">
        </div>

    </div>

    <!-- 姓名詳細入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <InputPersonName v-if="isInput" :edit-dto="inputPersonNameDto"
            @send-input-person-name-interface="recieveInputPersonNameInterface"
            @send-cancel-input-person-name="recieveCancelInputPersonName"></InputPersonName>
    </div>
</template>
<style scoped></style>
