<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import KanrenshaManage from './common/regist_kanrensha/KanrenshaManage.vue';
import { LeastUserDto, type LeastUserDtoInterface } from './dto/user/leastUserDto.ts';
import { AccessTokenNotFoundError, FrameworkCapsuleDto, getAuthorizedPromiseArea, getErrorMessage, MessageConstants, TokenRefreshError, useUserInfoStoreCommon, type FrameworkCapsuleDtoInterface } from '../index.ts';
import RoutePathConstants from '../../routePathConstants.ts';
import type { GetUserDtoResultDtoInterface } from './dto/user/getUserDtoResultDto.ts';
import MessageView from './common/message/MessageView.vue';

// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
const INQUIRE_FLG: boolean = false;
const ERR_MESS_ONLY: boolean = true;
const MESS_PAGE_NAME: string = "関連者企業・団体検索モーダル";
const INIT_CALLER: string = "no branch";

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const caller: Ref<string> = ref(INIT_CALLER);
const message: Ref<string> = ref(BLANK);

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

const userDto: Ref<LeastUserDtoInterface> = ref(new LeastUserDto());
const apiKey: string = "12345";

// token
const longToken: Ref<string> = ref(BLANK);

onMounted(() => {
    // 保存していたアクセストークンと有効期限を取得
    const userInfo = useUserInfoStoreCommon();
    userDto.value = userInfo.userDto;
});

watch(longToken, () => {
    // 保存していたアクセストークンと有効期限を取得
    const userInfo = useUserInfoStoreCommon();
    // アクセストークを空にして長期トークンだけをセットすると強制トークンリフレッシュが走る
    userInfo.jwtDto.refreshToken = longToken.value;
    userInfo.jwtDto.accessToken = "";
    userInfo.userDto = userDto.value;

    const capsuleDto: FrameworkCapsuleDtoInterface = new FrameworkCapsuleDto();

    getAuthorizedPromiseArea().then(token => {
        const url = urlBack + "/api-for-partner/trial-login";
        const method = "POST";
        const body = JSON.stringify(capsuleDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: GetUserDtoResultDtoInterface = await response.json();

                if (resultDto.isFailure) {
                    infoLevel.value = MessageConstants.LEVEL_ERROR;
                    messageType.value = MessageConstants.VIEW_OK;
                    message.value = getErrorMessage(resultDto.message, ERR_MESS_ONLY);
                } else {
                    infoLevel.value = MessageConstants.LEVEL_INFO;
                    messageType.value = MessageConstants.VIEW_TOAST;
                    message.value = "正常取得";
                    userInfo.userDto = resultDto.userDto;
                    userDto.value = userInfo.userDto;
                }
            })
            .catch((error) => {
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                //title.value = MESS_PAGE_NAME;
                message.value = getErrorMessage(error, ERR_MESS_ONLY);
            });
    }).catch((e) => {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;

        if (e instanceof AccessTokenNotFoundError) {
            // トークン保持ができていない場合
            //title.value = "現在トークンが存在しません";
            message.value = e.message;
            return;
        }
        if (e instanceof TokenRefreshError) {
            // 取得に失敗している場合
            //title.value = "有効期限まじかのトークンを再取得できませんでした";
            message.value = e.message;
            return;
        }
        //title.value = MESS_PAGE_NAME;
        message.value = getErrorMessage(e, INQUIRE_FLG);
        return;
    });

});

function onShowUser() {
    alert(userDto.value.userPersonId + userDto.value.userPersonName);
}

function recieveSubmit() {

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}

</script>
<template>

    <h3 class="accent-h3">接続設定</h3>
    <div class="one-line">
        <div class="left-area">
            長期トークン
        </div>
        <div class="right-area">
            <textarea type="text" class="max-input" v-model="longToken"></textarea>
        </div>
    </div>

    <!-- 関連者統合検索編集 -->
    <KanrenshaManage :user-dto="userDto" :houjin-api-key="apiKey"></KanrenshaManage>

    <hr>

    <div class="one-line">
        <button @click="onShowUser">ユーザ情報表示</button>
    </div>

        <!-- メッセージ -->
        <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
            <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
                :caller="caller" @send-submit="recieveSubmit">
            </MessageView>
        </div>

</template>
<style scoped></style>
