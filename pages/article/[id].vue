<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { Specie } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();
const { specieList } = storeToRefs(useUnionStore());

const currentSpecie = ref<Specie>();
currentSpecie.value = specieList.value?.find((el) => el.id === route.params.id);
useSeoMeta({
  title: currentSpecie.value ? currentSpecie.value.title : "Error search",
  ogTitle: currentSpecie.value ? currentSpecie.value.title : "Error search",
});
</script>

<template>
  <ArticleBlock v-if="route.params.id && currentSpecie" :specie="currentSpecie" />
  <ErrorResult v-else />
</template>
