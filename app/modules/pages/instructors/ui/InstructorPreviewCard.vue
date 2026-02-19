<script setup lang="ts">
import type { InstructorListItem } from "~/types";

defineProps<{ instructor: InstructorListItem }>();

defineEmits<{
  "click:edit": [id: number];
  "click:remove": [id: number];
}>();
</script>

<template>
  <UCard class="flex flex-col">
    <template #header>
      <h3 class="text-xl font-semibold">
        {{ $props.instructor.fullName }}
      </h3>
    </template>

    <template #default>
      <div class="text-sm flex flex-col gap-1">
        <p>
          {{ $props.instructor.specialization }}
        </p>

        <p>{{ $props.instructor.hourlyRate }}р. занятие</p>

        <p v-if="$props.instructor.phone" class="text-muted">
          {{ $props.instructor.phone }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-wrap gap-1 sm:gap-3 h-8">
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-pencil"
          @click="$emit('click:edit', $props.instructor.id)"
        >
        </UButton>

        <UButton
          color="error"
          variant="subtle"
          icon="i-lucide-trash"
          @click="$emit('click:remove', $props.instructor.id)"
        >
        </UButton>
      </div>
    </template>
  </UCard>
</template>
