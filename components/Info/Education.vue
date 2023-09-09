<script setup lang="ts">
const carousel = [
  {
    sourceTitle: "/images/career.jpg",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_1.jpg",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_3.jpg",
    title: "",
    description: ``,
  },
  {
    sourceTitle: "/images/education_2.jpg",
    title: "",
    description: ``,
  },
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
];
const education = [
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
</script>

<template>
  <section class="extinction">
    <article class="carousel">
      <CardItem
        class="title"
        text-align="text-center"
        title-card="Explore education at Zoos Victoria"
        font-title-size="2rem" />
      <v-carousel hide-delimiters class="card_main" cycle height="800" :show-arrows="false">
        <v-carousel-item v-for="(slide, i) in carousel" :key="i">
          <v-img :src="slide.sourceTitle" cover class="align-end text-white"> </v-img>
        </v-carousel-item>
      </v-carousel>
    </article>
    <article class="description">
      <v-container>
        <CardItem
          color-title="white"
          :text-card="education[0].description"
          text-align="text-center text-subtitle-1 "
          :shadow-card="2" />
      </v-container>
    </article>
    <article class="conservation">
      <v-container>
        <div class="conservation_list">
          <CardItem
            class="conservation_list_title"
            colorbg="#07060b"
            color-title="#fbb03b"
            title-align="text-center"
            text-align="text-center"
            :title-card="education[1].title"
            :text-card="education[1].description"
            font-title-size="2rem" />

          <CardItem class="main" :image-source="communityLinks[0].sourceTitle" />
          <div class="second_group">
            <CardItem
              v-for="(el, i) in communityLinks.slice(1, 4)"
              :key="i"
              :image-source="el.sourceTitle" />
          </div>
          <div class="third_group">
            <CardItem
              v-for="(el, i) in communityLinks.slice(4, 6)"
              :key="i"
              :image-source="el.sourceTitle" />
          </div>
        </div>
      </v-container>
    </article>

    <article class="who_we_are">
      <v-container>
        <div class="who_we_are_list">
          <CardItem
            colorbg="#f2f2f2"
            color-title="#395A03"
            title-align="text-center"
            text-align="text-center"
            :title-card="education[2].title"
            :text-card="education[2].description"
            font-title-size="2rem" />
          <div class="first_list">
            <CardItem
              class="item"
              v-for="(el, i) in communityLinks.slice(9, 11)"
              :key="i"
              :image-source="el.sourceTitle"
              :image-title="el.title"
              image-heigth="100%" />
          </div>
          <div class="second_list">
            <CardItem
              class="item"
              v-for="(el, i) in communityLinks.slice(9, 12)"
              :key="i"
              :image-source="el.sourceTitle"
              :image-title="el.title" />
          </div>
        </div>
      </v-container>
    </article>
    <article class="plan">
      <v-container>
        <CardItem
          colorbg="#f4f1e7"
          :inline="true"
          color-title="#395A03"
          :image-source="communityLinks[3].sourceTitle"
          :title-card="education[3].title"
          :subtitle-card="education[3].description"
          class-content="d-flex flex-column align-self-center "
          image-heigth="100%"
          image-width="50%">
          <v-btn
            class="px-10 mx-auto text-subtitle-1 font-weight-bold"
            color="#395A03"
            router
            to="/info/plain"
            variant="flat"
            size="x-large">
            <span>Find out</span>
            <v-icon :size="25" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
          </v-btn>
        </CardItem>
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
      bottom: 40px;
      z-index: 15;
    }
  }
  & .description {
    background-color: #004c67;
    padding: 50px 0;
  }
  & .conservation {
    padding: 50px 0;
    background-color: #07060b;

    &_list {
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

    &_list {
      display: grid;
      /*  grid-template-columns: repeat(auto-fit, minmax(auto, 500px)); */
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
    /*   background: #f4f1e7; */
    background: #395a03;
    grid-column: span 3;
    grid-row: 2;
    /*     justify-content: center; */
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
      /*  grid-template-columns: repeat(auto-fit, minmax(auto, 500px)); */
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
