<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { SelectOptionStringDto, type SelectOptionStringDtoInterface } from '../../dto/select_options/selectOptionStringDto';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from '../../dto/frameworkCapsuleDto';
import { MessageConstants } from '../../dto/message/messageConstants';
import RoutePathConstants from '../../../../routePathConstants';
import MessageView from '../message/MessageView.vue';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors.ts';
import { SearchAllCityLgcodeCapsuleDto, type SearchAllCityLgcodeCapsuleDtoInterface } from '../../dto/postal/searchAllCityLgcodeCapsuleDto.ts';

const props = defineProps<{ isDigit5: boolean, lgCode: string }>();
const emits = defineEmits(["sendLgCode"]);

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

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

const lgCodeEdit: Ref<string> = ref(BLANK);;

const selectedPref: Ref<string> = ref(BLANK);
const selectedCity: Ref<string> = ref(BLANK);

const prefOptions: Ref<SelectOptionStringDtoInterface[]> = ref([]);
const cityOptions: Ref<SelectOptionStringDtoInterface[]> = ref([]);


watch(props, () => {
    lgCodeEdit.value = props.lgCode;
});

const digitlgcode: ComputedRef<number> = computed(() => {
    if (props.isDigit5) {
        return 5;
    } else {
        return 6;
    }
});

function onPrefSearch() {
    // 県名検索
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: FrameworkCapsuleDtoInterface = new FrameworkCapsuleDto();
        const url = urlBack + "/lgcode-pref/search";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                prefOptions.value = await response.json();
            })
            .catch(() => {
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                title.value = "システムエラーが発生しました";
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

}


function searchCity() {

    // 地名検索
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: SearchAllCityLgcodeCapsuleDtoInterface = new SearchAllCityLgcodeCapsuleDto();
        conditionDto.isSearch5Digit = props.isDigit5;
        conditionDto.lgCode = selectedPref.value;

        const url = urlBack + "/lgcode-city/search";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                cityOptions.value = await response.json();
            })
            .catch(() => {
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                title.value = "システムエラーが発生しました";
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

}


function onChangePref() {

    lgCodeEdit.value = selectedPref.value;

    const selectDto: SelectOptionStringDtoInterface | undefined =
        prefOptions.value.filter((d) => d.value == lgCodeEdit.value)[0];
    let text = BLANK;
    if (undefined !== selectDto) {
        text = selectDto.text;
    }
    // 値が正であれ誤であれ、値そのものは常に同期する
    doEmit(lgCodeEdit.value, text);
    // 必要に応じて地方を検索
    searchCity();
}


function onChangeCity() {
    lgCodeEdit.value = selectedCity.value;

    const selectDto: SelectOptionStringDtoInterface | undefined =
        cityOptions.value.filter((d) => d.value == lgCodeEdit.value)[0];
    let text = BLANK;
    if (undefined !== selectDto) {
        text = selectDto.text;
    }
    // 値が正であれ誤であれ、値そのものは常に同期する
    doEmit(lgCodeEdit.value, text);
}


function onDirectInput() {

    let text = BLANK;
    // 県名がセットできる場合はセット
    if (lgCodeEdit.value.length >= 2) {
        const lgCodePref = lgCodeEdit.value.substring(0, 2);
        if (selectedPref.value !== lgCodePref) {
            const selectDto: SelectOptionStringDtoInterface | undefined =
                prefOptions.value.filter((d) => d.value == lgCodeEdit.value)[0];
            if (undefined !== selectDto) {
                selectedPref.value = lgCodeEdit.value;
                text = selectDto.text;
                searchCity();
            }
        }
    }

    // 該当の地方自治体コードがあれば設定
    if (lgCodeEdit.value.length === digitlgcode.value) {

        const selectDto: SelectOptionStringDtoInterface | undefined =
            cityOptions.value.filter((d) => d.value == lgCodeEdit.value)[0];
        if (selectDto !== undefined) {
            selectedCity.value = lgCodeEdit.value;
            text = selectDto.text;
        }
    }

    if (lgCodeEdit.value === null || lgCodeEdit.value === undefined || lgCodeEdit.value === BLANK) {
        selectedPref.value = BLANK;
        selectedCity.value = BLANK;
        text = BLANK;
    }

    // 値が正であれ誤であれ、値そのものは常に同期する
    doEmit(lgCodeEdit.value, text)
}

function onClickPart() {
    if (prefOptions.value.length < 1) {
        onPrefSearch();
    }
}

// emit送信専用
function doEmit(value: string, text: string) {

    const optionDto: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    optionDto.value = value;
    optionDto.text = text;
    emits("sendLgCode", optionDto);
}

function recieveSubmit(button: string) {
    console.log(button);
    // TODO ボタンタイプ別の挙動はこの中で変える

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}
</script>
<template>
    <input v-model="lgCodeEdit" type="text" class="short-input" :maxlength="digitlgcode" @input="onDirectInput"
        @click="onClickPart">

    <select v-model="selectedPref" class="left-space" @change="onChangePref" @click="onClickPart">
        <option v-for="dto in prefOptions" :value="dto.value">{{ dto.text }}</option>
    </select>
    <select v-model="selectedCity" class="left-space" @change="onChangeCity" @click="onClickPart">
        <option v-for="dto in cityOptions" :value="dto.value">{{ dto.text }}</option>
    </select>

    <!-- メッセージ表示 -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
            @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped></style>
