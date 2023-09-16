<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "admin-layout",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <GuardMainBlock />
</template>

<style scoped></style>
