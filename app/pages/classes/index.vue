<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import type { TableColumn } from "@nuxt/ui";

import { ClassesCalendar } from "~/modules/features/classes";
import type { Class, ScheduleCount } from "~/types";

const date = shallowRef(new CalendarDate(2024, 2, 1));

const query = computed(() => ({
  fromDate: date.value.toString(),
  toDate: date.value.toString(),
}));

const scheduleCount = await useApi<ScheduleCount[]>("schedule/count", {
  query: {
    fromDate: date.value.subtract({ years: 1 }).toString(),
    toDate: date.value.add({ years: 1 }).toString(),
  },
});

const schedule = await useApi<Class[]>("schedule", {
  query,
});

const columns: TableColumn<Class>[] = [
  { accessorKey: "classDate", header: "Дата" },
  { accessorKey: "timeRange", header: "Время" },
  { accessorKey: "classType", header: "Занятие" },
  { accessorKey: "instructorName", header: "Инструктор" },
  { accessorKey: "capacity", header: "Места" },
  { accessorKey: "price", header: "Цена" },
  { accessorKey: "studioName", header: "Студия" },
];
</script>

<template>
  <UPage>
    <UPageHeader title="Расписание занятий" description="На ближайшую неделю">
      <template #links>
        <UButton @click="navigateTo('/schedule/create')">Создать</UButton>
      </template>
    </UPageHeader>

    <UPageBody>
      <ClassesCalendar v-model="date" :class-count="scheduleCount.data.value" />

      <UTable
        :data="schedule.data.value"
        :loading="schedule.pending.value"
        :columns="columns"
      />
    </UPageBody>
  </UPage>
</template>
