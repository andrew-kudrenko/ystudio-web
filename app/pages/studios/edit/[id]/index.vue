<script setup lang="ts">
import { EditStudiosPage } from "~/modules/pages/studios";
import type { Studio } from "~/types";

const route = useRoute();

const { data: studio, error } = await useApi<Studio>(
  `studios/${route.params.id}`,
  {
    onResponse(ctx) {
      console.log("context", ctx);
    },
  },
);
</script>

<template>
  <UError
    v-if="error"
    :clear="{
      label: 'К студиям',
      size: 'xl',
      icon: 'i-lucide-circle-arrow-left',
    }"
    :error="{ statusMessage: 'Ну надо же!', message: error.data?.detail }"
    redirect="/studios"
  />

  <EditStudiosPage v-if="studio" :studio="studio" />
</template>
