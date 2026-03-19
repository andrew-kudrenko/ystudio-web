<script setup lang="ts">
import ViewClassPage from "~/modules/pages/classes/ui/view/ViewClassPage.vue";

const route = useRoute();
</script>

<template>
  <ViewClassPage :id="Number(route.params.id)" />
</template>
