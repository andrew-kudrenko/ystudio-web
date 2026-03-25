<script setup lang="ts" generic="D = any">
import { type Table } from "@tanstack/table-core";

defineProps<{ table: Table<D> }>();
</script>

<template>
  <UCheckbox
    :model-value="
      table.getIsSomePageRowsSelected()
        ? 'indeterminate'
        : table.getIsAllPageRowsSelected()
    "
    @update:modelValue="table.toggleAllPageRowsSelected(!!$event)"
  />
</template>
