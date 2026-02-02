<script setup lang="ts">
import type { PageLink } from "@nuxt/ui";

const links = ref<PageLink[]>([
  {
    label: "Расписание",
    icon: "i-lucide-file-pen",
    to: "/schedule",
  },
  {
    label: "Занятия",
    icon: "i-lucide-star",
    to: "/classes",
  },
  {
    label: "Абонементы",
    icon: "i-lucide-star",
    to: "/memberships",
  },
  {
    label: "Мероприятия",
    icon: "i-lucide-star",
    to: "/memberships",
  },
  {
    label: "Заметки",
    icon: "i-lucide-star",
    to: "/memberships",
  },
]);
</script>

<template>
  <UPageHeader title="Домашняя" />
  <UPageLinks :links="links" />
</template>
