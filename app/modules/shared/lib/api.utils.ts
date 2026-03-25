import type { AsyncData } from "#app";

export interface FetchError<D = unknown> extends Error {
  data?: D;
}

export interface H3Error<D = unknown> {
  data: D;
}

export type ApiFetchError = H3Error<FetchError<ApiProblemDetails>>;

export function isSuccess<D = any, E = any>(asyncData: AsyncData<D, E>) {
  return asyncData.status.value === "success";
}

export interface ApiProblemDetails {
  status: number;
  title: string;
  detail: string;
  errors?: Record<string, string[]>;
}

function isErrorApiProblemDetails(error: unknown): error is ApiProblemDetails {
  return typeof error === "object" && (error as Record<any, any>)?.status;
}

export function apiErrorTitle(error?: any): string {
  if (isErrorApiProblemDetails(error)) {
    return error.title;
  }

  return "Внутренняя ошибка сервера";
}

export function apiErrorDetail(error?: any): string {
  return error?.detail || "Произошла ошибка при выполнении запроса";
}
