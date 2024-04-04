<script setup lang="ts">
import { useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const { specieList } = storeToRefs(useUnionStorage());

const currentSpecie = specieList.value?.find((el) => el.id === route.params.id);

useSeoMeta({
  title: currentSpecie?.title ?? "Error search",
  ogTitle: currentSpecie?.title ?? "Error search",
});
</script>

<template>
  <ArticleBlock v-if="route.params.id && currentSpecie" :specie="currentSpecie" />
  <ErrorResult v-else />
</template>
