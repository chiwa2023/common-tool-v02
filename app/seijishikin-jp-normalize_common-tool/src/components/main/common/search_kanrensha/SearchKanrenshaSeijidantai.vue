<script setup lang="ts">
import { ref, type Ref } from 'vue';
import RoutePathConstants from '../../../../routePathConstants';
import { SearchKanrenshaSeijidantaiCapsuleDto, type SearchKanrenshaSeijidantaiCapsuleDtoInterface } from '../../dto/kanrensha/searchKanrenshaSeijidantaiCapsuleDto';
import { SearchKanrenshaSeijidantaiResultDto, type SearchKanrenshaSeijidantaiResultDtoInterface } from '../../dto/kanrensha/searchKanrenshaSeijidantaiResultDto';
import type { KanrenshaSeijidantaiMasterEntityInterface } from '../../entity/kanrenshaSeijidantaiMasterEntity';
import getAuthorizedPromiseArea from '../../dto/login/getAuthorizedPromiseArea';
import { AccessTokenNotFoundError, TokenRefreshError } from '../../dto/login/errors';
import { MessageConstants } from '../../dto/message/messageConstants';
import SeijidantaiDantaiKbnConstants from '../../dto/kanrensha/seijidantaiDantaiKbnConstants';
import PagingControl from '../paging/PagingControl.vue';
import MessageView from '../message/MessageView.vue';

//props,emit
const props = defineProps<{ isRaiseCommponet: boolean }>();
const emits = defineEmits(["sendSeijidantaiInterface", "sendCancelSeijidantai"]);

// よく使う定数
const BLANK: string = "";
const INIT_NUMBER: number = 0;
// const INIT_BOOLEAN: boolean = false;
const INIT_BOOLEAN_TRUE: boolean = true;
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
const capsuleDto: Ref<SearchKanrenshaSeijidantaiCapsuleDtoInterface> = ref(new SearchKanrenshaSeijidantaiCapsuleDto());
const resultDto: Ref<SearchKanrenshaSeijidantaiResultDtoInterface> = ref(new SearchKanrenshaSeijidantaiResultDto());

const isKbnSeitou: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
const isKbnSeitouShibu: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
const isKbnSeijiShikinDantai: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
const isKbn18Jouo2Dantai: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
const isKbnSonota: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
const isKbnSonotaShibu: Ref<boolean> = ref(INIT_BOOLEAN_TRUE);
// const poliOrgList: Ref<MasterPoliticalOrganizationInterface[]> = ref([])

function onSearch() {
    capsuleDto.value.allCount = allCount.value;
    capsuleDto.value.limit = limit.value;
    capsuleDto.value.pageNumber = pageNumber.value;
    capsuleDto.value.listDantaiKbn.splice(0);
    if (isKbnSeitou.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.SEITOU);
    }
    if (isKbnSeitouShibu.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.SEITOU_SHIBU);
    }
    if (isKbnSeijiShikinDantai.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.SEIJI_SHIKIN_DANTAI);
    }
    if (isKbn18Jouo2Dantai.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.DANTAI_18JOU_2KOU);
    }
    if (isKbnSonota.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.SONOTA);
    }
    if (isKbnSonotaShibu.value) {
        capsuleDto.value.listDantaiKbn.push(SeijidantaiDantaiKbnConstants.SONOTA_SHIBU);
    }

    getAuthorizedPromiseArea().then(token => {
        const url = urlBack + "/user-kanrensha/search-seijidantai";
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
                if (0 == resultDto.value.listMasterSeijidantai.length) {
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
    const selectedEntity: KanrenshaSeijidantaiMasterEntityInterface | undefined
        = resultDto.value.listMasterSeijidantai.filter((e) => e.kanrenshaSeijidantaiMasterId === selectedNo)[0];
    if (undefined !== selectedEntity) {
        emits("sendSeijidantaiInterface", selectedEntity);
    }
}
function onCancel() {
    emits("sendCancelSeijidantai");
}

function recievePagingNumber(selecteddNumber: number) {
    pageNumber.value = selecteddNumber;
    alert("ページ情報受信");
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
    <h3>関連者政治団体検索</h3><br>

    <div class="one-line">

        <div class="left-area">
            政治団体番号(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.poliOrgNo" class="name-input">
        </div>
    </div>

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
            代表者(前方一致)
        </div>
        <div class="right-area">
            <input type="text" v-model="capsuleDto.delegate" class="max-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            政治団体区分
        </div>
        <div class="right-area">
            <div class="form-group-vertical">
                <div>
                    <input type="checkbox" v-model="isKbnSeitou"> {{ SeijidantaiDantaiKbnConstants.SEITOU_TEXT
                    }}</input>
                    <input type="checkbox" v-model="isKbnSeitouShibu" class="left-space"> {{
                        SeijidantaiDantaiKbnConstants.SEITOU_SHIBU_TEXT
                    }}</input>
                    <input type="checkbox" v-model="isKbnSeijiShikinDantai" class="left-space"> {{
                        SeijidantaiDantaiKbnConstants.SEIJI_SHIKIN_DANTAI_TEXT }}</input>
                </div>
                <div>
                    <input type="checkbox" v-model="isKbn18Jouo2Dantai"> {{
                        SeijidantaiDantaiKbnConstants.DANTAI_18JOU_2KOU_TEXT }}</input>
                    <input type="checkbox" v-model="isKbnSonota" class="left-space"> {{
                        SeijidantaiDantaiKbnConstants.SONOTA_TEXT
                    }}</input>
                    <input type="checkbox" v-model="isKbnSonotaShibu" class="left-space"> {{
                        SeijidantaiDantaiKbnConstants.SONOTA_SHIBU_TEXT
                    }}</input>
                </div>
            </div>
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
                    <th>政治団体番号</th>
                    <th>政治団体名称</th>
                    <th>市区町村</th>
                    <th>代表者</th>
                    <th>政治団体区分</th>
                    <th>&nbsp;</th>
                </tr>
                <tr v-for="entity in resultDto.listMasterSeijidantai" :key="entity.kanrenshaSeijidantaiMasterId">
                    <td>{{ entity.seijidantaiKanrenshaCode }}</td>
                    <td>{{ entity.kanrenshaName }}</td>
                    <td>{{ entity.allAddress }}</td>
                    <td>{{ entity.seijidantaiDelegate }}</td>
                    <td>{{ SeijidantaiDantaiKbnConstants.getLabel(entity.dantaiKbn) }}</td>
                    <td><button @click="onSelectRow(entity.kanrenshaSeijidantaiMasterId)">選択</button>
                    </td>
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
