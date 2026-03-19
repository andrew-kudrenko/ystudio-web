<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

import type { MemberListItemDto } from "~/modules/shared/api/members.types";
import type { PaginatedResponse } from "~/types";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

const toast = useToast();

const table = useTemplateRef("table");

const rowSelection = ref<Record<number, boolean>>({});

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const query = computed(() => ({
  pageSize: Math.max(pagination.value.pageSize, 1),
  pageNumber: Math.max(pagination.value.pageIndex + 1, 1),
}));

const memberRequest = useApi<PaginatedResponse<MemberListItemDto>>("members", {
  key: "member-table",
  lazy: true,
  query,
});

const selectedIds = computed(() =>
  Object.keys(rowSelection.value)
    .map((i) => memberRequest.data.value?.items.at(Number(i))?.id)
    .filter((id) => typeof id === "number"),
);

const isRemoveButtonDisabled = computed(() => selectedIds.value.length < 1);

const isEditButtonDisabled = computed(() => selectedIds.value.length !== 1);

const columns: TableColumn<MemberListItemDto>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
  },
  {
    accessorKey: "fullName",
    header: "Имя",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    accessorKey: "notes",
    header: "Примечание",
  },
  {
    id: "actions",
    meta: {
      class: {
        td: "text-right",
      },
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: getRowItems(row),
          "aria-label": "Actions dropdown",
        },
        () =>
          h(UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "neutral",
            variant: "ghost",
            "aria-label": "Actions dropdown",
          }),
      );
    },
  },
];

async function handleRemove() {
  const { data: removedCount, error } = await useApi<number>("/members", {
    method: "delete",
    query: { ids: selectedIds.value },
  });

  if (error.value) {
    toast.add({
      title: error.value?.data?.title ?? "Ошибка",
      description: error.value?.data?.detail ?? error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });

    return;
  }

  toast.add({
    title: "Записи удалены",
    description: `Было удалено ${removedCount.value} записей`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  rowSelection.value = {};

  await memberRequest.execute();
}

async function handleEdit() {
  const [id] = selectedIds.value;

  await navigateTo(`/members/edit/${id}`);
}

function getRowItems(row: Row<MemberListItemDto>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Copy payment ID",
      onSelect() {
        toast.add({
          title: "Payment ID copied to clipboard!",
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "View customer",
    },
    {
      label: "View payment details",
    },
  ];
}
</script>

<template>
  <UCard>
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      v-model:pagination="pagination"
      sticky
      :columns="columns"
      :data="memberRequest.data.value?.items"
      :loading="memberRequest.pending.value"
      loading-animation="carousel"
      :pagination-options="{
        manualPagination: true,
        rowCount: memberRequest.data.value?.totalCount,
        pageCount: memberRequest.data.value?.totalPages,
      }"
    />

    <div
      class="flex justify-between items-center px-4 py-3.5 mb-0 border-t border-accented"
    >
      <div class="flex gap-3">
        <UButton
          :disabled="isRemoveButtonDisabled"
          type="button"
          color="error"
          variant="subtle"
          @click="handleRemove"
        >
          Удалить
        </UButton>
      </div>

      <div class="text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} из
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} строк
        выбрано.
      </div>
    </div>

    <div class="flex justify-end border-t border-default pt-2 px-2">
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="memberRequest.data.value?.pageSize"
        :total="memberRequest.data.value?.totalCount"
        @update:page="(p) => (pagination.pageIndex = p - 1)"
      />
    </div>
  </UCard>
</template>
