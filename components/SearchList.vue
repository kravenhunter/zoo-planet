<script setup lang="ts">
import type { Post } from "@prisma/client";

interface Props {
  searchList: Post[];
}
defineProps<Props>();
</script>

<template>
  <section class="search">
    <v-container>
      <CardColumn
        :enable-button="false"
        title-card="Search Results"
        class-title="text-green-darken-4 text-center"
        font-title-size="2rem" />

      <v-container v-if="searchList">
        <CardInline
          v-for="post in searchList"
          :key="post.id"
          max-width-card="1200px"
          class-card="pa-3 mb-16"
          :title-card="post.title"
          class-title="text-green-darken-4 text-center"
          :text-card="post.description"
          class-text="text-center"
          :image-source="post.imagePreviewLink!"
          image-width="650px"
          image-heigth="350px"
          image-cols-size="6"
          :enable-button="true"
          button-class="bg-light-blue-darken-4"
          button-position="justify-center"
          icon="mdi-paw"
          :button-params="`/news/${post.id}`"
          button-title="Learn" />
      </v-container>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.search {
  height: 100%;
  background-color: var(--color-grey);
}
</style>
