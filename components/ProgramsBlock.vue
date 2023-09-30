<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  programsList: Post[] | ContentPages[];
  title: string;
  titleClass: string;
  text: string;
  textClass: string;
}
defineProps<Props>();
</script>

<template>
  <v-container v-if="programsList.length" flued class="program pt-16">
    <CardColumn
      v-if="title && text"
      :title-card="title"
      :class-title="titleClass"
      :text-card="text"
      :class-text="textClass"
      font-title-size="2rem"
      :enable-button="false" />
    <div class="program_retrospective_one">
      <v-row align="start">
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
    </div>
    <div class="program_retrospective_two">
      <v-row align="start">
        <v-col cols="12" v-for="el in programsList.slice(2, 6)" :key="el.id">
          <NuxtLink :to="{ path: `/news/${el.id}` }">
            <CardColumn heigth-card="100%" max-height-card="475" :enable-card-slot="true">
              <v-img
                :src="el.imagePreviewLink!"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                cover>
                <template #sources>
                  <source :srcset="el.imageBgLink!" />
                </template>
                <h4 class="text-amber mb-10 ml-10" v-text="el.title"></h4>
              </v-img>
            </CardColumn>
          </NuxtLink>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.program {
  & .program_retrospective_one {
    display: block;
  }
  & .program_retrospective_two {
    display: none;
  }
  @media (max-width: 1280px) {
    & .program_retrospective_one {
      display: none;
    }
    & .program_retrospective_two {
      display: block;
    }
  }
}

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
