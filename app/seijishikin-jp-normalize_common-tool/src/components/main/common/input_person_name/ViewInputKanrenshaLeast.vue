<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import type { InputKanrenshaPersonLeastDtoInterface } from '../../dto/input_person_name/inputKanrenshaPersonLeastDto';
import SearchKanrenshaPerson from '../search_kanrensha/SearchKanrenshaPerson.vue';
import type { KanrenshaPersonMasterEntityInterface } from '../../entity/kanrenshaPersonMasterEntity';

// props,emit
const props = defineProps<{ editDto: InputKanrenshaPersonLeastDtoInterface, title: string }>();

const dto: ComputedRef<InputKanrenshaPersonLeastDtoInterface> = computed(() => props.editDto);

const isInput: Ref<boolean> = ref(false);

function onSearch() {
    isInput.value = true;
}

function recieveCancelPerson() {
    isInput.value = false;
}
function recievePersonInterface(selectedEntity: KanrenshaPersonMasterEntityInterface) {

    dto.value.personName = selectedEntity.kanrenshaName;
    dto.value.personKanrenshaCode = selectedEntity.personKanrenshaCode;
    isInput.value = false;
}
</script>
<template>
    <br>
    <h3 class="indent-h3">{{ props.title }}</h3>
    <div class="one-line">
        <div class="left-area">
            コードと名称
        </div>
        <div class="right-area">
            <input type="text" v-model="dto.personKanrenshaCode" class="code-input" disabled="true">
            <input type="text" v-model="dto.personName" class="left-space name-input" disabled="true">
            <button @click="onSearch">編集</button>
            <br>
        </div>
    </div>

    <!-- 姓名詳細入力 -->
    <div v-if="isInput" class="overBackground"></div>
    <div class="overComponent" v-if="isInput">
        <SearchKanrenshaPerson v-if="isInput" :is-raise-commponet="true" @send-cancel-person="recieveCancelPerson"
            @send-person-interface="recievePersonInterface"></SearchKanrenshaPerson>
    </div>

</template>
<style scoped></style>
