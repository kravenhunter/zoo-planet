<script setup lang="ts">
const contactData = {
  source: "/images/monkey.jpg",
  title: "insight into the wild day-today life of the zoo planet in the ... ",
  subtitle1:
    "Before getting in touch with us, check out our latest FAQs in case your question has already been answered:",
  subtitle2: "Couldn't find an answer? Get in touch with us:",
  subtitle3: "Write to us:",
  subtitle4: "Visit us:",
  text1:
    "Note: we are experiencing an extremely high volume of calls and emails at the moment so the phone wait time and email response time may be lengthy. We apologise for any inconvenience this causes.",
  text2: `Zoos Victoria
Wurundjeri Country
PO Box 74
Parkville, Victoria 3052
Australia`,
  phone: "1300 966 784",
  email: "contact@zoo.org.au",
};
</script>

<template>
  <section class="article">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="contactData.source"
        :image-title="contactData.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <article class="description">
      <v-container>
        <CardItem colorbg="#f2f2f2" :text-card="contactData.text1" :text-slot="true">
          <v-card-text>
            <h1 class="text-h6 pb-2">{{ contactData.subtitle1 }}</h1>
            <v-card-actions>
              <v-btn
                class="px-10 ma-10 text-subtitle-2 font-weight-bold"
                color="#01579b"
                variant="flat"
                size="x-large"
                append-icon="mdi-paw"
                router
                to="/info/faq">
                Read Our FAQ's
              </v-btn>
              <v-btn
                class="px-10 ma-10 text-subtitle-2 font-weight-bold"
                color="#01579b"
                variant="flat"
                size="x-large"
                append-icon="mdi-paw"
                router
                to="/info/change">
                Change ticket
              </v-btn>
              <v-btn
                class="px-10 ma-10 text-subtitle-2 font-weight-bold"
                color="#01579b"
                variant="flat"
                size="x-large"
                append-icon="mdi-paw"
                router
                to="/info/help">
                Emergansy help
              </v-btn>
            </v-card-actions>
            <h1 class="text-subtitle-1 font-weight-bold">{{ contactData.subtitle2 }}</h1>
            <p class="text-subtitle-2 font-weight-bold">Phone: {{ contactData.phone }}</p>
            <p class="text-subtitle-2 font-weight-bold">Email: {{ contactData.email }}</p>
            <p class="text-subtitle-2">{{ contactData.text1 }}</p>
            <h1 class="text-subtitle-1 font-weight-bold">{{ contactData.subtitle3 }}</h1>
            <p class="text-subtitle-2">{{ contactData.text2 }}</p>
            <h1 class="text-subtitle-1 font-weight-bold pb-10">{{ contactData.subtitle4 }}</h1>
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
  & .description {
    & .v-btn {
      border: 1px solid #01579b;
    }
  }
}
</style>
