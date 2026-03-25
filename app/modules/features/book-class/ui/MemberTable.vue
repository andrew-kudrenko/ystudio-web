<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { MemberListItemDto } from "~/modules/shared/api/members.types";
import { indicesOfSelectedRows } from "~/modules/shared/lib/table.utils";
import TableHeaderCheckbox from "~/modules/shared/ui/table/TableHeaderCheckbox.vue";
import TableRowCheckbox from "~/modules/shared/ui/table/TableRowCheckbox.vue";
import TableSelectionSection from "~/modules/shared/ui/table/TableSelectionSection.vue";

const props = defineProps<{ data?: MemberListItemDto[]; loading?: boolean }>();

const selected = defineModel<number[]>("selected");

const table = useTemplateRef("table");

const columns: TableColumn<MemberListItemDto>[] = [
  { id: "select" },
  { accessorKey: "fullName", header: "Имя" },
  { accessorKey: "phone", header: "Телефон" },
];

const rowSelection = ref<Record<number, boolean>>({});

const globalFilter = ref("");

watch(rowSelection, (value) => {
  selected.value = indicesOfSelectedRows(value).map((i) => props.data![i]!.id);
});
</script>

<template>
  <UCard>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:row-selection="rowSelection"
      sticky
      :columns="columns"
      :data="$props.data"
      :loading="$props.loading"
      style="max-height: 300px"
    >
      <template #select-header="{ table }">
        <TableHeaderCheckbox :table="table" />
      </template>

      <template #select-cell="{ row }">
        <TableRowCheckbox :row="row" />
      </template>
    </UTable>

    <TableSelectionSection :table="table?.tableApi" />
  </UCard>
</template>
