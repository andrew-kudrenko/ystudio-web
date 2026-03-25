<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items = [
  {
    label: "Занятие",
    description: "Выберите занятие для бронирования",
    icon: "i-lucide-calendar-search",
    slot: "class" as const,
  },
  {
    label: "Участники",
    icon: "i-lucide-users",
    slot: "members" as const,
  },
  {
    label: "Подтверждение",
    icon: "i-lucide-list-checks",
    slot: "confirm" as const,
  },
] satisfies TabsItem[];
</script>

<template>
  <UTabs
    :unmount-on-hide="false"
    :items="items"
    variant="link"
    :ui="{ trigger: 'grow' }"
    class="gap-2 w-full"
  >
    <template #class>
      <slot name="class" />
    </template>

    <template #members>
      <slot name="members" />
    </template>

    <template #confirm>
      <slot name="confirm" />
    </template>
  </UTabs>
</template>
