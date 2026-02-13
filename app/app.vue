<template>
  <UApp>
    <UHeader title="YStudio">
      <template #toggle>
        <UColorModeSelect />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtLayout :name="layoutName">
          <NuxtPage />
        </NuxtLayout>
      </UContainer>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
const layoutName = ref("default" as const);
</script>
