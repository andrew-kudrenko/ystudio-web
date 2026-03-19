<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import type { EditStudioFormValues } from "../model/types";
import type { Studio } from "~/types";
import AppBreadcrumbs from "~/modules/app/ui/AppBreadcrumbs.vue";
import EditorForm from "~/modules/shared/ui/editor-form/EditorForm.vue";

const props = defineProps<{ studio: Studio }>();

const formValues = reactive<EditStudioFormValues>({
  name: props.studio.name,
  description: props.studio.description,
  address: props.studio.address,
  capacity: props.studio.capacity,
});

function handleClear() {
  formValues.name = props.studio.name;
  formValues.description = props.studio.description;
  formValues.address = props.studio.address;
  formValues.capacity = props.studio.capacity;
}

async function handleSubmit(event: FormSubmitEvent<EditStudioFormValues>) {
  console.log("Handle");
  await new Promise((r) => setTimeout(r, 4_000));
  // isSubmitting.value = true;

  // const { error } = await useApi<Studio>(`/studios/${props.studio.id}`, {
  //   method: "put",
  //   body: {
  //     name: event.data.name,
  //     description: event.data.description,
  //     address: event.data.address,
  //     capacity: event.data.capacity,
  //   },
  // });

  // isSubmitting.value = false;

  // if (error.value) {
  //   toast.add({
  //     title: error.value?.data?.title ?? "Ошибка",
  //     description: error.value?.data?.detail ?? error.value?.message,
  //     color: "error",
  //     icon: "i-lucide-circle-x",
  //   });

  //   return;
  // }

  // toast.add({
  //   title: "Данные обновлены",
  //   description: "Вы будете перенаправлены на страницу со студиями",
  //   color: "primary",
  //   icon: "i-lucide-circle-check",
  // });

  // setTimeout(() => navigateTo("/studios"), 2_000);
}
</script>

<template>
  <UPageHeader title="Редактировать студию" />

  <UPageBody>
    <EditorForm
      :form-values="formValues"
      @submit="handleSubmit"
      @clear="handleClear"
    >
      <UFormField name="name" label="Название">
        <UInput v-model="formValues.name" placeholder='Йога-студия "Сутра"' />
      </UFormField>

      <UFormField name="address" label="Адрес">
        <UInput
          v-model="formValues.address"
          placeholder="Белгородский проспект, д. 69"
        />
      </UFormField>

      <UFormField name="description" label="Описание">
        <UTextarea
          v-model="formValues.description"
          placeholder="Уютная студия в центре города"
        />
      </UFormField>

      <UFormField name="capacity" label="Количество мест">
        <UInputNumber v-model="formValues.capacity" />
      </UFormField>
    </EditorForm>
  </UPageBody>
</template>
