<script setup lang="ts">
import type { Studio } from "~/types";
import StudioPreviewCard from "./StudioPreviewCard.vue";
import StudioRemoveConfirm from "./StudioRemoveConfirm.vue";

const toast = useToast();

const isConfirmOpen = ref(false);
const studioForRemoval = ref<Studio>();

const studiosRequest = await useApi<Studio[]>("studios");

const studios = computed(() => studiosRequest.data.value ?? []);

function handleRemoveButtonClick(studio: Studio) {
  studioForRemoval.value = studio;
  isConfirmOpen.value = true;
}

function handleRemovalCancel() {
  studioForRemoval.value = undefined;
  isConfirmOpen.value = false;

  toast.add({
    title: "У нас отмена!",
    description: "Данные не будут удалены",
    color: "warning",
    icon: "i-lucide-info",
  });
}

async function handleRemovalConfirm(studio: Studio) {
  const { error } = await useApi(`studios/${studio.id}`, { method: "delete" });

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
  studioForRemoval.value = undefined;

  toast.add({
    title: "Студия удалена",
    description: "Данные на странице обновляются",
    color: "primary",
    icon: "i-lucide-circle-check",
  });

  await studiosRequest.execute();
}
</script>

<template>
  <UPage>
    <UPageHeader title="Студии">
      <template #description>
        <div class="w-full flex justify-between gap-1 flex-wrap md:flex-nowrap">
          <p class="">
            Просматривайте, добавляйте и управляйте Вашими студиями!
          </p>

          <UButton
            icon="i-lucide-circle-plus"
            style="align-self: center"
            @click="navigateTo('/studios/create')"
          >
            Создать
          </UButton>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <StudioRemoveConfirm
        v-model:open="isConfirmOpen"
        :studio="studioForRemoval"
        @confirm="handleRemovalConfirm($event)"
        @cancel="handleRemovalCancel"
      />

      <UPageGrid>
        <StudioPreviewCard
          v-for="s in studios"
          :key="s.id"
          :studio="s"
          @click:edit="navigateTo(`/studios/edit/${s.id}`)"
          @click:remove="handleRemoveButtonClick(s)"
        />
      </UPageGrid>
    </UPageBody>
  </UPage>
</template>
