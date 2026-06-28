<script setup lang="ts">
import { computed, type ComputedRef, type Ref, ref, toRaw } from "vue";
import { type InputAddressDtoInterface } from "../../../main/dto/Input_address/inputAddressDto";
import type { PostalCodePostalResultDtoInterface } from "../../../main/dto/postal/postalCodePostalResultDto";
import type { SelectOptionNumberDtoInterface } from "../../../main/dto/select_options/selectOptionNumberDto";
import type { SelectOptionStringDtoInterface } from "../../../main/dto/select_options/selectOptionStringDto";
import type { PostalCodeBlockResultDtoInterface } from "../../../main/dto/postal/postalCodeBlockResultDto";
import type { PostalCodeBuildingResultDtoInterface } from "../../../main/dto/postal/postalCodeBuildingResultDto";
import RoutePathConstants from "../../../../routePathConstants";
import getAuthorizedPromiseArea from "../../dto/login/getAuthorizedPromiseArea";
import { PostalCodeCapsuleDto, type PostalCodeCapsuleDtoInterface } from "../../dto/postal/postalCodeCapsuleDto";
import { MessageConstants } from "../../dto/message/messageConstants";
import MessageView from "../message/MessageView.vue";
import { AccessTokenNotFoundError, TokenRefreshError } from "../../dto/login/errors";
import type { AddressRsdtResultDtoInterface } from "../../dto/postal/addressRsdtResultDto.ts";
import type { AddressRsdtTemplateEntityInterface } from "../../entity/addressRsdtTemplateEntity";

// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;

// props,emit
const props = defineProps<{ editDto: InputAddressDtoInterface }>();
const emits = defineEmits(["sendCancelInputAddress", "sendInputAddressInterface"]);

// メッセージボックス表示定数
const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
const title: Ref<string> = ref(BLANK);
const message: Ref<string> = ref(BLANK);

// back側アクセス
const urlBack: string = RoutePathConstants.DOMAIN + RoutePathConstants.BASE_PATH;


/** 入力用Dto */
const inputAddressDto: Ref<InputAddressDtoInterface> = ref(props.editDto);

// NOTE 超重要：政治資金系報告書に住所を郵便番号住所までしか載せないときの対応専用
const addressAll: ComputedRef<string> = computed(() => inputAddressDto.value.addressPostal);

/** 住所郵便番号まで */
const selectedAddressPostal: Ref<number> = ref(-1);
const listPostalSuggest: Ref<SelectOptionNumberDtoInterface[]> = ref([]);
const listBackupPostalSuggest: Ref<SelectOptionNumberDtoInterface[]> = ref([]);

/** 住所郵便番地まで */
const selectedAddressBlock: Ref<string> = ref("");
const listBlockSuggest: Ref<SelectOptionStringDtoInterface[]> = ref([]);
const listBackupBlockSuggest: Ref<SelectOptionStringDtoInterface[]> = ref([]);

/** 住所郵便建物 */
const selectedAddressBuilding: Ref<number> = ref(0);
const listBuildingSuggest: Ref<SelectOptionNumberDtoInterface[]> = ref([]);
const listBackupBuildingSuggest: Ref<SelectOptionNumberDtoInterface[]> = ref([]);

/** 地方自治体住居検索 */
const isGyouseiku: Ref<boolean> = ref(false);

