<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const fullPath = route.fullPath;
  const pathSegments = fullPath
    .substring(1)
    .split("/")
    .filter((segment) => segment.length > 0);

  const items: BreadcrumbItem[] = [
    { label: "Home", icon: "i-heroicons-home", to: "/" },
  ];

  let accumulatedPath = "";

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;

    const resolvedRoute = router.resolve(accumulatedPath);

    items.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Basic label from segment
      to: resolvedRoute.path,
    });
  });

  return items;
});
</script>

<template>
  <UBreadcrumb :items="breadcrumbItems" />
</template>
