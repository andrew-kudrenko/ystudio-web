<script setup lang="ts">
import { ClassesTable } from "~/modules/features/classes";
import { useClassesPage } from "~/modules/pages/classes/lib/useClassesPage";

import { DateRangePicker } from "~/modules/shared";

const page = useClassesPage();
</script>

<template>
  <UPage>
    <UPageHeader title="Занятия" description="На выбранную дату">
      <template #links>
        <UButton
          icon="i-lucide-plus-circle"
          @click="navigateTo('/classes/create')"
        >
          Создать
        </UButton>
      </template>
    </UPageHeader>

    <UPageBody>
      <DateRangePicker v-model="page.dateRange.value" />

      <ClassesTable :data="page.data.value" :loading="page.loading.value" />
    </UPageBody>
  </UPage>
</template>
