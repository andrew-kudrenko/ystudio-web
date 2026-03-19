<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import type { Class } from "~/types";

const modelValue = defineModel<number | undefined>({ required: true });

const { data: instructors, status } = useApi<Class[], SelectItem[]>("classes", {
  key: "classes.select",
  transform: (data) => {
    return data.map((i) => ({
      label: `${i.title} ${i.classDate}`,
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
    :items="instructors"
    icon="i-lucide-calendar"
    placeholder="Хатха-йога"
  />
</template>
