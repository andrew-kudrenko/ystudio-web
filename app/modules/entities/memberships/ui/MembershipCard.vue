<template>
  <UPricingPlan
    :title="$props.title"
    :description="$props.description"
    :price="`₽${$props.price}`"
    :features="$props.features"
    :button="{
      label: 'Записаться',
    }"
  />
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  price: number;
  description?: string;
  features?: string[];
}>();
</script>
