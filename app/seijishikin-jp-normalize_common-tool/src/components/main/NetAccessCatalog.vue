<script setup lang="ts">
import { ref, toRaw, watch, type Ref } from 'vue';
import { MessageConstants } from './dto/message/messageConstants';
import MessageView from './common/message/MessageView.vue';
import { InputAccessDto, type InputAccessDtoInterface } from './dto/input_access/inputAccessDto';
import { InputAddressDto, type InputAddressDtoInterface } from './dto/Input_address/inputAddressDto';
import ViewInputAccess from './common/input_access/ViewInputAccess.vue';
import ViewInputAddressShort from './common/input_address_short/ViewInputAddressShort.vue';
import ViewInputAddress from './common/input_address/ViewInputAddress.vue';
import ViewInputKanrenshaLeast from './common/input_person_name/ViewInputKanrenshaLeast.vue';
import { InputKanrenshaPersonLeastDto, type InputKanrenshaPersonLeastDtoInterface } from './dto/input_person_name/inputKanrenshaPersonLeastDto';
import { AccessTokenNotFoundError, FrameworkCapsuleDto, getAuthorizedPromiseArea, getErrorMessage, LeastUserDto, TokenRefreshError, useUserInfoStoreCommon, type FrameworkCapsuleDtoInterface, type LeastUserDtoInterface } from '..';
import { KanrenshaPersonMasterEntity, SearchKanrenshaPerson, type KanrenshaPersonMasterEntityInterface } from '../..';
import SearchKanrenshaKigyouDt from './common/search_kanrensha/SearchKanrenshaKigyouDt.vue';
import SearchKanrenshaSeijidantai from './common/search_kanrensha/SearchKanrenshaSeijidantai.vue';
import { KanrenshaKigyouDtMasterEntity, type KanrenshaKigyouDtMasterEntityInterface } from './entity/kanrenshaKigyouDtMasterEntity';
import { KanrenshaSeijidantaiMasterEntity, type KanrenshaSeijidantaiMasterEntityInterface } from './entity/kanrenshaSeijidantaiMasterEntity';
import BaseLgCode from '../test/common/input_lgcode/BaseLgCode.vue';
import BaseBuildingAddress from '../test/common/input_address/BaseBuildingAddress.vue';
import BaseCompareAddress from '../test/common/input_address/BaseCompareAddress.vue';
import BaseShokugyou from '../test/common/input_shokugyou/BaseShokugyou.vue';
import RoutePathConstants from '../../routePathConstants.ts';
import { type GetUserDtoResultDtoInterface } from './dto/user/getUserDtoResultDto.ts';

//仮
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const INIT_BOOLEAN: boolean = false;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// const SEARCH_LIMIT: number = 20;
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

// token
const longToken: Ref<string> = ref(BLANK);

function recieveSubmit(button: string) {
    // TODO ボタンタイプ別の挙動はこの中で変える
    console.log(button);

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}

// 共通入力用変数
const inputAccessDto: Ref<InputAccessDtoInterface> = ref(new InputAccessDto());
const inputAddressDto: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputAddressDtoShort: Ref<InputAddressDtoInterface> = ref(new InputAddressDto());
const inputKanrenshaLeastDto: Ref<InputKanrenshaPersonLeastDtoInterface> = ref(new InputKanrenshaPersonLeastDto());
// const inputHojinNo: Ref<HoujinNoDtoInterface> = ref(new HoujinNoDto());
function onCancel() {
    history.back();
}

const userDto: Ref<LeastUserDtoInterface> = ref(new LeastUserDto());

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

const masterEntityKigyouDt: Ref<KanrenshaKigyouDtMasterEntityInterface> = ref(new KanrenshaKigyouDtMasterEntity());
const masterEntityPerson: Ref<KanrenshaPersonMasterEntityInterface> = ref(new KanrenshaPersonMasterEntity());
const masterEntitySeijidantai: Ref<KanrenshaSeijidantaiMasterEntityInterface> = ref(new KanrenshaSeijidantaiMasterEntity());


const isSearchKigyouDt: Ref<boolean> = ref(false);
function onSearchKigyouDt() {
    isSearchKigyouDt.value = true;
}
function recieveCancelKigyouDt() {
    isSearchKigyouDt.value = false;
}
function recieveKigyouDtInterface(selectedEntity: KanrenshaKigyouDtMasterEntityInterface) {
    masterEntityKigyouDt.value = structuredClone(toRaw(selectedEntity));
    isSearchKigyouDt.value = false;
}

const isSearchPerson: Ref<boolean> = ref(false);
function onSearchPerson() {
    isSearchPerson.value = true;
}
function recieveCancelPerson() {
    isSearchPerson.value = false;
}
function recievePersonInterface(selectedEntity: KanrenshaPersonMasterEntityInterface) {
    masterEntityPerson.value = structuredClone(toRaw(selectedEntity));
    isSearchPerson.value = false;
}


const isSearchSeijidantai: Ref<boolean> = ref(false);
function onSearchSeijidantai() {
    isSearchSeijidantai.value = true;
}
function recieveCancelSeijidantai() {
    isSearchSeijidantai.value = false;
}
function recieveSeijidantaiInterface(selectedEntity: KanrenshaSeijidantaiMasterEntityInterface) {
    masterEntitySeijidantai.value = structuredClone(toRaw(selectedEntity));
    isSearchSeijidantai.value = false;
}

