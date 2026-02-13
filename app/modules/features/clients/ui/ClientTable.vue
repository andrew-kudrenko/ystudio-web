<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";

import type { Member } from "~/types";

defineProps<{
  data?: Member[];
  loading?: boolean;
}>();

const columns: TableColumn<Member>[] = [
  { accessorKey: "clientId", header: "#" },
  {
    accessorKey: "lastName",
    header: "Фамилия",
  },
  {
    accessorKey: "firstName",
    header: "Имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    accessorKey: "notes",
    header: "Примечание",
  },
];

const table = useTemplateRef("table");

const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
});
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      sticky
      :data="$props.data"
      :columns
      :loading="$props.loading"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="flex-1"
    />

    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
