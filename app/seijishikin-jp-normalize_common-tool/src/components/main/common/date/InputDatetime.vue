<script setup lang="ts">
import { onBeforeMount, ref, watch, type Ref } from 'vue';
import DtoEntityConstants from '../../dto/dtoEntityConstants';

// props,emmits
const props = defineProps<{ datetime: Date, index: number, isEdit: boolean }>();
const emits = defineEmits(["sendDateTime"]);

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

const LIMIT_DATE: Date = DtoEntityConstants.INIT_DATETIME_LIMIT;

const dateString: Ref<string> = ref("");
const timeString: Ref<string> = ref("");

onBeforeMount(() => {
    dateString.value = props.datetime.toLocaleDateString('sv-SE');
    timeString.value = props.datetime.toLocaleTimeString('sv-SE');
});

watch(props, () => {
    const limit = LIMIT_DATE;
    if (!isNaN(props.datetime.getTime()) && props.datetime.getTime() <= limit.getTime()) {
        return;
    }
    dateString.value = props.datetime.toLocaleDateString('sv-SE');
    timeString.value = props.datetime.toLocaleTimeString('sv-SE');
});

function onDataChange() {
    if (null === dateString.value || "" === dateString.value || null === timeString.value || "" === timeString.value) {
        emits("sendDateTime", LIMIT_DATE, props.index);
    } else {
        const dateCell: string[] = dateString.value.split("-");
        const timeCell: string[] = timeString.value.split(":");
        if (dateCell[0] !== undefined && dateCell[1] !== undefined && dateCell[2] !== undefined
            && timeCell[0] !== undefined && timeCell[1] !== undefined && timeCell[2] !== undefined
            && !isNaN(parseInt(dateCell[0])) && !isNaN(parseInt(dateCell[1])) && !isNaN(parseInt(dateCell[2]))
            && !isNaN(parseInt(timeCell[0])) && !isNaN(parseInt(timeCell[1])) && !isNaN(parseInt(timeCell[2]))
            && dateCell[0].length === 4) {
            const sendData: Date = new Date(parseInt(dateCell[0]), parseInt(dateCell[1]) - 1, parseInt(dateCell[2]),
                parseInt(timeCell[0]), parseInt(timeCell[1]), parseInt(timeCell[2]));
            if (!isNaN(sendData.getTime())) {
                emits("sendDateTime", sendData, props.index);
            } else {
                emits("sendDateTime", LIMIT_DATE, props.index);
            }
        } else {
            emits("sendDateTime", LIMIT_DATE, props.index);
        }
    }
}
</script>
<template>
    <input type="date" v-model="dateString" @blur="onDataChange" :disabled="!isEdit">
    <input type="time" v-model="timeString" @blur="onDataChange" :disabled="!isEdit" class="left-space-narrow"
        step="1">
</template>
<style scoped></style>
