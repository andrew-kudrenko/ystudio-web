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

defineProps<{ disabled?: boolean }>();

defineEmits<{ submit: [event: FormSubmitEvent<CreateClassFormValues>] }>();

const startTime = shallowRef(new Time());
const endTime = shallowRef(new Time());
const classDate = shallowRef(toCalendarDate(now(getLocalTimeZone())));

const formValues = reactive<CreateClassFormValues>({
  title: "",
  classDate: toCalendarDate(now(getLocalTimeZone())).toString(),
  startTime: new Time().toString(),
  endTime: new Time().toString(),
  capacity: 0,
  price: 0,
  instructorId: undefined,
  studioId: undefined,
});

function handleClear() {
  formValues.title = "";
  formValues.classDate = toCalendarDate(now(getLocalTimeZone())).toString();
  formValues.capacity = 0;
  formValues.price = 0;
  formValues.instructorId = undefined;
  formValues.studioId = undefined;

  startTime.value = new Time(8, 30);
  endTime.value = new Time();
}

watchEffect(() => (formValues.startTime = startTime.value.toString()));
watchEffect(() => (formValues.endTime = endTime.value.toString()));
watchEffect(() => (formValues.classDate = classDate.value.toString()));
</script>

<template>
  <UForm
    :state="formValues"
    class="flex flex-col gap-3"
    :disabled="$props.disabled"
    loading-auto
    @submit="$emit('submit', $event)"
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
    </div>
  </UForm>
</template>
