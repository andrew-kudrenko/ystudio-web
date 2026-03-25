<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { ClassBookingDto } from "~/modules/shared/api/class-bookings.types";
import ClassBookingStatusBadge from "./ClassBookingStatusBadge.vue";

defineProps<{ data?: ClassBookingDto[]; loading?: boolean }>();

defineEmits<{ "click:create": [] }>();

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Дата занятия", accessorKey: "classDate" },
  { header: "Название", accessorKey: "classTitle" },
  { header: "Участник", accessorKey: "memberFullName" },
  { header: "Статус", id: "booking-status" },
  { header: "Обновлено", accessorKey: "updatedAt" },
] as const satisfies TableColumn<ClassBookingDto>[];
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex gap-2">
        <UButton label="Забронировать" @click="$emit('click:create')" />
      </div>
    </template>

    <template #default>
      <UTable
        sticky
        :columns="columns"
        :data="$props.data"
        :loading="$props.loading"
      >
        <template #empty>Записей пока нет</template>

        <template #booking-status-cell="{ row }">
          <ClassBookingStatusBadge :status="row.original.bookingStatus" />
        </template>
      </UTable>
    </template>
  </UCard>
</template>
