<script setup lang="ts">
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
const titleNews = {
  title: "latest news",
  sourceTitle: "/images/zoo_4.jpg",
  subtitle: "",
  text: "All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability.",
};
</script>

<template>
  <section class="news">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="titleNews.sourceTitle"
        :image-title="titleNews.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <v-container>
      <article class="title_block pb-10">
        <CardItem
          colorbg="#f2f2f2"
          :title-card="titleNews.title"
          :text-card="titleNews.text"
          title-align="text-center"
          text-align="text-center" />
      </article>
      <article class="news_block">
        <v-row>
          <v-col cols="4" v-for="(item, i) in news" :key="i">
            <CardItem
              colorbg="#f2f2f2"
              image-heigth="200px"
              color-title="#395A03"
              :image-source="item.source"
              :title-card="item.title"
              :text-card="item.text"
              text-align="overflow-hidden"
              :button-slot="true"
              button-title="Learn more">
              <v-btn
                class="px-10 text-subtitle-1 align-self-end"
                color="#ffc107"
                router
                :to="{ path: `/news/${item.id}` }"
                size="x-large"
                append-icon="mdi-paw">
                <span>Learn more</span>
              </v-btn>
            </CardItem>
          </v-col>
        </v-row>
      </article>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.news {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
  & .v-btn {
    border: 2px solid #ffc107;
  }
  & span {
    color: #395a03;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
