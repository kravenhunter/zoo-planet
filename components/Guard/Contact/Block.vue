<script setup lang="ts">
import type { IContacts } from "~/types";

defineProps<{ contactData: IContacts }>();
</script>

<template>
  <div v-if="contactData">
    <v-row>
      <v-col cols="12">
        <CardInline
          max-width-card="1200px"
          class-card="bg-grey-darken-4 mx-auto"
          :title-card="contactData.title"
          class-title="text-amber text-center"
          :text-card="contactData.description"
          :image-source="contactData.imagePreviewLink!"
          image-width="400px"
          image-heigth="300px"
          image-cols-size="4"
          content-cols-sieze="8"
          :enable-button="false" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <GuardContactEdit v-if="contactData" :contac-table="contactData" />
      </v-col>
    </v-row>
  </div>
</template>
