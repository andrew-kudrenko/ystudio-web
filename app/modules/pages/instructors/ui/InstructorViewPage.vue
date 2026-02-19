<script setup lang="ts">
import type { Instructor, InstructorListItem } from "~/types";

import InstructorPreviewCard from "./InstructorPreviewCard.vue";

const toast = useToast();

const isConfirmOpen = ref(false);
const forRemoval = ref<Instructor>();

const fetchAllApi = useApi<InstructorListItem[]>("instructors", {
  server: false,
});

onBeforeMount(fetchAllApi.execute);

const instructors = computed(() => fetchAllApi.data.value ?? []);

function handleRemoveButtonClick(value: Instructor) {
  forRemoval.value = value;
  isConfirmOpen.value = true;
}

function handleRemovalCancel() {
  forRemoval.value = undefined;
  isConfirmOpen.value = false;

  toast.add({
    title: "У нас отмена!",
    description: "Данные не будут удалены",
    color: "warning",
    icon: "i-lucide-info",
  });
}

async function handleRemovalConfirm(value: Instructor) {
  const { error } = await useApi(`instructors/${value.id}`, {
    method: "delete",
  });

  if (error.value) {
    toast.add({
      title: error.value?.data?.title ?? "Ошибка",
      description: error.value?.data?.detail ?? error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });

    return;
  }

  isConfirmOpen.value = false;
  forRemoval.value = undefined;

  toast.add({
    title: "Студия удалена",
    description: "Данные на странице обновляются",
    color: "primary",
    icon: "i-lucide-circle-check",
  });

  await fetchAllApi.execute();
}
</script>

<template>
  <UPage>
    <UPageHeader title="Инструкторы">
      <template #description>
        <div class="w-full flex justify-between gap-1 flex-wrap md:flex-nowrap">
          <p class="">Наши дорогие инструкторы</p>

          <UButton
            icon="i-lucide-circle-plus"
            style="align-self: center"
            @click="navigateTo('/instructors/create')"
          >
            Создать
          </UButton>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <!-- <InstructorRemoveConfirm
        v-model:open="isConfirmOpen"
        :studio="instructorForRemoval"
        @confirm="handleRemovalConfirm($event)"
        @cancel="handleRemovalCancel"
      /> -->

      <UPageGrid style="align-items: flex-start">
        <InstructorPreviewCard
          v-for="i in instructors"
          :key="i.id"
          :instructor="i"
          @click:edit="navigateTo(`/instructors/edit/${i.id}`)"
          @click:remove="handleRemoveButtonClick(i)"
        />
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>
