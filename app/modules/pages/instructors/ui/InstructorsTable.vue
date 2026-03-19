<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { InstructorListItem } from "~/types";

const fetchAllQuery = useApi<InstructorListItem[]>("instructors", {
  lazy: true,
  key: "instructors.all.fetch",
});

const data = computed(() => fetchAllQuery.data?.value ?? []);

const loading = computed(() => fetchAllQuery.pending.value);

const columns: TableColumn<InstructorListItem>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "fullName", header: "Имя" },
  { accessorKey: "phone", header: "Телефон" },
];
</script>

<template>
  <UCard>
    <UTable sticky :data="data" :columns="columns" :loading="loading" />
  </UCard>
</template>
