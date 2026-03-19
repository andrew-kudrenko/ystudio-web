<script setup lang="ts">
import { AppAnchors } from "~/modules/app";
</script>

<template>
  <UHeader title="YStudio" toggle-side="left" mode="drawer">
    <template #body>
      <AppAnchors />
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>

  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <AppAnchors />
          </UPageAside>
        </template>

        <UPageBody style="padding-top: 0; margin-top: 0">
          <slot />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>

  <USeparator type="dashed" class="h-px" />

  <UFooter>
    <template #default>
      <p class="text-muted text-sm">YStudio © {{ new Date().getFullYear() }}</p>
    </template>
  </UFooter>
</template>
