import type { ToastProps } from "@nuxt/ui";
import { apiErrorDetail, apiErrorTitle, type ApiFetchError } from "./api.utils";

export function toastFromApiError(
  error: MaybeRef<ApiFetchError | undefined>,
): Partial<ToastProps> {
  const unwrapped = unref(error)?.data;

  return {
    title: apiErrorTitle(unwrapped),
    description: apiErrorDetail(unwrapped),
    color: "error",
    icon: "i-lucide-circle-x",
  };
}

export function toastFromApiSuccess(
  options: Partial<ToastProps>,
): Partial<ToastProps> {
  return {
    title: "Успех",
    color: "success",
    icon: "i-lucide-circle-check",
    ...options,
  };
}
