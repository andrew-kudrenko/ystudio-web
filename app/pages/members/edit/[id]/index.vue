<script setup lang="ts">
import { EditMemberPage } from "~/modules/pages/members";

const route = useRoute();
</script>

<template>
  <EditMemberPage :id="String(route.params.id)" />
</template>
