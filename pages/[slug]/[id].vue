<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
</script>

<template>
  <div class="wrapper">
    <InfoAbout v-if="route.params.id === 'about'" />
    <InfoExtinction v-if="route.params.id === 'extinction'" />
    <TestComponent v-if="route.params.id === 'test'" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;

  display: grid;
}
</style>
