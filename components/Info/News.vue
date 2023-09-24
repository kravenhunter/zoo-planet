<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  mainContent: ContentPages;
  news: Post[];
}
const props = defineProps<Props>();
</script>

<template>
  <section class="news" v-if="mainContent && news">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="mainContent.imageBgLink"
        :image-title="mainContent.subTitle!"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <ListBlock :main-content="mainContent" :news="news" />
  </section>
</template>

<style scoped lang="scss">
.news {
  background-color: #f2f2f2;
  /*  & .main_cover {
    max-height: 800px;
  }
  & .v-btn {
    border: 2px solid #ffc107;
  }
  & span {
    color: #395a03;
    font-size: 0.9rem;
    font-weight: 600;
  } */
}
</style>
