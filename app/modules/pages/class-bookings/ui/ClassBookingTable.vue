<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { ClassBookingListItemDto } from "~/modules/shared/api/types";

defineProps<{ data?: ClassBookingListItemDto[] }>();

const columns: TableColumn<ClassBookingListItemDto>[] = [];
</script>

<template>
  <UTable :data="$props.data" />
</template>
