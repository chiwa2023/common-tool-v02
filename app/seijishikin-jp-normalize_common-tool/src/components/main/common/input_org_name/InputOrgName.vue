<script setup lang="ts">
import { ref, toRaw, type Ref } from 'vue';
import type { InputOrgNameDtoInterface } from '../../dto/input_org_name/inputOrgNameDto';

// props,emits
const props = defineProps<{ editDto: InputOrgNameDtoInterface }>();
const emits = defineEmits(["sendCancelInputOrgName", "sendInputOrgNameInterface"]);

// 編集Dto
const inputOrgNameDto: Ref<InputOrgNameDtoInterface> = ref(structuredClone(toRaw(props.editDto)));

function onSave() {
    emits("sendInputOrgNameInterface", inputOrgNameDto.value);
}

function onCancel() {
    emits("sendCancelInputOrgName");
}
</script>
<template>
    <h3 class="accent-h3">組織名称入力</h3>
    <div class="one-line">
        <div class="left-area">
            団体名かな
        </div>
        <div class="right-area">
            <input type="text" v-model="inputOrgNameDto.orgNameKana" class="name-input" id="org-name-kana">
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            団体名
        </div>
        <div class="right-area">
            <input type="text" v-model="inputOrgNameDto.orgName" class="name-input" id="org-name">
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button" id="on-cancel">キャンセル</button>
        <button @click="onSave" class="footer-button left-space" id="on-save">選択</button>
    </div>

</template>
<style scoped></style>
