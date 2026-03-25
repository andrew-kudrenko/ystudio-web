<script setup lang="ts">
import { useBookClass } from "../model/useBookClass";
import BookClassConfirmation from "./BookClassConfirmation.vue";
import BookClassModalTabs from "./BookClassModalTabs.vue";
import MemberTable from "./MemberTable.vue";
import UpcomingClassTable from "./UpcomingClassTable.vue";

const open = defineModel<boolean>("open");

const emit = defineEmits<{
  booked: [];
}>();

const state = useBookClass();

onBeforeMount(state.fetchUpcomingClasses);

async function handleBookClass() {
  if (await state.tryBookClass()) {
    emit("booked");
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Забронировать занятие">
    <template #body>
      <div style="min-height: 50vh">
        <BookClassModalTabs>
          <template #class>
            <UpcomingClassTable
              v-model:selected="state.classId.value"
              :data="state.upcomingClassesAsyncData.data.value"
              :loading="state.upcomingClassesAsyncData.pending.value"
            />
          </template>

          <template #members>
            <MemberTable
              v-model:selected="state.memberIds.value"
              :data="state.membersAsyncData.data.value"
              :loading="state.membersAsyncData.pending.value"
            />
          </template>

          <template #confirm>
            <BookClassConfirmation
              :selected-class="state.selectedClass.value"
              :selectedMembers="state.selectedMembers.value"
              @book="handleBookClass"
            />
          </template>
        </BookClassModalTabs>
      </div>
    </template>

    <!-- <template #footer>
      <UButton
        label="Назад"
        color="neutral"
        variant="subtle"
        leading-icon="i-lucide-arrow-left"
      />

      <UButton
        label="Далее"
        variant="subtle"
        trailing-icon="i-lucide-arrow-right"
      />
    </template> -->
  </UModal>
</template>
