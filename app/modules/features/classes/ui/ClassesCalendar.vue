<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

const modelValue = defineModel({ required: true, type: CalendarDate });
</script>

<template>
  <UCalendar
    v-model="modelValue"
    :number-of-months="2"
    variant="solid"
  ></UCalendar>
</template>
