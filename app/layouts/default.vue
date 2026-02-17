<script setup lang="ts">
import { NavigationMenu } from "~/modules/app";
</script>

<template>
  <div class="flex">
    <UPageAside>
      <NavigationMenu />
    </UPageAside>

    <div>
      <slot />
    </div>
  </div>
</template>
