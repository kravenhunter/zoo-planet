<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStore());

const currentArticle = ref<Post>();
currentArticle.value = postlist.value?.find((el) => el.id === route.params.id);
useSeoMeta({
  title: currentArticle.value ? currentArticle.value.title : "Error search",
  ogTitle: currentArticle.value ? currentArticle.value.title : "Error search",
});
</script>

<template>
  <NewsBlock v-if="route.params.id && currentArticle" :article="currentArticle" />
  <ErrorResult v-else />
</template>
