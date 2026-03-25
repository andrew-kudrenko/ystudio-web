<script setup lang="ts">
import {
  ClassBookingsTable,
  useClassBookings,
} from "~/modules/entities/class-bookings";
import { BookClassModal } from "~/modules/features/book-class";

const { upcomingClassBookings, loading, fetchUpcomingClassBookings } =
  useClassBookings();

onBeforeMount(fetchUpcomingClassBookings);

const isBookClassModalOpen = ref(false);

async function handleBooked() {
  isBookClassModalOpen.value = false;
  await fetchUpcomingClassBookings();
}
</script>

<template>
  <UPage>
    <UPageHeader title="Бронирование" description="Управляйте записями" />

    <UPageBody>
      <ClassBookingsTable
        :data="upcomingClassBookings"
        :loading="loading"
        @click:create="isBookClassModalOpen = true"
      />

      <BookClassModal
        v-model:open="isBookClassModalOpen"
        @booked="handleBooked"
      />
    </UPageBody>
  </UPage>
</template>
