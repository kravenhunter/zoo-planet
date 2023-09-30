<script setup lang="ts">
defineProps({
  classCard: String,
  source: String,
  useAvatar: Boolean,

  colorbg: {
    type: String,
    default: "transparent",
  },
  sizeImg: {
    type: String,
    default: "181",
  },
  roundeImg: {
    type: String,
    default: "0",
  },
  gradientImg: {
    type: String,
    default: "to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",
  },
  coverImg: {
    type: Boolean,
    default: true,
  },
  heightImg: {
    type: String,
    default: "100%",
  },
  widthImg: {
    type: String,
    default: "100%",
  },
});
</script>

<template>
  <v-avatar v-if="useAvatar" :class="classCard" :size="sizeImg" :rounded="roundeImg">
    <v-img
      :src="source"
      :color="colorbg"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :cover="coverImg">
      <slot />
    </v-img>
  </v-avatar>
  <v-img
    v-else
    :src="source"
    :height="heightImg"
    :width="widthImg"
    :class="classCard"
    :gradient="gradientImg"
    :cover="coverImg">
    <slot />
  </v-img>
</template>
