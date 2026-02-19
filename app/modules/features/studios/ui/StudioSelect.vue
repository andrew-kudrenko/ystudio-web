<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import type { Studio } from "~/types";

const modelValue = defineModel<number | undefined>({ required: true });

const { data: items, status } = useApi<Studio[], SelectItem[]>("studios", {
  key: "studios.select",
  transform: (data) => {
    return data.map((i) => ({
      label: i.name,
      value: i.id,
    }));
  },
  lazy: true,
});
</script>

<template>
  <USelect
    v-model="modelValue"
    :disabled="status !== 'success'"
    :default-value="modelValue"
    :items="items"
    icon="i-lucide-house-heart"
    placeholder='Студия "Сутра"'
    value-key="value"
    class="w-48"
  />
</template>
