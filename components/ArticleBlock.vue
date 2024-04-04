<script setup lang="ts">
import type { ISpecie } from "~/types";

defineProps<{ specie: ISpecie }>();

const items = [
  {
    title: "LC",
    value: "Least Concern",
  },
  {
    title: "NT",
    value: "Near Threatened",
  },
  {
    title: "EW",
    value: "Vulnerable",
  },
  {
    title: "EN",
    value: "Endangered",
  },
  {
    title: "CR",
    value: "Critically Endangered",
  },
  {
    title: "EW",
    value: "Extinct in the Wild",
  },
  {
    title: "EX",
    value: "Extinct",
  },
];
</script>

<template>
  <section v-if="specie" class="article">
    <article class="main_cover">
      <CardColumn heigth-card="600" :enable-card-slot="true">
        <v-img
          v-if="specie.imageBgLink"
          :src="`/${specie.imageBgLink}`"
          :alt="specie.title"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${specie.imageBgLink}`" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="specie.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <article class="description">
      <v-container>
        <v-row>
          <v-col>
            <CardColumn :text-html-card="specie.description" :enable-button="false" />
          </v-col>

          <v-col class="bg-brown-lighten-5 pt-10 px-5" cols="4">
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col class="text-center text-subtitle-2">
                {{ specie.habitain }}
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2">Population Trend:</h6>
                <p class="text-subtitle-2 font-weight-bold">{{ specie.populationTrend }}</p>
              </v-col>
              <v-col class="text-center">
                <v-avatar
                  color="brown-lighten-4"
                  icon="mdi-arrow-down"
                  class="text-subtitle-1"
                  size="x-large">
                </v-avatar>
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2">Number left:</h6>
              </v-col>
              <v-col class="text-center text-subtitle-2 font-weight-bold">
                {{ specie.countLeft }}
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2 font-weight-light">Conservation Status:</h6>
                <ul>
                  <li
                    v-for="(item, i) in items"
                    :key="i"
                    class="conversion_status"
                    :class="specie.conservationStatus === item.title ? 'status' : ''">
                    <p>{{ item.title }} {{ item.value }}</p>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
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
    & .conversion_status {
      & p {
        font-size: 0.7rem;
        font-weight: 300;
      }
    }
    & .status {
      & p {
        color: #6d4c41;
        font-size: 0.8rem;
        font-weight: 800;
      }
    }
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
