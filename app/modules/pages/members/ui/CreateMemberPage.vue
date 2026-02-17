<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import type { Member } from "~/types";
import type { CreateMemberFormValues } from "../model/types";

const toast = useToast();

const formValues = reactive<CreateMemberFormValues>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
});

const breadcrumbItems: BreadcrumbItem[] = [
  { name: "home", label: "Домашняя" },
  { name: "members", label: "Участники" },
  { name: "members.create", label: "Создать" },
];

function handleClear() {
  formValues.firstName = "";
  formValues.lastName = "";
  formValues.email = "";
  formValues.phone = "";
  formValues.notes = "";
}

async function handleSubmit(event: FormSubmitEvent<CreateMemberFormValues>) {
  const { error, data: member } = await useApi<Member>("/members", {
    method: "post",
    body: event.data,
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
    title: "Успех",
    description: `Участник ${member.value?.lastName} ${member.value?.firstName} успешно создан`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  setTimeout(() => navigateTo("/members"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Создать участника">
      <template #description>
        <UBreadcrumb :items="breadcrumbItems" />
      </template>
    </UPageHeader>

    <UPageBody>
      <div style="max-width: 600px">
        <UForm
          loading-auto
          :state="formValues"
          class="flex flex-col gap-3"
          @submit="handleSubmit"
        >
          <UFormField name="lastName" label="Фамилия">
            <UInput
              v-model="formValues.lastName"
              placeholder="Иванов"
              class="w-full"
            />
          </UFormField>

          <UFormField name="firstName" label="Имя">
            <UInput
              v-model="formValues.firstName"
              placeholder="Иван"
              class="w-full"
            />
          </UFormField>

          <UFormField name="email" label="Email">
            <UInput
              v-model="formValues.email"
              type="email"
              placeholder="ivan.ivanov@example.com"
              class="w-full"
            />
          </UFormField>

          <UFormField name="phone" label="Телефон">
            <UInput
              v-model="formValues.phone"
              type="tel"
              placeholder="+7 999 999 99 99"
              class="w-full"
            />
          </UFormField>

          <UFormField name="notes" label="Заметки">
            <UTextarea
              v-model="formValues.notes"
              placeholder="Начинающий, нужна помощь в базовых асанах"
              class="w-full"
              :rows="5"
            />
          </UFormField>

          <div class="flex gap-1 sm:gap-3">
            <UButton type="submit" icon="i-lucide-save">Создать</UButton>

            <UButton
              variant="subtle"
              icon="i-lucide-brush-cleaning"
              @click="handleClear"
            >
              Очистить
            </UButton>
          </div>
        </UForm>
      </div>
    </UPageBody>
  </UPage>
</template>
