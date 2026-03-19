import type { StudioListItemDto } from "~/modules/shared/api/studios.types";

export function useStudios() {
  const studios = useState<StudioListItemDto[]>("studios", () => []);

  const toast = useToast();

  const fetchAllStudiosQuery = useApi<StudioListItemDto[]>("studios", {
    lazy: true,
    key: "studios.all",
    immediate: false,
  });

  const showRemoveConfirmation = ref(false);
  const studioForRemoval = ref<StudioListItemDto | null>(null);

  const loading = ref(false);

  async function edit(studioId: number) {
    await navigateTo(`/studios/edit/${studioId}`);
  }

  async function confirmRemove() {
    const { error, status } = await useApi(
      `studios/${studioForRemoval.value!.id}`,
      {
        method: "delete",
      },
    );

    showRemoveConfirmation.value = false;
    studioForRemoval.value = null;

    if (status.value === "success") {
      toast.add({
        title: "Студия удалена",
        description: "Данные на странице обновляются",
        color: "primary",
        icon: "i-lucide-circle-check",
      });

      await fetchAll();
    } else {
      toast.add({
        title: error.value?.data?.title ?? "Ошибка",
        description: error.value?.data?.detail ?? error.value?.message,
        color: "error",
        icon: "i-lucide-circle-x",
      });
    }
  }

  function openRemoveConfirmation(studioId: number) {
    const foundStudio = studios.value.find((s) => s.id === studioId);

    if (foundStudio) {
      studioForRemoval.value = foundStudio;
      showRemoveConfirmation.value = true;
    }
  }

  function cancelRemove() {
    showRemoveConfirmation.value = false;
    studioForRemoval.value = null;
  }

  async function fetchAll() {
    loading.value = true;

    await fetchAllStudiosQuery.execute();

    loading.value = false;

    if (fetchAllStudiosQuery.data.value) {
      studios.value = fetchAllStudiosQuery.data.value;
    } else {
      const error = fetchAllStudiosQuery.error.value;
      const message = error?.message ?? "Ошибка при получении данных";

      toast.add({
        description: message,
        color: "error",
        icon: "i-lucide-circle-x",
      });
    }
  }

  return {
    studios,
    loading,
    showRemoveConfirmation,
    studioForRemoval,

    fetchAll,
    edit,

    openRemoveConfirmation,
    confirmRemove,
    cancelRemove,
  };
}
