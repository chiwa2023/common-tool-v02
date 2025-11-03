<script setup lang="ts">
import { ref, toRaw, type Ref } from 'vue';
import type { InputAccessDtoInterface } from '../../dto/input_access/inputAccessDto';
import { type SnsServiceOptionDtoInterface } from '../../dto/sns_service/snsServiceOptionDto';
import { mockGetSnsServiceOptions } from '../../../test/dto/sns_service/mockGetSnsServiceOptions';

// props,emmits
const props = defineProps<{ editDto: InputAccessDtoInterface }>();
const emits = defineEmits(["sendCancelInputAccess", "sendInputAccessInterface"]);

// 編集Dto
const inputAccessDto: Ref<InputAccessDtoInterface> = ref(structuredClone(toRaw(props.editDto)));

// SNSサービス
const listSnsService: Ref<SnsServiceOptionDtoInterface[]> = ref(mockGetSnsServiceOptions());
const selectedSnsService: Ref<number> = ref(0);
const isDisabled: Ref<boolean> = ref(false);


/**
 * SNS選択
 */
function onSelectSns(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;

    // 選択された値を複写
    const selectedDto = listSnsService.value[selectedIndex];
    if (selectedDto !== undefined) {
        inputAccessDto.value.snsServiceId = selectedDto.snsServiceId;
        inputAccessDto.value.snsServiceCode = selectedDto.snsServiceCode;
        inputAccessDto.value.snsServiceName = selectedDto.snsServiceName;
        inputAccessDto.value.snsPortalUrl = selectedDto.snsPortalUrl;
        // 既存のサービスを選択していないときは編集可能
        if (selectedIndex === 0) {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    }
}



/**
 * 保存処理
 */
function onSave() {
    emits("sendInputAccessInterface", inputAccessDto.value);
}

/**
 * キャンセル処理
 */
function onCancel() {
    emits("sendCancelInputAccess");
}
</script>

<template>
    <h3 class="accent-h3">連絡先入力</h3>
    <div class="one-line">
        <div class="left-area">
            電話番号
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.phon1" class="short-input" placeholder="000">
            -<input type="text" v-model="inputAccessDto.phon2" class="short-input left-space" placeholder="1111">
            -<input type="text" v-model="inputAccessDto.phon3" class="short-input left-space" placeholder="2222">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            メールアドレス
        </div>
        <div class="right-area">
            <input type="email" v-model="inputAccessDto.email" class="name-input"
                placeholder="sample@normalize.jp.seijishikin.net">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            自身のポータルサイト
        </div>
        <div class="right-area">
            <input type="url" v-model="inputAccessDto.myPortalUrl" class="name-input"
                placeholder="https://www.sample.com/my_blog/112233 など">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            SNSサービス名
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.snsServiceName" class="name-input" placeholder="例:sampleブログ など"
                :disabled="isDisabled"><select v-model="selectedSnsService" @change="onSelectSns">
                <option v-for="(dto, index) in listSnsService" :key="index">{{ dto.text }}</option>
            </select>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            SNSサービストップURL
        </div>
        <div class="right-area">
            <input type="url" v-model="inputAccessDto.snsPortalUrl" class="name-input"
                placeholder="例：https://sample.com/account/ など" :disabled="isDisabled">
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            アカウント名
        </div>
        <div class="right-area">
            <input type="text" v-model="inputAccessDto.snsAccount" class="name-input" placeholder="例:@taro など">
        </div>
    </div>

    <div class="footer">
        <button @click="onCancel" class="footer-button">キャンセル</button>
        <button @click="onSave" class="footer-button left-space">選択</button>
    </div>

</template>
<style scoped></style>
