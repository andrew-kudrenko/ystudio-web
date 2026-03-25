import type { ClassListItemDto } from "~/modules/entities/classes";
import type { MemberListItemDto } from "~/modules/entities/members";
import {
  toastFromApiError,
  toastFromApiSuccess,
} from "~/modules/shared/lib/toast.utils";

export function useBookClass() {
  const toast = useToast();

  const classId = useState<number>("bookClass.classId");
  const memberIds = useState<number[]>("bookClass.memberIds", () => []);

  const upcomingClassesAsyncData = useApi<ClassListItemDto[]>(
    "classes/upcoming",
    {
      immediate: false,
    },
  );

  const membersAsyncData = useApi<MemberListItemDto[]>(
    () => `class-bookings/classes/${classId.value}/members`,
    {
      immediate: false,
    },
  );

  const selectedClass = computed(() => {
    if (!classId.value || !upcomingClassesAsyncData.data.value.length) {
      return undefined;
    }

    const found = upcomingClassesAsyncData.data.value.find(
      (c) => c.id === classId.value,
    );

    return found;
  });

  const selectedMembers = computed<MemberListItemDto[]>(() => {
    if (
      !memberIds.value.length ||
      !upcomingClassesAsyncData.data.value.length
    ) {
      return [];
    }

    return (
      membersAsyncData.data.value?.filter((m) =>
        memberIds.value.includes(m.id),
      ) ?? []
    );
  });

  watch(classId, async () => {
    memberIds.value = [];

    await fetchMembers();
  });

  async function fetchUpcomingClasses() {
    await upcomingClassesAsyncData.execute();
  }

  async function fetchMembers() {
    if (!classId.value) {
      toast.add({
        description: "Выберите занятие",
        color: "warning",
      });
      return;
    }

    await membersAsyncData.execute();
  }

  async function tryBookClass() {
    if (!classId.value) {
      toast.add({
        description: "Выберите занятие",
        color: "warning",
      });
      return false;
    }

    if (memberIds.value.length < 1) {
      toast.add({
        description: "Список участников пуст. Добавьте участников",
        color: "warning",
      });
      return false;
    }

    const {
      data: count,
      error,
      status,
    } = await useApi<number>("class-bookings", {
      method: "post",
      body: {
        classId: classId.value,
        memberIds: memberIds.value,
      },
    });

    if (status.value === "success") {
      toast.add(
        toastFromApiSuccess({ description: `Создано ${count.value} записей` }),
      );

      return true;
    } else {
      toast.add(toastFromApiError(error));
      return false;
    }
  }

  return {
    classId,
    memberIds,

    selectedClass,
    selectedMembers,

    upcomingClassesAsyncData,
    membersAsyncData,

    fetchUpcomingClasses,
    fetchMembers,
    tryBookClass,
  };
}
