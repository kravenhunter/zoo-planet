<script setup lang="ts">
defineProps({
  classCard: String,
  imageSource: String,
  enableSlot: Boolean,
  icon: String,
  titleCard: String,
  subtitleCard: String,
  textCard: String,
  enablseButtonSlot: Boolean,
  colorbg: {
    type: String,
    default: "transparent",
  },
  colorTitle: {
    type: String,
    default: "#ffc107",
  },
  justifyContent: {
    type: String,
    default: "d-flex flex-column justify-items-center",
  },
  shadowCard: {
    type: Number,
    default: 0,
  },
  titleAlign: {
    type: String,
    default: "start",
  },
  sunTiTtleAlign: {
    type: String,
    default: "start",
  },
  textAlign: {
    type: String,
    default: "start",
  },

  buttonAlign: {
    type: String,
    default: "start",
  },
});
</script>

<template>
  <v-card
    v-if="enableSlot"
    :title="titleCard"
    :color="colorbg"
    :subtitle="subtitleCard"
    :text="textCard"
    :class="classCard"
    :elevation="0">
    <slot />
  </v-card>

  <v-card v-else :color="colorbg" :elevation="shadowCard">
    <v-img v-if="imageSource" :src="imageSource" cover />
    <div :class="justifyContent">
      <v-card-title v-if="titleCard" :class="titleAlign"> {{ titleCard }}</v-card-title>
      <v-card-subtitle v-if="subtitleCard" class="pt-4" :class="sunTiTtleAlign">
        {{ subtitleCard }}</v-card-subtitle
      >

      <v-card-text v-if="textCard" :class="textAlign">
        {{ textCard }}
      </v-card-text>
    </div>
    <v-card-actions v-if="enablseButtonSlot" :class="buttonAlign">
      <slot />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    color: v-bind(colorTitle);
  }
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.right {
  text-align: right;
}
.left {
  text-align: left;
}
</style>
