<script setup lang="ts">
import type { CreateClassBookingFormValues } from "../model/types";
import type { FormSubmitEvent } from "@nuxt/ui";

import { ClassSelect } from "~/modules/features/classes";
import { MemberSelect } from "~/modules/features/members";

import type { Class } from "~/types";

const toast = useToast();

const formValues = reactive<CreateClassBookingFormValues>({
  classId: undefined,
  memberId: undefined,
  notes: "",
});

function handleClear() {
  formValues.classId = undefined;
  formValues.memberId = undefined;
  formValues.notes = "";
}

async function handleSubmit(
  event: FormSubmitEvent<CreateClassBookingFormValues>,
) {
  const { error } = await useApi<Class>("/class-bookings", {
    method: "post",
    body: {
      classId: event.data.classId,
      memberId: event.data.memberId,
      notes: event.data.notes,
    },
  });

  if (error.value) {
    toast.add({
      title: error.value?.data?.title ?? "Ошибка",
      description: error.value?.data?.detail ?? error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });

    return;
  }

  toast.add({
    description: `Успешно записали!`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  setTimeout(() => navigateTo("/class-bookings"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Забронировать занятие" />

    <UPageBody>
      <UForm
        :state="formValues"
        class="flex flex-col gap-3"
        @submit="handleSubmit($event)"
      >
        <UFormField name="classId" label="Занятие">
          <ClassSelect v-model="formValues.classId" class="w-full" />
        </UFormField>

        <UFormField name="memberId" label="Участник">
          <MemberSelect v-model="formValues.memberId" class="w-full" />
        </UFormField>

        <UFormField name="notes" label="Заметки">
          <UTextarea
            v-model="formValues.notes"
            placeholder="Новичок, первый визит"
            class="w-full"
          />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit">Сохранить</UButton>
        </div>
      </UForm>
    </UPageBody>
  </UPage>
</template>
