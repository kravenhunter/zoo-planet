<script setup lang="ts">
const extinction = [
  {
    sourceTitle: "/images/fighting_extinction_cover.jpg",
    title: "Fighting Extinction",
    description: `Zoos Victoria is committed to fighting wildlife extinction. For several species, our long-term commitment is their only hope of survival.`,
  },

  {
    sourceTitle: "/images/fighting_extinction_cover.jpg",
    title: "Our goal is to be the world's leading zoo-based conservation organisation.",
    description: `Zoos Victoria runs and delivers more captive breeding and recovery programs than any other institution within Australia. Our people are passionate and focused on the conservation of our wildlife for future generations.

Our Wildlife Conservation Master Plan 2019-2024 is dedicated to the recovery of 27 threatened native species, outlining the work and projects we will undertake to save these species from extinction and excite our communities to fight for a future rich in wildlife.`,
  },
  {
    sourceTitle: "/images/species.jpg",
    title: "Our 27 priority species",
    description: `Meet the native threatened species we're fighting to save from extinction`,
  },
  {
    sourceTitle: "",
    title: "How you can help",
    description:
      "We inspire communities to take action and help conserve wildlife and wild places. If we all make small changes, then collectively we can make a big difference. ",
  },
  {
    sourceTitle: "",
    title: "How we are leading conservation",
    description: `We are involved in conservation programs in six countries, eight grass-roots community conservation campaigns, and more than 50 research projects. Each project has been identified and developed to benefit both ecological communities and key species.`,
  },
  {
    sourceTitle: "",
    title: "How we are supporting wildlife rescue and response",
    description:
      "We're fighting for all our furry, scaly and feathered friends that are facing extinction. This work can't and won't stop, and we need your support.",
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
  <section class="extinction">
    <article class="card">
      <CardItem
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="extinction[0].sourceTitle"
        :image-title="extinction[0].title"
        :text-card="extinction[0].description"
        text-align="text-center text-h6"
        title-align="text-center pb-10"
        font-title-size="2rem" />

      <article class="card_list">
        <CardItem
          class="fighting"
          colorbg="#f2f2f2"
          :text-card="extinction[0].description"
          text-align="text-center text-h6"
          font-title-size="2rem" />
        <div class="goal">
          <CardItem
            class="goal_title"
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="extinction[1].title"
            title-align="text-center"
            font-title-size="1.6rem" />
          <CardItem class="goal_image" :image-source="extinction[1].sourceTitle" />
          <CardItem class="goal_text" colorbg="#f2f2f2" :text-card="extinction[1].description" />
        </div>
        <div class="species">
          <CardItem
            colorbg="#07060b"
            color-title="#fbb03b"
            title-align="text-center"
            text-align="text-center"
            :title-card="extinction[2].title"
            :text-card="extinction[2].description"
            font-title-size="2rem" />
          <NuxtLink to="/info/species">
            <CardItem :image-source="extinction[2].sourceTitle" />
          </NuxtLink>
        </div>
        <div class="help">
          <CardItem
            class="help_title"
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="extinction[3].title"
            :text-card="extinction[3].description"
            title-align="text-center"
            text-align="text-center"
            font-title-size="1.6rem" />
          <CardItem class="help_image_main" :image-source="extinction[1].sourceTitle" />
          <CardItem class="help_image_second" :image-source="extinction[1].sourceTitle" />
          <CardItem class="help_image_third" :image-source="extinction[1].sourceTitle" />
        </div>
        <div class="conservation">
          <div class="conservation_list">
            <CardItem
              class="conservation_list_title"
              colorbg="#07060b"
              color-title="#fbb03b"
              title-align="text-center"
              text-align="text-center"
              :title-card="extinction[4].title"
              :text-card="extinction[4].description"
              font-title-size="2rem" />
            <CardItem v-for="n in 2" :key="n" :image-source="extinction[1].sourceTitle" />
            <div class="group">
              <CardItem v-for="n in 4" :key="n" :image-source="extinction[1].sourceTitle" />
            </div>
          </div>
        </div>
        <div class="who_we_are">
          <div class="who_we_are_list">
            <CardItem
              colorbg="#f2f2f2"
              color-title="#395A03"
              title-align="text-center"
              text-align="text-center"
              :title-card="extinction[5].title"
              :text-card="extinction[5].description"
              font-title-size="2rem" />
            <div class="first_list">
              <CardItem
                class="item"
                v-for="(el, i) in communityLinks.slice(0, 2)"
                :key="i"
                :image-source="el.sourceTitle"
                :image-title="el.title" />
            </div>
            <div class="second_list">
              <CardItem
                class="item"
                v-for="(el, i) in communityLinks.slice(2, 5)"
                :key="i"
                :image-source="el.sourceTitle"
                :image-title="el.title" />
            </div>
          </div>
        </div>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">
.extinction {
  height: 100%;
  background-color: var(--color-grey);
}

.card {
  display: grid;
  background-color: var(--color-grey);

  /*   display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  font-size: 1rem;
  gap: 15px; */
  &_main {
    max-height: 50vh;
  }

  &_list {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.5fr 2fr 0.5fr;
    row-gap: 50px;
    & .fighting {
      max-width: 1500px;
      grid-column: 2;
      padding: 50px 0;
    }

    & .goal {
      max-width: 1500px;
      grid-column: 2;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      &_title {
        grid-column: span 2;
      }
    }
    & .species {
      padding: 50px 0;
      background-color: #07060b;

      grid-column: span 3;
      display: grid;
      justify-content: center;
    }
    & .help {
      max-width: 1500px;
      grid-column: 2;

      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;

      &_title {
        grid-column: span 3;
      }
      &_image_main {
        grid-column: span 2;
        grid-row: span 2;
      }
      &_image_second {
        grid-column: 3;
        grid-row: 2;
      }
      &_image_third {
        grid-column: 3;
        grid-row: 3;
      }
    }
    & .conservation {
      padding: 50px 0;
      background-color: #07060b;
      grid-column: span 3;
      display: grid;

      justify-content: center;

      &_list {
        max-width: 1500px;
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(2, minmax(auto, 500px));

        gap: 15px;
        &_title {
          grid-column: span 2;
        }
        & .group {
          grid-column: span 2;
          display: grid;
          grid-template-columns: repeat(4, auto);
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
    & .our_vision {
      max-width: 1500px;
      grid-column: 2;
      padding: 50px 0;
    }
  }
}
</style>
