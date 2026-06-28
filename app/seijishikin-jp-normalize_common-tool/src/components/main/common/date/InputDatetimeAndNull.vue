<script setup lang="ts">
import { nextTick, onBeforeMount, ref, watch, type Ref } from 'vue';
import DtoEntityConstants from '../../dto/dtoEntityConstants';

// props,emmits
const props = defineProps<{ datetime: Date | null, index: number, isEdit: boolean }>();
const emits = defineEmits(["sendDateTime"]);

//仮
// よく使う定数
const BLANK: string = "";
// const INIT_NUMBER: number = 0;
// const SERVER_STATUS_OK: number = 200;
// const SERVER_STATUS_ERROR: number = 400;
// メッセージボックス表示定数
//const infoLevel: Ref<number> = ref(MessageConstants.LEVEL_NONE);
//const messageType: Ref<number> = ref(MessageConstants.VIEW_NONE);
//const title: Ref<string> = ref(BLANK);
//const message: Ref<string> = ref(BLANK);

const dateString: Ref<string | null> = ref("");
const timeString: Ref<string | null> = ref("");

let isLocalChange = false;
const DATE_LIMIT = DtoEntityConstants.INIT_DATETIME_LIMIT;

onBeforeMount(() => {
    dateString.value = null === props.datetime ? BLANK : props.datetime.toLocaleDateString('sv-SE');
    timeString.value = null === props.datetime ? BLANK : props.datetime.toLocaleTimeString('sv-SE');
});

watch(props, () => {
    if (isLocalChange) {
        isLocalChange = false;
        return;
    }
    if (null === props.datetime) {
        dateString.value = null;
        timeString.value = null;
    } else {
        // 下限値が戻ってきたときも何もしない
        if (props.datetime <= DATE_LIMIT) {
            return;
        }
        dateString.value = props.datetime.toLocaleDateString('sv-SE');
        timeString.value = props.datetime.toLocaleTimeString('sv-SE');
    }
});

function onDataChange() {
    if (null === dateString.value || null === timeString.value || "" === dateString.value || "" === timeString.value) {
        isLocalChange = true;
        if ((null === dateString.value || null === timeString.value)
            || ("" === dateString.value && "" === timeString.value)) {
            emits("sendDateTime", null, props.index);
        } else {
            emits("sendDateTime", DATE_LIMIT, props.index);
        }

        nextTick(() => { isLocalChange = false; });
    } else {
        alert(2);
        const dateCell: string[] = dateString.value.split("-");
        const timeCell: string[] = timeString.value.split(":");
        if (dateCell[0] !== undefined && dateCell[1] !== undefined && dateCell[2] !== undefined
            && timeCell[0] !== undefined && timeCell[1] !== undefined && timeCell[2] !== undefined) {
            const sendData: Date = new Date(parseInt(dateCell[0]), parseInt(dateCell[1]) - 1, parseInt(dateCell[2]),
                parseInt(timeCell[0]), parseInt(timeCell[1]), parseInt(timeCell[2]));
            isLocalChange = true;
            emits("sendDateTime", sendData, props.index);
            nextTick(() => { isLocalChange = false; });
        } else {
            isLocalChange = true;
            emits("sendDateTime", null, props.index);
            nextTick(() => { isLocalChange = false; });
        }
    }
}

</script>
<template>
    <input type="date" v-model="dateString" @blur="onDataChange" :disabled="!isEdit">
    <input type="time" v-model="timeString" @blur="onDataChange" :disabled="!isEdit" class="left-space-narrow" step="1">
</template>
<style scoped></style>
