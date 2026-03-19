<script setup lang="ts">
import type { InstructorListItem, Studio } from "~/types";

defineProps<{ instructor?: InstructorListItem }>();

defineEmits<{ confirm: [value: InstructorListItem]; cancel: [] }>();

const open = defineModel("open", { default: false });
</script>

<template>
  <UModal
    v-model:open="open"
    :close="{ onClick: () => $emit('cancel') }"
    title="Подтвердите действие"
    :description="`Вы действительно хотите удалить &quot;${$props.instructor?.fullName}&quot;?`"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Отменить" @click="$emit('cancel')" />

        <UButton
          label="Удалить"
          color="error"
          @click="$emit('confirm', $props.instructor!)"
        />
      </div>
    </template>
  </UModal>
</template>
