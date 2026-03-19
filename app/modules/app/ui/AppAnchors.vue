<script setup lang="ts">
import type { PageAnchor } from "@nuxt/ui";

const ANCHOR_ITEMS: PageAnchor[] = [
  {
    label: "Бронирование",
    icon: "i-lucide-calendar-check",
    to: "/class-bookings",
  },
  {
    label: "Занятия",
    icon: "i-lucide-calendar",
    to: "/classes",
  },
  {
    label: "Участники",
    icon: "i-lucide-users",
    to: "/members",
  },
  {
    label: "Инструкторы",
    icon: "i-lucide-contact",
    to: "/instructors",
  },
  {
    label: "Студии",
    icon: "i-lucide-house-heart",
    to: "/studios",
  },
];
</script>

<template>
  <UPageAnchors :links="ANCHOR_ITEMS" />
</template>
