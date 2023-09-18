<script setup lang="ts">
import type { Post } from "@prisma/client";

defineProps<{ latestNewsList: Post[] }>();
</script>

<template>
  <v-row v-if="latestNewsList?.length">
    <v-col cols="12">
      <v-btn
        class="px-10 text-subtitle-1 ma-6 text-white text-grey-lighten-5"
        color="light-blue-darken-4"
        variant="flat"
        size="large"
        to="/guard/posts/create"
        append-icon="mdi-paw">
        Create post
      </v-btn>
      <v-list lines="two" class="bg-grey-darken-4">
        <v-list-subheader class="text-h6 text-white" title="News & Programs"></v-list-subheader>
        <v-list-item v-for="(el, i) in latestNewsList" :key="i">
          <CardItem
            :shadow-card="10"
            image-heigth="200"
            image-width="300"
            :inline="true"
            class="card_main"
            class-card="justify-start"
            class-content="d-flex flex-column align-self-center "
            colorbg="grey-darken-4"
            :image-source="el.imageBgLink"
            font-title-size="2rem"
            :title-card="el.title"
            :subtitle-card="el.description"
            button-title="Edit"
            button-align="align-self-end"
            :button-slot="true">
            <v-btn
              class="px-10 text-subtitle-1 text-white text-grey-lighten-5"
              color="light-blue-darken-4"
              variant="flat"
              size="large"
              append-icon="mdi-paw"
              :to="{ path: `/guard/posts/${el.id}` }">
              Edit
            </v-btn>
          </CardItem>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped></style>
