<script setup lang="ts">
import { ref, useRoute } from "#imports";
import type { ContentPages } from "@prisma/client";

const props = defineProps<{
  aboutUs: ContentPages[];
}>();
const route = useRoute();

const about = ref<ContentPages>();
const sponsor = ref<ContentPages>();
const career = ref<ContentPages>();
const education = ref<ContentPages>();
const volunteer = ref<ContentPages>();

about.value = props.aboutUs?.find((el) => el.subTitle === "AboutUs");
sponsor.value = props.aboutUs?.find((el) => el.subTitle === "Sponsors");
career.value = props.aboutUs?.find((el) => el.subTitle === "Careers");
education.value = props.aboutUs?.find((el) => el.subTitle === "Education");
volunteer.value = props.aboutUs?.find((el) => el.subTitle === "Volunteer");
if (route.params.id === "about") {
  console.log(props.aboutUs);
}
</script>

<template>
  <section class="about" v-if="aboutUs">
    <article class="card">
      <CardColumn :enable-card-slot="true">
        <v-img
          :src="aboutUs[0].imageBgLink"
          class="align-end"
          :max-height="600"
          :aspect-ratio="16 / 9"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          cover>
          <template #sources>
            <source :srcset="aboutUs[0].imageBgLink" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="aboutUs[0].title"></v-card-title>
        </v-img>
      </CardColumn>

      <article class="card_list">
        <div class="saving_wildlife">
          <CardColumn :text-html-card="aboutUs[0].description" />
        </div>

        <div class="who_we_are">
          <ProgramsBlock
            :programs-list="aboutUs.slice(1, 6)"
            title="Who we are"
            title-class="text-amber-darken-2 text center"
            text="Learn more about the Zoos Victoria community."
            text-class="text-center" />
        </div>
        <div class="our_vision">
          <CardColumn v-if="about?.extraeDscription" :text-html-card="about.extraeDscription" />
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
