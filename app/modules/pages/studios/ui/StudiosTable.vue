<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";

import type { StudioListItemDto } from "~/modules/shared/api/studios.types";

defineProps<{ studios: StudioListItemDto[]; loading?: boolean }>();

const emit = defineEmits<{
  edit: [studioId: number];
  remove: [studioId: number];
}>();

const columns: TableColumn<StudioListItemDto>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "name", header: "Название" },
  { id: "action" },
];

function getDropdownActions(studioId: number): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Редактировать",
        icon: "i-lucide-edit",
        onSelect: () => emit("edit", studioId),
      },
      {
        label: "Удалить",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => emit("remove", studioId),
      },
    ],
  ];
}
</script>

<template>
  <UCard>
    <UTable
      sticky
      :data="$props.studios"
      :loading="$props.loading"
      :columns="columns"
    >
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original.id)">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UTable>
  </UCard>
</template>
