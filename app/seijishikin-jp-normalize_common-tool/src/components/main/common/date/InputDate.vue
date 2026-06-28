<script setup lang="ts">
import { onBeforeMount, ref, watch, type Ref } from 'vue';
import DtoEntityConstants from '../../dto/dtoEntityConstants';


// props,emmits
const props = defineProps<{ date: Date, index: number, isEdit: boolean }>();
const emits = defineEmits(["sendDate"]);

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

const dateString: Ref<string> = ref("");
const LIMIT_DATE: Date = DtoEntityConstants.INIT_DATE_LIMIT;

onBeforeMount(() => {
    dateString.value = props.date.toLocaleDateString('sv-SE');
});

watch(props, () => {
    const limit = LIMIT_DATE;
    if (!isNaN(props.date.getTime()) && props.date.getTime() <= limit.getTime()) {
        return;
    }
    dateString.value = props.date.toLocaleDateString('sv-SE');
});

function onDataChange() {
    if (null === dateString.value || "" === dateString.value) {
        emits("sendDate", LIMIT_DATE, props.index);
    } else {
        const dateCell: string[] = dateString.value.split("-");
        if (dateCell[0] !== undefined && dateCell[1] !== undefined && dateCell[2] !== undefined
            && !isNaN(parseInt(dateCell[0])) && !isNaN(parseInt(dateCell[1])) && !isNaN(parseInt(dateCell[2]))
            && dateCell[0].length === 4) {
            const sendData: Date = new Date(parseInt(dateCell[0]), parseInt(dateCell[1]) - 1, parseInt(dateCell[2]));
            if (!isNaN(sendData.getTime())) {
                emits("sendDate", sendData, props.index);
            } else {
                emits("sendDate", LIMIT_DATE, props.index);
            }
        } else {
            emits("sendDate", LIMIT_DATE, props.index);
        }
    }
}

</script>
<template>
    <input type="date" v-model="dateString" @blur="onDataChange" :disabled="!isEdit">
</template>
<style scoped></style>
