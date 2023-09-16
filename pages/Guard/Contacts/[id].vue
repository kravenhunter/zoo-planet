<script setup lang="ts">
import { definePageMeta, useRoute } from "#imports";

const route = useRoute();

definePageMeta({
  layout: "admin-layout",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <section class="edit">
    <GuardContactEdit />
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
