<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist } = storeToRefs(useUnionStore());

const currentArticles = ref<Post[]>();
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
