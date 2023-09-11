<script setup lang="ts">
defineProps({
  classCard: String,
  classContent: String,
  buttonClass: String,
  subtitleCard: String,
  titleCard: String,
  textCard: String,
  imageSource: String,
  imageTitle: String,
  maxHeightCard: String,
  imageHeigth: String,
  imageWidth: String,
  icon: String,

  titleAlign: String,

  sunTitleAlign: String,

  textAlign: String,
  buttonTitle: String,
  btnTextSize: String,
  buttonSize: String,
  buttonAlign: String,

  iconButton: String,
  inline: Boolean,
  buttonSlot: Boolean,
  textSlot: Boolean,
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

  <v-card
    v-if="!inline"
    :color="colorbg"
    :elevation="shadowCard"
    :class="classCard"
    :max-height="maxHeightCard">
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

    <v-card-text v-if="textCard && !textSlot" :class="textAlign">
      {{ textCard }}
    </v-card-text>
    <v-card-text v-else-if="textCard && textSlot" :class="textAlign">
      <slot />
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
  </v-card>
  <v-card v-else :color="colorbg" :elevation="3">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card :color="colorbg" :elevation="0">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
                v-if="imageSource"
                :height="imageHeigth"
                :width="imageWidth"
                :src="imageSource"
                cover
                class="align-end text-white">
                <v-card-title v-if="imageTitle" :class="titleAlign">{{ imageTitle }}</v-card-title>
              </v-img>
              <div :class="classContent">
                <v-card-title v-if="titleCard" :class="titleAlign" class="text-h5">
                  {{ titleCard }}
                </v-card-title>
                <v-card-text v-if="subtitleCard" class="py-4" :class="sunTitleAlign">
                  {{ subtitleCard }}
                </v-card-text>

                <v-card-actions>
                  <slot />
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
