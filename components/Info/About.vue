<script setup lang="ts">
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
  <section class="about">
    <article class="card">
      <CardItem
        class="card_main"
        :image-source="aboutList[0].sourceTitle"
        :image-title="aboutList[0].title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
      <article class="card_list">
        <div class="saving_wildlife">
          <CardItem
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="aboutList[1].title"
            :text-card="aboutList[1].description"
            title-align="text-center"
            font-title-size="2rem" />
          <CardItem
            colorbg="#f2f2f2"
            class="thank_you"
            color-title="#395A03"
            :title-card="aboutList[2].title"
            :text-card="aboutList[2].description"
            title-align="text-center"
            font-title-size="2rem" />
        </div>

        <div class="who_we_are">
          <CardItem
            colorbg="#07060b"
            color-title="#fbb03b"
            title-align="text-center"
            text-align="text-center"
            :title-card="aboutList[3].title"
            :text-card="aboutList[3].description"
            font-title-size="2rem" />

          <div class="who_we_are_list">
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
        <div class="our_vision">
          <CardItem
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="aboutList[4].title"
            :text-card="aboutList[4].description"
            title-align="text-center"
            font-title-size="1.8rem" />
          <CardItem
            class="our_mission"
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="aboutList[5].title"
            :text-card="aboutList[5].description"
            title-align="text-center"
            font-title-size="2rem" />

          <CardItem
            class="our_publications"
            colorbg="#f2f2f2"
            color-title="#395A03"
            :title-card="aboutList[6].title"
            :text-card="aboutList[6].description"
            title-align="text-center"
            font-title-size="2rem" />
        </div>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">
.about_wrapper {
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
    & .saving_wildlife {
      max-width: 1500px;
      grid-column: 2;
      padding: 50px 0;
    }
    /*     & .thank_you {
      max-width: 1500px;
      grid-column: 2;
    } */
    & .who_we_are {
      background-color: #07060b;
      padding: 50px 0px;
      grid-column: span 3;
      &_list {
        display: grid;
        /*  grid-template-columns: repeat(auto-fit, minmax(auto, 500px)); */
        gap: 20px;
        justify-items: center;
        & .first_list {
          display: grid;
          grid-template-columns: repeat(2, minmax(auto, 500px));
          gap: 20px;
        }
        & .second_list {
          display: grid;
          grid-template-columns: repeat(3, minmax(auto, 300px));
          gap: 20px;
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
