<script setup lang="ts">
import { ru } from "@nuxt/ui/locale";

import AppTheme from "./modules/app/ui/AppTheme.vue";

const layoutName = ref("default" as const);
</script>

<template>
  <UApp :locale="ru">
    <AppTheme>
      <NuxtLayout :name="layoutName">
        <NuxtPage />
      </NuxtLayout>
    </AppTheme>
  </UApp>
</template>
