<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "admin-layout",
});
</script>

<template>
  <LazyGuardMainEdit />
</template>

<style scoped lang="scss">
/* .v-overlay {
  pointer-events: all;
  &--active {
    pointer-events: all;
  }
} */
</style>
