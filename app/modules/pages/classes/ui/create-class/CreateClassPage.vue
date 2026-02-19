<script setup lang="ts">
import {
  toCalendarDate,
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";

import type { CreateClassFormValues } from "../../model/types";
import type { FormSubmitEvent } from "@nuxt/ui";
import { InstructorSelect } from "~/modules/features/instructors";
import { StudioSelect } from "~/modules/features/studios";
import type { Class } from "~/types";

const toast = useToast();

const startTime = shallowRef(new Time());
const endTime = shallowRef(new Time());
const classDate = shallowRef(toCalendarDate(now(getLocalTimeZone())));

const formValues = reactive<CreateClassFormValues>({
  title: "",
  classDate: toCalendarDate(now(getLocalTimeZone())),
  startTime: new Time(),
  endTime: new Time(),
  capacity: 0,
  price: 0,
  instructorId: undefined,
  studioId: undefined,
});

function handleClear() {
  formValues.title = "";
  formValues.classDate = toCalendarDate(now(getLocalTimeZone()));
  formValues.capacity = 0;
  formValues.price = 0;
  formValues.instructorId = undefined;
  formValues.studioId = undefined;

  startTime.value = new Time();
  endTime.value = new Time();
}

watchEffect(() => (formValues.startTime = startTime.value));
watchEffect(() => (formValues.endTime = endTime.value));
watchEffect(() => (formValues.classDate = classDate.value));

async function handleSubmit(event: FormSubmitEvent<CreateClassFormValues>) {
  console.log("Event data", event.data);

  const { error, data } = await useApi<Class>("/classes", {
    method: "post",
    body: {
      ...event.data,
      startTime: event.data.startTime.toString(),
      endTime: event.data.endTime.toString(),
      classDate: event.data.classDate.toString(),
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
    description: `Занятие "${data.value?.title}"  от ${data.value?.classDate.toDateString()} создано`,
    color: "primary",
    icon: "i-lucide-message-circle-check",
  });

  setTimeout(() => navigateTo("/classes"), 2_000);
}
</script>

<template>
  <UPage>
    <UPageHeader title="Создать занятие" />

    <UPageBody>
      <UForm
        :state="formValues"
        class="flex flex-col gap-3"
        style="max-width: 700px"
        @submit="handleSubmit($event)"
      >
        <UFormField name="title" label="Название">
          <UInput
            v-model="formValues.title"
            placeholder="Хатха-йога"
            class="w-full"
          />
        </UFormField>

        <UFormField name="classDate" label="Дата проведения занятия">
          <UInputDate v-model="classDate" class="w-full" />
        </UFormField>

        <UFormField name="startTime" label="Время начала занятия">
          <UInputTime v-model="startTime" class="w-full" />
        </UFormField>

        <UFormField name="endTime" label="Время окончания занятия">
          <UInputTime v-model="endTime" class="w-full" />
        </UFormField>

        <UFormField name="price" label="Цена">
          <UInputNumber
            v-model="formValues.price"
            class="w-full"
            :step="100"
            :default-value="600"
          />
        </UFormField>

        <UFormField name="capacity" label="Количество мест">
          <UInputNumber
            v-model="formValues.capacity"
            :default-value="20"
            class="w-full"
          />
        </UFormField>

        <UFormField name="instructorId" label="Инструктор">
          <InstructorSelect v-model="formValues.instructorId" class="w-full" />
        </UFormField>

        <UFormField name="studioId" label="Студия">
          <StudioSelect v-model="formValues.studioId" class="w-full" />
        </UFormField>

        <div class="flex gap-3">
          <UButton type="submit">Сохранить</UButton>

          <UButton color="neutral" variant="subtle" @click="handleClear">
            Очистить
          </UButton>
        </div>
      </UForm>
    </UPageBody>
  </UPage>
</template>
