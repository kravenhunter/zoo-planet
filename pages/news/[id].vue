<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
</script>

<template>
  <NewsBlock v-if="route.params.id" />
</template>
