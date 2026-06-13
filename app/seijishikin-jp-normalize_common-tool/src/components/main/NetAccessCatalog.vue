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
import { useUserInfoStoreCommon } from '..';
import SearchHoujinNo from './common/search_houjin_no/SearchHoujinNo.vue';
import { HoujinNoDto, type HoujinNoDtoInterface } from './dto/houjin_no/houjinNoDto';
import { KanrenshaPersonMasterEntity, SearchKanrenshaPerson, type KanrenshaPersonMasterEntityInterface } from '../..';
import SearchKanrenshaKigyouDt from './common/search_kanrensha/SearchKanrenshaKigyouDt.vue';
import SearchKanrenshaSeijidantai from './common/search_kanrensha/SearchKanrenshaSeijidantai.vue';
import { KanrenshaKigyouDtMasterEntity, type KanrenshaKigyouDtMasterEntityInterface } from './entity/kanrenshaKigyouDtMasterEntity';
import { KanrenshaSeijidantaiMasterEntity, type KanrenshaSeijidantaiMasterEntityInterface } from './entity/kanrenshaSeijidantaiMasterEntity';

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
const inputKanrenshaLeastDto: Ref<InputKanrenshaPersonLeastDtoInterface> = ref(new InputKanrenshaPersonLeastDto());
inputKanrenshaLeastDto.value.personKanrenshaCode = "99-asgzz";
inputKanrenshaLeastDto.value.personName = "あれあれ";
const inputHojinNo: Ref<HoujinNoDtoInterface> = ref(new HoujinNoDto());
function onCancel() {
    history.back();
}

watch(longToken, () => {
    // 保存していたアクセストークンと有効期限を取得
    const userInfo = useUserInfoStoreCommon();
    userInfo.jwtDto.refreshToken = longToken.value;
    userInfo.jwtDto.accessToken = longToken.value;
});

const isSearchHoujinNo: Ref<boolean> = ref(false);
function onSearchHoujinNo() {
    isSearchHoujinNo.value = true;
}
function recieveCancelHoujinNo() {
    isSearchHoujinNo.value = false;
}
function recieveHoujinNoInterface(selectedDto: HoujinNoDtoInterface) {
    inputHojinNo.value = structuredClone(toRaw(selectedDto));
    isSearchHoujinNo.value = false;
}


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

        <!-- 関連者最低限 -->
        <ViewInputKanrenshaLeast :edit-dto="inputKanrenshaLeastDto" title="会計責任者"></ViewInputKanrenshaLeast>

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

        <div class="footer">
            <button @click="onCancel" class="footer-button">キャンセル</button>
        </div>

        <!-- 法人番号検索 -->
        <div v-if="isSearchHoujinNo" class="overBackground"></div>
        <div class="overComponent" v-if="isSearchHoujinNo">
            <SearchHoujinNo @send-cancel-houjin-no="recieveCancelHoujinNo"
                @send-houjin-no-interface="recieveHoujinNoInterface"></SearchHoujinNo>
        </div>

        <!-- 企業団体検索 -->
        <div v-if="isSearchKigyouDt" class="overBackground"></div>
        <div class="overComponent" v-if="isSearchKigyouDt">
            <SearchKanrenshaKigyouDt :is-raise-commponet="true" @send-cancel-kigyou-dt="recieveCancelKigyouDt"
                @send-kigyou-dt-interface="recieveKigyouDtInterface"></SearchKanrenshaKigyouDt>
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
