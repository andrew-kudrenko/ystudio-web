<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import type { Cell, Row, TableMeta } from "@tanstack/vue-table";

import type { ClassListItemDto } from "~/types";

defineProps<{ data?: ClassListItemDto[]; loading?: boolean }>();

const emit = defineEmits<{
  edit: [id: number];
  remove: [id: number];
  view: [id: number];
}>();

const meta: TableMeta<ClassListItemDto> = {
  class: {
    tr: (row: Row<ClassListItemDto>) => {
      if (row.original.isCancelled) {
        return "bg-warning/10";
      }

      const now = new Date().getTime();

      const classDateTimestamp = new Date(row.original.classDate).getTime();

      if (now > classDateTimestamp) {
        return "bg-secondary/10";
      }

      return "";
    },
  },
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { dateStyle: "short" });

const columns: TableColumn<ClassListItemDto>[] = [
  {
    accessorKey: "classDate",
    accessorFn: (v) => dateFormatter.format(new Date(v.classDate)),
    header: "Дата",
    meta: {
      rowspan: {
        td: getClassDateRowSpan,
      },
      class: {
        td: getClassDateClass,
      },
    },
  },
  {
    id: "classTime",
    accessorFn: (v) => `${v.startTime} - ${v.endTime}`,
    header: "Время",
  },
  { accessorKey: "title", header: "Название" },
  { id: "price", accessorFn: (v) => `${v.price} ₽`, header: "Цена" },
  { accessorKey: "studioName", header: "Студия" },
  { accessorKey: "instructorName", header: "Инструктор" },
  { id: "action" },
];

function getClassDateRowSpan(cell: Cell<ClassListItemDto, unknown>) {
  const { classDate } = cell.row.original;
  const rows = cell.getContext().table.getRowModel().rows;
  const rowIndex = rows.findIndex(
    (r: (typeof rows)[number]) => r.id === cell.row.id,
  );

  if (rowIndex > 0 && rows[rowIndex - 1]!.original.classDate === classDate) {
    return "1";
  }

  let span = 1;
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i]!.original.classDate === classDate) span++;
    else break;
  }

  return `${span}`;
}

function getClassDateClass(cell: Cell<ClassListItemDto, unknown>) {
  const { classDate } = cell.row.original;

  const rows = cell.getContext().table.getRowModel().rows;
  const rowIndex = rows.findIndex(
    (r: (typeof rows)[number]) => r.id === cell.row.id,
  );

  if (rowIndex > 0 && rows[rowIndex - 1]!.original.classDate === classDate) {
    return "hidden";
  }

  return "font-medium align-middle border-r border-default";
}

function getDropdownActions(id: number): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Просмотр",
        icon: "i-lucide-eye",
        onSelect: () => emit("view", id),
      },
      {
        label: "Редактировать",
        icon: "i-lucide-edit",
        onSelect: () => emit("edit", id),
      },
      {
        label: "Удалить",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => emit("remove", id),
      },
    ],
  ];
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex gap-2 items-center">
        <slot name="header" />
      </div>
    </template>

    <UTable
      sticky
      :data="$props.data"
      :columns="columns"
      :loading="$props.loading"
      :meta="meta"
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
