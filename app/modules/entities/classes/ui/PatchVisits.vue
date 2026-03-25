<script setup lang="ts">
import { ClassPaymentMethod, ClassPaymentStatus } from "../../class-payments";
import { ClassVisitStatus } from "../../class-visits/model/types";
import PaymentMethodSelect from "./PaymentMethodSelect.vue";
import PaymentStatusSelect from "./PaymentStatusSelect.vue";
import VisitStatusSelect from "./VisitStatusSelect.vue";

defineProps<{ disabled?: boolean; loading?: boolean }>();

interface PatchVisitsFormValues {
  visitStatus: ClassVisitStatus;
  paymentMethod: ClassPaymentMethod;
  paymentStatus: ClassPaymentStatus;
}

const open = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  submit: [value: PatchVisitsFormValues];
}>();

const formValues = reactive({
  visitStatus: undefined,
  paymentMethod: undefined,
  paymentStatus: undefined,
});
</script>

<template>
  <UModal v-model:open="open" :dismissible="false" title="Обновить записи">
    <UButton label="Изменить" variant="subtle" color="neutral" size="sm" />

    <template #body>
      <div class="flex flex-col gap-2">
        <UFormField label="Статус посещения">
          <VisitStatusSelect v-model="formValues.visitStatus" />
        </UFormField>

        <UFormField label="Статус оплаты">
          <PaymentStatusSelect v-model="formValues.paymentStatus" />
        </UFormField>

        <UFormField label="Способ оплаты">
          <PaymentMethodSelect v-model="formValues.paymentMethod" />
        </UFormField>

        <USeparator />

        <div class="flex gap-2 self-start">
          <UButton label="Применить" @click="$emit('submit', formValues)" />
        </div>
      </div>
    </template>
  </UModal>
</template>
