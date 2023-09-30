<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  education: ContentPages;
  programs: Post[];
}
const props = defineProps<Props>();

const carousel = [
  {
    sourceTitle: "/images/education_1.webp",
    title: "",
    description: ``,
  },

  {
    sourceTitle: "/images/education_2.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_3.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_4.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_5.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_6.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_7.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_8.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_9.webp",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_10.webp",
    title: "",
    description: ``,
  },
];

const educationText = [
  {
    sourceTitle: "",
    title: "",
    description: `The Fighting Extinction Schools Program engages students and teachers in real-world learning for wildlife. Become a Fighting Extinction School by completing a curriculum-linked sequence of learning with your students and sharing with Zoos Victoria online. Create your own Fighting Extinction Schools journey by choosing one, or all the opportunities below including; school excursions, digital programs, education resources, teacher professional development, and more.`,
  },
  {
    sourceTitle: "",
    title: "Fighting Extinction Schools Program",
    description: "Start here to create your own Fighting Extinction Schools journey.",
  },

  {
    sourceTitle: "",
    title: "Fighting Extinction Schools Community",
    description: "Get support and grow your network.",
  },
  {
    sourceTitle: "/images/comunity.jpg",
    title: "Plan your visit",
    description:
      "Prices and payment information, risk assessments, getting here, sensory maps, and more",
  },
];

