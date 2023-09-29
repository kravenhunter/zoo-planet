<script setup lang="ts">
import type { ContentPages, Specie } from "@prisma/client";

interface Props {
  species: ContentPages;
  specieList: Specie[];
}

defineProps<Props>();

const speciesTitle = {
  title: "Local threatened species",
  sourceTitle: "/images/35f9ab0c1f1433fd3c531fc261b36ae2e0075dd0.webp",
  subtitle: "",
  description:
    "Meet the 27 Australian animals we're fighting to protect. These species are on the brink of extinction due to a range of threats. A lesser recognised but very real threat to these species, is that many Victorians do not know they exist, or how they can help. We think the only thing more unjust than wildlife extinction, is the loss of a species that no one knew was in trouble.",
};
const speciesList = [
  {
    id: 1,
    sourceTitle: "/images/545d4194e945d01edc0787c04d14f961da4d8202.webp",
    title: "Alpine She-oak Skink",
    description:
      "Found in only a few locations in Victoria and NSW, the Alpine She-oak Skink is listed as endangered.",
  },
  {
    id: 2,
    sourceTitle: "/images/91353b20af15b191b6a2fdcae964cc049fa2e259.webp",
    title: "Baw Baw Frog",
    description:
      "All estimates point to extinction in the wild for the Baw Baw Frog in just five to 10 years.",
  },
  {
    id: 3,
    sourceTitle: "/images/35f9ab0c1f1433fd3c531fc261b36ae2e0075dd0.webp",
    title: "Brush-tailed Rock-wallaby (southern population)",
    description:
      "In Victoria, the Brush-tailed Rock-wallaby now exists in only two small and isolated locations.",
  },

  {
    id: 4,
    sourceTitle: "/images/3abb64ec3774954dbcc7f2cce8ad0ad8a0912df8.webp",
    title: "Golden-rayed Blue Butterfly",
    description: "This Victorian butterfly is Endangered.",
  },
];
</script>

<template>
  <section class="species">
    <article class="main_cover">
      <CardColumn heigth-card="600" :enable-card-slot="true">
        <v-img
          :src="species.imageBgLink"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="species.imageBgLink!" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="species.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>

    <article class="block_info">
      <v-container>
        <CardColumn :text-html-card="species.description" />
      </v-container>
    </article>
    <article class="galary_list">
      <v-container>
        <h4 class="text-black text-subtitle-2 text-center py-10">
          <v-icon icon="mdi-menu-down" size="large"></v-icon> SCROLL DOWN TO EXPLORE
        </h4>
        <v-row>
          <v-col cols="6" v-for="(el, i) in specieList" :key="i">
            <NuxtLink :to="{ path: `/article/${el.id}` }">
              <v-img
                class="align-end"
                :src="el.imagePreviewLink!"
                max-height="338px"
                max-width="500px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)">
                <template #sources>
                  <source :srcset="el.imagePreviewLink!" />
                </template>
                <h4 class="text-amber text-center mb-1 ml-10" v-text="el.title"></h4>
              </v-img>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </article>
    <div class="back">
      <v-container class="d-flex justify-center">
        <v-btn
          class="px-10 ma-10 text-subtitle-2 font-weight-bold"
          color="grey-lighten-5"
          variant="flat"
          size="x-large"
          router
          to="/info/extinction">
          <span style="color: #01579b">Back to Fighting Extinction</span>
          <v-icon :size="25" color="light-blue-darken-4" class="ml-3 mb-1">mdi-paw</v-icon>
        </v-btn>
      </v-container>
    </div>
  </section>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    font-size: 2.5rem;
  }
}
.species {
  background-color: #f2f2f2;
  & h4 {
    font-family: gothic;
    font-size: 1.5rem;
  }
  & .main_cover {
    max-height: 800px;
  }
  & .block_info {
  }
  & .galary_list {
    background-color: #fff3e0;
  }
  & .v-btn {
    border: 1px solid #01579b;
  }
  & span {
    color: #395a03;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
