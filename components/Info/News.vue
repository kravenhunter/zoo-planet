<script setup lang="ts">
import type { IContentPage, IPost } from "~/types";

interface Props {
  mainContent: IContentPage;
  news: IPost[];
}
defineProps<Props>();
</script>

<template>
  <section v-if="mainContent && news" class="news">
    <article class="main_cover">
      <CardColumn :enable-card-slot="true">
        <v-img
          :alt="mainContent.title"
          :src="`/${mainContent.imageBgLink}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${mainContent.imageBgLink}`" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="mainContent.subTitle"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <ListBlock :main-content="mainContent" :news="news" />
  </section>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    font-size: 2.5rem;
  }
  & h4 {
    font-family: gothic;
    font-size: 1.5rem;
  }
}
.news {
  background-color: #f2f2f2;
}
</style>