const communityLinks = [
  {
    sourceTitle: "/images/volunteer_4.jpg",
    title: "Build Project",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/volunteer_3.jpg",
    title: "Careers",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/volunteer_2.jpg",
    title: "Volunteer",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/volunteer_1.jpg",
    title: "Board, governance, policies &  procurement",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/zoo_4.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/zoo_2.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/zoo_1.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/z00_3.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/unsplash_1z913JEirLU.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/unsplash_8uJ0Am-ZdTA.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/unsplash_T8sYhSINRyU.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/unsplash_T8sYhSINRyU-1.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
  {
    sourceTitle: "/images/unsplash_W0DhyRtHjIg.jpg",
    title: "Contact Us",
    description: `Learn more about the Zoos Victoria community.`,
  },
];
console.log(props.programs);
</script>

<template>
  <section class="extinction">
    <article class="carousel">
      <CardColumn
        class="title"
        class-title="text-amber-darken-2 text center"
        title-card="Explore education at Zoos Victoria"
        font-title-size="2.5rem"
        :enable-button="false" />
      <v-carousel hide-delimiters class="card_main" cycle height="100vh" :show-arrows="false">
        <v-carousel-item v-for="(slide, i) in carousel" :key="i">
          <v-img
            :src="slide.sourceTitle"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
            cover
            class="align-end text-white">
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </article>
    <article class="description">
      <v-container>
        <CardColumn
          v-if="education"
          :text-html-card="education.description"
          :enable-button="false" />
      </v-container>
    </article>
    <article class="conservation" v-if="programs.length">
      <v-container flued>
        <CardColumn
          title-card="Fighting Extinction Schools Program"
          class-title="text-amber-darken-2 text center"
          text-card="Start here to create your own Fighting Extinction Schools journey."
          class-text="text-center"
          font-title-size="2rem"
          :enable-button="false" />

        <div class="conservation_retrospective_one">
          <v-row align="start">
            <v-col cols="8">
              <CardColumn heigth-card="475" :enable-card-slot="true">
                <v-img
                  :src="programs[0].imagePreviewLink!"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                  :aspect-ratio="4 / 3"
                  cover>
                  <template #sources>
                    <source :srcset="programs[0].imagePreviewLink!" />
                  </template>
                  <h4 class="text-amber mb-10 ml-10" v-text="programs[0].title"></h4>
                </v-img>
              </CardColumn>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" v-for="el in programs.slice(1, 3)" :key="el.id">
                  <CardColumn v-if="programs.length" heigth-card="225" :enable-card-slot="true">
                    <v-img
                      :src="el.imagePreviewLink!"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                      :aspect-ratio="4 / 3"
                      cover>
                      <template #sources>
                        <source :srcset="el.imagePreviewLink!" />
                      </template>
                      <h4 class="text-amber mb-10 ml-10" v-text="el.title"></h4>
                    </v-img>
                  </CardColumn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="4" v-for="el in programs.slice(3, 6)" :key="el.id">
              <CardColumn v-if="programs.length" heigth-card="450" :enable-card-slot="true">
                <v-img
                  :src="el.imagePreviewLink!"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                  :aspect-ratio="4 / 3"
                  cover>
                  <template #sources>
                    <source :srcset="el.imagePreviewLink!" />
                  </template>
                  <h4 class="text-amber mb-10 ml-10" v-text="el.title"></h4>
                </v-img>
              </CardColumn>
            </v-col>
          </v-row>
        </div>
        <div class="conservation_retrospective_two">
          <v-row align="start">
            <v-col cols="12" v-for="el in programs.slice(3, 6)" :key="el.id">
              <NuxtLink :to="{ path: `/news/${el.id}` }">
                <CardColumn
                  v-if="programs.length"
                  heigth-card="100%"
                  max-height-card="475"
                  :enable-card-slot="true">
                  <v-img
                    :src="el.imagePreviewLink!"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                    cover>
                    <template #sources>
                      <source :srcset="el.imageBgLink!" />
                    </template>
                    <h4 class="text-amber mb-10 ml-10" v-text="el.title"></h4>
                  </v-img>
                </CardColumn>
              </NuxtLink>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </article>

    <article class="who_we_are" v-if="programs.length">
      <ProgramsBlock
        :programs-list="programs.slice(4, 9)"
        title="Fighting Extinction Schools Community"
        title-class="text-amber-darken-2 text center"
        text="Get support and grow your network."
        text-class="text-center text-black" />
    </article>
    <article class="plan">
      <v-container>
        <CardInline
          class="plan_card_inline"
          :shadow-card="3"
          max-width-card="1200px"
          class-card="bg-orange-lighten-5 pa-3"
          :title-card="educationText[3].title"
          class-title="text-green-darken-4 text-center"
          :text-card="educationText[3].description"
          class-text="text-center"
          :image-source="communityLinks[3].sourceTitle"
          image-width="650px"
          image-heigth="350px"
          image-cols-size="6"
          button-class="mb-10 px-10 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
          button-position="justify-center"
          button-size="large"
          button-title="Find out"
          button-params="/info/plain"
          icon="mdi-paw" />
        <v-sheet max-width="700px" class="plan_card_column mx-auto mb-5">
          <CardColumn
            :shadow-card="3"
            class-card="bg-orange-lighten-5 pa-3"
            :title-card="educationText[3].title"
            class-title="text-green-darken-4 text-center"
            :text-card="educationText[3].description"
            class-text="text-center"
            :image-source="communityLinks[3].sourceTitle"
            font-title-size="2rem"
            button-class="mb-10 px-10 text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
            button-position="justify-center"
            button-size="large"
            button-title="Find out"
            button-params="/info/plain"
            icon="mdi-paw" />
        </v-sheet>
      </v-container>
    </article>
    <article class="book">
      <v-container>
        <v-row class="py-16">
          <v-col cols="6">
            <CardItem
              color-title="white"
              title-card="Book your education experience"
              text-card="Fill out an online form to request a booking for your zoo education experience"
              font-title-size="1.5rem" />
            <v-btn
              class="px-10 ml-5 text-subtitle-1 font-weight-bold"
              color="grey-lighten-5"
              variant="flat"
              size="x-large">
              <span style="color: #004c67">Request booking</span>
              <v-icon :size="25" color="#004c67" class="ml-3 mb-1">mdi-paw</v-icon>
            </v-btn>
            <CardItem
              text-card="Email us here or call us on 1300 966 784 (please note we are experiencing a high volume of calls and emails right now)" />
          </v-col>
          <v-col cols="6">
            <CardItem
              color-title="white"
              text-card="You will need to know the following to book your zoo excursion or online workshop:" />
            <ul>
              <li>Education program of your choice (if applicable)</li>
              <li>Preferred date</li>
              <li>School name and address</li>
              <li>Contact details of organising teacher</li>
              <li>Number of students/classes and their year level</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
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
    font-size: 1.3rem;
  }
}
.extinction {
  height: 100%;
  background-color: var(--color-grey);

  & .carousel {
    height: 800px;
    position: relative;
    display: grid;
    & .title {
      justify-self: center;
      position: absolute;
      bottom: 100px;
      z-index: 15;
    }
  }
  @media (max-width: 1200px) {
    & .carousel {
      display: none;
    }
  }
  & .conservation_retrospective_one {
    display: block;
  }
  & .conservation_retrospective_two {
    display: none;
  }
  & .plan_card_inline {
    display: block;
  }
  & .plan_card_column {
    display: none;
  }
  @media (max-width: 1280px) {
    & .conservation_retrospective_one {
      display: none;
    }
    & .conservation_retrospective_two {
      display: block;
    }
    & .plan_card_inline {
      display: none;
    }
    & .plan_card_column {
      display: block;
    }
  }
  & .description {
    padding: 50px 0;
  }
  & .conservation {
    background-color: #07060b;
  }
  & .who_we_are {
  }
  & .plan {
    justify-self: center;
  }
  & .book {
    background-color: #004c67;
    & ul {
      margin-left: 30px;
      & li {
        font-size: 0.8rem;
        list-style: disc;
      }
    }
  }
}

