<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { indicesOfSelectedRows } from "~/modules/shared/lib/table.utils";

import TableRowCheckbox from "~/modules/shared/ui/table/TableRowCheckbox.vue";
import type { ClassListItemDto } from "~/types";

const props = defineProps<{
  data?: ClassListItemDto[];
  loading?: boolean;
}>();

const selected = defineModel<number | null>("selected");

const columns: TableColumn<ClassListItemDto>[] = [
  { id: "select" },
  { accessorKey: "classDate", header: "Дата" },
  { accessorKey: "startTime", header: "Время" },
  { accessorKey: "title", header: "Название" },
  { accessorKey: "instructorName", header: "Инструктор" },
];

const rowSelection = ref<Record<number, boolean>>({});

watch(rowSelection, (value) => {
  const indices = indicesOfSelectedRows(value);

  if (indices.length > 0 && props.data?.length) {
    const found = props.data[indices[0]!];

    if (found) {
      selected.value = found.id;
      return;
    }
  }

  selected.value = null;
});
</script>

<template>
  <UCard>
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      sticky
      :columns="columns"
      :data="$props.data"
      :loading="$props.loading"
      :row-selection-options="{ enableMultiRowSelection: false }"
      style="max-height: 300px"
    >
      <template #select-cell="{ row }">
        <TableRowCheckbox :row="row" />
      </template>
    </UTable>
  </UCard>
</template>
