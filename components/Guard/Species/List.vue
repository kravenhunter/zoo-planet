<script setup lang="ts">
import type { ISpecie } from "~/types";

defineProps<{ specias?: ISpecie[] | null }>();
</script>

<template>
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
    <div v-if="specias?.length">
      <v-col v-for="el in specias" :key="el.id" cols="12">
        <CardInline
          max-width-card="1200px"
          class-card="bg-grey-darken-4 mx-auto"
          :title-card="el.title"
          class-title="text-amber text-center"
          :text-card="el.shordDescription"
          :image-source="`/${el.imagePreviewLink}`"
          image-width="400px"
          image-heigth="300px"
          image-cols-size="4"
          content-cols-sieze="8"
          button-class="px-10 mb-5 mr-5 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
          button-position="justify-end"
          button-size="large"
          button-title="Edit"
          :button-params="`/guard/species/${el.id}`"
          icon="mdi-paw" />
      </v-col>
    </div>
  </v-row>
</template>
