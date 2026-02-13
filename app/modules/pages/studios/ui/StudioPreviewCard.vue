<script setup lang="ts">
import type { Studio } from "~/types";

defineProps<{ studio: Studio }>();

defineEmits<{
  "click:edit": [studioId: number];
  "click:remove": [studioId: number];
}>();
</script>

<template>
  <UCard :ui="{ header: '', body: '', footer: '' }">
    <template #header>
      <h3 class="text-xl font-semibold">
        {{ $props.studio.name }}
      </h3>
    </template>

    <template #default>
      <div class="text-sm flex flex-col gap-1">
        <p>
          {{ $props.studio.address }}
        </p>

        <p class="text-muted">
          {{ $props.studio.description }}
        </p>

        <p class="text-xl">{{ $props.studio.capacity }} мест</p>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-wrap gap-1 sm:gap-3">
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-pencil"
          @click="$emit('click:edit', $props.studio.id)"
        >
          Редактировать
        </UButton>

        <UButton
          color="error"
          variant="subtle"
          icon="i-lucide-trash"
          @click="$emit('click:remove', $props.studio.id)"
        >
          Удалить
        </UButton>
      </div>
    </template>
  </UCard>
</template>
