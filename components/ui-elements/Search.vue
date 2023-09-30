<script setup lang="ts">
const prop = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  emit("update:value", (event?.target as HTMLInputElement).value);
  console.log(prop.value);
};
</script>

<template>
  <div class="search">
    <input type="text" placeholder="search" name="Search" :value="value" @input="updateValue" />
  </div>
</template>

<style scoped lang="scss">
.search {
  position: relative;
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
