<script setup lang="ts">
import { definePageMeta, useRoute } from "#imports";

const route = useRoute();

definePageMeta({
  layout: "admin-layout",
  middleware: ["auth"],
});
</script>

<template>
  <section class="edit">
    <GuardNewsCreate v-if="route.params.id === 'create'" />
    <GuardNewsEdit v-else />
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
