<script setup lang="ts">
import ClassBookingsTable from "./ClassBookingsTable.vue";
</script>

<template>
  <UPage>
    <UPageHeader title="Бронирование занятий">
      <template #description>
        <div class="w-full flex justify-between gap-1 flex-wrap md:flex-nowrap">
          <p class="">Управляйте записями на занятия</p>

          <UButton
            icon="i-lucide-circle-plus"
            style="align-self: center"
            @click="navigateTo('/class-bookings/create')"
          >
            Создать
          </UButton>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <ClassBookingsTable />
    </UPageBody>
  </UPage>
</template>
