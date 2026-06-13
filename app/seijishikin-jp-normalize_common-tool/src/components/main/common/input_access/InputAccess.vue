<script setup lang="ts">
import { onMounted, ref, toRaw, type Ref } from 'vue';
import type { InputAccessDtoInterface } from '../../dto/input_access/inputAccessDto';
import { type SnsServiceOptionDtoInterface } from '../../dto/sns_service/snsServiceOptionDto';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { MessageConstants } from '../../dto/message/messageConstants';
import MessageView from '../message/MessageView.vue';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import RoutePathConstants from '../../../../routePathConstants';

// props,emmits
const props = defineProps<{ editDto: InputAccessDtoInterface }>();
const emits = defineEmits(["sendCancelInputAccess", "sendInputAccessInterface"]);

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ACCEPTED: number = 202;
// const SERVER_STATUS_ERROR: number = 400;


// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const title: Ref<string> = ref(BLANK);
const message: Ref<string> = ref(BLANK);

// 編集Dto
const inputAccessDto: Ref<InputAccessDtoInterface> = ref(structuredClone(toRaw(props.editDto)));

// SNSサービス
const listSnsService: Ref<SnsServiceOptionDtoInterface[]> = ref([]);
const selectedSnsService: Ref<number> = ref(0);
const isDisabled: Ref<boolean> = ref(false);

onMounted(() => {
    title.value = "SNS選択肢取得";
    // SNSリストを取得
    getAuthorizedPromiseArea().then(token => {

        const url = urlBack + "/sns-service/get-options";
        const method = "POST";
        const body = "{}";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                listSnsService.value = await response.json();
            })
            .catch(() => {
                // 実処理側エラー
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                message.value = "システム管理者にお問い合わせください";
            });
    }).catch((e) => {
        // トークン関数側エラー
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        if (e instanceof AccessTokenNotFoundError) {
            title.value = "現在トークンが存在しません";
            message.value = e.message;
            return;
        }
        if (e instanceof TokenRefreshError) {
            // 取得に失敗している場合
            title.value = "有効期限まじかのトークンを再取得できませんでした";
            message.value = e.message;
            return;
        }
        title.value = "システムエラーが発生しました";
        message.value = "システム管理者にお問い合わせください";
    });

});

/**
 * SNS選択
 */
function onSelectSns(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;

    // 選択された値を複写
    const selectedDto = listSnsService.value[selectedIndex];
    if (selectedDto !== undefined) {
        inputAccessDto.value.snsServiceId = selectedDto.value;
        inputAccessDto.value.snsServiceCode = selectedDto.serviceCode;
        inputAccessDto.value.snsServiceName = selectedDto.text;
        inputAccessDto.value.snsPortalUrl = selectedDto.portalUrl;
        // 既存のサービスを選択していないときは編集可能
        if (selectedIndex === 0) {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    }
}

/**
 * 保存処理
 */
function onSave() {
    emits("sendInputAccessInterface", inputAccessDto.value);
}

/**
 * キャンセル処理
 */
function onCancel() {
    emits("sendCancelInputAccess");
}

function recieveSubmit() {
    // ボタンの挙動を変える必要はない
    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}
</script>

<template>
    <h3 class="accent-h3">連絡先入力</h3>
    <div class="one-line">
        <div class="left-area">
            電話番号
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.phon1" class="short-input" placeholder="000">
            -<input type="text" v-model="inputAccessDto.phon2" class="short-input left-space" placeholder="1111">
            -<input type="text" v-model="inputAccessDto.phon3" class="short-input left-space" placeholder="2222">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            メールアドレス
        </div>
        <div class="right-area">
            <input type="email" v-model="inputAccessDto.email" class="name-input"
                placeholder="sample@normalize.jp.seijishikin.net">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            自身のポータルサイト
        </div>
        <div class="right-area">
            <input type="url" v-model="inputAccessDto.myPortalUrl" class="name-input"
                placeholder="https://www.sample.com/my_blog/112233 など">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            SNSサービス名
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.snsServiceName" class="name-input" placeholder="例:sampleブログ など"
                :disabled="isDisabled"><select v-model="selectedSnsService" @change="onSelectSns">
                <option v-for="(dto, index) in listSnsService" :key="index">{{ dto.text }}</option>
            </select>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            SNSサービストップURL
        </div>
        <div class="right-area">
            <input type="url" v-model="inputAccessDto.snsPortalUrl" class="name-input"
                placeholder="例：https://sample.com/account/ など" :disabled="isDisabled">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            アカウント名
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.snsAccount" class="name-input" placeholder="例:@taro など">
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

    <!-- メッセージ表示 -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
            @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped></style>
