import type { BadgeProps } from "@nuxt/ui";
import { ClassVisitStatus } from "../model/types";

export function getBadgeColorOfClassVisitStatus(
  value?: unknown,
): BadgeProps["color"] {
  switch (value) {
    case ClassVisitStatus.Pending:
      return "info";
    case ClassVisitStatus.Came:
      return "success";
    case ClassVisitStatus.Missed:
      return "error";
    default:
      return "neutral";
  }
}
