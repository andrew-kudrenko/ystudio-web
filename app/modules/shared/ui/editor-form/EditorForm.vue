<script
  setup
  lang="ts"
  generic="F extends Record<string, any> = Record<string, any>"
>
import type { FormSubmitEvent } from "@nuxt/ui";

defineProps<{ formValues: F; clearable?: boolean }>();

defineEmits<{
  submit: [event: FormSubmitEvent<F>];
  clear: [];
}>();
</script>

<template>
  <UForm
    v-bind="$attrs"
    loading-auto
    :state="$props.formValues"
    @submit="$emit('submit', $event)"
  >
    <div class="flex flex-col gap-2">
      <slot />
    </div>

    <div class="flex gap-1 sm:gap-3 mt-4">
      <UButton type="submit" icon="i-lucide-save" loading-auto>
        Сохранить
      </UButton>

      <UButton
        v-if="$props.clearable"
        variant="subtle"
        icon="i-lucide-brush-cleaning"
        @click="$emit('clear')"
      >
        Очистить
      </UButton>
    </div>
  </UForm>
</template>
