<script setup lang="ts">
import { ref, toRaw, type Ref } from 'vue';
import type { InputShokugyouDtoInterface } from '../../dto/input_shokugyou/inputShokugyouDto';
import SearchHoujinNo from '../search_houjin_no/SearchHoujinNo.vue';
import type { HoujinNoDtoInterface } from '../../dto/houjin_no/houjinNoDto';

// props,emit
const props = defineProps<{ editDto: InputShokugyouDtoInterface }>();
const emits = defineEmits(["sendCancelInputShokugyou", "sendInputShokugyouInterface"]);

const BLANK: string = "";
const inputShokugyouDto: Ref<InputShokugyouDtoInterface> = ref(structuredClone(toRaw(props.editDto)));

/** 生成職業文字列を送信する */
function sendAllShokugyou() {
    switch (inputShokugyouDto.value.yakushoku) {
        // フリーランス
        case yakushokuFree:
            if (BLANK === inputShokugyouDto.value.shokugyouUserWrite) {
                inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.gyoushu + "業従事者";
            } else {
                inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.shokugyouUserWrite;
            }
            break;
        // 団体所属者
        case yakushokuGeneral:
            if (BLANK === inputShokugyouDto.value.shokugyouUserWrite) {
                inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.gyoushu + "業社員・職員";
            } else {
                inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.shokugyouUserWrite;
            }
            break;
        // 役職者
        case yakushokuDirector:
            if (BLANK !== inputShokugyouDto.value.shokugyouUserWrite) {
                inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.shokugyouUserWrite;
            } else {
                if (BLANK === inputShokugyouDto.value.houjinNo) {
                    inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.gyoushu + "業役職者(社名記載拒否)";
                } else {
                    inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.gyoushu + "業:" + inputShokugyouDto.value.houjinName + "(" + inputShokugyouDto.value.houjinAddress + ")" + "役員";
                }
            }
            break;
        // 定職なし
        case yakushokuNoJob:
            inputShokugyouDto.value.allShokugyou = inputShokugyouDto.value.shokugyouUserWrite;
            break;
        default:
            break;
    }
}

// 職業入力定義
const yakushokuFree: string = "所属なし";
const yakushokuGeneral: string = "一般職員";
const yakushokuDirector: string = "役職者";
const yakushokuNoJob: string = "定職なし";

const isHoujinSearch: Ref<boolean> = ref(false);

/**
 * 法人検索表示
 */
function onSearchCorpNo() {
    isHoujinSearch.value = true;
}


/**
 * 法人情報受信
 */
function recieveCorpNoInterface(sendDto: HoujinNoDtoInterface) {
    inputShokugyouDto.value.houjinNo = sendDto.houjinNo;
    inputShokugyouDto.value.houjinAddress = sendDto.addressPrefecture + sendDto.addressCity;
    inputShokugyouDto.value.houjinName = sendDto.houjinName;

    sendAllShokugyou();
    //非表示
    isHoujinSearch.value = false;
}

/**
 * 法人検索キャンセル
 */
function recieveCancelCorpNo() {
    //非表示
    isHoujinSearch.value = false;
}


/** 保存処理 */
function onSave() {
    emits("sendInputShokugyouInterface", inputShokugyouDto.value);
}
/** キャンセル処理 */
function onCancel() {
    emits("sendCancelInputShokugyou");
}

</script>
<template>

    <h3 class="accent-h3">職業入力</h3>

    <div class="one-line">
        <div class="left-area">
            職業
        </div>
        <div class="right-area">
            <input type="text" v-model="inputShokugyouDto.allShokugyou" disabled="true" class="name-input">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            職業(1)×業種
        </div>
        <div class="right-area">
            <select v-model="inputShokugyouDto.gyoushu" @change="sendAllShokugyou">
                <option value=""></option>
                <option value="農林"> A.農業，林業</option>
                <option value="水産">B.漁業</option>
                <option value="鉱業">C.鉱業，採石業，砂利採取業</option>
                <option value="建設">D.建設業</option>
                <option value="製造">E.製造業</option>
                <option value="インフラ">F.電気・ガス・熱供給・水道業</option>
                <option value="情報通信">G.情報通信業</option>
                <option value="運輸">H.運輸業，郵便業</option>
                <option value="流通小売">I.卸売業，小売業</option>
                <option value="金融">J.金融業，保険業</option>
                <option value="不動産">K.不動産業，物品賃貸業</option>
                <option value="学術研究">L.学術研究，専門・技術サービス業</option>
                <option value="宿泊飲食">M.宿泊業，飲食サービス業</option>
                <option value="娯楽">N.生活関連サービス業，娯楽業</option>
                <option value="教育学習">O.教育，学習支援業</option>
                <option value="医療・福祉">P.医療，福祉</option>
                <option value="複合">Q.複合サービス事業</option>
                <option value="その他サービス">R.サービス業（他に分類されないもの）</option>
                <option value="公務">S.公務（他に分類されるものを除く）</option>
                <option value="分類不能">T.分類不能の産業</option>
            </select>
        </div>
    </div>
    <div class="one-line">
        <div class="left-area">
            職業(1)×役職
        </div>
        <div class="right-area">
            <select v-model="inputShokugyouDto.yakushoku" @change="sendAllShokugyou">
                <option :value="yakushokuFree">フリーランス(所属団体なし・法人登記なし)</option>
                <option :value="yakushokuGeneral">一般職員(パート含む)</option>
                <option :value="yakushokuDirector">法人役員(一人企業の社長)</option>
                <option :value="yakushokuNoJob">定職なし</option>
            </select>
        </div>
    </div>




    <div class="one-line">
        <div class="left-area">
            職業(2)×自由入力
        </div>

        <div class="right-area">
            <input type="text" v-model="inputShokugyouDto.shokugyouUserWrite" class="max-input"
                @input="sendAllShokugyou">
        </div>


    </div>


    <div v-if="yakushokuDirector === inputShokugyouDto.yakushoku">
        <div class="one-line">
            <div class="left-area">
                職業(2)×法人情報
            </div>
            <div class="right-area">
                <div class="form-group-vertical">
                    <div>
                        <input type="text" v-model="inputShokugyouDto.houjinNo" class="code-input" disabled="true"
                            placeholder="123456789012345678901234567890">
                        <button class="left-space" @click="onSearchCorpNo">検索</button>
                    </div>
                    <div>
                        <input type="text" v-model="inputShokugyouDto.houjinName" class="name-input" disabled="true">
                    </div>
                    <div>
                        <textarea type="text" v-model="inputShokugyouDto.houjinAddress" class="max-input"
                            disabled="true"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">送信</button>
    </div>

    <!-- 法人番号検索    -->
    <div v-if="isHoujinSearch" class="overBackgroundLayer2"></div>
    <div v-if="isHoujinSearch">
        <div class="overComponentLayer2">
            <SearchHoujinNo @send-cancel-houjin-no="recieveCancelCorpNo"
                @send-houjin-no-interface="recieveCorpNoInterface"></SearchHoujinNo>
        </div>
    </div>

</template>
<style scoped></style>
