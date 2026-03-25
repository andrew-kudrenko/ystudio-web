<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";
import {
  ClassBookingStatus,
  getClassBookingStatusBadgeColor,
  getClassBookingStatusDisplayName,
} from "../model/ClassBookingStatus";

defineProps<BadgeProps & { status?: number | ClassBookingStatus }>();
</script>

<template>
  <UBadge
    :color="getClassBookingStatusBadgeColor($props.status)"
    :label="getClassBookingStatusDisplayName($props.status)"
    variant="subtle"
    v-bind="$attrs"
  >
    <slot />
  </UBadge>
</template>
