<script setup lang="ts">
defineProps({
  classCard: String,
  imageSource: String,
  imageTitle: String,
  imageHeigth: String,
  buttonSlot: Boolean,
  icon: String,
  titleCard: String,
  titleAlign: String,
  subtitleCard: String,
  sunTitleAlign: String,
  textCard: String,
  textAlign: String,
  buttonTitle: String,
  btnTextSize: String,
  buttonSize: String,
  buttonAlign: String,
  buttonClass: String,
  iconButton: String,
  fontTitleSize: {
    type: String,
    default: "1.2rem",
  },
  colorbg: {
    type: String,
    default: "transparent",
  },
  colorTitle: {
    type: String,
    default: "#ffc107",
  },
  colorButton: {
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
  variantButton: {
    type: String,
    default: "outlined",
  },
});
</script>

<template>
  <!--   <v-card
    v-if="enableSlot"
    :title="titleCard"
    :color="colorbg"
    :subtitle="subtitleCard"
    :text="textCard"
    :class="classCard"
    :elevation="0">
    <slot />
  </v-card>
 -->

  <v-card :color="colorbg" :elevation="shadowCard" :class="classCard">
    <v-img
      v-if="imageSource"
      :height="imageHeigth"
      :src="imageSource"
      cover
      class="align-end text-white">
      <v-card-title v-if="imageTitle" :class="titleAlign">{{ imageTitle }}</v-card-title>
    </v-img>

    <v-card-title v-if="titleCard" :class="titleAlign"> {{ titleCard }}</v-card-title>
    <v-card-subtitle v-if="subtitleCard" class="pt-4" :class="sunTitleAlign">
      {{ subtitleCard }}
    </v-card-subtitle>

    <v-card-text v-if="textCard" :class="textAlign">
      {{ textCard }}
    </v-card-text>

    <v-card-actions v-if="buttonTitle && !buttonSlot" :class="buttonAlign">
      <v-btn
        class="px-10"
        :class="buttonClass"
        :size="buttonSize"
        :color="colorButton"
        variant="outlined"
        :append-icon="iconButton">
        {{ buttonTitle }}
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else-if="buttonTitle && buttonSlot" :class="buttonAlign">
      <slot />
    </v-card-actions>

    <!--  <v-btn
        class="px-10"
        :size="buttonSize"
        color="#FFC107"
        variant="outlined"
        :append-icon="iconButton">
        <v-card-text class="pa-0" :class="btnTextSize"> {{ buttonTitle }}</v-card-text>
      </v-btn> -->
    <!--  <v-card-actions v-if="enablseButtonSlot" :class="buttonAlign">
      <slot />
    </v-card-actions> -->
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    color: v-bind(colorTitle);
    font-size: v-bind(fontTitleSize);
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
