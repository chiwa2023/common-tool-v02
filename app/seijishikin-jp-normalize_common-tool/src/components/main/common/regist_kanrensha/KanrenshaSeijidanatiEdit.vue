<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import RoutePathConstants from '../../../../routePathConstants';
import { GetKanrenshaSeijidantaiCapsuleDto, type GetKanrenshaSeijidantaiCapsuleDtoInterface } from '../../dto/kanrensha/getKanrenshaSeijidantaiCapsuleDto';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { KanrenshaSeijidantaiDto, type KanrenshaSeijidantaiDtoInterface } from '../../dto/kanrensha/kanrenshaSeijidantaiDto';
import type { GetKanrenshaSeijidantaiResultDtoInterface } from '../../dto/kanrensha/getKanrenshaSeijidantaiResultDto';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import type { LeastUserDtoInterface } from '../../dto/user/leastUserDto';
import type { KanrenshaSeijidantaiMasterEntityInterface } from '../../entity/kanrenshaSeijidantaiMasterEntity';
import { MessageConstants } from '../../dto/message/messageConstants';
import { getErrorMessage } from '../../dto/errorFunction';
import ViewInputOrgName from '../input_org_name/ViewInputOrgName.vue';
import ViewInputAddress from '../input_address/ViewInputAddress.vue';
import ViewInputAccess from '../input_access/ViewInputAccess.vue';
import ViewInputKanrenshaLeast from '../input_person_name/ViewInputKanrenshaLeast.vue';
import MessageView from '../message/MessageView.vue';

// props,emit
const props = defineProps<{ editEntity: KanrenshaSeijidantaiMasterEntityInterface, userDto: LeastUserDtoInterface }>();
const emits = defineEmits(["sendCancelSeijidantai", "sendSeijidantaiInterface"]);


// よく使う定数
const BLANK: string = "";
// const SERVER_STATUS_OK: number = 200;
const SERVER_STATUS_ERROR: number = 400;
const INQUIRE_FLG: boolean = false;
const ERR_MESS_ONLY: boolean = true;
const MESS_PAGE_NAME: string = "関連者政治団体編集";
const INIT_CALLER: string = "no branch";

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const caller: Ref<string> = ref(INIT_CALLER);
const message: Ref<string> = ref(BLANK);

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

const editSeijidantaiDto: Ref<KanrenshaSeijidantaiDtoInterface> = ref(new KanrenshaSeijidantaiDto());

// ユーザ呼び出し
const userDto: ComputedRef<LeastUserDtoInterface> = computed(() => props.userDto);

watch(props, () => {
    load();
});

function load() {
    const capsuleDto: GetKanrenshaSeijidantaiCapsuleDtoInterface = new GetKanrenshaSeijidantaiCapsuleDto();
    capsuleDto.userDto = userDto.value;
    capsuleDto.masterSeijidantaiEntity = props.editEntity;

    getAuthorizedPromiseArea().then(token => {
        const url = urlBack + "/user-kanrensha/get-seijidantai";
        const method = "POST";
        const body = JSON.stringify(capsuleDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: GetKanrenshaSeijidantaiResultDtoInterface = await response.json();

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
                    editSeijidantaiDto.value = resultDto.kanrenshaSeijidantaiDto;
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


function onCancel() {
    emits("sendCancelSeijidantai");
}

function onSave() {

    emits("sendSeijidantaiInterface", editSeijidantaiDto.value);
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
            <input type="text" disabled="true" v-model="editSeijidantaiDto.seijidantaiKanrenshaCode" class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            政治団体名称
        </div>
        <div class="right-area">
            <input type="text" v-model="editSeijidantaiDto.inputOrgNameDto.orgName" disabled="true" class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            住所
        </div>
        <div class="right-area">
            <input type="text" v-model="editSeijidantaiDto.inputAddressDto.addressAll" disabled="true"
                class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            代表者
        </div>
        <div class="right-area">
            <input type="text" v-model="editSeijidantaiDto.orgDelegateLeastDto.personName" disabled="true"
                class="max-input">
        </div>
    </div>

    <hr>

    <h3>基礎情報</h3>

    <!-- 団体名称入力  -->
    <ViewInputOrgName :edit-dto="editSeijidantaiDto.inputOrgNameDto"></ViewInputOrgName>

    <!-- 団体情報 -->
    <div class="one-line">
        <div class="left-area">
            団体区分
        </div>
        <div class="right-area">
            <span><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'01'"> 政党要件を満たす政党</span>
            <span class="left-space"><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'02'">
                政党の支部</span>
            <span class="left-space"><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'03'">
                政治資金団体</span>
            <br>
            <span><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'04'">
                政治資金規正法第18条の2第1項の規定による政治団体</span>
            <span class="left-space"><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'05'">
                その他の政治団体</span>
            <span class="left-space"><input type="radio" v-model="editSeijidantaiDto.dantaiKbn" :value="'06'">
                その他の政治団体の支部</span>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            政治団体番号
        </div>
        <div class="right-area">
            <input type="text" v-model="editSeijidantaiDto.poliOrgNo" class="code-input">
        </div>
    </div>

    <!-- 住所入力 -->
    <ViewInputAddress :edit-dto="editSeijidantaiDto.inputAddressDto"></ViewInputAddress>

    <!-- 連絡先入力 -->
    <ViewInputAccess :edit-dto="editSeijidantaiDto.inputAccessDto"></ViewInputAccess>

    <!-- 団体代表者 -->
    <ViewInputKanrenshaLeast :edit-dto="editSeijidantaiDto.orgDelegateLeastDto" title="団体代表者"></ViewInputKanrenshaLeast>

    <!-- 会計責任者 -->
    <ViewInputKanrenshaLeast :edit-dto="editSeijidantaiDto.accounrMgrLeastDto" title="会計責任者"></ViewInputKanrenshaLeast>
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
