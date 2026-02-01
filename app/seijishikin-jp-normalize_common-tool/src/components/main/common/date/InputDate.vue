<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';


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
onBeforeMount(() => {
    if (props.date !== null) {
        dateString.value = props.date.toLocaleDateString('sv-SE');
    } else {
        dateString.value = "";
    }
});

function onDataChange() {
    const dateCell: string[] = dateString.value.split("-");
    if (dateCell[0] !== undefined && dateCell[1] !== undefined && dateCell[2] !== undefined) {
        const sendData: Date = new Date(parseInt(dateCell[0]), parseInt(dateCell[1]) - 1, parseInt(dateCell[2]));
        emits("sendDate", sendData, props.index);
    }
}

</script>
<template>
    <input type="date" v-model="dateString" @blur="onDataChange" :disabled="!isEdit">
</template>
<style scoped></style>
