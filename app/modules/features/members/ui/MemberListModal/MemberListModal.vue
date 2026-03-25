<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { MemberListItemDto } from "~/modules/shared/api/members.types";
import TableHeaderCheckbox from "~/modules/shared/ui/table/TableHeaderCheckbox.vue";
import TableRowCheckbox from "~/modules/shared/ui/table/TableRowCheckbox.vue";
import TableSelectionSection from "~/modules/shared/ui/table/TableSelectionSection.vue";

const table = useTemplateRef("table");

const emit = defineEmits<{
  select: [memberIds: number[]];
}>();

const open = defineModel<boolean>("open");

const columns: TableColumn<MemberListItemDto>[] = [
  { id: "select" },
  { accessorKey: "fullName", header: "Имя" },
  { accessorKey: "phone", header: "Телефон" },
];

const fetchMembersQuery = useApi<MemberListItemDto[]>("members/all", {
  lazy: true,
});

const data = computed(() => fetchMembersQuery.data.value);

const loading = computed(() => fetchMembersQuery.pending.value);

const rowSelection = ref<Record<number, boolean>>({});

const globalFilter = ref("");

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

const isSelectButtonDisabled = computed(
  () => selectedMemberIds.value.length < 1,
);
</script>

<template>
  <UModal v-model:open="open" title="Список участников">
    <template #body>
      <div class="flex justify-between gap-2">
        <div class="flex justify-between-gap-2">
          <UInput
            v-model="globalFilter"
            icon="i-lucide-search"
            class="max-w-sm"
            placeholder="Иван Человеков"
            size="sm"
          />
        </div>

        <div class="flex justify-between-gap-2">
          <UFieldGroup>
            <UButton
              :disabled="isSelectButtonDisabled"
              variant="outline"
              trailing-icon="i-lucide-circle-check"
              size="sm"
              @click="$emit('select', selectedMemberIds)"
            >
              Выбрать
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
        :data="data"
        :loading="loading"
        style="max-height: min(50vh, 400px)"
      >
        <template #select-header="{ table }">
          <TableHeaderCheckbox :table="table" />
        </template>

        <template #select-cell="{ row }">
          <TableRowCheckbox :row="row" />
        </template>
      </UTable>

      <TableSelectionSection :table="table?.tableApi" />
    </template>
  </UModal>
</template>
