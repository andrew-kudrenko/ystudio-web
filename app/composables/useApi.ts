import type { UseFetchOptions } from "nuxt/app";

export function useApi<Raw, Data = Raw>(
  url: string | (() => string),
  options?: UseFetchOptions<Raw, Data>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}
