<script setup lang="ts">
import type { Post } from "@prisma/client";

defineProps<{ article: Post }>();
// const route = useRoute();
// const { postlist } = storeToRefs(useUnionStore());

// const currentArticle = ref<Post>();
// currentArticle.value = postlist.value?.find((el) => el.id === route.params.id);
</script>

<template>
  <section class="article" v-if="article">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="article?.imageBgLink"
        :image-title="article.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
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
.article {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
}
</style>
