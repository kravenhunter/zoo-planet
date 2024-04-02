<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { IPost } from "~/types";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStorage());

const currentArticles = ref<IPost[]>();
currentArticles.value = postlist.value?.filter((el) => el.title.includes(String(route.params.id)));
useSeoMeta({
  title: "Searcxh Result",
  ogTitle: "Searcxh Result",
});
</script>

<template>
  <SearchList v-if="currentArticles" :search-list="currentArticles" />
  <ErrorResult v-else />
</template>
