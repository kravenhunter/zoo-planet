<script setup lang="ts">
import { definePageMeta } from "#imports";

const titleNews = {
  id: "8feccc19-4820-460a-a29e-e5e469d7bc1cc",
  title: "latest news",
  sourceTitle: "/images/zoo_4.jpg",
  subtitle: "",
  text: "All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability.",
};

const news = [
  {
    id: 1,
    source: "/images/5348c7c179cf3e3a4234e8593376f02baca69d49.webp",
    title: "They Are Calling On You",
    subtitle:
      "You can help protect Eastern Lowland Gorillas in Africa simply by donating your old mobile phones.",
    text: `No one knows exactly how many Eastern Lowland Gorillas survive in the wild, but with 8,500 believed to be remaining they are Critically Endangered. `,
  },
  {
    id: 2,
    source: "/images/rino.jpg",
    title: "A baby rino arrived an our  Zoo",
    subtitle: "Get the most up-to-date information and strategies for teaching ",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 3,
    source: "/images/monkey.jpg",
    title: "insight into the wild day-today life of the zoo planet in the ... ",
    subtitle: "Get the most up-to-date information and strategies for teaching ",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 4,
    source: "/images/dolphins.jpg",
    title: "swim with our friends dolphins",
    subtitle: "Get the most up-to-date information and strategies for teaching ",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 5,
    source: "/images/rino.jpg",
    title: "A baby rino arrived an our  Zoo",
    subtitle: "Get the most up-to-date information and strategies for teaching r",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 6,
    source: "/images/monkey.jpg",
    title: "insight into the wild day-today life of the zoo planet in the ... ",
    subtitle: "Get the most up-to-date information and strategies for teaching r",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 7,
    source: "/images/dolphins.jpg",
    title: "Swim with our friends dolphins",
    subtitle: "Get the most up-to-date information and strategies for teaching r",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
];

definePageMeta({
  layout: "admin-layout",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <section class="main_content">
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="12">
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader
              class="text-h6 text-white"
              title="News main content"></v-list-subheader>
            <v-list-item>
              <CardItem
                image-heigth="200"
                image-width="200"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="titleNews.sourceTitle"
                font-title-size="2rem"
                :title-card="titleNews.title"
                :subtitle-card="titleNews.text"
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
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader class="text-h6 text-white" title="News & Programs"></v-list-subheader>
            <v-list-item v-for="(el, i) in news" :key="i">
              <CardItem
                :shadow-card="10"
                image-heigth="200"
                image-width="200"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="el.source"
                font-title-size="2rem"
                :title-card="el.title"
                :subtitle-card="el.text"
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
    </v-container>
  </section>
</template>

<style scoped></style>
