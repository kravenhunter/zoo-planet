<script setup lang="ts">
import type { Specie } from "@prisma/client";

defineProps<{ speciest: Specie[] }>();
</script>

<template>
  <!-- <v-row>
    <v-col cols="12">
      <v-btn
        class="px-10 text-subtitle-1 ma-6 text-white text-grey-lighten-5"
        color="light-blue-darken-4"
        variant="flat"
        size="large"
        to="/guard/species/create"
        append-icon="mdi-paw">
        Create record
      </v-btn>
      <v-list lines="two" class="bg-grey-darken-4" v-if="speciest?.length">
        <v-list-subheader class="text-h6 text-white" title="News & Programs"></v-list-subheader>
        <v-list-item v-for="(el, i) in speciest" :key="i">
          <CardInline
            max-width-card="1200px"
            class-card="bg-grey-darken-4"
            :title-card="el.title"
            class-title="text-amber"
            :text-card="el.shordDescription"
            :image-source="el.imagePreviewLink!"
            image-width="300px"
            image-heigth="200px"
            button-class="px-10 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
            button-position="justify-end"
            button-size="large"
            button-title="Edit"
            :button-params="`/guard/species/${el.id}`"
            icon="mdi-paw" />
       
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row> -->

  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn
        class="px-10 text-subtitle-1 ma-6 text-white text-grey-lighten-5"
        color="light-blue-darken-4"
        variant="flat"
        size="large"
        to="/guard/species/create"
        append-icon="mdi-paw">
        Create post
      </v-btn>
    </v-col>
    <v-col cols="12" v-for="el in speciest" :key="el.id">
      <CardInline
        max-width-card="1200px"
        class-card="bg-grey-darken-4 mx-auto"
        :title-card="el.title"
        class-title="text-amber text-center"
        :text-card="el.shordDescription"
        :image-source="el.imagePreviewLink!"
        image-width="400px"
        image-heigth="300px"
        image-cols-size="4"
        content-cols-sieze="8"
        button-class="px-10 mb-5 mr-5 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
        button-position="justify-end"
        button-size="large"
        button-title="Edit"
        :button-params="`/guard/posts/${el.id}`"
        icon="mdi-paw" />
    </v-col>
  </v-row>
</template>

<style scoped></style>
