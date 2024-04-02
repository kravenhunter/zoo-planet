<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { ISpecie } from "~/types";

const route = useRoute();
const { specieList } = storeToRefs(useUnionStorage());

const currentSpecie = ref<ISpecie>();
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
