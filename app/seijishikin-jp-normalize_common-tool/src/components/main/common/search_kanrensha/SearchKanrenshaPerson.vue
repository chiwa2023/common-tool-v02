<script setup lang="ts">
import { ref, type Ref } from 'vue';
import RoutePathConstants from '../../../../routePathConstants';
import type { KanrenshaPersonMasterEntityInterface } from '../../entity/kanrenshaPersonMasterEntity';
import { SearchKanrenshaPersonCapsuleDto, type SearchKanrenshaPersonCapsuleDtoInterface } from '../../dto/kanrensha/searchKanrenshaPersonCapsuleDto';
import { SearchKanrenshaPersonResultDto, type SearchKanrenshaPersonResultDtoInterface } from '../../dto/kanrensha/searchKanrenshaPersonResultDto';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import { MessageConstants } from '../../dto/message/messageConstants';
import MessageView from '../message/MessageView.vue';
import PagingControl from '../paging/PagingControl.vue';

//props,emit
const props = defineProps<{ isRaiseCommponet: boolean }>();
const emits = defineEmits(["sendPersonInterface", "sendCancelPerson"]);

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

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;

// 検索
const capsuleDto: Ref<SearchKanrenshaPersonCapsuleDtoInterface> = ref(new SearchKanrenshaPersonCapsuleDto());
const resultDto: Ref<SearchKanrenshaPersonResultDtoInterface> = ref(new SearchKanrenshaPersonResultDto());

function onSearch() {
    //listPerson.value = mockGetPersonList();

    capsuleDto.value.allCount = allCount.value;
    capsuleDto.value.limit = limit.value;
    capsuleDto.value.pageNumber = pageNumber.value;

    getAuthorizedPromiseArea().then(token => {
        const url = urlBack + "/user-kanrensha/search-person";
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
                if (0 == resultDto.value.listMasterPerson.length) {
                    infoLevel.value = MessageConstants.LEVEL_INFO;
                    messageType.value = MessageConstants.VIEW_TOAST;
                    title.value = "タスク情報検索";
                    message.value = "検索結果が0件でした";
                }
                allCount.value = resultDto.value.allCount;
                limit.value = resultDto.value.limit;
                pageNumber.value = resultDto.value.pageNumber;
            })
            .catch((error) => {
                alert(error);
                infoLevel.value = MessageConstants.LEVEL_ERROR;
                messageType.value = MessageConstants.VIEW_OK;
                title.value = "タスク情報検索";
                message.value = "システムエラーが発生しました。システム管理者にお問い合わせください";
            });
    }).catch((e) => {
        infoLevel.value = MessageConstants.LEVEL_ERROR;
        messageType.value = MessageConstants.VIEW_OK;

        if (e instanceof AccessTokenNotFoundError) {
            // トークン保持ができていない場合
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
        return;
    });
}

function onSelectRow(selectedNo: number) {
    // 検索データからコピーすべき元データを抽出
    const selectedEntity: KanrenshaPersonMasterEntityInterface | undefined =
        resultDto.value.listMasterPerson.filter((e) => e.kanrenshaPersonMasterId === selectedNo)[0];
    if (undefined !== selectedEntity) {
        emits("sendPersonInterface", selectedEntity);
    } else {
        alert("取得できませんでした");
    }
}

function recievePagingNumber(selecteddNumber: number) {
    pageNumber.value = selecteddNumber;
    alert("ページ情報受信");
}

function onCancel() {
    emits("sendCancelPerson");
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
    <h3>関連者個人検索</h3><br>

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
            住所(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.address" class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            職業(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.shokugyou" class="name-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            検索
        </div>
        <div class="right-area">
            <button @click="onSearch">検索</button>
        </div>
    </div>

    <hr>

    <h3>検索結果</h3>
    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>

    <div class="one-line">
        <table>
            <tbody>
                <tr>
                    <th>関連者コード(個人)</th>
                    <th>氏名</th>
                    <th>住所</th>
                    <th>職業</th>
                    <th>&nbsp;</th>
                </tr>
                <tr v-for="entity of resultDto.listMasterPerson" :key="entity.kanrenshaPersonMasterId">
                    <td>{{ entity.personKanrenshaCode }}</td>
                    <td>{{ entity.kanrenshaName }}</td>
                    <td>{{ entity.allAddress }}</td>
                    <td>{{ entity.personShokugyou }}</td>
                    <td><button @click="onSelectRow(entity.kanrenshaPersonMasterId)">選択</button></td>
                </tr>
            </tbody>
        </table>
    </div>


    <!-- ページング -->
    <PagingControl :all-count="allCount" :limit="limit" :page-number="pageNumber"
        @send-paging-number="recievePagingNumber"></PagingControl>

    <div class="footer" v-if="props.isRaiseCommponet">
        <button @click="onCancel" class="footer-button">キャンセル</button>
    </div>

    <!-- メッセージ -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
            @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped>
table {
    border-style: solid;
    border-width: 1px;
}

td {
    border-style: solid;
    border-width: 1px;
}

th {
    border-style: solid;
    border-width: 1px;
}
</style>
