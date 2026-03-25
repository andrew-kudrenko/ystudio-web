import type { BadgeProps } from "@nuxt/ui";

export const enum ClassBookingStatus {
  Pending = 0,
  Confirmed = 1,
  Rejected = 2,
  Cancelled = 3,
  Otherwise = 9,
}

export function getClassBookingStatusDisplayName(status?: unknown) {
  switch (status) {
    case ClassBookingStatus.Pending:
      return "Ожидание";
    case ClassBookingStatus.Confirmed:
      return "Подтверждено";
    case ClassBookingStatus.Rejected:
      return "Отклонено";
    case ClassBookingStatus.Cancelled:
      return "Отмена";
    default:
      return "Неизвестно";
  }
}

type BadgeColor = BadgeProps["color"];

export function getClassBookingStatusBadgeColor(status?: unknown): BadgeColor {
  switch (status) {
    case ClassBookingStatus.Pending:
      return "info";
    case ClassBookingStatus.Confirmed:
      return "success";
    case ClassBookingStatus.Rejected:
      return "error";
    case ClassBookingStatus.Cancelled:
      return "warning";
    default:
      return "neutral";
  }
}
