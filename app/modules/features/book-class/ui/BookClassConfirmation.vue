<script setup lang="ts">
import type { ClassListItemDto } from "~/modules/entities/classes";
import type { MemberListItemDto } from "~/modules/entities/members";

const props = defineProps<{
  selectedClass?: ClassListItemDto | undefined;
  selectedMembers?: MemberListItemDto[];
}>();

defineEmits<{ book: [] }>();

const isBookingPossible = computed(
  () => props.selectedClass && props.selectedMembers?.length,
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <UCard v-if="$props.selectedClass">
      <template #default>
        <div class="flex items-center gap-2">
          <UAvatar icon="i-lucide-calendar" size="lg" />

          <div class="flex flex-col gap-1">
            <h6 class="font-semibold">
              {{ $props.selectedClass.title }}
            </h6>

            <small class="text-muted">
              {{ $props.selectedClass.classDate }},
              {{ $props.selectedClass.startTime }} -
              {{ $props.selectedClass.endTime }}
            </small>
          </div>
        </div>
      </template>
    </UCard>

    <UEmpty v-else title="Занятие не выбрано" icon="i-lucide-calendar" />

    <template v-if="$props.selectedMembers?.length">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UAvatar icon="i-lucide-users" />
            <h6 class="font-semibold">Выбранные участники</h6>
          </div>
        </template>

        <template #default>
          <UTable
            :data="$props.selectedMembers"
            :columns="[
              { accessorKey: 'fullName', header: 'Имя' },
              { accessorKey: 'phone', header: 'Телефон' },
            ]"
            style="max-height: 200px"
          />
        </template>
      </UCard>
    </template>

    <UEmpty v-else title="Участники не выбраны" icon="i-lucide-users" />

    <USeparator />

    <UButton
      :disabled="!isBookingPossible"
      label="Забронировать"
      size="lg"
      class="self-center"
      @click="$emit('book')"
    />
  </div>
</template>
