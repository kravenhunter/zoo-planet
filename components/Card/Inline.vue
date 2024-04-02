<script setup lang="ts">
defineProps({
  maxWidthCard: String,
  widthCard: String,
  heightCard: String,
  classCard: String,
  classTitle: String,
  classText: String,
  titleCard: String,
  subtitleCard: String,
  textCard: String,
  shadowCard: {
    type: Number,
    default: 0,
  },

  imageClass: String,
  imageSource: String,
  imageHeigth: String,
  imageWidth: String,

  icon: String,

  buttonSlot: {
    type: Boolean,
    default: false,
  },
  buttonClass: String,
  buttonSize: String,
  buttonParams: String,
  buttonTitle: String,
  enableButton: {
    type: Boolean,
    default: true,
  },
  buttonPosition: {
    type: String,
    default: "justify-end",
  },
  fontTitleSize: {
    type: String,
    default: "1.2rem",
  },
  colorbg: {
    type: String,
    default: "transparent",
  },
  imageColsSize: String,
  contentColsSieze: String,

  fontamaly: {
    type: String,
    default: "gothic",
  },
});
</script>

<template>
  <v-card :class="classCard" :height="heightCard" :elevation="shadowCard" :max-width="maxWidthCard">
    <v-row>
      <v-col :cols="imageColsSize">
        <v-img
          format="webp"
          :width="imageWidth"
          :height="imageHeigth"
          :src="imageSource"
          :alt="titleCard"
          :title="titleCard"
          :class="imageClass"
          fit="fill"
          class="nuxt_img">
        </v-img>
      </v-col>
      <v-col v-if="titleCard || textCard" class="d-flex flex-column" :cols="contentColsSieze">
        <v-card-title :class="classTitle">{{ titleCard }}</v-card-title>
        <v-card-text :class="classText">{{ textCard }}</v-card-text>
        <div v-if="enableButton">
          <div v-if="!buttonSlot" class="d-flex" :class="buttonPosition">
            <v-btn
              :title="buttonTitle"
              :class="buttonClass"
              variant="flat"
              :size="buttonSize"
              :append-icon="icon"
              :to="buttonParams">
              {{ buttonTitle }}
            </v-btn>
          </div>
          <div v-if="buttonSlot" class="d-flex" :class="buttonPosition">
            <slot />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: v-bind(fontamaly);
    font-size: v-bind(fontTitleSize);
  }
  &-text {
    font-size: 18px;
    line-height: 2;
  }
}
</style>
