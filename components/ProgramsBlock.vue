<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  programsList: Post[] | ContentPages[];
  title: string;
  titleClass: string;
  text: string;
  textClass: string;
}
const props = defineProps<Props>();
</script>

<template>
  <v-container v-if="programsList.length" flued class="whoes pt-16">
    <CardColumn
      v-if="title && text"
      :title-card="title"
      :class-title="titleClass"
      :text-card="text"
      :class-text="textClass"
      font-title-size="2rem"
      :enable-button="false" />
    <v-row>
      <v-col cols="6" v-for="el in programsList.slice(0, 2)" :key="el.id">
        <CardColumn heigth-card="450" :enable-card-slot="true">
          <v-img
            :src="el.imagePreviewLink!"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
            :aspect-ratio="4 / 3"
            cover>
            <template #sources>
              <source :srcset="el.imageBgLink" />
            </template>
            <h4 class="text-amber mb-10 ml-10" v-text="el.title"></h4>
          </v-img>
        </CardColumn>
      </v-col>

      <v-col cols="4" v-for="el in programsList.slice(2, 5)" :key="el.id">
        <CardColumn heigth-card="450" :enable-card-slot="true">
          <v-img
            :src="el.imagePreviewLink!"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
            :aspect-ratio="4 / 3"
            cover
            >>
            <template #sources>
              <source :srcset="el.imageBgLink" />
            </template>

            <p class="small_title text-amber mb-2 ml-10" v-text="el.title"></p>
          </v-img>
        </CardColumn>
      </v-col>
    </v-row>
  </v-container>
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
  & .small_title {
    font-family: gothic;
    font-size: 1rem;
  }
}
</style>
