<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

import { ClassesTable } from "~/modules/pages/classes";
import { useClassesPage } from "~/modules/pages/classes/lib/useClassesPage";

import { DateRangePicker } from "~/modules/shared";

const page = useClassesPage();

const links = ref<ButtonProps[]>([
  {
    label: "Создать занятие",
    icon: "i-lucide-circle-plus",
    to: "/classes/create",
    color: "primary",
  },
]);

function handleEdit(id: number) {
  return navigateTo(`/classes/edit/${id}`);
}

function handleView(id: number) {
  return navigateTo(`/classes/${id}`);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Занятия" description="Раписание" :links="links" />

    <UPageBody>
      <ClassesTable
        :data="page.data.value"
        :loading="page.loading.value"
        @edit="handleEdit($event)"
        @view="handleView($event)"
      >
        <template #header>
          <DateRangePicker v-model="page.dateRange.value" />
        </template>
      </ClassesTable>
    </UPageBody>
  </UPage>
</template>
