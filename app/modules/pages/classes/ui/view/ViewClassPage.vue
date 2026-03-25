<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type {
  ClassMemberListItemDto,
  ClassVisitDto,
} from "~/modules/shared/api/classes.types";
import ClassMembersTable from "./ClassMembersTable.vue";
import BadgeStatus from "~/modules/shared/ui/badge/BadgeStatus.vue";
import { indicesOfSelectedRows } from "~/modules/shared/lib/table.utils";
import TableHeaderCheckbox from "~/modules/shared/ui/table/TableHeaderCheckbox.vue";
import TableRowCheckbox from "~/modules/shared/ui/table/TableRowCheckbox.vue";
import PatchVisits from "~/modules/entities/classes/ui/PatchVisits.vue";
import type { Class, Instructor, Studio } from "~/types";

const props = defineProps<{ id: number }>();

const toast = useToast();

const fetchClassMembersQuery = useApi<ClassMemberListItemDto[]>(
  () => `/classes/${props.id}/members`,
  {
    key: `classes.${props.id}.members-${Date.now()}`,
    lazy: true,
    immediate: false,
  },
);

const fetchClassVisitsQuery = useApi<{
  class: Class;
  instructor: Instructor;
  studio: Studio;
  visits: ClassVisitDto[];
}>(() => `/classes/${props.id}/visits`, {
  key: `classes.${props.id}.visits-${Date.now()}`,
  lazy: true,
});

const memberData = computed(() => fetchClassMembersQuery.data.value);
const visitData = computed(() => fetchClassVisitsQuery.data.value);

const table = useTemplateRef("table");

const isLoading = ref(false);
const rowSelection = ref<Record<string, boolean>>({});

const selectedRowIds = computed(() =>
  indicesOfSelectedRows(rowSelection.value)
    .map((i) => fetchClassVisitsQuery.data.value?.visits?.[i]?.member?.id)
    .filter(Boolean),
);

const isOperationButtonDisabled = computed(
  () => selectedRowIds.value.length < 1,
);

const columns: TableColumn<ClassVisitDto>[] = [
  {
    id: "select",
  },
  {
    accessorFn: (v) => `${v.member.lastName} ${v.member.firstName}`,
    header: "Имя",
  },
  {
    id: "visit-status",
    header: "Посещение",
  },
  { id: "payment-status", header: "Статус оплаты" },
  {
    accessorFn: (v) => v.lastPayment?.methodDisplayName,
    header: "Способ оплаты",
  },
  { id: "booking-status", header: "Статус брони" },
];

const isModalOpen = ref(false);

function getColorOfVisitStatus(value?: number) {
  switch (value) {
    case 0:
      return "info";
    case 1:
      return "success";
    case 2:
      return "error";
    default:
      return "neutral";
  }
}

