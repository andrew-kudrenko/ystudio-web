<script setup lang="ts">
defineProps<{ title: string; description?: string }>();

defineEmits<{ confirm: []; cancel: [] }>();

const open = defineModel("open", { default: false });
</script>

<template>
  <UModal
    v-model:open="open"
    :close="{
      viewTransition: true,
      onClick: () => $emit('cancel'),
    }"
    :title="$props.title"
    :description="$props.description"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Отменить" @click="$emit('cancel')" />

        <UButton
          label="Подтвердить"
          color="primary"
          @click="$emit('confirm')"
        />
      </div>
    </template>
  </UModal>
</template>
