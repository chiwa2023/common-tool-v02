<script setup lang="ts">
import { ref, computed, type ComputedRef, type Ref } from 'vue';
import type { InputOrgNameDtoInterface } from '../../dto/input_org_name/inputOrgNameDto';
import InputOrgName from './InputOrgName.vue';

// props,emits
const props = defineProps<{ editDto: InputOrgNameDtoInterface }>();

// 編集Dto
const inputOrgNameDto: ComputedRef<InputOrgNameDtoInterface> = computed(() => { return props.editDto });


// コンポーネント表示
const isInput: Ref<boolean> = ref(false);
function onInputOrgnName() {
    // 表示
    isInput.value = true;
}

function recieveCancelInputOrgName() {
    // 非表示
    isInput.value = false;
}

function recieveInputOrgNameInterface(sendDto: InputOrgNameDtoInterface) {

    // 変数の複写(propsなのでdtoコピーができない)
    inputOrgNameDto.value.orgNameKana = sendDto.orgNameKana;
    inputOrgNameDto.value.orgName = sendDto.orgName;

    // 非表示
    isInput.value = false;
}

</script>
<template>
    <br>
    <h3 class="indent-h3">組織名称</h3>
    <div class="one-line">
        <div class="left-area">
            団体名
        </div>
        <div class="right-area">
            <div class="form-group-vertical">
                <div>
                    <input type="text" v-model="inputOrgNameDto.orgNameKana" class="name-input"><button class="left-space"
                        @click="onInputOrgnName">編集</button>
                </div>
                <input type="text" v-model="inputOrgNameDto.orgName" class="name-input">
            </div>
        </div>
    </div>

    <!-- 姓名詳細入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <InputOrgName v-if="isInput" :edit-dto="inputOrgNameDto"
            @send-input-org-name-interface="recieveInputOrgNameInterface"
            @send-cancel-input-org-name="recieveCancelInputOrgName"></InputOrgName>
    </div>

</template>
<style scoped></style>
