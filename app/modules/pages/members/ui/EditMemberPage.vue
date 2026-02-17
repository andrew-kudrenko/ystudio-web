<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import type { Member } from "~/types";
import type { CreateMemberFormValues } from "../model/types";

const props = defineProps<{ id?: number | string }>();

const toast = useToast();

const {
  data: member,
  pending,
  error,
} = useApi<Member>(() => `/members/${props.id}`, {
  key: "members.edit.fetch",
  lazy: true,
});

watchEffect(() => {
  if (member.value) {
    handleClear();
  }
});

const formValues = reactive<CreateMemberFormValues>({
  firstName: member.value?.firstName ?? "",
  lastName: member.value?.lastName ?? "",
  email: member.value?.email ?? "",
  phone: member.value?.phone ?? "",
  notes: member.value?.notes ?? "",
});

const breadcrumbItems: BreadcrumbItem[] = [
  { name: "home", label: "Домашняя" },
  { name: "members", label: "Участники" },
  { name: "members.edit", label: "Редактировать" },
];

function handleClear() {
  formValues.firstName = member.value?.firstName ?? "";
  formValues.lastName = member.value?.lastName ?? "";
  formValues.email = member.value?.email ?? "";
  formValues.phone = member.value?.phone ?? "";
  formValues.notes = member.value?.notes ?? "";
}

async function handleSubmit(event: FormSubmitEvent<CreateMemberFormValues>) {
  const { error, data: member } = await useApi<Member>(`/members/${props.id}`, {
    method: "put",
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
    description: `Участник ${member.value?.lastName} ${member.value?.firstName} успешно отредатирован`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  setTimeout(() => navigateTo("/members"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Редактировать участника">
      <template #description>
        <UBreadcrumb :items="breadcrumbItems" />
      </template>
    </UPageHeader>

    <UPageBody>
      <UError
        v-if="error"
        :clear="{
          label: 'К участникам',
          size: 'xl',
          icon: 'i-lucide-circle-arrow-left',
        }"
        :error="{ statusMessage: 'Ну надо же!', message: error.data?.detail }"
        redirect="/members"
      />

      <div v-else style="max-width: 600px">
        <UForm
          :disabled="pending"
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
            <UButton type="submit" icon="i-lucide-save">Сохранить</UButton>

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
