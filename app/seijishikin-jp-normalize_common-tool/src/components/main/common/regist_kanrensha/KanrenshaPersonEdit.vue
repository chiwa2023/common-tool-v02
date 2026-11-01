<script setup lang="ts">
import RoutePathConstants from '../../../../routePathConstants';
import { getErrorMessage } from '../../dto/errorFunction';
import { KanrenshaPersonDto, type KanrenshaPersonDtoInterface } from '../../dto/kanrensha/kanrenshaPersonDto';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { MessageConstants } from '../../dto/message/messageConstants';
import type { LeastUserDtoInterface } from '../../dto/user/leastUserDto';
import type { KanrenshaPersonMasterEntityInterface } from '../../entity/kanrenshaPersonMasterEntity';

import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import ViewInputPersonName from '../input_person_name/ViewInputPersonName.vue';
import ViewInputAddress from '../input_address/ViewInputAddress.vue';
import ViewInputShokugyou from '../input_shokugyou/ViewInputShokugyou.vue';
import ViewInputAccess from '../input_access/ViewInputAccess.vue';
import MessageView from '../message/MessageView.vue';
import { GetKanrenshaPersonCapsuleDto, type GetKanrenshaPersonCapsuleDtoInterface } from '../../dto/kanrensha/getKanrenshaPersonCapsuleDto.ts';
import type { GetKanrenshaPersonResultDtoInterface } from '../../dto/kanrensha/getKanrenshaPersonResultDto.ts';

// props,emmits
const props = defineProps<{ editEntity: KanrenshaPersonMasterEntityInterface, userDto: LeastUserDtoInterface, houjinApiKey: string }>();
const emits = defineEmits(["sendCancelPerson", "sendPersonInterface"]);

// よく使う定数
const BLANK: string = "";
// const SERVER_STATUS_OK: number = 200;
const SERVER_STATUS_ERROR: number = 400;
const INQUIRE_FLG: boolean = false;
const ERR_MESS_ONLY: boolean = true;
const MESS_PAGE_NAME: string = "関連者個人編集";
const INIT_CALLER: string = "no branch";

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const caller: Ref<string> = ref(INIT_CALLER);
const message: Ref<string> = ref(BLANK);

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

// 編集Dto
const editPersonDto: Ref<KanrenshaPersonDtoInterface> = ref(new KanrenshaPersonDto());

    // ユーザ呼び出し
const userDto: ComputedRef<LeastUserDtoInterface> = computed(() => props.userDto);

watch(props, () => {
    load();
});

function load() {
    if (0 != props.editEntity.kanrenshaPersonMasterId) {
        const capsuleDto: GetKanrenshaPersonCapsuleDtoInterface = new GetKanrenshaPersonCapsuleDto();
        capsuleDto.userDto = userDto.value;
        capsuleDto.masterPersonEntity = props.editEntity;

        getAuthorizedPromiseArea().then(token => {
            const url = urlBack + "/user-kanrensha/get-person";
            const method = "POST";
            const body = JSON.stringify(capsuleDto);
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'Bearer ' + token
            };
            fetch(url, { method, headers, body })
                .then(async (response) => {
                    const resultDto: GetKanrenshaPersonResultDtoInterface = await response.json();

                    if (response.status > SERVER_STATUS_ERROR) {
                        message.value = getErrorMessage(resultDto.message, ERR_MESS_ONLY);
                        infoLevel.value = MessageConstants.LEVEL_ERROR;
                        messageType.value = MessageConstants.VIEW_OK;
                        return;
                    }
                    message.value = resultDto.message;

                    if (resultDto.isFailure) {
                        infoLevel.value = MessageConstants.LEVEL_WARNING;
                        messageType.value = MessageConstants.VIEW_OK;
                        return;
                    } else {
                        editPersonDto.value = resultDto.kanrenshaPersonDto;
                    }
                })
                .catch((error) => {
                    message.value = getErrorMessage(error, ERR_MESS_ONLY);
                    infoLevel.value = MessageConstants.LEVEL_ERROR;
                    messageType.value = MessageConstants.VIEW_OK;
                    return;
                });
        }).catch((e) => {
            infoLevel.value = MessageConstants.LEVEL_ERROR;
            messageType.value = MessageConstants.VIEW_OK;

            // トークン保持または取得に失敗している場合
            if (e instanceof AccessTokenNotFoundError || e instanceof TokenRefreshError) {
                message.value = e.message;
                return;
            }

            message.value = getErrorMessage(e, INQUIRE_FLG);
            return;
        });
    }
}

