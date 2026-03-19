<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

import ConfirmationDialog from "~/modules/shared/ui/confirmation-dialog/ConfirmationDialog.vue";

import { useStudios } from "../model/useStudios";
import StudiosTable from "./StudiosTable.vue";

const links = ref<ButtonProps[]>([
  {
    label: "Создать",
    icon: "i-lucide-circle-plus",
    to: "/studios/create",
    color: "primary",
  },
]);

const page = useStudios();

onBeforeMount(async () => {
  await page.fetchAll();
});

function handleEditStudio(studioId: number) {
  return navigateTo(`/studios/edit/${studioId}`);
}

function handleRemoveStudio(studioId: number) {
  page.openRemoveConfirmation(studioId);
}
</script>

<template>
  <UPageHeader
    title="Студии"
    description="Будьте властелином пространств!"
    :links="links"
    class="mb-2"
  />

  <ConfirmationDialog
    v-model:open="page.showRemoveConfirmation.value"
    title="Удалить студию"
    :description="`Вы действительно хотите удалить студию &quot;${page.studioForRemoval.value?.name}&quot;?`"
    @cancel="page.cancelRemove"
    @confirm="page.confirmRemove"
  />

  <StudiosTable
    :studios="page.studios.value"
    :loading="page.loading.value"
    @edit="handleEditStudio"
    @remove="handleRemoveStudio"
  />
</template>
