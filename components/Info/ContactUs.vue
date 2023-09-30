<script setup lang="ts">
import type { ContactUs } from "@prisma/client";

defineProps<{
  contactMain: ContactUs;
}>();
const contactData = {
  source: "/images/monkey.jpg",
  title: "insight into the wild day-today life of the zoo planet in the ... ",
  subtitle1:
    "Before getting in touch with us, check out our latest FAQs in case your question has already been answered:",
  subtitle2: "Couldn't find an answer? Get in touch with us:",
  subtitle3: "Write to us:",
  subtitle4: "Are you a journalist? Please visit our media:",
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
    <article class="main_cover" v-if="contactMain">
      <CardColumn :enable-card-slot="true">
        <v-img
          :src="contactMain.imageBgLink"
          class="align-end"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)">
          <template #sources>
            <source :srcset="contactMain.imageBgLink" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="contactMain.title"></v-card-title>
        </v-img>
      </CardColumn>
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
                append-icon="mdi-paw">
                Read Our FAQ's
              </v-btn>
              <v-btn
                class="px-10 ma-10 text-subtitle-2 font-weight-bold"
                color="#01579b"
                variant="flat"
                size="x-large"
                append-icon="mdi-paw">
                Change ticket
              </v-btn>
              <v-btn
                class="px-10 ma-10 text-subtitle-2 font-weight-bold"
                color="#01579b"
                variant="flat"
                size="x-large"
                append-icon="mdi-paw">
                Emergansy help
              </v-btn>
            </v-card-actions>
            <h1 class="text-subtitle-1 font-weight-bold">{{ contactData.subtitle2 }}</h1>
            <p class="text-subtitle-2 font-weight-bold my-2">Phone: {{ contactMain.phone }}</p>
            <p class="text-subtitle-2 font-weight-bold my-2">Email: {{ contactMain.email }}</p>
            <p class="text-subtitle-2">{{ contactData.text1 }}</p>
            <h1 class="text-subtitle-1 font-weight-bold">{{ contactData.subtitle3 }}</h1>
            <p class="text-subtitle-2">{{ contactData.text2 }}</p>
            <h1 class="text-subtitle-1 font-weight-bold">{{ contactData.subtitle4 }}</h1>
          </v-card-text>

          <ul class="socials d-flex mx-auto">
            <li>
              <NuxtLink :to="contactMain.socialLink_1!">
                <v-avatar color="#395A03" class="ma-3" size="47" rounded="50">
                  <UiElementsIcons
                    icon-name="ri:facebook-fill"
                    color-icon="white"
                    size-width="25"
                    size-heigth="25" />
                </v-avatar>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="contactMain.socialLink_2!">
                <v-avatar color="#395A03" class="ma-3" size="47" rounded="50">
                  <UiElementsIcons
                    icon-name="mdi:twitter"
                    color-icon="white"
                    size-width="25"
                    size-heigth="25" />
                </v-avatar>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="contactMain.socialLink_3!">
                <v-avatar color="#395A03" class="ma-3" size="47" rounded="50">
                  <UiElementsIcons
                    icon-name="mdi:youtube"
                    color-icon="white"
                    size-width="25"
                    size-heigth="25" />
                </v-avatar>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="contactMain.socialLink_4!">
                <v-avatar color="#395A03" class="ma-3" size="47" rounded="50">
                  <UiElementsIcons
                    icon-name="mdi:instagram"
                    color-icon="white"
                    size-width="25"
                    size-heigth="25" />
                </v-avatar>
              </NuxtLink>
            </li>
          </ul>
        </CardItem>
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
  & .description {
    & .v-btn {
      border: 1px solid #01579b;
    }
  }
}
</style>