.card {
  background-color: var(--color-grey);
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  row-gap: 50px;

  &_main {
    height: 800px;
    grid-column: span 3;
    grid-row: 1;
    position: relative;
    display: grid;
    & .title {
      justify-self: center;
      position: absolute;
      bottom: 40px;
      z-index: 15;
    }
  }
  &_description {
    background: #395a03;
    grid-column: span 3;
    grid-row: 2;
  }
  & .conservation {
    grid-column: span 3;
    grid-row: 3;
    padding: 50px 0;
    background-color: #07060b;

    display: grid;
    justify-content: center;

    &_list {
      max-width: 1500px;
      display: grid;
      justify-content: center;

      grid-template-columns: repeat(3, minmax(auto, 300px));
      grid-template-rows: repeat(4, minmax(auto, 200px));

      gap: 15px;
      &_title {
        grid-column: span 3;
        align-self: center;
      }

      & .main {
        grid-column: span 2;
        grid-row: span 2;
      }
      & .second_group {
        grid-column: 3;
        grid-row: span 3;
        display: grid;
        gap: 15px;
      }
      & .third_group {
        grid-column: span 2;

        display: grid;
        grid-template-columns: repeat(2, auto);

        gap: 15px;
      }
    }
  }
  & .who_we_are {
    padding: 50px 0px;
    grid-column: span 3;
    display: grid;

    justify-content: center;
    &_list {
      display: grid;
      grid-template-columns: repeat(1, minmax(auto, 1000px));
      gap: 20px;
      justify-content: center;
      & .first_list {
        display: grid;
        grid-template-columns: repeat(2, minmax(auto, 500px));
        gap: 20px;
      }
      & .second_list {
        display: grid;
        grid-template-columns: repeat(3, minmax(auto, 300px));
        justify-content: space-between;
      }
    }
  }
  & .plan {
    padding: 50px 0px;
    grid-column: 2;
    justify-self: center;
  }
  & .book {
    grid-column: span 3;
    background-color: #004c67;
    & ul {
      margin-left: 30px;
      & li {
        font-size: 0.8rem;
        list-style: disc;
      }
    }
  }
}
</style>
