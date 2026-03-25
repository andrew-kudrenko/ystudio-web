<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";

defineProps<{ text?: string; color?: BadgeProps["color"] }>();
</script>

<template>
  <UBadge variant="outline" :color="$props.color" size="md">
    {{ $props.text ?? "Нет данных" }}
  </UBadge>
</template>
