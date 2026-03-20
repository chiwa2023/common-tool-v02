<script setup lang="ts">
import { computed, type ComputedRef, type Ref, ref, toRaw } from "vue";
import InputDate from "../date/InputDate.vue";
import type { AddressRsdtTemplateDtoInterface } from "../../dto/Input_address/addressRsdtTemplateDto";
import InputDateAndNull from "../date/InputDateAndNull.vue";


// よく使う定数
// const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;

// props,emit
const props = defineProps<{ editDto: AddressRsdtTemplateDtoInterface }>();
const emits = defineEmits(["sendCancelInputAddress", "sendInputAddressInterface"]);

/** 入力用Dto */
const inputAddressDto: Ref<AddressRsdtTemplateDtoInterface> = ref(structuredClone(toRaw(props.editDto)));
const addressAll: ComputedRef<string> = computed(() =>
    inputAddressDto.value.addressPostal + inputAddressDto.value.addressBlock + "　" + inputAddressDto.value.addressBuilding);

/**  
 * 入力内容を破棄する
 */
function onCancel() {
    emits("sendCancelInputAddress");
}

/**  
 * 入力内容を保存する
 */
function onSave() {
    inputAddressDto.value.addressAll = addressAll.value;
    emits("sendInputAddressInterface", inputAddressDto.value);
}
function recieveDateAndNull(data: Date | null) {
    inputAddressDto.value.abolishDate = data;
}
function recieveDate(data: Date) {
    inputAddressDto.value.effectDate = data;
}
</script>
<template>
    <h3 class="accent-h3">住所入力</h3>

    <div style="overflow-y: scroll">
        <div class="one-line">
            <div class="left-area">
                郵便番号
            </div>
            <div class="right-area">
                <input v-model="inputAddressDto.postalcode1" type="text" class="short-input">&nbsp;-&nbsp;
                <input v-model="inputAddressDto.postalcode2" type="text" class="short-input">
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所(全)
            </div>
            <div class="right-area">
                <textarea v-model="addressAll" disabled="true" class="max-input"></textarea>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所郵便番号
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <textarea v-model="inputAddressDto.addressPostal" class="max-input"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所番地
            </div>
            <div class="right-area">
                <div>
                    <textarea v-model="inputAddressDto.addressBlock" class="max-input"></textarea>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所建物
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <textarea v-model="inputAddressDto.addressBuilding" class="max-input"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所コード
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <span>地方公共団体コード</span><input type="text" v-model="inputAddressDto.lgCode"
                            class="short-input left-space">
                    </div>
                    <div>
                        <span>町字Id</span><input type="text" v-model="inputAddressDto.machiazaId"
                            class="short-input left-space">
                    </div>
                    <div>
                        <span></span>地番Id<input type="text" v-model="inputAddressDto.prcId"
                            class="code-input left-space">
                    </div>
                    <div>
                        <span>街区Id</span><input type="text" v-model="inputAddressDto.blkId"
                            class="short-input left-space">
                    </div>
                    <div>
                        <span></span>住居Id<input type="text" v-model="inputAddressDto.rsdtId"
                            class="short-input left-space">
                    </div>
                    <div>
                        <span>住居2Id</span><input type="text" v-model="inputAddressDto.rsdt2Id"
                            class="short-input left-space">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            効力発生日
        </div>
        <div class="right-area">
            <InputDate :date="inputAddressDto.effectDate" :index="1" :is-edit="true" @send-date="recieveDate">
            </InputDate>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            廃止日
        </div>
        <div class="right-area">
            <InputDateAndNull :date="inputAddressDto.abolishDate" :index="2" :is-edit="true" @send-date="recieveDateAndNull">
            </InputDateAndNull>
        </div>
    </div>


    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

</template>
<style scoped></style>
