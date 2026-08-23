<script setup lang="ts">
import { ref, type Ref } from 'vue';
import HoujinSbtsConstants from '../../dto/houjin_no/houjinSbtsConstants';
import type { HoujinNoDtoInterface } from '../../dto/houjin_no/houjinNoDto';
import { SearchHoujinNoCapsuleDto, type SearchHoujinNoCapsuleDtoInterface } from '../../dto/houjin_no/searchHoujinNoCapsuleDto';
import { SearchHoujinNoResultDto, type SearchHoujinNoResultDtoInterface } from '../../dto/houjin_no/searchHoujinNoResultDto';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { MessageConstants } from '../../dto/message/messageConstants';
import RoutePathConstants from '../../../../routePathConstants';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import PagingControl from '../paging/PagingControl.vue';
import MessageView from '../message/MessageView.vue';
import InputLgcode from '../input_lgcode/InputLgcode.vue';
import type { SelectOptionStringDtoInterface } from '../../dto/select_options/selectOptionStringDto.ts';
import HoujinShoriKbnConstants from '../../dto/houjin_no/houjinShoriKbnConstants.ts';
import { getErrorMessage, getErrorUniqueIdMessage } from '../../dto/errorFunction.ts';

// props,emit
const props = defineProps<{ houjinApiKey: string }>();
const emits = defineEmits(["sendCancelHoujinNo", "sendHoujinNoInterface"]);

// よく使う定数
const BLANK: string = "";
const INIT_NUMBER: number = 0;
const INIT_BOOLEAN: boolean = false;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
const SEARCH_LIMIT: number = 20;
const INQUIRE_FLG: boolean = false;
const ERR_MESS_ONLY: boolean = true;
const MESS_PAGE_NAME: string = "法人番号検索モーダル";
const INIT_CALLER: string = "no branch";

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const caller: Ref<string> = ref(INIT_CALLER);
const message: Ref<string> = ref(BLANK);

// Paging
const pageNumber: Ref<number> = ref(INIT_NUMBER);
const allCount: Ref<number> = ref(INIT_NUMBER);
const limit: Ref<number> = ref(SEARCH_LIMIT);

// 法人番号は常に2000件で取れてくる
const limitHoujin: number = 2000;

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

const houjinListView: Ref<HoujinNoDtoInterface[]> = ref([])
const selectedRow: Ref<string> = ref("");

const capsuleDto: Ref<SearchHoujinNoCapsuleDtoInterface> = ref(new SearchHoujinNoCapsuleDto());
capsuleDto.value.appId = props.houjinApiKey;
capsuleDto.value.type = "02" // CSV-Unicode
// name は画面検索条件(名称)
// mode
capsuleDto.value.mode = "1" // 前方一致
// target 指定しない
// addres は画面検索条件(地方自治体コード) 
// kind 種別は指定しない
// change 履歴はもらわない
// close
capsuleDto.value.close = "1" // 閉鎖を含める
// from 登記日時検索は指定しない
// to 登記日時検索は指定しない
// divide ページ番号は1(1始まり) ただし名称を追加で入れることを強制している時点でdivide = 1と初期化
capsuleDto.value.divide = 1;

const resultDto: Ref<SearchHoujinNoResultDtoInterface> = ref(new SearchHoujinNoResultDto());
const isConditionChange: Ref<boolean> = ref(INIT_BOOLEAN);

function onSearch() {
    // 名称必須
    if (undefined === capsuleDto.value.name || null === capsuleDto.value.name || BLANK === capsuleDto.value.name) {
        const element = document.querySelector("#target-element");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // caller.value = "法人番号検索";
        message.value = "検索条件法人名称を指定してください";
        infoLevel.value = MessageConstants.LEVEL_WARNING;
        messageType.value = MessageConstants.VIEW_OK;

        return;
    }
    // 地方自治体コードは空でも問題なし

    // 名称・地方自治体コードに検索条件の変更があったときは分割番号を初期化
    if (isConditionChange.value) {
        capsuleDto.value.divide = 1;
    }

    getAuthorizedPromiseArea().then(token => {
        const url = urlBack + "/houjin-no/get-external";
        const method = "POST";
        const body = JSON.stringify(capsuleDto.value);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                resultDto.value = await response.json();
                allCount.value = resultDto.value.totalCount;

                if (resultDto.value.isFailure) {
                    infoLevel.value = MessageConstants.LEVEL_ERROR;
                    messageType.value = MessageConstants.VIEW_OK;
                    // caller.value = MESS_PAGE_NAME;
                    message.value = resultDto.value.message;
                    return;
                }

                if (0 == allCount.value) {
                    infoLevel.value = MessageConstants.LEVEL_INFO;
                    messageType.value = MessageConstants.VIEW_TOAST;
                    // caller.value = MESS_PAGE_NAME;
                    message.value = "検索結果が0件でした";
                    return;
                } else {
                    const startCount: number = getStartCount();
                    const sliceNumber: number = getSliceCount(startCount, resultDto.value.houjinNoList.length);
                    houjinListView.value.splice(0);
                    houjinListView.value.push(...resultDto.value.houjinNoList.slice(startCount, sliceNumber));
                    // 検索直後は検索条件変更なし
                    isConditionChange.value = false;
                }
            })
            .catch((error) => {
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                // caller.value = MESS_PAGE_NAME;
                message.value = getErrorMessage(error, ERR_MESS_ONLY);
            });
    }).catch((e) => {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;

        if (e instanceof AccessTokenNotFoundError) {
            // トークン保持ができていない場合
            // caller.value = "現在トークンが存在しません";
            message.value = e.message;
            return;
        }
        if (e instanceof TokenRefreshError) {
            // 取得に失敗している場合
            // caller.value = "有効期限まじかのトークンを再取得できませんでした";
            message.value = e.message;
            return;
        }
        // caller.value = MESS_PAGE_NAME;
        message.value = getErrorMessage(e, INQUIRE_FLG);
        return;
    });
}

