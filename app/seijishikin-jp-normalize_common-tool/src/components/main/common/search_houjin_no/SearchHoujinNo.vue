<script setup lang="ts">
import { ref, type Ref } from 'vue';
import HoujinShoriKbnConstants from '../../dto/houjin_no/houjinShoriKbnConstants';
import HoujinSbtsConstants from '../../dto/houjin_no/houjinSbtsConstants';
import type { HoujinNoDtoInterface } from '../../dto/houjin_no/houjinNoDto';
import mockGetHoujinList from '../../../test/common/search_houjin_no/mock/mockGetHoujinList';

// props,emit
const emits = defineEmits(["sendCancelHoujinNo", "sendHoujinNoInterface"]);

const houjinList: Ref<HoujinNoDtoInterface[]> = ref([])
const selectedRow: Ref<String> = ref("");

// TODO 法人番号検索サイト利用
function onSearch() {
    houjinList.value = mockGetHoujinList();
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
    const selectedDto: HoujinNoDtoInterface | undefined = houjinList.value.filter((e) => e.houjinNo === selectedRow.value)[0];
    if (undefined !== selectedDto) {
        emits("sendHoujinNoInterface", selectedDto);
    }
}

</script>
<template>
    <h3 class="accsent-h3">法人検索</h3>

    <h3 class="indent-h3">検索条件</h3>

    <div class="one-line">
        <div class="left-area">
            法人番号(前方一致)
        </div>
        <div class="right-area">
            <input type="text" class="name-input">
        </div>

    </div>


    <div class="one-line">
        <div class="left-area">
            名前(前方一致)
        </div>
        <div class="right-area">
            <input type="text" class="name-input">
        </div>

    </div>



    <div class="one-line">
        <div class="left-area">
            郵便番号
        </div>
        <div class="right-area">
            <input type="text" class="short-input">&nbsp;-&nbsp;
            <input type="text" class="short-input">
        </div>

    </div>





    <div class="one-line">
        <div class="left-area">
            住所(前方一致)
        </div>
        <div class="right-area">
            <input type="text" class="max-input">
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








    <h3 class="indent-h3">検索結果</h3>

    <div class="one-line">
        <table>
            <tbody>
                <tr>
                    <th>&nbsp;&nbsp;</th>
                    <th>法人番号</th>
                    <th>処理区分</th>
                    <th>更新日</th>
                    <th>法人種別</th>
                    <th>商号</th>
                    <th>市区町村</th>
                </tr>
                <tr v-for="dto in houjinList" :key="dto.houjinNo">
                    <td><input type="radio" v-model="selectedRow" :value="dto.houjinNo" id="politicalOrganizationId">
                    </td>
                    <td>{{ dto.houjinNo }}</td>
                    <td>{{ HoujinShoriKbnConstants.getLabel(dto.shoriKbn) }}</td>
                    <td>{{ dto.updateDate.toLocaleDateString("JPN") }}</td>
                    <td>{{ HoujinSbtsConstants.getLabel(dto.houjinSbts) }}</td>
                    <td>{{ dto.houjinNameKana }}<br>{{ dto.houjinName }}</td>
                    <td>{{ dto.addressPrefecture + dto.addressCity }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="clear-both"><br></div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

</template>
<style scoped></style>
