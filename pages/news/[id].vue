<script setup lang="ts">
import { useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStorage());

const currentArticle = postlist.value?.find((el) => el.id === route.params.id);
useSeoMeta({
  title: currentArticle?.title ?? "Error search",
  ogTitle: currentArticle?.title ?? "Error search",
});
</script>

<template>
  <NewsBlock v-if="route.params.id && currentArticle" :article="currentArticle" />
  <ErrorResult v-else />
</template>