// /** 郵便番号取得 */
function getAddressPostal() {

    //  郵便番号の形式となったらリストを取得する
    if (3 === inputAddressDto.value.postalcode1.length && 4 === inputAddressDto.value.postalcode2.length) {
        // 住所郵便番号までを取得
        // 検索実行
        getAuthorizedPromiseArea().then(token => {
            const conditionDto: PostalCodeCapsuleDtoInterface = new PostalCodeCapsuleDto();
            conditionDto.postal1 = inputAddressDto.value.postalcode1;
            conditionDto.postal2 = inputAddressDto.value.postalcode2;
            const url = urlBack + "/postal-search/postal";
            const method = "POST";
            const body = JSON.stringify(conditionDto);
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': 'Bearer ' + token
            };
            fetch(url, { method, headers, body })
                .then(async (response) => {
                    const resultDto: PostalCodePostalResultDtoInterface = await response.json();
                    listPostalSuggest.value = resultDto.listOptions;
                    listBackupPostalSuggest.value = structuredClone(toRaw(listPostalSuggest.value));
                    isGyouseiku.value = resultDto.isGyouseikuData;

                    // 1件だけの時は値を決定して番地までデータを検索
                    if (listPostalSuggest.value !== null) {
                        if (listPostalSuggest.value.length === 1 && undefined !== listBackupPostalSuggest.value[0]) {
                            selectedAddressPostal.value = listBackupPostalSuggest.value[0].value;
                            selectSuggestPostal();
                        }
                    }
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
    } else {
        inputAddressDto.value.addressPostal = "";
        inputAddressDto.value.addressBlock = "";
        inputAddressDto.value.addressBuilding = "";
        selectedAddressPostal.value = 0;
        selectedAddressBlock.value = "";
        selectedAddressBuilding.value = 0;
        inputAddressDto.value.lgCode = "";
        inputAddressDto.value.blkId = "";
        inputAddressDto.value.machiazaId = "";
        inputAddressDto.value.prcId = "";
        inputAddressDto.value.rsdtId = "";
        inputAddressDto.value.rsdt2Id = "";
    }
}

/** 住所郵便番号候補選択時 */
function selectSuggestPostal() {
    // 選択された郵便番号まで住所を複写する
    const selectedDto: SelectOptionNumberDtoInterface | undefined
        = listPostalSuggest.value.filter(e => selectedAddressPostal.value === e.value)[0];
    if (undefined !== selectedDto && 0 !== selectedAddressPostal.value) {
        inputAddressDto.value.addressPostal = selectedDto.text;
        searchBlock();
    } else {
        // 未選択の時は番地も初期化
        inputAddressDto.value.addressPostal = BLANK;
        listBlockSuggest.value.splice(0);
        listBackupBlockSuggest.value.splice(0);
    }
}

/** 住所番地までを検索 */
function searchBlock() {
    // 住所番地までを取得
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: PostalCodeCapsuleDtoInterface = new PostalCodeCapsuleDto();
        conditionDto.selectedPostal = selectedAddressPostal.value;
        conditionDto.isGyouseikuData = isGyouseiku.value;

        const url = urlBack + "/postal-search/block";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: PostalCodeBlockResultDtoInterface = await response.json();
                listBlockSuggest.value = resultDto.listOptions;
                listBackupBlockSuggest.value = structuredClone(toRaw(listBlockSuggest.value));
                inputAddressDto.value.lgCode = resultDto.lgCode;
                listBlockSuggest.value;

                // 1件だけの時は値を決定して建物までデータを検索
                if (listBlockSuggest.value !== undefined) {
                    if (listBlockSuggest.value.length === 1 && undefined !== listBackupBlockSuggest.value[0]) {
                        selectedAddressBlock.value = listBackupBlockSuggest.value[0].value;
                        selectSuggestBlock();
                    }
                }
            })
            .catch(() => {
                // 実処理側エラー
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

/** 住所番地候補選択時 */
function selectSuggestBlock() {

    const selectedDto: SelectOptionStringDtoInterface | undefined
        = listBlockSuggest.value.filter(e => selectedAddressBlock.value === e.value)[0];
    if (undefined !== selectedDto && 0 !== selectedAddressPostal.value) {
        inputAddressDto.value.addressBlock = selectedDto.text;
        searchBuilding();
    } else {
        // 未選択の時は番地も初期化
        inputAddressDto.value.addressBlock = BLANK;
        listBuildingSuggest.value.splice(0);
        listBackupBuildingSuggest.value.splice(0);
    }
}

/** 住所建物までを検索 */
function searchBuilding() {
    // 検索実行
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: PostalCodeCapsuleDtoInterface = new PostalCodeCapsuleDto();
        conditionDto.selectedBlock = selectedAddressBlock.value;
        conditionDto.lgCode = inputAddressDto.value.lgCode;
        conditionDto.isGyouseikuData = isGyouseiku.value;

        const url = urlBack + "/postal-search/building";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: PostalCodeBuildingResultDtoInterface = await response.json();
                listBuildingSuggest.value = resultDto.listOptions;
                // 建物なしまたは、建物候補があっても未選択の可能性があるので常に住所のコードを取得
                getRsdtCodeByBlock();
            })
            .catch(() => {
                // 実処理側エラー
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


/** 住所郵便番号フィルタ時 */
const filterPostal: Ref<string> = ref("");
function filterSuggestPostal() {
    const tempList = structuredClone(toRaw(listBackupPostalSuggest.value));
    listPostalSuggest.value = tempList.filter((dto) => { if (dto.text.includes(filterPostal.value)) { return true; } });
}

/** 住所番地フィルタ時 */
const filterBlock: Ref<string> = ref("");
function filterSuggestBlock() {
    const tempList = structuredClone(toRaw(listBackupBlockSuggest.value));
    listBlockSuggest.value = tempList.filter((dto) => { if (dto.text.includes(filterBlock.value)) { return true; } });
}

/** 住所建物フィルタ時 */
const filterBuilding: Ref<string> = ref("");
function filterSuggestBuilding() {
    const tempList = structuredClone(toRaw(listBackupBuildingSuggest.value));
    listBuildingSuggest.value = tempList.filter((dto) => { if (dto.text.includes(filterBuilding.value)) { return true; } });
}

/** 住所建物候補選択時 */
function selectSuggestBuilding() {
    // コード値の設定
    const selectedDto: SelectOptionNumberDtoInterface | undefined
        = listBuildingSuggest.value.filter(e => selectedAddressBuilding.value === e.value)[0];
    if (undefined !== selectedDto) {
        inputAddressDto.value.addressBuilding = selectedDto.text;
        inputAddressDto.value.rsdtAddressBuilding = selectedDto.text;
    }
    getRsdtCodeById();
}


/** 決定した番地まで住所のコードを設定する */
function getRsdtCodeByBlock() {

    // コード値を呼び出す
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: PostalCodeCapsuleDtoInterface = new PostalCodeCapsuleDto();
        conditionDto.lgCode = inputAddressDto.value.lgCode;
        conditionDto.selectedBlock = selectedAddressBlock.value;

        const url = urlBack + "/postal-search/rsdt-detail-block";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: AddressRsdtResultDtoInterface = await response.json();
                if (resultDto.isFailure) {
                    infoLevel.value = MessageConstants.LEVEL_WARNING;
                    messageType.value = MessageConstants.VIEW_OK;
                    title.value = "住所コードが取得できません";
                    message.value = resultDto.message;
                    inputAddressDto.value.blkId = "";
                    inputAddressDto.value.machiazaId = "";
                    inputAddressDto.value.prcId = "";
                    inputAddressDto.value.rsdtId = "";
                    inputAddressDto.value.rsdt2Id = "";
                } else {
                    const rsdtEntity: AddressRsdtTemplateEntityInterface = resultDto.addressRsdtEntity;
                    inputAddressDto.value.blkId = rsdtEntity.blkId;
                    inputAddressDto.value.machiazaId = rsdtEntity.machiazaId;
                    inputAddressDto.value.prcId = rsdtEntity.prcId;
                    inputAddressDto.value.rsdtId = rsdtEntity.rsdtId;
                    inputAddressDto.value.rsdt2Id = rsdtEntity.rsdt2Id;
                }
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

/** 決定した建物住所のコードを設定する */
function getRsdtCodeById() {
    // コード値を呼び出す
    getAuthorizedPromiseArea().then(token => {
        const conditionDto: PostalCodeCapsuleDtoInterface = new PostalCodeCapsuleDto();
        conditionDto.lgCode = inputAddressDto.value.lgCode;
        conditionDto.selectedRsdtId = selectedAddressBuilding.value;

        const url = urlBack + "/postal-search/rsdt-detail-id";
        const method = "POST";
        const body = JSON.stringify(conditionDto);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': 'Bearer ' + token
        };
        fetch(url, { method, headers, body })
            .then(async (response) => {
                const resultDto: AddressRsdtResultDtoInterface = await response.json();
                if (resultDto.isFailure) {
                    infoLevel.value = MessageConstants.LEVEL_WARNING;
                    messageType.value = MessageConstants.VIEW_OK;
                    title.value = "住所コードが取得できません";
                    message.value = resultDto.message;
                    inputAddressDto.value.blkId = "";
                    inputAddressDto.value.machiazaId = "";
                    inputAddressDto.value.prcId = "";
                    inputAddressDto.value.rsdtId = "";
                    inputAddressDto.value.rsdt2Id = "";
                } else {
                    const rsdtEntity: AddressRsdtTemplateEntityInterface = resultDto.addressRsdtEntity;
                    inputAddressDto.value.blkId = rsdtEntity.blkId;
                    inputAddressDto.value.machiazaId = rsdtEntity.machiazaId;
                    inputAddressDto.value.prcId = rsdtEntity.prcId;
                    inputAddressDto.value.rsdtId = rsdtEntity.rsdtId;
                    inputAddressDto.value.rsdt2Id = rsdtEntity.rsdt2Id;
                }
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

/** 編集offにした場合は選択値に戻す */
function onPostalEdit() {
    if (false === inputAddressDto.value.isPostalEdit) {
        const selectedDto = listPostalSuggest.value.filter(e => selectedAddressPostal.value === e.value)[0];
        if (undefined !== selectedDto) {
            inputAddressDto.value.addressPostal = selectedDto.text;
        } else {
            inputAddressDto.value.addressPostal = BLANK;
        }
    }
}

/** 編集offにした場合は選択値に戻す */
function onBlockEdit() {
    if (false === inputAddressDto.value.isBlockEdit) {
        const selectedDto = listBlockSuggest.value.filter(e => selectedAddressBlock.value === e.value)[0];
        if (undefined !== selectedDto) {
            inputAddressDto.value.addressBlock = selectedDto.text;
        } else {
            inputAddressDto.value.addressBlock = BLANK;
        }
    }
}

/** 編集offにした場合は選択値に戻す */
function onBuildingEdit() {
    if (false === inputAddressDto.value.isBuildingEdit) {
        const selectedDto = listBuildingSuggest.value.filter(e => selectedAddressBuilding.value === e.value)[0];
        if (undefined !== selectedDto) {
            inputAddressDto.value.addressBuilding = selectedDto.text;
        } else {
            inputAddressDto.value.addressBuilding = BLANK;
        }
    }
}




/**  
 * 入力内容を破棄する
 */
function onCancel() {
    emits("sendCancelInputAddress");
}

/**  
 * 入力内容を保存する
 */
function onSave() {
    inputAddressDto.value.addressAll = addressAll.value;
    emits("sendInputAddressInterface", inputAddressDto.value);
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
    <h3 class="accent-h3">住所入力</h3>

    <div style="overflow-y: scroll">
        <div class="one-line">
            <div class="left-area">
                郵便番号
            </div>
            <div class="right-area">
                <input v-model="inputAddressDto.postalcode1" type="text" class="short-input"
                    @input="getAddressPostal">&nbsp;-&nbsp;
                <input v-model="inputAddressDto.postalcode2" type="text" class="short-input" @input="getAddressPostal">
            </div>
        </div>


        <div class="one-line">
            <div class="left-area">
                住所(全)
            </div>
            <div class="right-area">
                <textarea v-model="addressAll" disabled="true" class="max-input"></textarea>
            </div>
        </div>


        <div class="one-line">
            <div class="left-area">
                住所郵便番号
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <select v-model="selectedAddressPostal" @change="selectSuggestPostal">
                            <option v-for="(optionDto, index) in listPostalSuggest" :key="index"
                                :value="optionDto.value">{{ optionDto.text }}</option>
                        </select><span class="left-space">フィルタ<input v-model="filterPostal" type="text"
                                @input="filterSuggestPostal"></span><span class="left-space"><input
                                v-model="inputAddressDto.isPostalEdit" type="checkbox" @change="onPostalEdit">編集</span>
                    </div>
                    <div>
                        <textarea v-model="inputAddressDto.addressPostal" :disabled="!inputAddressDto.isPostalEdit"
                            class="max-input"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所番地
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <select v-model="selectedAddressBlock" @change="selectSuggestBlock">
                            <option v-for="optionDto in listBlockSuggest" :key="optionDto.value"
                                :value="optionDto.value">{{
                                    optionDto.text }}</option>
                        </select><span class="left-space">フィルタ<input v-model="filterBlock" type="text"
                                @input="filterSuggestBlock"></span><span class="left-space"><input
                                v-model="inputAddressDto.isBlockEdit" type="checkbox"
                                @change="onBlockEdit">編集</span><br>
                    </div>
                    <div>
                        <textarea v-model="inputAddressDto.addressBlock" :disabled="!inputAddressDto.isBlockEdit"
                            class="max-input"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所建物
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <select v-model="selectedAddressBuilding" @change="selectSuggestBuilding">
                            <option v-for="optionDto in listBuildingSuggest" :key="optionDto.value"
                                :value="optionDto.value">{{ optionDto.text }}</option>
                        </select><span class="left-space">フィルタ<input v-model="filterBuilding" type="text"
                                @input="filterSuggestBuilding"></span><span class="left-space"><input
                                v-model="inputAddressDto.isBuildingEdit" type="checkbox"
                                @change="onBuildingEdit">編集</span><br>
                    </div>
                    <div>
                        <textarea v-model="inputAddressDto.addressBuilding" :disabled="!inputAddressDto.isBuildingEdit"
                            class="max-input"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="one-line">
            <div class="left-area">
                住所コード
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <span>地方公共団体コード</span><input type="text" v-model="inputAddressDto.lgCode" class="short-input"
                            disabled="true">
                        <span class="left-space">町字Id</span><input type="text" v-model="inputAddressDto.machiazaId"
                            class="short-input" disabled="true">
                    </div>
                    <div>
                        <span>地番Id</span><input type="text" v-model="inputAddressDto.prcId" class="code-input"
                            disabled="true">
                        <span class="left-space">街区Id</span><input type="text" v-model="inputAddressDto.blkId"
                            class="short-input" disabled="true">
                    </div>
                    <div>
                        <span>住居Id</span><input type="text" v-model="inputAddressDto.rsdtId" class="short-input"
                            disabled="true">
                        <span class="left-space">住居2Id</span><input type="text" v-model="inputAddressDto.rsdt2Id"
                            class="short-input" disabled="true">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

    <!-- メッセージ表示 -->
    <!-- ダイアログ用のコンテナ -->
    <div class="overMessage" v-if="messageType !== MessageConstants.VIEW_NONE">
        <MessageView :info-level="infoLevel" :message-type="messageType" :title="title" :message="message"
            @send-submit="recieveSubmit">
        </MessageView>
    </div>

</template>
<style scoped></style>
