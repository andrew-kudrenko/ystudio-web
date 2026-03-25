<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";

import { ClassPaymentStatus } from "../../class-payments";

const model = defineModel<number | undefined>("value");

defineProps<{ disabled?: boolean; loading?: boolean }>();

const items = [
  {
    label: "Оплачено",
    value: ClassPaymentStatus.Paid,
  },
  {
    label: "Ошибка",
    value: ClassPaymentStatus.Failed,
  },
  {
    label: "Отмена",
    value: ClassPaymentStatus.Cancelled,
  },
  {
    label: "Ожидание",
    value: ClassPaymentStatus.Pending,
  },
] as const satisfies SelectItem[];
</script>

<template>
  <USelect
    v-bind="$attrs"
    v-model="model"
    :items="items"
    :disabled="$props.disabled"
    :loading="$props.loading"
    :placeholder="items[0].label"
  />
</template>
