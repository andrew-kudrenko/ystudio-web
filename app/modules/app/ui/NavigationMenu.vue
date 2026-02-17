<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Разделы",
      type: "label",
    },
    {
      label: "Занятия",
      icon: "i-lucide-calendar",
      to: "/classes",
    },
    {
      label: "Бронирование",
      icon: "i-lucide-calendar-check",
      to: "/class-bookings",
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
    {
      label: "Подписки",
      icon: "i-lucide-receipt",
      to: "/memberships",
    },
  ],
  [
    {
      label: "О проекте",
      icon: "i-lucide-info",
      to: "/about",
    },
  ],
]);
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-48"
  />
</template>
