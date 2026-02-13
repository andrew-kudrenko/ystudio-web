<script setup lang="ts">
import type { Studio } from "~/types";

defineProps<{ studio?: Studio }>();

defineEmits<{ confirm: [studio: Studio]; cancel: [] }>();

const open = defineModel("open", { default: false });
</script>

<template>
  <UModal
    v-model:open="open"
    :close="{ onClick: () => $emit('cancel') }"
    title="Подтвердите действие"
    :description="`Вы действительно хотите удалить студию &quot;${$props.studio?.name}&quot;?`"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Отменить" @click="$emit('cancel')" />

        <UButton
          label="Удалить"
          color="error"
          @click="$emit('confirm', $props.studio!)"
        />
      </div>
    </template>
  </UModal>
</template>
