<script setup lang="ts">
import { useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStorage());

const currentArticles = postlist.value?.filter((el) => el.title.includes(String(route.params.id)));
// currentArticles.value = postlist.value?.filter((el) => el.title.includes(String(route.params.id)));
useSeoMeta({
  title: "Searcxh Result",
  ogTitle: "Searcxh Result",
});
</script>

<template>
  <SearchList v-if="currentArticles" :search-list="currentArticles" />
  <ErrorResult v-else />
</template>
