<script setup lang="ts">
import { ref, type Ref } from 'vue';
import mockGetHoujinList from '../../../test/common/search_houjin_no/mock/mockGetHoujinList';
import { MessageConstants } from '../../../main/dto/message/messageConstants';
import type { HoujinNoDtoInterface } from '../../../main/dto/houjin_no/houjinNoDto';
import { SearchHoujinNoCapsuleDto, type SearchHoujinNoCapsuleDtoInterface } from '../../../main/dto/houjin_no/searchHoujinNoCapsuleDto';
import { SearchHoujinNoResultDto, type SearchHoujinNoResultDtoInterface } from '../../../main/dto/houjin_no/searchHoujinNoResultDto';
import HoujinShoriKbnConstants from '../../../main/dto/houjin_no/houjinShoriKbnConstants';
import HoujinSbtsConstants from '../../../main/dto/houjin_no/houjinSbtsConstants';
import PagingControl from '../../../main/common/paging/PagingControl.vue';

// props,emit
const emits = defineEmits(["sendCancelHoujinNo", "sendHoujinNoInterface"]);


// よく使う定数
const BLANK: string = "";
const INIT_NUMBER: number = 0;
// const INIT_BOOLEAN: boolean = false;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
const SEARCH_LIMIT: number = 20;

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const title: Ref<string> = ref(BLANK);
const message: Ref<string> = ref(BLANK);

// Paging
const pageNumber: Ref<number> = ref(INIT_NUMBER);
const allCount: Ref<number> = ref(INIT_NUMBER);
const limit: Ref<number> = ref(SEARCH_LIMIT);

// 法人番号は常に2000件で取れてくる
const limitHoujin: number = 2000;

// back側アクセス
// const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

const houjinListView: Ref<HoujinNoDtoInterface[]> = ref([])
// const houjinListSearch: Ref<HoujinNoDtoInterface[]> = ref([])
const selectedRow: Ref<String> = ref("");


const capsuleDto: Ref<SearchHoujinNoCapsuleDtoInterface> = ref(new SearchHoujinNoCapsuleDto());

// TODO アプリケーションID取得
capsuleDto.value.type = "02" // CSV-Unicode
capsuleDto.value.mode = "1" // 前方一致
capsuleDto.value.close = "1" // 閉鎖を含める

const resultDto: Ref<SearchHoujinNoResultDtoInterface> = ref(new SearchHoujinNoResultDto());




// TODO 法人番号検索サイト利用
function onSearch() {
    // backでセットされる値
    resultDto.value.totalCount = 192443;
    resultDto.value.divideCount = resultDto.value.totalCount / limitHoujin + 1; // 計算しているが実際は正解が飛んでくる
    resultDto.value.houjinNoList = mockGetHoujinList(resultDto.value.divideNumber);
    // frontでセットされるべき値
    allCount.value = resultDto.value.totalCount;
    const startCount: number = getStartCount();
    houjinListView.value = resultDto.value.houjinNoList.slice(startCount, startCount + limit.value);

    // limit.value = SEARCH_LIMIT; 一度設定したら再設定不要
    // pageNumber.value = resultDto.value.totalCount; // ページ番号は基本的に選択されたページ番号のまま


    // getAuthorizedPromiseArea().then(token => {
    //     const url = urlBack + "/user-kanrensha/search-kigyou-dt";
    //     const method = "POST";
    //     const body = JSON.stringify(capsuleDto.value);
    //     const headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-AUTH-TOKEN': 'Bearer ' + token
    //     };
    //     fetch(url, { method, headers, body })
    //         .then(async (response) => {
    //             houjinListView.value = mockGetHoujinList();

    //             const resultDto: SearchHoujinNoResultDtoInterface = await response.json();
    //             allCount.value =                 resultDto.totalCount;
    //             resultDto.divideCount;
    //             resultDto.divideNumber;

    //             houjinListSearch.value = resultDto.houjinNoList;
    //             houjinListView.value = houjinListSearch.value.slice(0, 0 + SEARCH_LIMIT);

    //             // resultDto.value = await response.json();
    //             // if (0 == resultDto.value.listMasterKigyouDt.length) {
    //             //     infoLevel.value = MessageConstants.LEVEL_INFO;
    //             //     messageType.value = MessageConstants.VIEW_TOAST;
    //             //     title.value = "タスク情報検索";
    //             //     message.value = "検索結果が0件でした";
    //             // }
    //             // allCount.value = resultDto.value.allCount;
    //             // limit.value = resultDto.value.limit;
    //             // pageNumber.value = resultDto.value.pageNumber;
    //         })
    //         .catch((error) => {
    //             alert(error);
    //             infoLevel.value = MessageConstants.LEVEL_ERROR;
    //             messageType.value = MessageConstants.VIEW_OK;
    //             title.value = "タスク情報検索";
    //             message.value = "システムエラーが発生しました。システム管理者にお問い合わせください";
    //         });
    // }).catch((e) => {
    //     infoLevel.value = MessageConstants.LEVEL_ERROR;
    //     messageType.value = MessageConstants.VIEW_OK;

    //     if (e instanceof AccessTokenNotFoundError) {
    //         // トークン保持ができていない場合
    //         title.value = "現在トークンが存在しません";
    //         message.value = e.message;
    //         return;
    //     }
    //     if (e instanceof TokenRefreshError) {
    //         // 取得に失敗している場合
    //         title.value = "有効期限まじかのトークンを再取得できませんでした";
    //         message.value = e.message;
    //         return;
    //     }
    //     title.value = "システムエラーが発生しました";
    //     message.value = "システム管理者にお問い合わせください";
    //     return;
    // });


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
    }
}

