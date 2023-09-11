<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
</script>

<template>
  <ArticleBlock v-if="route.params.id" />
</template>
