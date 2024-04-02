<script setup lang="ts">
import type { IPost } from "~/types";

defineProps<{ article: IPost }>();
</script>

<template>
  <section v-if="article" class="article">
    <article class="main_cover">
      <CardColumn :enable-card-slot="true">
        <v-img
          v-if="article.imageBgLink"
          :src="`/${article.imageBgLink}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${article.imageBgLink}`" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="article.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <article class="description">
      <v-container>
        <CardColumn
          v-if="article.extraeDscription"
          :text-html-card="article.extraeDscription"
          :enable-button="false" />
      </v-container>
    </article>
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
.article {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
}
</style>
