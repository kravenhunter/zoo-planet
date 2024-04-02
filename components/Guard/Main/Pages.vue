<script setup lang="ts">
import type { IContentPage } from "~/types";

defineProps<{
  pages?: IContentPage[] | null;
  currentPage?: IContentPage | null;
}>();
//const { mainPages } = storeToRefs(useUnionStore());
</script>

<template>
  <div>
    <v-row>
      <v-col v-if="currentPage" cols="12">
        <CardInline
          max-width-card="1200px"
          class-card="bg-grey-darken-4 mx-auto"
          :title-card="currentPage.title"
          class-title="text-amber text-center"
          :text-card="currentPage.shortDescription"
          :image-source="`/${currentPage.imagePreviewLink}`"
          image-width="400px"
          image-heigth="300px"
          image-cols-size="4"
          content-cols-sieze="8"
          button-class="px-10 mb-5 mr-5  text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
          button-position="justify-end"
          button-size="large"
          button-title="Edit"
          :button-params="`/guard/main/${currentPage.id}`"
          icon="mdi-paw" />
      </v-col>
      <v-col v-else cols="12" class="d-flex justify-center">
        <v-btn
          class="px-10 text-subtitle-1 ma-6 text-white text-grey-lighten-5"
          color="light-blue-darken-4"
          variant="flat"
          size="large"
          to="/guard/main/create"
          append-icon="mdi-paw">
          Create Main Page
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="pages">
      <v-col v-for="el in pages" :key="el.id" cols="12">
        <CardInline
          max-width-card="1200px"
          class-card="bg-grey-darken-4 mx-auto"
          :title-card="el.title"
          class-title="text-amber text-center"
          :text-card="el.shortDescription"
          class-text="text-center"
          :image-source="`/${el.imagePreviewLink}`"
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
  </div>
</template>
