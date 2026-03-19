<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import type { CreateClassFormValues } from "../../model/types";
import CreateClassForm from "./CreateClassForm.vue";

const toast = useToast();

async function handleSubmit(event: FormSubmitEvent<CreateClassFormValues>) {
  const { error, status } = await useApi("/classes", {
    method: "post",
    body: event.data,
  });

  if (status.value === "error") {
    toast.add({
      title: error.value?.data?.title ?? "Ошибка",
      description: error.value?.data?.detail ?? error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  } else {
    toast.add({
      description: `Занятие создано`,
      color: "primary",
      icon: "i-lucide-message-circle-check",
    });

    setTimeout(() => navigateTo("/classes"), 2_000);
  }
}
</script>

<template>
  <CreateClassForm @submit="handleSubmit" />
</template>