function onShowUser() {
    alert(userDto.value.userPersonId + userDto.value.userPersonName);
}
</script>
<template>
    <div class="container">

        <h1>コンポーネントカタログ(back側処理ネットアクセスあり)</h1><br>

        <div class="one-line">
            <ol>
                <li>法人番号検索を利用した独自サービスを提供しています</li>
                <li>アドレス・ベース・レジストリを利用した独自サービスを提供しています</li>
            </ol>
        </div>


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

        <!-- 職業 -->
        <BaseShokugyou></BaseShokugyou>

        <!-- 関連者最低限 -->
        <ViewInputKanrenshaLeast :edit-dto="inputKanrenshaLeastDto" title="会計責任者"></ViewInputKanrenshaLeast>

        <!-- 建物住所設定時専用 -->
        <BaseBuildingAddress></BaseBuildingAddress>

        <!-- 比較住所設定時専用 -->
        <BaseCompareAddress></BaseCompareAddress>


        <!--
        <h3>法人番号</h3>
        <div class="one-line">
            <div class="left-area">
                法人番号
            </div>
            <div class="right-area">
                <input type="text" v-model="inputHojinNo.houjinNo" class="max-input" disabled="true"><button
                    @click="onSearchHoujinNo">検索</button>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                商号
            </div>
            <div class="right-area">
                <input type="text" v-model="inputHojinNo.houjinName" class="max-input" disabled="true">
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所
            </div>
            <div class="right-area">
                <input type="text" v-model="inputHojinNo.addressPrefecture" class="max-input" disabled="true">
            </div>
        </div>
 -->

        <h3>企業団体検索</h3>
        <div class="one-line">
            <div class="left-area">
                <button @click="onSearchKigyouDt">企業団体検索</button>
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <input type="text" v-model="masterEntityKigyouDt.kigyouDtKanrenshaCode" class="max-input"
                            disabled="true">
                    </div>
                    <div>
                        <input type="url" v-model="masterEntityKigyouDt.kanrenshaName" class="max-input"
                            disabled="true">
                    </div>
                    <div>
                        <input type="text" v-model="masterEntityKigyouDt.allAddress" class="name-input" disabled="true">
                    </div>
                </div>
            </div>
        </div>

        <h3>個人団体検索</h3>
        <div class="one-line">
            <div class="left-area">
                <button @click="onSearchPerson">個人検索</button>
            </div>
            <div class="form-group-vertical">
                <div>
                    <input type="text" v-model="masterEntityPerson.personKanrenshaCode" class="max-input"
                        disabled="true">
                </div>
                <div>
                    <input type="url" v-model="masterEntityPerson.kanrenshaName" class="max-input" disabled="true">
                </div>
                <div>
                    <input type="text" v-model="masterEntityPerson.allAddress" class="name-input" disabled="true">
                </div>
            </div>
            <div class="right-area">
            </div>
        </div>

        <h3>政治団体検索</h3>
        <div class="one-line">
            <div class="left-area">
                <button @click="onSearchSeijidantai">政治団体検索</button>
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <input type="text" v-model="masterEntitySeijidantai.seijidantaiKanrenshaCode" class="max-input"
                            disabled="true">
                    </div>
                    <div>
                        <input type="url" v-model="masterEntitySeijidantai.kanrenshaName" class="max-input"
                            disabled="true">
                    </div>
                    <div>
                        <input type="text" v-model="masterEntitySeijidantai.allAddress" class="name-input"
                            disabled="true">
                    </div>
                </div>
            </div>
        </div>

        <!-- 地方自治体コード -->
        <h3>地方自治体コード</h3>
        <BaseLgCode></BaseLgCode>


        <h3>ユーザ情報取得</h3>
        <div class="one-line">
            <div class="left-area">
                <button @click="onShowUser">ユーザ情報表示</button>
            </div>
            <div class="right-area">
            </div>
        </div>

        <div class="one-line">
            <RouterLink to="/manage-kanrensha">関連者統合(検索編集)</RouterLink>
        </div>

        <div class="footer">
            <button @click="onCancel" class="footer-button">キャンセル</button>
        </div>


        <!-- 企業団体検索 -->
        <div v-if="isSearchKigyouDt" class="overBackground"></div>
        <div class="overComponent" v-if="isSearchKigyouDt">
            <SearchKanrenshaKigyouDt :is-raise-commponet="true" :is-edit="true" :user-dto="userDto"
                @send-cancel-kigyou-dt="recieveCancelKigyouDt" @send-kigyou-dt-interface="recieveKigyouDtInterface">
            </SearchKanrenshaKigyouDt>
        </div>

        <!-- 個人検索 -->
        <div v-if="isSearchPerson" class="overBackground"></div>
        <div class="overComponent" v-if="isSearchPerson">
            <SearchKanrenshaPerson :is-raise-commponet="true" @send-cancel-person="recieveCancelPerson"
                @send-person-interface="recievePersonInterface"></SearchKanrenshaPerson>
        </div>

        <!-- 政治団体検索 -->
        <div v-if="isSearchSeijidantai" class="overBackground"></div>
        <div class="overComponent" v-if="isSearchSeijidantai">
            <SearchKanrenshaSeijidantai :is-raise-commponet="true" @send-cancel-seijidantai="recieveCancelSeijidantai"
                @send-seijidantai-interface="recieveSeijidantaiInterface"></SearchKanrenshaSeijidantai>
        </div>

        <!-- メッセージ -->
        <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
            <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
                :caller="caller" @send-submit="recieveSubmit">
            </MessageView>
        </div>

    </div>
</template>

<style scoped></style>