function recievePagingNumber(selecteddNumber: number) {
    pageNumber.value = selecteddNumber;
    const pointCount: number = limit.value * pageNumber.value;
    const startCount: number = getStartCount();
    alert("ページ情報受信" + startCount);


    // 現在のメモリで持ってる2000件リスト内であればリスト切り出し
    if ((resultDto.value.divideNumber + 1) * limitHoujin > pointCount) {
        houjinListView.value = resultDto.value.houjinNoList.slice(startCount, startCount + limit.value);
    } else {
        // resultDtoでなくcapsuleDtoにdivideNumberをセット
        resultDto.value.divideNumber = Math.floor(pointCount / limitHoujin);
        // 2000件リスト外であれば再取得
        onSearch();
    }
}


function getStartCount(): number {
    return (limit.value * pageNumber.value) - (resultDto.value.divideNumber * limitHoujin);
}


function recieveSubmit(button: string) {
    console.log(button);
    // TODO ボタンタイプ別の挙動はこの中で変える

    // 非表示
    infoLevel.value = 0;
    messageType.value = 0;
}

const pointPage: Ref<number> = ref(0);
</script>
<template>
    <h3 class="accsent-h3">法人検索</h3>

    <h3 class="indent-h3">検索条件</h3>

    <div class="one-line">
        <div class="left-area">
            名前(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.name" class="name-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            地方自治体コード
        </div>
        <div class="right-area">
            <input type="text" class="max-input">
            地方自治体コード
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
    <div class="one-line">
        <input type="number" v-model="pointPage"><button @click="recievePagingNumber(pointPage)"
            class="left-space">ページ指定</button><br>
    </div>

    <div class="one-line">
        <table>
            <tbody>
                <tr>
                    <th>&nbsp;&nbsp;</th>
                    <th>法人番号</th>
                    <th>処理区分</th>
                    <th>法人種別</th>
                    <th>商号</th>
                    <th>市区町村</th>
                </tr>
                <tr v-for="dto in houjinListView" :key="dto.houjinNo">
                    <td><input type="radio" v-model="selectedRow" :value="dto.houjinNo" id="politicalOrganizationId">
                    </td>
                    <td>{{ dto.houjinNo }}</td>
                    <td>{{ HoujinShoriKbnConstants.getLabel(dto.process) }}</td>
                    <td>{{ HoujinSbtsConstants.getLabel(dto.kind) }}</td>
                    <td>{{ dto.houjinName }}</td>
                    <td>{{ dto.prefectureName + dto.cityName }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>


    <!-- メッセージ -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
            @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped></style>
