<script setup lang="ts">
defineProps({
  classCard: String,
  source: String,
  useAvatar: Boolean,

  heightBar: {
    type: Number,
    default: 0,
  },
});
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
</script>

<template>
  <v-app-bar :height="heightBar">
    <slot />
  </v-app-bar>
</template>

<style scoped></style>
