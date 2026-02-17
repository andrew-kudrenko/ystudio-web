<script setup lang="ts">
import { MemberTable } from "~/modules/features/clients";
</script>

<template>
  <UPage>
    <UPageHeader title="Участники">
      <template #description>
        <div class="w-full flex justify-between gap-1 flex-wrap md:flex-nowrap">
          <p class="">Пользуйтесь поиском!</p>

          <UButton
            icon="i-lucide-circle-plus"
            style="align-self: center"
            @click="navigateTo('/members/create')"
          >
            Создать
          </UButton>
        </div>
      </template>
    </UPageHeader>

    <MemberTable />
  </UPage>
</template>
