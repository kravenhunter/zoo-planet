<script setup lang="ts">
import { definePageMeta } from "#imports";

// import { useMainContentStore } from "@/stores/mainContentStore";
// import { usePostStore } from "@/stores/postStore";
// import type { ContentPages, Post } from "@prisma/client";
// import { storeToRefs } from "pinia";

// const newsMainPageContent = ref<ContentPages>();
// const latestNewsList = ref<Post[]>();

// const { mainPages } = storeToRefs(useMainContentStore());
// const { postlist } = storeToRefs(usePostStore());
// newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Latest News");
// latestNewsList.value = postlist.value;

definePageMeta({
  layout: "admin-layout",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <section class="main_content">
    <!--  <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader
              class="text-h6 text-white"
              title="News main content"></v-list-subheader>
            <v-list-item v-if="newsMainPageContent">
              <CardItem
                image-heigth="200"
                image-width="200"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="newsMainPageContent?.imageBgLink"
                font-title-size="2rem"
                :title-card="newsMainPageContent?.title"
                :subtitle-card="newsMainPageContent?.shortDescription"
                button-title="Edit"
                button-align="align-center"
                :button-slot="true">
                <v-btn
                  class="px-10 text-subtitle-1 mx-auto text-white text-grey-lighten-5"
                  color="light-blue-darken-4"
                  variant="flat"
                  size="large"
                  :to="{ path: `/guard/main/news` }"
                  append-icon="mdi-paw">
                  Edit
                </v-btn>
              </CardItem>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
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
          <v-list lines="two" class="bg-grey-darken-4" v-if="latestNewsList?.length">
            <v-list-subheader class="text-h6 text-white" title="News & Programs"></v-list-subheader>
            <v-list-item v-for="(el, i) in latestNewsList" :key="i">
              <CardItem
                :shadow-card="10"
                image-heigth="200"
                image-width="200"
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
    </v-container> -->

    <v-container>
      <v-card>
        <v-card-title> Content Managment Panel</v-card-title>
        <v-card-text>
          You can edniting main pages content, adding article, and data prices.
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped></style>
