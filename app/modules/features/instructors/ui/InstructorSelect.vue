<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import type { InstructorListItem } from "~/types";

const modelValue = defineModel<number | undefined>({ required: true });

const { data: instructors, status } = useApi<
  InstructorListItem[],
  SelectItem[]
>("instructors", {
  key: "instructors.select",
  transform: (data) => {
    return data.map((i) => ({
      label: i.fullName,
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
    icon="i-lucide-user"
    placeholder="Иван Человеков"
    value-key="value"
    class="w-48"
  />
</template>
