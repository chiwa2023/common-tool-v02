<script setup lang="ts">
import { ref, type Ref } from 'vue';
import InputDatetimeAndNull from '../../../main/common/date/InputDatetimeAndNull.vue';
import InputDateAndNull from '../../../main/common/date/InputDateAndNull.vue';
import InputDatetime from '../../../main/common/date/InputDatetime.vue';
import InputDate from '../../../main/common/date/InputDate.vue';
import rawJson from './responseBody.json';
import { ResponseBodyDto, type ResponseBodyDtoInterface, type ListEntityInterface, ListEntity } from './responseBodyDto';

//仮
// よく使う定数
// const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// メッセージボックス表示定数
//const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
//const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
//const title: Ref<string> = ref(BLANK);
//const message: Ref<string> = ref(BLANK);

const editDto: Ref<ListEntityInterface> = ref(new ListEntity());

function recieveDateTime(date: Date, index: number) {
    if (0 == index) {
        editDto.value.insertTimestamp = date;
    }
    if (2 == index) {
        editDto.value.insertTimestamp = date;
    }
}

function recieveDate(date: Date, index: number) {
    if (0 == index) {
        editDto.value.insertTimestamp = date;
    }
    if (1 == index) {
        editDto.value.abolishDate = date;
    }
    if (3 == index) {
        editDto.value.effectDate = date;
    }
}

function onShowISO(index: number) {
    let datetime: Date | null = new Date();
    if (0 == index) {
        datetime = editDto.value.insertTimestamp;
    }
    if (2 == index) {
        datetime = editDto.value.deleteTimestamp;
    }
    if (1 == index) {
        datetime = editDto.value.abolishDate;
    }
    if (3 == index) {
        datetime = editDto.value.effectDate;
    }
    if (null !== datetime) {
        alert(datetime.toISOString());
    } else {
        alert(null);
    }
}

function onShowLocal(index: number) {
    let datetime: Date | null = new Date();
    if (0 == index) {
        datetime = editDto.value.insertTimestamp;
    }
    if (2 == index) {
        datetime = editDto.value.deleteTimestamp;
    }
    if (1 == index) {
        datetime = editDto.value.abolishDate;
    }
    if (3 == index) {
        datetime = editDto.value.effectDate;
    }
    if (null !== datetime) {
        alert(datetime.toLocaleString('sv-SE'));
    } else {
        alert(null);
    }
}

function onLoadDto() {
    const dto: ResponseBodyDtoInterface = new ResponseBodyDto();
    dto.allCount = rawJson.allCount;
    dto.isFailure = rawJson.isFailure;
    dto.limit = rawJson.limit;
    dto.message = rawJson.message;
    dto.pageNumber = rawJson.pageNumber;
    dto.listEntity = rawJson.listEntity.map(entity => {
        return {
            abolishDate: entity.abolishDate ? new Date(entity.abolishDate) : null,
            addressAllCityId: entity.addressAllCityId,
            addressNameKana: entity.addressNameKana,
            city: entity.city,
            county: entity.county,
            deleteTimestamp: entity.deleteTimestamp ? new Date(entity.deleteTimestamp) : null,
            deleteUserCode: entity.deleteUserCode,
            deleteUserId: entity.deleteUserId,
            deleteUserName: entity.deleteUserName,
            effectDate: entity.effectDate ? new Date(entity.effectDate) : null,
            insertTimestamp: entity.insertTimestamp ? new Date(entity.insertTimestamp) : null,
            insertUserCode: entity.insertUserCode,
            insertUserId: entity.insertUserId,
            insertUserName: entity.insertUserName,
            isLatest: entity.isLatest,
            lgCode: entity.lgCode,
            pref: entity.pref,
            ward: entity.ward
        };
    });

    if (dto.listEntity && dto.listEntity.length > 0) {
        const entity = dto.listEntity[0];
        if (entity !== undefined) {
            editDto.value = entity;
        }
    }
}
</script>
<template>
    <h3>日付</h3>
    <div class="one-line">
        <div class="left-area">
            日時
        </div>
        <div class="right-area">
            <InputDatetimeAndNull :datetime="editDto.insertTimestamp" :is-edit="true" :index="0"
                @send-date-time="recieveDateTime">
            </InputDatetimeAndNull><button @click="onShowISO(0)" class="left-spacce">ISO</button> <button
                @click="onShowLocal(0)" class="left-spacce">ローカル</button>
        </div>
    </div>


    <div class="one-line">
        <div class="left-area">
            日付
        </div>
        <div class="right-area">
            <InputDateAndNull :date="editDto.abolishDate" :is-edit="true" :index="1" @send-date="recieveDate">
            </InputDateAndNull><button @click="onShowISO(1)" class="left-spacce">ISO</button> <button
                @click="onShowLocal(1)" class="left-spacce">ローカル</button>
        </div>
    </div>

    <!-- 非Null日付・日時コンポーネント表示 -->
    <div class="one-line">
        <div class="left-area">
            日時（非Null）
        </div>
        <div class="right-area">
            <InputDatetime v-if="editDto.insertTimestamp !== null" :datetime="editDto.insertTimestamp" :is-edit="true"
                :index="2" @send-date-time="recieveDateTime">
            </InputDatetime><button @click="onShowISO(2)" class="left-spacce">ISO</button> <button
                @click="onShowLocal(2)" class="left-spacce">ローカル</button>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            日付（非Null）
        </div>
        <div class="right-area">
            <InputDate v-if="editDto.effectDate !== null" :date="editDto.effectDate" :is-edit="true" :index="3"
                @send-date="recieveDate">
            </InputDate><button @click="onShowISO(3)" class="left-spacce">ISO</button> <button @click="onShowLocal(3)"
                class="left-spacce">ローカル</button>
        </div>
    </div>

    <div class="one-line">
        <div class="left-area">
            データ読込
        </div>
        <div class="right-area">
            <button @click="onLoadDto">Dto読み込み</button>
        </div>
    </div>
</template>
<style scoped></style>
