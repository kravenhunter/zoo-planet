<script setup lang="ts">
import { ref, useRoute } from "#imports";

const route = useRoute();
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
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 3,
    source: "/images/monkey.jpg",
    title: "insight into the wild day-today life of the zoo planet in the ... ",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 4,
    source: "/images/dolphins.jpg",
    title: "swim with our friends dolphins",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 5,
    source: "/images/rino.jpg",
    title: "A baby rino arrived an our  Zoo",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 6,
    source: "/images/monkey.jpg",
    title: "insight into the wild day-today life of the zoo planet in the ... ",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    id: 7,
    source: "/images/dolphins.jpg",
    title: "swim with our friends dolphins",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
];
const currentArticle = ref();
const getArticle = (idArticle: number | undefined) =>
  idArticle && news.find((el) => el.id === idArticle);
currentArticle.value = getArticle(Number(route.params.id));
</script>

<template>
  <section class="article">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="currentArticle.source"
        :image-title="currentArticle.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <article class="description">
      <v-container>
        <CardItem colorbg="#f2f2f2" :text-card="currentArticle.text" :text-slot="true">
          <v-card-text>
            <h1 class="text-h6 pb-10">{{ currentArticle.subtitle }}</h1>
            {{ currentArticle.text }}
          </v-card-text>
        </CardItem>
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
