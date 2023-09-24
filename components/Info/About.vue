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
const aboutList = [
  {
    sourceTitle: "/images/about_us.jpg",
    title: "About Us",
    description: "",
  },
  {
    sourceTitle: "",
    title: "Saving wildlife is not what we do, it's who we are",
    description: `Zoos Victoria is a world-leading zoo-based conservation organisation, dedicated to fighting wildlife extinction.

Our four zoos are Healesville Sanctuary, Kyabram Fauna Park, Melbourne Zoo and Werribee Open Range Zoo. Each one provides a unique and immersive experience that attracts visitors from around the world.

Our zoos inspire animal lovers of all ages. And by strengthening the connection between people and wildlife, we hope to protect the future of animals and their homes.

Our important work includes breeding and recovery programs; we've built partnerships with local communities, fellow conservationists, and like-minded organisations — close to home and in far-flung corners of the world.`,
  },
  {
    sourceTitle: "",
    title: "Thank you",
    description: `We're a not-for-profit organisation, so every dollar counts. Each time you visit one of our zoos, donate, buy a memento from our shops, or share what you've discovered, you're helping us to protect wildlife. So, thank you.`,
  },
  {
    sourceTitle: "",
    title: "Who we are",
    description: `Learn more about the Zoos Victoria community.`,
  },

  {
    sourceTitle: "",
    title: "Our vision is to fight extinction to secure a future rich in wildlife.",
    description: "",
  },
  {
    sourceTitle: "",
    title: "Our mission",
    description: `As a world-leading zoo-based conservation organisation we will fight wildlife extinction through:

1. Innovative, scientifically sound breeding and recovery programs to support critically endangered Victorian, terrestrial, vertebrate species;
2. Partnering with the Victorian community to create the world’s most wildlife friendly society;
3. Providing profound zoo-based animal encounters to connect people with wildlife; and
4. Strong commercial approaches to secure financial sustainability.`,
  },
  {
    sourceTitle: "",
    title: "Our publications",
    description: `Zoos Victoria produces a number of publications that explain our priorities, programs and where we’re headed.

If you use assistive technology and need a version of one of these documents in a more accessible format, please email contact@zoo.org.au and let us know which format you require it in.`,
  },
];

const communityLinks = [
  {
    sourceTitle: "/images/sponsors.jpg",
    title: "Sponsores and partners",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/career.jpg",
    title: "Careers",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/volunteer.jpg",
    title: "Volunteer",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/governance.jpg",
    title: "Board, governance, policies &  procurement",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/contact_us.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
];
</script>

<template>
  <section class="about" v-if="aboutUs">
    <article class="card">
      <CardColumn heigth-card="450" :enable-card-slot="true">
        <v-img
          :src="aboutUs[0].imageBgLink"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          width="100%"
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
