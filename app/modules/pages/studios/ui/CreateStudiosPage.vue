<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import type { CreateStudioFormValues } from "../model/types";
import type { Studio } from "~/types";

const toast = useToast();

const formValues = reactive<CreateStudioFormValues>({
  name: "",
  description: "",
  address: "",
  capacity: 0,
});

const breadcrumbItems: BreadcrumbItem[] = [
  { name: "home", label: "Домашняя" },
  { name: "studios", label: "Студии" },
  { name: "studios.create", label: "Создать" },
];

function handleClear() {
  formValues.name = "";
  formValues.description = "";
  formValues.address = "";
  formValues.capacity = 0;
}

async function handleSubmit(event: FormSubmitEvent<CreateStudioFormValues>) {
  const { error, data: studio } = await useApi<Studio>("/studios", {
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
    description: `Студия под названием "${studio?.value?.name}" успешно создана`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  setTimeout(() => navigateTo("/studios"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Создать студию">
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
          <UFormField name="name" label="Название">
            <UInput
              v-model="formValues.name"
              placeholder='Йога-студия "Сутра"'
              class="w-full"
            />
          </UFormField>

          <UFormField name="address" label="Адрес">
            <UInput
              v-model="formValues.address"
              placeholder="Белгородский проспект, д. 69"
              class="w-full"
            />
          </UFormField>

          <UFormField name="description" label="Описание">
            <UTextarea
              v-model="formValues.description"
              placeholder="Уютная студия в центре города"
              class="w-full"
            />
          </UFormField>

          <UFormField name="capacity" label="Количество мест">
            <UInputNumber v-model="formValues.capacity" class="w-full" />
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
