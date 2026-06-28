<script setup lang="ts">
import { ref, type Ref } from 'vue';
import EditAddress from '../../../main/common/input_address/EditAddress.vue';
import { AddressRsdtTemplateDto, type AddressRsdtTemplateDtoInterface } from '../../../main/dto/Input_address/addressRsdtTemplateDto';

//仮
// よく使う定数
// const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// メッセージボックス表示定数
//const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
//const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
//const title: Ref<string> = ref(BLANK);
//const message: Ref<string> = ref(BLANK);

const addressRsdtDto: Ref<AddressRsdtTemplateDtoInterface> = ref(new AddressRsdtTemplateDto());
addressRsdtDto.value.addressBlock = "番地まで住所";

function onConfirm() {
    alert(addressRsdtDto.value.addressBlock);
}
</script>
<template>
    <h3>住所編集</h3>
    <EditAddress :edit-dto="addressRsdtDto"></EditAddress>
    
    <div class="one-line">
        <div class="left-area">
            &nbsp;
        </div>
        <div class="right-area">
            <input type="text" v-model="addressRsdtDto.addressBlock">
            <button @click="onConfirm">確認</button>
        </div>
    </div>

</template>
<style scoped></style>
