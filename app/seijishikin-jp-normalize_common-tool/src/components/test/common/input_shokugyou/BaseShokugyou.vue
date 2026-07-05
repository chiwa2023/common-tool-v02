<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { InputShokugyouDto, type InputShokugyouDtoInterface } from '../../../main/dto/input_shokugyou/inputShokugyouDto';
import ViewInputShokugyou from '../../../main/common/input_shokugyou/ViewInputShokugyou.vue';

const inputShokugyouDto: Ref<InputShokugyouDtoInterface> = ref(new InputShokugyouDto());
const appId: string = import.meta.env.VITE_HOUJIN_NO_API;

</script>
<template>
    <!-- 職業 -->
    <ViewInputShokugyou :edit-dto="inputShokugyouDto" :houjin-api-key="appId"></ViewInputShokugyou>
</template>
<style scoped></style>
