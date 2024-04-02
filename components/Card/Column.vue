<script setup lang="ts">
defineProps({
  maxWidthCard: String,
  maxHeightCard: String,
  widthCard: String,
  heigthCard: String,
  classCard: String,
  enableCardSlot: Boolean,
  classTitle: String,
  classTextBlock: String,
  classText: String,
  titleCard: String,
  subtitleCard: String,
  classSubtitle: String,
  textCard: String,
  textHtmlCard: String,
  textBlockSize: {
    type: String,
    default: "100%",
  },
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
});
</script>

<template>
  <v-card
    v-if="!enableCardSlot"
    :class="classCard"
    :color="colorbg"
    :elevation="shadowCard"
    :max-height="maxHeightCard"
    :max-width="maxWidthCard">
    <v-row>
      <v-col class="d-flex flex-column">
        <v-img
          v-if="imageSource"
          :src="imageSource"
          :alt="titleCard"
          :class="imageClass"
          class="nuxt_img"
          :width="imageWidth"
          :height="imageHeigth"
          :title="titleCard">
          <template #sources>
            <source :srcset="imageSource" />
          </template>
        </v-img>
        <!-- <nuxt-img
          v-if="imageSource"
          format="webp"
          :width="imageWidth"
          :height="imageHeigth"
          :src="`/${imageSource}`"
          :alt="titleCard"
          :title="titleCard"
          :class="imageClass"
          class="nuxt_img">
        </nuxt-img> -->
        <v-card-title v-if="titleCard" :class="classTitle">{{ titleCard }}</v-card-title>
        <v-card-subtitle v-if="subtitleCard" :class="classSubtitle">
          {{ subtitleCard }}
        </v-card-subtitle>
        <div v-if="textCard" :class="classTextBlock" class="text_block">
          <v-card-text :class="classText">{{ textCard }}</v-card-text>
        </div>
        <div v-if="textHtmlCard" :class="classTextBlock">
          <v-card-text :class="classText" v-html="textHtmlCard"></v-card-text>
        </div>
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
  <v-card
    v-else
    :class="classCard"
    :color="colorbg"
    :elevation="shadowCard"
    :width="widthCard"
    :height="heigthCard"
    :max-height="maxHeightCard"
    :max-width="maxWidthCard">
    <slot />
  </v-card>
</template>

<style>
.headers_class {
  font-family: gothic;
  color: #1b5e20;
}
.paragraph_class {
  color: #07060b;
}
</style>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    font-size: v-bind(fontTitleSize);
    @media (max-width: 1280px) {
      font-size: 1.6rem;
    }
    @media (max-width: 1000px) {
      font-size: 1.7rem;
    }
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
  &-text {
    line-height: 2;
    font-size: 16px;
  }
}
.text_block {
  height: v-bind(textBlockSize);
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
