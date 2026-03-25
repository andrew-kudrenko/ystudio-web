<script setup lang="ts" generic="D = any">
import type { TableRow } from "@nuxt/ui";

defineProps<{ row: TableRow<D> }>();
</script>

<template>
  <UCheckbox
    :model-value="row.getIsSelected()"
    @update:modelValue="row.toggleSelected(!!$event)"
  />
</template>
