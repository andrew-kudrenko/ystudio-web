<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { ClassBookingListItemDto } from "~/types";

const fetchAllQuery = useApi<ClassBookingListItemDto[]>("class-bookings", {
  lazy: true,
  key: "classBookings.all.fetch",
});

const data = computed(() => fetchAllQuery.data?.value ?? []);

const loading = computed(() => fetchAllQuery.pending.value);

const columns: TableColumn<ClassBookingListItemDto>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "classDate", header: "Дата занятия" },
  { accessorKey: "classTitle", header: "Занятие" },
  { accessorKey: "memberFullName", header: "Имя" },
  { accessorKey: "status", header: "Статус" },
  { accessorKey: "notes", header: "Примечания" },
  { accessorKey: "updatedAt", header: "Обновлено" },
];
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex gap-2">
        <UButton variant="outline" color="secondary">Подтвердить бронь</UButton>
      </div>
    </template>

    <UTable sticky :data="data" :columns="columns" :loading="loading" />
  </UCard>
</template>
