<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import { ClassVisitStatus } from "../../class-visits/model/types";

const model = defineModel<number | undefined>("value");

defineProps<{ disabled?: boolean; loading?: boolean }>();

const items = [
  {
    label: "Пришёл",
    value: ClassVisitStatus.Came,
  },
  {
    label: "Пропустил",
    value: ClassVisitStatus.Missed,
  },
  {
    label: "Ожидание",
    value: ClassVisitStatus.Pending,
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
