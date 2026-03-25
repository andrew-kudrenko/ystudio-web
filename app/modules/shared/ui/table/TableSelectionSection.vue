<script setup lang="ts" generic="D = unknown">
import { type Table } from "@tanstack/table-core";

defineProps<{ table?: Table<D> }>();
</script>

<template>
  <div class="px-2 py-2 border-t border-accented text-sm text-muted">
    {{ $props.table?.getFilteredSelectedRowModel().rows.length || 0 }} из
    {{ $props.table?.getFilteredRowModel().rows.length || 0 }} строк выбрано
  </div>
</template>
