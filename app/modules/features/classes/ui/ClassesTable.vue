<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { Class } from "~/types";

defineProps<{ data?: Class[]; loading?: boolean }>();

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RUB",
});

const columns: TableColumn<Class>[] = [
  {
    accessorKey: "classDate",
    header: "Дата",
    cell: ({ row }) => {
      return new Date(row.getValue("classDate")).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  { accessorKey: "startTime", header: "Время начала" },
  { accessorKey: "endTime", header: "Время окончания" },
  { accessorKey: "title", header: "Название" },
  { accessorKey: "capacity", header: "Места" },
  {
    accessorKey: "price",
    header: "Цена",
    cell: ({ row }) => {
      console.log("Row", row);
      const amount = Number.parseFloat(row.getValue("price"));

      return priceFormatter.format(amount);
    },
  },
];
</script>

<template>
  <UTable
    sticky
    :data="$props.data"
    :loading="$props.loading"
    :columns="columns"
  />
</template>
