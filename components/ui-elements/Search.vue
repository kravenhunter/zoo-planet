<script setup lang="ts"></script>

<template>
  <div class="search">
    <input type="text" placeholder="search" />
  </div>
</template>

<style scoped lang="scss">
.search {
  width: 400px;
  height: 35px;
  font-size: 0.9rem;
  & input {
    width: 100%;
    height: 100%;
    padding-left: 10px;

    background-color: white;
    border-radius: 5px;
    &:hover {
      border: none;
    }
  }
}
</style>
