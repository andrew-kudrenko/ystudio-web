import type {
  ClassBookingDto,
  CreateClassBookingRequest,
} from "~/modules/shared/api/class-bookings.types";
import {
  toastFromApiError,
  toastFromApiSuccess,
} from "~/modules/shared/lib/toast.utils";

export function useClassBookings() {
  const toast = useToast();

  const fetchUpcomingQuery = useApi<ClassBookingDto[]>("class-bookings", {
    immediate: false,
  });

  const loading = ref(false);

  const upcomingClassBookings = computed(() => fetchUpcomingQuery.data.value);

  async function fetchUpcomingClassBookings() {
    loading.value = true;

    await fetchUpcomingQuery.execute();

    loading.value = false;
  }

  async function createClassBooking(payload: CreateClassBookingRequest) {
    loading.value = true;

    const { error, status } = await useApi("class-bookings", {
      method: "post",
      body: payload,
    });

    if (status.value === "success") {
      toast.add(toastFromApiSuccess({ title: "Бронь успешно добавлена" }));
    } else {
      toast.add(toastFromApiError(error.value));
    }

    await fetchUpcomingQuery.refresh();

    loading.value = false;
  }

  return {
    upcomingClassBookings,
    loading,
    fetchUpcomingClassBookings,
    createClassBooking,
  };
}
