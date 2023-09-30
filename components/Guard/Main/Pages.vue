<script setup lang="ts">
import { useUnionStore } from "@/stores/storeGenerics";
import type { ContentPages } from "@prisma/client";
import { storeToRefs } from "pinia";

defineProps<{
  pages: ContentPages[];
}>();
const { mainPages } = storeToRefs(useUnionStore());
</script>

<template>
  <v-row v-if="mainPages">
    <v-col cols="12" v-for="el in mainPages" :key="el.id">
      <CardInline
        max-width-card="1200px"
        class-card="bg-grey-darken-4 mx-auto"
        :title-card="el.title"
        class-title="text-amber text-center"
        :text-card="el.shortDescription"
        class-text="text-center"
        :image-source="el.imagePreviewLink!"
        image-width="400px"
        image-heigth="300px"
        image-cols-size="4"
        button-class="px-10 mb-5 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
        button-position="justify-center"
        button-size="large"
        button-title="Edit"
        :button-params="`/guard/main/${el.subTitle?.toLocaleLowerCase()}`"
        icon="mdi-paw" />
    </v-col>
  </v-row>
</template>