/**国籍を確認する */
function nationarityConfirm() {

    infoLevel.value = MessageConstants.LEVEL_WARNING;
    messageType.value = MessageConstants.VIEW_OK;
    message.value = "個人国籍情報確認機能が作成されていません";

    // チェックされた対象だけに絞る
    // const list: PersonNoInterface[] = ref([]);
    // list.push(inputPersonNoDto);

    // // API接続時には不要な回答リスト初期処理
    // listInquireAnswer.value.splice(0);

    // // 外部APIに国籍情報問い合わせ
    // // TODO (現在はRelationPersonNoを送付しているが、PersonNoDtoを送付する形に変更)
    // // 国籍問い合わせInquireNationality.vueも編集
    // const url = "http://localhost:7080/inquire-nationarity";
    // const method = "POST";
    // const body = JSON.stringify(list.value);
    // const headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // };
    // fetch(url, { method, headers, body })
    //     .then(async (response) => {
    //         listInquireAnswer.value = await response.json();
    //         listInquireAnswer.value[0];
    //     })
    //     .catch((error) => { alert(error); });
}

function onCancel() {
    emits("sendCancelPerson");
}

function onSave() {
    emits("sendPersonInterface", editPersonDto.value);
}

function recieveSubmit() {
    infoLevel.value = 0;
    messageType.value = 0;
}
</script>
<template>

    <h3>収支報告書公開情報</h3>

    <div class="one-line">
        <div class="left-area">
            関連者コード
        </div>
        <div class="right-area">
            <input type="text" disabled="true" v-model="editPersonDto.personKanrenshaCode" class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            姓名
        </div>
        <div class="right-area">
            <input type="text" v-model="editPersonDto.inputPersonNameDto.allName" disabled="true" class="max-input">
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            住所
        </div>
        <div class="right-area">
            <input type="text" v-model="editPersonDto.inputAddressDto.addressAll" disabled="true" class="max-input">
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            職業
        </div>
        <div class="right-area">
            <input type="text" disabled="true" v-model="editPersonDto.inputShokugyouDto.allShokugyou" class="max-input">
        </div>
    </div>

    <hr>

    <h3>収支報告書基礎</h3>

    <!-- 姓名入力 -->
    <ViewInputPersonName :edit-dto="editPersonDto.inputPersonNameDto" :is-raise-edit-view="true"></ViewInputPersonName>

    <!-- 住所入力 -->
    <ViewInputAddress :edit-dto="editPersonDto.inputAddressDto"></ViewInputAddress>

    <!-- 職業入力 -->
    <ViewInputShokugyou :edit-dto="editPersonDto.inputShokugyouDto" :houjin-api-key="props.houjinApiKey">
    </ViewInputShokugyou>

    <!-- 連絡先入力 -->
    <ViewInputAccess :edit-dto="editPersonDto.inputAccessDto"></ViewInputAccess>


    <hr>

    <h3>編集内容(違反判定情報)</h3>

    <div class="one-line">
        <div class="left-area">
            国籍
        </div>
        <div class="right-area">
            <input type="checkbox" v-model="editPersonDto.isForeign">外国人である<span class="left-space">
                <button @click="nationarityConfirm">確認する(未実装)</button></span>
        </div>
    </div>

    <!-- 
    <hr>
    <h3>変更履歴</h3>

    <div class="left-area">
        履歴表示
    </div>
    <div class="right-area">
        <button>展開</button>
    </div>
    <div class="clear-both"></div>
    <hr>
    -->

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">送信</button>
    </div>

    <!-- メッセージ表示 -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
            :caller="caller" @send-submit="recieveSubmit">
        </MessageView>
    </div>


</template>

<style scoped></style>
