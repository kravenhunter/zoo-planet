<script setup lang="ts">
import type { IContentPage } from "~/types";

const props = defineProps<{
  aboutUs: IContentPage;
  aboutPages?: IContentPage[];
}>();

const about = props.aboutPages?.find((el) => el.subTitle === "aboutPages");
const sponsor = props.aboutPages?.find((el) => el.subTitle === "sponsors");
const career = props.aboutPages?.find((el) => el.subTitle === "careers");
const education = props.aboutPages?.find((el) => el.subTitle === "education");
const volunteer = props.aboutPages?.find((el) => el.subTitle === "volunteer");

// about.value = props.aboutUs?.find((el) => el.subTitle === "aboutus");
// sponsor.value = props.aboutUs?.find((el) => el.subTitle === "sponsors");
// career.value = props.aboutUs?.find((el) => el.subTitle === "careers");
// education.value = props.aboutUs?.find((el) => el.subTitle === "education");
// volunteer.value = props.aboutUs?.find((el) => el.subTitle === "volunteer");
</script>

<template>
  <section v-if="aboutUs" class="about">
    <article class="card">
      <CardColumn :enable-card-slot="true">
        <v-img
          :alt="aboutUs.title"
          :src="`/${aboutUs.imageBgLink}`"
          class="align-end"
          :max-height="600"
          :aspect-ratio="16 / 9"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          cover>
          <template #sources>
            <source :srcset="`/${aboutUs.imageBgLink}`" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="aboutUs.title"></v-card-title>
        </v-img>
      </CardColumn>

      <article class="card_list">
        <div class="saving_wildlife">
          <CardColumn :text-html-card="aboutUs.description" />
        </div>

        <div v-if="aboutPages?.length" class="who_we_are">
          <ProgramsBlock
            :programs-list="aboutPages.slice(0, 5)"
            title="Who we are"
            title-class="text-amber-darken-2 text center"
            text="Learn more about the Zoos Victoria community."
            text-class="text-center" />
        </div>
        <div class="our_vision">
          <CardColumn v-if="aboutUs?.extraeDscription" :text-html-card="aboutUs.extraeDscription" />
        </div>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    font-size: 2.5rem;
  }
  & h4 {
    font-family: gothic;
    font-size: 1.5rem;
  }
}
.about_wrapper {
  height: 100%;
  background-color: var(--color-grey);
}
.card {
  display: grid;
  background-color: var(--color-grey);

  &_list {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.5fr 2fr 0.5fr;

    & .saving_wildlife {
      max-width: 1500px;
      grid-column: 2;
    }
    & .whoes {
      background-color: #07060b;
    }
    & .who_we_are {
      background-color: #07060b;

      grid-column: span 3;
    }
    & .our_vision {
      max-width: 1500px;
      grid-column: 2;
      padding: 50px 0;
    }
  }
}
</style>