/**  
 * 入力内容を破棄する
 */
function onCancel() {
    emits("sendCancelHoujinNo");
}

/**  
 * 入力内容を保存する
 */
function onSave() {
    // Idでフィルタしているので1件だけ取得できる
    const selectedDto: HoujinNoDtoInterface | undefined = houjinListView.value.filter((e) => e.houjinNo === selectedRow.value)[0];
    if (undefined !== selectedDto) {
        emits("sendHoujinNoInterface", selectedDto);
    } else {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;
        // caller.value = MESS_PAGE_NAME;
        message.value = getErrorUniqueIdMessage(selectedRow.value);
    }
}

function recievePagingNumber(selecteddNumber: number) {

    if (SEARCH_LIMIT * selecteddNumber > allCount.value) {
        const element = document.querySelector("#target-element");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // caller.value = "法人番号検索";
        message.value = "ページ番号は" + Math.ceil(allCount.value / SEARCH_LIMIT) + "までで設定しください";
        infoLevel.value = MessageConstants.LEVEL_WARNING;
        messageType.value = MessageConstants.VIEW_OK;
        return;
    }

    if (isConditionChange.value) {
        // 検索条件に変更がある場合は初期化
        pageNumber.value = INIT_NUMBER;
        onSearch();
        return;
    }

    pageNumber.value = selecteddNumber;
    const pointCount: number = limit.value * pageNumber.value;
    const startCount: number = getStartCount();

    // 現在のメモリで持ってる2000件リスト内であればリスト切り出し
    if (resultDto.value.divideNumber * limitHoujin > pointCount) {
        houjinListView.value = resultDto.value.houjinNoList.slice(startCount, startCount + limit.value);
    } else {
        // divideをセット
        capsuleDto.value.divide = Math.floor(pointCount / limitHoujin) + 1;
        // 2000件リスト外であれば再取得
        onSearch();
    }
}


function getStartCount(): number {
    return (limit.value * pageNumber.value) - ((resultDto.value.divideNumber - 1) * limitHoujin);
}

function getSliceCount(start: number, size: number): number {

    if (size > (SEARCH_LIMIT + start)) {
        return start + SEARCH_LIMIT;
    } else {
        return start + size;
    }
}

function recieveSubmit() {
    // メッセージ表示後の分岐はない

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}

const pointPage: Ref<number> = ref(1); // ページ番号は1始まり

function recieveLgCode5(optionDto: SelectOptionStringDtoInterface) {
    capsuleDto.value.address = optionDto.value;
    isConditionChange.value = true;
}

function onNameChange() {
    isConditionChange.value = true;
}

</script>
<template>
    <h3 class="accsent-h3" id="target-element">法人検索</h3>

    <h3 class="indent-h3">検索条件</h3>

    <div class="one-line">
        <div class="left-area">
            検索方式
        </div>
        <div class="right-area">
            <span> <input type="radio" v-model="capsuleDto.mode" :value="'1'" id="searchMode">前方一致</span>
            <span class="left-space"> <input type="radio" v-model="capsuleDto.mode" :value="'2'"
                    id="searchMode">部分一致</span>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            名前(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.name" class="name-input" @change="onNameChange">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            地方自治体コード
        </div>
        <div class="right-area">
            <InputLgcode :is-digit5="true" :lg-code="capsuleDto.address" @send-lg-code="recieveLgCode5"></InputLgcode>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            検索
        </div>
        <div class="right-area">
            <button @click="onSearch" class="left-space">検索</button>
        </div>
    </div>

    <h3 class="indent-h3">検索結果</h3>

    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>
    <div v-if="allCount > 0" class="one-line">
        <input type="number" v-model="pointPage"><button @click="recievePagingNumber(pointPage - 1)"
            class="left-space">指定ページに移動</button><br>
    </div>
    <div class="one-line">
        <table>
            <tbody>
                <tr>
                    <th>&nbsp;&nbsp;</th>
                    <th>法人番号</th>
                    <th>法人種別</th>
                    <th>商号</th>
                    <th>住所</th>
                    <th>処理区分</th>
                </tr>
                <tr v-for="dto in houjinListView" :key="dto.houjinNo">
                    <td><input type="radio" v-model="selectedRow" :value="dto.houjinNo" id="politicalOrganizationId">
                    </td>
                    <td>{{ dto.houjinNo }}</td>
                    <td>{{ HoujinSbtsConstants.getLabel(dto.kind) }}</td>
                    <td>{{ dto.houjinName }}</td>
                    <td>{{ dto.prefectureName }}{{ dto.cityName }}</td>
                    <td>{{ HoujinShoriKbnConstants.getLabel(dto.process) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>
    <div v-if="allCount > 0" class="one-line">
        <input type="number" v-model="pointPage"><button @click="recievePagingNumber(pointPage - 1)"
            class="left-space">指定ページに移動</button><br>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

    <div class="one-line-caution">
        ※この機能は、国税庁の法人番号システムのWeb-API機能を利用して取得した情報をもとに作成していますが、サービスの内容は国税庁によって保証されたものではありません<br>
        出典：法人番号検索API(国税庁) <a
            href="https://www.houjin-bangou.nta.go.jp/webapi/index.html">https://www.houjin-bangou.nta.go.jp/webapi/index.html</a>
    </div>

    <!-- メッセージ -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="MESS_PAGE_NAME" :message="message"
            :caller="caller" @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped></style>
