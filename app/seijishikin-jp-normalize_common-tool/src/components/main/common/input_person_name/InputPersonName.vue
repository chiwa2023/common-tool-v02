<script setup lang="ts">
import { computed, ref, toRaw, type ComputedRef, type Ref, } from 'vue';
import type { InputPersonNameDtoInterface } from '../../../main/dto/input_person_name/inputPersonNameDto';

// props,emit
const props = defineProps<{ editDto: InputPersonNameDtoInterface }>();
const emits = defineEmits(["sendCancelInputPersonName", "sendInputPersonNameInterface"]);

const WIDE_SPACE: string = "　";

// 編集Dto
const inputPersonNameDto: Ref<InputPersonNameDtoInterface> = ref(structuredClone(toRaw(props.editDto)));
const allKana: ComputedRef<string> =
    computed(() => {
        return inputPersonNameDto.value.lastNameKana + WIDE_SPACE + inputPersonNameDto.value.middleNameKana + inputPersonNameDto.value.firstNameKana
    });
const allKanji: ComputedRef<string> =
    computed(() => {
        return inputPersonNameDto.value.lastName + WIDE_SPACE + inputPersonNameDto.value.middleName + inputPersonNameDto.value.firstName
    });

function onSave() {
    // computed連結している全姓名と全姓名かなは複写
    inputPersonNameDto.value.allName = allKanji.value;
    inputPersonNameDto.value.allNameKana = allKana.value;
    emits("sendInputPersonNameInterface", inputPersonNameDto.value);
}

function onCancel() {
    emits("sendCancelInputPersonName");
}
</script>
<template>
    <h3 class="accent-h3">個人姓名入力</h3>
    <div class="one-line">
        <div class="left-area">
            姓名かな
        </div>
        <div class="right-area">

            <div class="form-group-vertical">
                <div>
                    <input type="text" v-model="allKana" class="max-input" disabled="true">
                </div>
                <div>
                    姓<input type="text" v-model="inputPersonNameDto.lastNameKana" class="short-input" placeholder="せい">
                    ミドルネーム<input type="text" v-model="inputPersonNameDto.middleNameKana" class="short-input" placeholder="みどるねーむ">
                    名<input type="text" v-model="inputPersonNameDto.firstNameKana" class="short-input" placeholder="めい">
                </div>
            </div>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            姓名漢字
        </div>
        <div class="right-area">
            <div class="form-group-vertical">
                <div>
                    <input type="text" v-model="allKanji" class="max-input" disabled="true">
                </div>
                <div>
                    姓<input type="text" v-model="inputPersonNameDto.lastName" class="short-input" placeholder="姓">
                    ミドルネーム<input type="text" v-model="inputPersonNameDto.middleName" class="short-input" placeholder="ミドルネーム">
                    名<input type="text" v-model="inputPersonNameDto.firstName" class="short-input" placeholder="名">
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

</template>
<style scoped></style>
