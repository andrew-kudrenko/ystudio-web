<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { ClassMemberListItemDto } from "~/modules/shared/api/classes.types";

const UCheckbox = resolveComponent("UCheckbox");

const props = defineProps<{
  data?: ClassMemberListItemDto[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  add: [memberIds: number[]];
}>();

const table = useTemplateRef("table");

const rowSelection = ref<Record<number, boolean>>({});

const columns: TableColumn<ClassMemberListItemDto>[] = [
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
  { accessorKey: "fullName", header: "Имя" },
  { accessorKey: "phone", header: "Телефон" },
];

const globalFilter = ref("");

const selectedMemberIds = computed(() => {
  if (!props.data?.length) {
    return [];
  }

  const ids: number[] = [];
  const keys = Object.keys(rowSelection.value);

  for (const key of keys) {
    const index = Number(key);
    const row = props.data[index];

    if (rowSelection.value[index] && row) {
      ids.push(row.memberId);
    }
  }

  return ids;
});

const isAddButtonDisabled = computed(() => selectedMemberIds.value.length < 1);
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <div class="flex justify-between-gap-2">
        <UInput
          v-model="globalFilter"
          icon="i-lucide-search"
          class="max-w-sm"
          placeholder="Иван Человеков"
        />
      </div>

      <div class="flex justify-between-gap-2">
        <UFieldGroup>
          <UButton
            :disabled="isAddButtonDisabled"
            variant="outline"
            @click="$emit('add', selectedMemberIds)"
          >
            Добавить
          </UButton>
        </UFieldGroup>
      </div>
    </div>

    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:row-selection="rowSelection"
      sticky
      :columns="columns"
      :data="$props.data"
      :loading="$props.loading"
      style="max-height: min(50vh, 400px)"
    />

    <div class="px-2 py-2 border-t border-accented text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} из
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} строк
      выбрано
    </div>
  </div>
</template>
