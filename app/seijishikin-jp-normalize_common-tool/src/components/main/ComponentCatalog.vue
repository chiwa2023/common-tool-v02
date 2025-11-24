<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { MessageConstants } from './dto/message/messageConstants';
import MessageView from './common/message/MessageView.vue';
import PagingControl from './common/paging/PagingControl.vue';
import { InputOrgNameDto, type InputOrgNameDtoInterface } from './dto/input_org_name/inputOrgNameDto';
import { InputPersonNameDto, type InputPersonNameDtoInterface } from './dto/input_person_name/inputPersonNameDto';
import { InputAccessDto, type InputAccessDtoInterface } from './dto/input_access/inputAccessDto';
import { InputAddressDto, type InputAddressDtoInterface } from './dto/Input_address/inputAddressDto';
import { InputShokugyouDto, type InputShokugyouDtoInterface } from './dto/input_shokugyou/inputShokugyouDto';
import ViewInputAccess from './common/input_access/ViewInputAccess.vue';
import ViewInputShokugyou from './common/input_shokugyou/ViewInputShokugyou.vue';
import ViewInputOrgName from './common/input_org_name/ViewInputOrgName.vue';
import ViewInputPersonName from './common/input_person_name/ViewInputPersonName.vue';
import ViewInputAddressShort from './common/input_address_short/ViewInputAddressShort.vue';
import ViewInputAddress from './common/input_address/ViewInputAddress.vue';

//仮
// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;

// Paging
const pageNumber: Ref<number> = ref(6); // Mock data
const allCount: Ref<number> = ref(123); // Mock data
const limit: Ref<number> = ref(10); // Mock data
/** ページング受信 */
function recievePagingNumber(selecteddNumber: number) {
    pageNumber.value = selecteddNumber;
    alert("ページ情報受信");
}


// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const title: Ref<string> = ref(BLANK);
const message: Ref<string> = ref(BLANK);

// メッセージ表示
function onInfo() {
    infoLevel.value = MessageConstants.LEVEL_INFO;
    title.value = "情報タイトル";
    message.value = "メッセージ1";
    // 表示
    messageType.value = MessageConstants.VIEW_TOAST;
}

function onWarning() {
    infoLevel.value = MessageConstants.LEVEL_WARNING;
    title.value = "警告タイトル";
    message.value = "メッセージ2";
    // 表示
    messageType.value = MessageConstants.VIEW_YES_NO;
}

function onError() {
    infoLevel.value = MessageConstants.LEVEL_ERROR;
    title.value = "エラータイトル";
    message.value = "メッセージ3";
    // 表示
    messageType.value = MessageConstants.VIEW_OK;
}

function recieveSubmit(button: string) {
    alert(button);
    // TODO ボタンタイプ別の挙動はこの中で変える

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}


// 共通入力用変数
const inputOrgNameDto: Ref<InputOrgNameDtoInterface> = ref(new InputOrgNameDto());
const inputPersonNameDto: Ref<InputPersonNameDtoInterface> = ref(new InputPersonNameDto());
const inputAccessDto: Ref<InputAccessDtoInterface> = ref(new InputAccessDto());
const inputAddressDto: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputAddressDtoShort: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputShokugyouDto: Ref<InputShokugyouDtoInterface> = ref(new InputShokugyouDto());

</script>
<template>
    <div class="container">

        <h1>コンポーネントカタログ</h1><br>

        <h3 class="accent-h3">メッセージ</h3>
        <div class="one-line">
            <div class="left-area">
                メッセージ表示
            </div>
            <div class="right-area">
                <button @click="onInfo">情報</button>
                <button class="left-space" @click="onWarning">警告(YES/NO)</button>
                <button class="left-space" @click="onError">エラー(OK)</button>
            </div>
        </div>

        <h3 class="accent-h3">ページング</h3>
        <div class="one-line">
            <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
                @send-paging-number="recievePagingNumber"></PagingControl>
        </div>

        <h3 class="accent-h3">共通入力</h3>

        <!-- 団体名称入力 -->
        <ViewInputOrgName :edit-dto="inputOrgNameDto"></ViewInputOrgName>

        <!-- 姓名入力 -->
        <ViewInputPersonName :edit-dto="inputPersonNameDto"></ViewInputPersonName>

        <!-- 住所 -->
        <ViewInputAddress :edit-dto="inputAddressDto"></ViewInputAddress>

        <!-- 住所短縮 -->
        <ViewInputAddressShort :edit-dto="inputAddressDtoShort"></ViewInputAddressShort>

        <!-- 連絡先 -->
        <ViewInputAccess :edit-dto="inputAccessDto"></ViewInputAccess>

        <!-- 職業 -->
        <ViewInputShokugyou :edit-dto="inputShokugyouDto"></ViewInputShokugyou>

        <!-- メッセージ表示 -->
        <!-- ダイアログ用のコンテナ -->
        <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
            <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
                @send-submit="recieveSubmit">
            </MessageView>
        </div>

    </div>
</template>

<style scoped></style>
