<script setup lang="ts">
import type { PageLink } from "@nuxt/ui";

const links = ref<PageLink[]>([
  {
    label: "Расписание",
    icon: "i-lucide-file-pen",
    to: "/schedule",
  },
  {
    label: "Студии",
    icon: "i-lucide-star",
    to: "/studios",
  },
  {
    label: "Абонементы",
    icon: "i-lucide-star",
    to: "/memberships",
  },
  {
    label: "Клиенты",
    icon: "i-lucide-star",
    to: "/clients",
  },
]);
</script>

<template>
  <UPageHeader title="Домашняя" />
  <UPageLinks :links="links" />
</template>
