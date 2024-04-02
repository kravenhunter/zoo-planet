<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { IPost } from "~/types";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStorage());

const currentArticle = ref<IPost>();
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
