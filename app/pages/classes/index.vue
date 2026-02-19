<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import type { TableColumn } from "@nuxt/ui";

import { ClassesCalendar } from "~/modules/features/classes";
import type { Class } from "~/types";

const dateFrom = shallowRef(new CalendarDate(2026, 1, 1));
const dateTo = shallowRef(new CalendarDate(2026, 4, 1));

const query = computed(() => ({
  dateFrom: dateFrom.value.toString(),
  dateTo: dateTo.value.toString(),
}));

const fetchClassesApi = await useApi<Class[]>("/classes", {
  query,
});

const columns: TableColumn<Class>[] = [
  { accessorKey: "classDate", header: "Дата" },
  { accessorKey: "startTime", header: "Время начала" },
  { accessorKey: "endTime", header: "Время окончания" },
  { accessorKey: "title", header: "Название" },
  { accessorKey: "capacity", header: "Места" },
  { accessorKey: "price", header: "Цена" },
];
</script>

<template>
  <UPage>
    <UPageHeader title="Расписание занятий" description="На ближайшую неделю">
      <template #links>
        <UButton @click="navigateTo('/classes/create')">Создать</UButton>
      </template>
    </UPageHeader>

    <UPageBody>
      <ClassesCalendar v-model="dateFrom" />

      <UTable
        :data="fetchClassesApi.data.value"
        :loading="fetchClassesApi.pending.value"
        :columns="columns"
      />
    </UPageBody>
  </UPage>
</template>
