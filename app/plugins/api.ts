export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    credentials: "include",
    retryStatusCodes: [401],
    retry: 3,
  });

  return {
    provide: {
      api,
    },
  };
});
