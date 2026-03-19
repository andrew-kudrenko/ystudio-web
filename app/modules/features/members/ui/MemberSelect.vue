<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import type { Member, PaginatedResponse } from "~/types";

const modelValue = defineModel<number | undefined>({ required: true });

const { data: instructors } = useApi<Member[], SelectItem[]>("members", {
  key: "members.select",
  transform: (data: PaginatedResponse<Member>) => {
    return data.items.map((i) => ({
      label: `${i.firstName} ${i.lastName}`,
      value: i.id,
    }));
  },
  lazy: true,
});
</script>

<template>
  <USelect
    v-model="modelValue"
    :default-value="modelValue"
    :items="instructors"
    icon="i-lucide-user"
    placeholder="Иван Человеков"
    value-key="value"
    class="w-48"
  />
</template>
