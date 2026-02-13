<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";

import type { EditStudioFormValues } from "../model/types";
import type { Studio } from "~/types";

const props = defineProps<{ studio: Studio }>();

const toast = useToast();

const isSubmitting = ref(false);

const formValues = reactive<EditStudioFormValues>({
  name: props.studio.name,
  description: props.studio.description,
  address: props.studio.address,
  capacity: props.studio.capacity,
});

const breadcrumbItems: BreadcrumbItem[] = [
  { name: "home", label: "Домашняя" },
  { name: "studios", label: "Студии" },
  { name: "studios.create", label: "Редактировать" },
];

function handleClear() {
  formValues.name = props.studio.name;
  formValues.description = props.studio.description;
  formValues.address = props.studio.address;
  formValues.capacity = props.studio.capacity;
}

async function handleSubmit(event: FormSubmitEvent<EditStudioFormValues>) {
  isSubmitting.value = true;

  const { error } = await useApi<Studio>(`/studios/${props.studio.id}`, {
    method: "put",
    body: {
      name: event.data.name,
      description: event.data.description,
      address: event.data.address,
      capacity: event.data.capacity,
    },
  });

  isSubmitting.value = false;

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
    title: "Данные обновлены",
    description: "Вы будете перенаправлены на страницу со студиями",
    color: "primary",
    icon: "i-lucide-circle-check",
  });

  setTimeout(() => navigateTo("/studios"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Редактировать студию">
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
            <UButton type="submit" icon="i-lucide-save">Редактировать</UButton>

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
