<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { MessageConstants } from './dto/message/messageConstants';
import MessageView from './common/message/MessageView.vue';
import { InputAccessDto, type InputAccessDtoInterface } from './dto/input_access/inputAccessDto';
import { InputAddressDto, type InputAddressDtoInterface } from './dto/Input_address/inputAddressDto';
import ViewInputAccess from './common/input_access/ViewInputAccess.vue';
import ViewInputAddressShort from './common/input_address_short/ViewInputAddressShort.vue';
import ViewInputAddress from './common/input_address/ViewInputAddress.vue';

//仮
// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;


// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const title: Ref<string> = ref(BLANK);
const message: Ref<string> = ref(BLANK);

// token
const longToken: Ref<string> = ref(BLANK);

function recieveSubmit(button: string) {
    alert(button);
    // TODO ボタンタイプ別の挙動はこの中で変える

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}

// 共通入力用変数
const inputAccessDto: Ref<InputAccessDtoInterface> = ref(new InputAccessDto());
const inputAddressDto: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputAddressDtoShort: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());

function onCancel() {
    history.back();
}

</script>
<template>
    <div class="container">

        <h1>コンポーネントカタログ(back側処理ネットアクセスあり)</h1><br>

        <h3 class="accent-h3">接続設定</h3>
        <div class="one-line">
            <div class="left-area">
                長期トークン
            </div>
            <div class="right-area">
                <textarea type="text" class="max-input" v-model="longToken"></textarea>
            </div>
        </div>

        <h3 class="accent-h3">共通入力</h3><br>

        <!-- 住所 -->
        <ViewInputAddress :edit-dto="inputAddressDto" :long-token="longToken"></ViewInputAddress>

        <!-- 住所短縮 -->
        <ViewInputAddressShort :edit-dto="inputAddressDtoShort" :long-token="longToken"></ViewInputAddressShort>

        <!-- 連絡先 -->
        <ViewInputAccess :edit-dto="inputAccessDto" :long-token="longToken"></ViewInputAccess>

        <div class="footer">
            <button @click="onCancel" class="footer-button">キャンセル</button>
        </div>

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
