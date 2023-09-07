<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <ul class="text-center">
      <li v-for="n in 5" :key="n">{{ n }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  font-size: 1rem;
  display: grid;
}
</style>
