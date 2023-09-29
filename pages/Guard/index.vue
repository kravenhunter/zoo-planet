<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "admin-layout",
  middleware: ["auth"],
});
</script>

<template>
  <section class="main_content">
    <v-container>
      <v-card>
        <v-card-title> Content Managment Panel</v-card-title>
        <v-card-text>
          You can edniting main pages content, adding article, and data prices.
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped></style>
