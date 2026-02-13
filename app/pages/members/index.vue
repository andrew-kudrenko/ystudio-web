<script setup lang="ts">
import ClientTable from "~/modules/features/clients/ui/ClientTable.vue";
import type { PagedList, Member } from "~/types";

const clients = await useApi<PagedList<Member>>("clients");
</script>

<template>
  <UPage>
    <UPageHeader title="Клиенты" />

    <ClientTable
      :data="clients.data.value?.items"
      :loading="clients.pending.value"
    />
  </UPage>
</template>
