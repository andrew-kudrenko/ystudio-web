import type { AsyncData, UseFetchOptions } from "nuxt/app";
import type { ApiFetchError } from "~/modules/shared/lib/api.utils";

export function useApi<Raw, Data = Raw>(
  url: string | (() => string),
  options?: UseFetchOptions<Raw, Data>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  }) as AsyncData<Data, ApiFetchError>;
}
