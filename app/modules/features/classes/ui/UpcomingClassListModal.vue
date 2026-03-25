<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import TableRowCheckbox from "~/modules/shared/ui/table/TableRowCheckbox.vue";
import type { ClassListItemDto } from "~/types";

const emit = defineEmits<{
  "click:accept": [id: number | undefined];
}>();

const open = defineModel<boolean>("open");

const columns: TableColumn<ClassListItemDto>[] = [
  { id: "select" },
  { accessorKey: "classDate", header: "Дата" },
  { accessorKey: "startTime", header: "Время" },
  { accessorKey: "title", header: "Название" },
  { accessorKey: "instructorName", header: "Инструктор" },
  { accessorKey: "studioName", header: "Студия" },
];

const fetchMembersQuery = useApi<ClassListItemDto[]>("classes/upcoming", {
  lazy: true,
});

const data = computed(() => fetchMembersQuery.data.value);

const loading = computed(() => fetchMembersQuery.pending.value);

const rowSelection = ref<Record<number, boolean>>({});

const selectedMemberIds = computed(() => {
  if (!data.value?.length) {
    return [];
  }

  const ids: number[] = [];
  const keys = Object.keys(rowSelection.value);

  for (const key of keys) {
    const index = Number(key);
    const row = data.value[index];

    if (rowSelection.value[index] && row) {
      ids.push(row.id);
    }
  }

  return ids;
});

const isAcceptButtonDisabled = computed(
  () => selectedMemberIds.value.length < 1,
);
</script>

<template>
  <UModal v-model:open="open" title="Ближайшие занятия">
    <template #body>
      <div class="flex items-center gap-2">
        <UButton
          :disabled="isAcceptButtonDisabled"
          label="Подтвердить"
          @click="$emit('click:accept', selectedMemberIds[0])"
        />
      </div>

      <UTable
        ref="table"
        v-model:row-selection="rowSelection"
        sticky
        :columns="columns"
        :data="data"
        :loading="loading"
        :row-selection-options="{ enableMultiRowSelection: false }"
        style="max-height: min(50vh, 400px)"
      >
        <template #select-cell="{ row }">
          <TableRowCheckbox :row="row" />
        </template>
      </UTable>
    </template>
  </UModal>
</template>
