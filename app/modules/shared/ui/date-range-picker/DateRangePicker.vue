<script setup lang="ts">
import type { DateRangePickerModelValue } from "./types";
import { formatDate } from "./lib";

const modelValue = defineModel<DateRangePickerModelValue>({ required: true });
</script>

<template>
  <UPopover :ui="{ content: 'mb-0' }">
    <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ formatDate(modelValue.start) }} -
          {{ formatDate(modelValue.end) }}
        </template>

        <template v-else>
          {{ formatDate(modelValue.start) }}
        </template>
      </template>
      <template v-else>Выберите дату</template>
    </UButton>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range />
    </template>
  </UPopover>
</template>
