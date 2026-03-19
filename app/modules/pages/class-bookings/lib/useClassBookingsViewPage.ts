import type { ClassBookingListItemDto } from "~/modules/shared/api/types";

export function useClassBookingsViewPage() {
  const { data } = useApi<ClassBookingListItemDto[]>("class-bookings", {
    lazy: true,
    key: "class-bookings.all",
  });

  return {
    classBookings: data,
  };
}
