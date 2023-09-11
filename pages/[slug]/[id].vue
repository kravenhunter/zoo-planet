<script setup lang="ts">
import { useRoute } from "#imports";

const route = useRoute();
</script>

<template>
  <div class="wrapper">
    <InfoAbout v-if="route.params.id === 'about'" />
    <InfoExtinction v-if="route.params.id === 'extinction'" />
    <InfoEducation v-if="route.params.id === 'education'" />
    <InfoPlain v-if="route.params.id === 'plain'" />
    <InfoNews v-if="route.params.id === 'news'" />
    <InfoSpecies v-if="route.params.id === 'species'" />
    <InfoContactUs v-if="route.params.id === 'contact'" />
    <InfoTiket v-if="route.params.id === 'ticket'" />
    <InfoMembership v-if="route.params.id === 'membership'" />
    <TestComponent v-if="route.params.id === 'test'" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;

  display: grid;
}
</style>
