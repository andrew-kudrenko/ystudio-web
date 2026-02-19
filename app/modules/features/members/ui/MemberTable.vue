<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { PaginatedResponse, Member } from "~/types";

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

const memberRequest = useApi<PaginatedResponse<Member>>("members", {
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

const columns: TableColumn<Member>[] = [
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
</script>

<template>
  <div class="w-full space-y-4 pb-4">
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
      class="flex-1"
    />

    <div class="flex justify-between px-4 py-3.5 border-t border-accented">
      <div class="flex gap-3">
        <UButton
          :disabled="isEditButtonDisabled"
          type="button"
          color="warning"
          variant="subtle"
          @click="handleEdit"
        >
          Редактировать
        </UButton>

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

    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="memberRequest.data.value?.pageSize"
        :total="memberRequest.data.value?.totalCount"
        @update:page="(p) => (pagination.pageIndex = p - 1)"
      />
    </div>
  </div>
</template>
