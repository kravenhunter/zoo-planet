<script setup lang="ts">
import type { IContentPage, ISpecie } from "~/types";

interface Props {
  species: IContentPage;
  specieList: ISpecie[];
}

defineProps<Props>();
</script>

<template>
  <section class="species">
    <article class="main_cover">
      <CardColumn :enable-card-slot="true">
        <v-img
          v-if="species.imageBgLink"
          :alt="species.title"
          :src="`/${species.imageBgLink}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${species.imageBgLink}`" />
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
          <v-col v-for="el in specieList" :key="el.id" cols="12" sm="6">
            <NuxtLink :to="{ path: `/article/${el.id}` }">
              <v-img
                v-if="el.imagePreviewLink"
                :alt="el.title"
                :src="`/${el.imagePreviewLink}`"
                class="align-end"
                max-height="338px"
                max-width="500px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)">
                <template #sources>
                  <source :srcset="`/${el.imagePreviewLink}`" />
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
