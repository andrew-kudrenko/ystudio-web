<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

import type { ScheduleCount } from "~/types";

const props = defineProps<{
  classCount?: ScheduleCount[];
}>();

const dates = computed(
  () =>
    props.classCount?.map((c) => ({
      classCount: c.classCount,
      classDate: new Date(c.classDate),
    })) ?? [],
);

const modelValue = defineModel({ required: true, type: CalendarDate });

function getColorByDate(date: Date) {
  const hasClasses = dates.value.find(
    (v) => v.classDate.getTime() === date.getTime(),
  );

  return hasClasses ? "success" : undefined;
}
</script>

<template>
  <UCalendar v-model="modelValue" :number-of-months="1">
    <template #day="{ day }">
      <UChip
        :show="!!getColorByDate(day.toDate('UTC'))"
        :color="getColorByDate(day.toDate('UTC'))"
        size="2xs"
      >
        {{ day.day }}
      </UChip>
    </template>
  </UCalendar>
</template>
