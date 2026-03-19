<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import type {
  ClassMemberListItemDto,
  ClassVisitDto,
} from "~/modules/shared/api/classes.types";
import ClassMembersTable from "./ClassMembersTable.vue";

const UCheckbox = resolveComponent("UCheckbox");

const props = defineProps<{ id: number }>();

const toast = useToast();

const fetchClassMembersQuery = useApi<ClassMemberListItemDto[]>(
  () => `/classes/${props.id}/members`,
  {
    key: `classes.${props.id}.members`,
    lazy: true,
  },
);

const fetchClassVisitsQuery = useApi<ClassVisitDto[]>(
  () => `/classes/${props.id}/visits`,
  {
    key: `classes.${props.id}.visits`,
    lazy: true,
  },
);

const memberData = computed(() => fetchClassMembersQuery.data.value);
const visitData = computed(() => fetchClassVisitsQuery.data.value);

const table = useTemplateRef("table");

const rowSelection = ref<Record<string, boolean>>({});

const columns: TableColumn<ClassVisitDto>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
  },
  {
    accessorFn: (v) => `${v.member.lastName} ${v.member.firstName}`,
    header: "Имя",
  },
  { id: "payment-status", header: "Статус оплаты" },
  {
    accessorFn: (v) => v.lastPayment?.methodDisplayName,
    header: "Способ оплаты",
  },
  { id: "booking-status", header: "Статус брони" },
];

const paymentMethodItems: DropdownMenuItem[] = [
  {
    label: "Наличными",
    icon: "i-lucide-banknote",
  },
  {
    label: "Онлайн",
    icon: "i-lucide-credit-card",
  },
  {
    label: "Абонемент",
    icon: "i-lucide-ticket",
  },
];

const paymentStatusItems: DropdownMenuItem[] = [
  {
    label: "Успех",
    icon: "i-lucide-banknote",
  },
  {
    label: "Ошибка",
    icon: "i-lucide-circle-x",
  },
  {
    label: "Отмена",
    icon: "i-lucide-circle-slash",
  },
  {
    label: "В процессе",
    icon: "i-lucide-clock-fading",
  },
  {
    label: "Не оплачен",
    icon: "i-lucide-banknote-x",
  },
];

const isModalOpen = ref(false);

function getColorOfPaymentStatus(value?: number) {
  switch (value) {
    case 0:
      return "info";
    case 1:
      return "success";
    case 2:
      return "error";
    case 3:
      return "warning";
    case 4:
      return "warning";
    default:
      return "neutral";
  }
}

function getColorOfBookingStatus(value?: number) {
  switch (value) {
    case 0:
      return "info";
    case 1:
      return "success";
    case 2:
      return "error";
    case 3:
      return "warning";
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
    await Promise.allSettled([
      fetchClassVisitsQuery.refresh(),
      fetchClassMembersQuery.refresh(),
    ]);

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
</script>

<template>
  <UPage>
    <UPageHeader title="Занятие" />

    <UPageBody>
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

            <UFieldGroup>
              <UButton
                color="neutral"
                variant="subtle"
                label="Способ оплаты"
                size="sm"
              />

              <UDropdownMenu :items="paymentMethodItems">
                <UButton
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-chevron-down"
                  size="sm"
                />
              </UDropdownMenu>
            </UFieldGroup>

            <UFieldGroup>
              <UButton
                color="neutral"
                variant="subtle"
                label="Статус оплаты"
                size="sm"
              />

              <UDropdownMenu :items="paymentStatusItems">
                <UButton
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-chevron-down"
                  size="sm"
                />
              </UDropdownMenu>
            </UFieldGroup>
          </div>
        </template>

        <UTable
          ref="table"
          sticky
          v-model:row-selection="rowSelection"
          :columns="columns"
          :data="visitData"
          style="max-height: min(400px, 75vh)"
        >
          <template #payment-status-cell="{ row }">
            <UBadge
              variant="outline"
              :color="getColorOfPaymentStatus(row.original.lastPayment?.status)"
            >
              {{ row.original.lastPayment?.statusDisplayName ?? "Нет данных" }}
            </UBadge>
          </template>

          <template #booking-status-cell="{ row }">
            <UBadge
              variant="outline"
              :color="getColorOfBookingStatus(row.original.booking?.status)"
            >
              {{ row.original.booking?.statusDisplayName ?? "Нет данных" }}
            </UBadge>
          </template>
        </UTable>
      </UCard>
    </UPageBody>
  </UPage>
</template>