async function handleAddMembers(memberIds: number[]) {
  const addClassVisitMembersQuery = await useApi(
    `/classes/${props.id}/visits`,
    {
      method: "post",
      body: memberIds,
    },
  );

  if (addClassVisitMembersQuery.status.value === "success") {
    await refreshPageData();

    toast.add({
      title: "Участники добавлены",
      description: `Добавлено "${addClassVisitMembersQuery.data.value}" участников`,
      color: "primary",
      icon: "i-lucide-message-circle-check",
    });

    isModalOpen.value = false;
  } else {
    toast.add({
      title: addClassVisitMembersQuery.error.value?.data?.title ?? "Ошибка",
      description:
        addClassVisitMembersQuery.error.value?.data?.detail ??
        addClassVisitMembersQuery.error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  }
}

async function refreshPageData() {
  isLoading.value = true;

  await Promise.allSettled([
    fetchClassVisitsQuery.refresh(),
    fetchClassMembersQuery.refresh(),
  ]);

  isLoading.value = false;
}

async function handlePatchVisits(formValues: any) {
  const query = await useApi<number>(
    () => `/classes/${props.id}/visits`,

    {
      key: `classes.${props.id}.visits.patch.${Date.now()}`,
      method: "patch",
      body: {
        memberIds: selectedRowIds.value,
        ...formValues,
      },
    },
  );

  if (query.status.value === "success") {
    toast.add({
      title: "Обновлено",
      description: `Обновлено ${query.data.value} записей`,
      color: "primary",
      icon: "i-lucide-message-circle-check",
    });

    rowSelection.value = {};
    await refreshPageData();
  } else {
    toast.add({
      title: query.error.value?.data?.title ?? "Ошибка",
      description:
        query.error.value?.data?.detail ?? query.error.value?.message,
      color: "error",
      icon: "i-lucide-circle-x",
    });
  }
}
</script>

<template>
  <UPage>
    <UPageHeader
      :title="visitData?.class.title"
      :description="visitData?.class.notes"
    />

    <UPageBody>
      <div class="flex flex-col gap-4">
        <UCard>
          <template #default>
            <div class="flex flex-col gap-2">
              <div class="flex gap-2 items-center">
                <UAvatar icon="i-lucide-clock" />

                <p class="text-base">
                  с <b>{{ visitData?.class.startTime }}</b> до
                  <b>{{ visitData?.class.endTime }}</b>
                </p>
              </div>

              <USeparator />

              <div class="flex justify-between">
                <div class="flex gap-2 items-center">
                  <UAvatar icon="i-lucide-user" />

                  <h5 class="text-base font-semibold">
                    {{ visitData?.instructor["fullName"] }}
                  </h5>
                </div>

                <UButton
                  variant="subtle"
                  color="secondary"
                  label="Перейти"
                  size="sm"
                />
              </div>

              <USeparator />

              <div class="flex justify-between">
                <div class="flex gap-2 items-center">
                  <UAvatar icon="i-lucide-house-heart" />

                  <h5 class="text-base font-semibold">
                    {{ visitData?.studio.name }}
                  </h5>
                </div>

                <UButton
                  variant="subtle"
                  color="secondary"
                  label="Перейти"
                  size="sm"
                />
              </div>
            </div>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex justify-betrween items-center gap-2 flex-wrap">
              <UModal
                v-model:open="isModalOpen"
                title="Выбрать участников"
                :dismissible="false"
              >
                <UButton
                  variant="subtle"
                  color="primary"
                  icon="i-lucide-circle-plus"
                  size="sm"
                >
                  Добавить участников
                </UButton>

                <template #body>
                  <ClassMembersTable
                    :data="memberData"
                    :loading="fetchClassMembersQuery.pending.value"
                    @add="handleAddMembers($event)"
                  />
                </template>
              </UModal>

              <PatchVisits @submit="handlePatchVisits" />
            </div>
          </template>

          <UTable
            ref="table"
            sticky
            v-model:row-selection="rowSelection"
            :columns="columns"
            :data="visitData?.visits"
            style="max-height: min(400px, 75vh)"
          >
            <template #select-header="{ table }">
              <TableHeaderCheckbox :table="table" />
            </template>

            <template #select-cell="{ row }">
              <TableRowCheckbox :row="row" />
            </template>

            <template #visit-status-cell="{ row }">
              <BadgeStatus
                :color="getColorOfVisitStatus(row.original.visitStatus)"
                :text="row.original.visitStatusDisplayName"
              />
            </template>

            <template #payment-status-cell="{ row }">
              <BadgeStatus
                :color="getColorOfVisitStatus(row.original.lastPayment?.status)"
                :text="row.original.lastPayment?.statusDisplayName"
              />
            </template>

            <template #booking-status-cell="{ row }">
              <BadgeStatus
                :color="getColorOfVisitStatus(row.original.booking?.status)"
                :text="row.original.booking?.statusDisplayName"
              />
            </template>
          </UTable>
        </UCard>
      </div>
    </UPageBody>
  </UPage>
</template>
