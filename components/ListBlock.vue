<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  mainContent: ContentPages;
  news: Post[];
}
defineProps<Props>();
</script>

<template>
  <v-container>
    <article class="news_main">
      <CardColumn
        :title-card="mainContent?.title"
        class-title="text-amber text-center"
        :text-card="mainContent?.shortDescription"
        class-text="text-center text-black"
        font-title-size="2rem"
        :enable-button="false" />
    </article>
    <v-row class="justify-center">
      <v-col cols="7" lg="4" md="5" v-for="(item, i) in news" :key="i" class="news_item">
        <CardColumn
          class-card="mx-auto"
          max-width-card="373"
          image-width="360"
          image-heigth="260"
          :title-card="item?.title"
          class-title="text-green-darken-4  pa-1 "
          :text-card="item?.description"
          class-text-block="overflow-hidden mb-5"
          class-text="pa-1  text-black"
          text-block-size="280px"
          :image-source="item.imagePreviewLink!"
          :button-slot="true">
          <v-btn
            class="news_btn px-10 w-100 font-weight-medium"
            color="#ffc107"
            size="large"
            :to="`/news/${item.id}`"
            append-icon="mdi-paw">
            Learn more
          </v-btn>
        </CardColumn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.news_btn {
  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }
}
.news_item {
  @media (max-width: 1280px) {
    max-height: 700px;
  }
}
</style>
