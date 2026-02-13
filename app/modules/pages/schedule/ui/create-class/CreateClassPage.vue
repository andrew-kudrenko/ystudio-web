<script setup lang="ts">
import {
  toCalendarDate,
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";

import type { CreateClassFormValues } from "../../model/types";

const formValues = reactive<CreateClassFormValues>({
  classType: "",
  classDate: toCalendarDate(now(getLocalTimeZone())),
  startTime: new Time(),
  endTime: new Time(),
  capacity: 0,
  price: 0,
  instructorId: 0,
  studioId: 0,
});
</script>

<template>
  <UPage>
    <UPageHeader title="Создать занятие" />

    <UPageBody>
      <UForm :state="formValues">
        <UFormField name="classType" label="Название">
          <UInput v-model="formValues.classType" placeholder="Хатха-йога" />
        </UFormField>

        <UFormField name="classDate" label="Дата проведения занятия">
          <UInputDate v-model="formValues.classDate" />
        </UFormField>

        <UFormField name="startTime" label="Время начала занятия">
          <UInputTime v-model="formValues.startTime" />
        </UFormField>

        <UFormField name="endTime" label="Время окончания занятия">
          <UInputTime v-model="formValues.endTime" />
        </UFormField>

        <UFormField name="capacity" label="Количество мест">
          <UInputNumber v-model="formValues.capacity" placeholder="20" />
        </UFormField>
      </UForm>
    </UPageBody>
  </UPage>
</template>
