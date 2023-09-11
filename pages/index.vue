<script setup lang="ts">
import type { ITest } from "types/ITest";

const val: ITest = {};

const data = [
  {
    title: "Our animals",
    subtitle: "",
    text: "All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability.",
  },
  {
    title: "latest news",
    subtitle: "",
    text: "All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability.",
  },
];
const education = [
  {
    source: "",
    title: "education",
    subtitle: "",
    text: `The Fighting Extinction Schools Program engages students and teachers in real-world learning for wildlife. Become a Fighting Extinction School by completing a curriculum-linked sequence of learning with your students and sharing with Zoos Victoria online. Create your own Fighting Extinction Schools journey by choosing one, or all the opportunities below including; school excursions, digital programs, education resources, teacher professional development, and more.`,
  },
  {
    source: "/images/our_programs.jpg",
    title: "educaour programstion",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/tranings.jpg",
    title: "tranings & courses",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/comunity.jpg",
    title: "comunity education",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/development.jpg",
    title: "profeccional development",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/learning.jpg",
    title: "digital learning",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/science.jpg",
    title: "institute of science",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/rino.jpg",
    title: "A baby rino arrived an our  Zoo",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/monkey.jpg",
    title: "insight into the wild day-today life of the zoo planet in the ... ",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
  {
    source: "/images/dolphins.jpg",
    title: "swim with our friends dolphins",
    subtitle: "",
    text: "Get the most up-to-date information and strategies for teaching real-world content that you can use straight away. Available exclusively for Zoos Victoria Teacher Members.",
  },
];
const conversationIcons = [
  {
    iconName: "majesticons:earth-sphere",
    title: "Act for the Wild",
  },
  {
    iconName: "game-icons:materials-science",
    title: "Science & Recourch",
  },
  {
    iconName: "mdi:environment",
    title: "Wild Life conversation",
  },
  {
    iconName: "streamline:natrue-ecology-recycle-1-sign-environment-protect-save-arrows",
    title: "Environmental Sustainbility",
  },
  {
    iconName: "game-icons:night-vision",
    title: "Our Vision",
  },
];

val.body = "aewferf";
</script>

<template>
  <div class="body">
    <section class="offer">
      <Image source="/images/citten_bg.jpg" class="image_offer">
        <article class="offer_block">
          <Card class="align-self-center" :enable-slot="true">
            <h1 class="text-center text-white">
              JORNEY THOUGH A <br />
              WORLD OF WILDLIFE
            </h1>
            <v-row no-gutters class="justify-space-between">
              <!--               <v-btn class="px-10 text-h5" :height="74" color="#FFC107" variant="outlined">
                <span> Plan your visit </span>
                <v-icon :size="30" class="ml-2">mdi-paw</v-icon>
              </v-btn> -->
              <v-btn
                class="px-10 text-h5"
                color="#ffc107"
                variant="outlined"
                :height="74"
                append-icon="mdi-paw">
                Plan your visit
              </v-btn>
              <v-item-group class="align-self-end">
                <v-item v-for="n in 4" :key="n">
                  <v-btn color="#395A03" height="40" variant="flat" width="40">0{{ n }}</v-btn>
                </v-item>
              </v-item-group>
            </v-row>
          </Card>

          <article class="offer_discover">
            <v-card color="transparent">
              <div class="panda_card">
                <v-avatar class="ma-3 panda_img" size="181" rounded="50">
                  <v-img src="/images/panda.jpg" cover></v-img>
                </v-avatar>
                <div class="panda_hourse">
                  <div class="clock">
                    <UiElementsIcons
                      icon-name="svg-spinners:clock"
                      color-icon="white"
                      size-width="50"
                      size-heigth="50" />
                  </div>

                  <div class="hourse_deescription">
                    <h6>TODAY’S ZOO HOURS</h6>

                    <p class="font-weight-medium">9:30am - 5:30pm</p>
                  </div>
                </div>
              </div>
            </v-card>

            <v-row class="ml-5 whats_on">
              <div class="rabbit_block" v-for="n in 2" :key="n">
                <div class="rabbit">
                  <v-avatar class="mx-3 mb-4" size="50" rounded="0">
                    <v-img src="/images/rabbit_in_hat.svg"></v-img>
                  </v-avatar>
                </div>

                <div class="description">
                  <h6>What’s On</h6>
                  <p class="font-weight-medium">Decover the animals of Zoo Planet</p>
                </div>
              </div>
            </v-row>
          </article>
        </article>
      </Image>
    </section>
    <!--     <section class="galary_wrapper">
      <v-img src="images/parrot_bg.jpg" alt="parrot_bg">
        <div class="galary_block">
          <div class="galary_list first_grid">
            <Card
              class="align-self-start description"
              :title-card="data[0].title"
              :text-card="data[0].text"
              button-title="See all animals"
              icon="mdi-paw"
              :enablse-button-slot="true">
              <v-btn
                class="px-10 text-subtitle-1"
                :height="57"
                color="#FFC107"
                variant="outlined"
                append-icon="mdi-paw">
                See all animals
              </v-btn>
            </Card>

            <v-img class="parrot" src="images/parrot_galary.jpg" cover alt="parrot" />
            <v-img class="lynx" src="images/lynx_galary.jpg" cover alt="lynx" />
            <v-img class="opossums" src="images/animal1.jpg" cover alt="opossums" />
          </div>

          <div class="galary_list first_grid">
            <v-img class="red_bear" src="images/red_bear.jpg" cover alt="red_bear" />
            <v-img class="coala" src="images/coala.jpg" cover alt="coala" />
            <v-img class="bober" src="images/bober.jpg" cover alt="bober" />
          </div>
        </div>
      </v-img>
    </section> -->
    <section class="galary_wrapper">
      <v-img src="/images/parrot_bg.jpg" alt="parrot_bg">
        <div class="galary">
          <article class="galary_first">
            <CardItem
              class="main"
              title-card="Australian beaches"
              text-card=" All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability."
              button-title="See all animals"
              :button-slot="true">
              <v-btn
                class="px-10 py- 10 text-subtitle-1"
                color="#ffc107"
                variant="outlined"
                size="large"
                append-icon="mdi-paw">
                <span>See all animals</span>
              </v-btn>
            </CardItem>
            <CardItem image-source="/images/parrot_galary.jpg" class="parrot" image-heigth="100%" />
            <CardItem image-source="/images/lynx_galary.jpg" class="lynx" />
            <CardItem image-source="/images/animal1.jpg" class="opossums" />
          </article>
          <article class="galary_second">
            <CardItem class="red_bear" image-source="/images/red_bear.jpg" />
            <CardItem class="coala" image-source="/images/coala.jpg" />
            <CardItem class="bober" image-source="/images/bober.jpg" />
          </article>
        </div>
      </v-img>
    </section>
    <section class="education_wrapper">
      <div class="education_block">
        <article class="title_block">
          <!--           <Card
            class="align-self-center description"
            title-align="center"
            text-align="center"
            :title-card="education[0].title"
            :text-card="education[0].text" /> -->

          <CardItem
            class="description"
            :title-card="education[0].title"
            :text-card="education[0].text"
            title-align="text-center"
            text-align="text-center" />
        </article>
        <article class="articles_block">
          <CardItem
            v-for="(item, i) in education.slice(1, 7)"
            :key="i"
            class="description"
            color-title="#395A03"
            :image-source="item.source"
            :title-card="item.title"
            :text-card="item.text"
            :button-slot="true"
            button-title="Learn more">
            <v-btn
              class="px-10 text-subtitle-1"
              color="#ffc107"
              size="x-large"
              append-icon="mdi-paw">
              <span>Learn more</span>
            </v-btn>
          </CardItem>
          <!--   <Card
            v-for="(item, i) in education.slice(1, 7)"
            :key="i"
            class="align-self-center description"
            color-title="#395A03"
            :image-source="item.source"
            :title-card="item.title"
            :text-card="item.text"
            :enablse-button-slot="true">
            <v-btn class="px-10 text-subtitle-1" color="#ffc107" :height="57" append-icon="mdi-paw">
              <span>Learn more</span>
            </v-btn>
          </Card> -->
        </article>
      </div>
    </section>
    <section class="conversation_wrapper">
      <v-img class="lynx_bg" src="images/lynx_bg.jpg" cover alt=" lynx_bg">
        <article class="conversation">
          <div class="conversation_title">
            <!--   <Card
              class="align-self-center description"
              title-align="center"
              text-align="center" 
              :title-card="education[0].title"
              :text-card="education[0].text" /> -->

            <CardItem
              class="description"
              :title-card="education[0].title"
              :text-card="education[0].text"
              title-align="text-center"
              text-align="text-center" />
          </div>
          <div class="conversation_icons">
            <div class="conversation_icon" v-for="(icon, i) in conversationIcons" :key="i">
              <v-avatar class="ma-3" size="104" rounded="50">
                <UiElementsIcons
                  :icon-name="icon.iconName"
                  color-icon="#FBB03B"
                  size-width="50"
                  size-heigth="50" />
              </v-avatar>
              <span>{{ icon.title }}</span>
            </div>
          </div>
        </article>
      </v-img>
    </section>
    <section class="last_news education_wrapper">
      <div class="education_block">
        <article class="title_block">
          <CardItem
            class="description"
            :title-card="data[1].title"
            :text-card="data[1].text"
            title-align="text-center"
            text-align="text-center" />
        </article>
        <article class="articles_block">
          <CardItem
            v-for="(item, i) in education.slice(7, 10)"
            :key="i"
            class="description"
            color-title="#395A03"
            :image-source="item.source"
            :title-card="item.title"
            :text-card="item.text"
            :button-slot="true"
            button-title="Learn more">
            <v-btn
              class="px-10 text-subtitle-1"
              color="#ffc107"
              size="x-large"
              append-icon="mdi-paw">
              <span>Learn more</span>
            </v-btn>
          </CardItem>

          <!--    <Card
            v-for="(item, i) in education.slice(7, 10)"
            :key="i"
            class="align-self-center description"
            color-title="#395A03"
            :image-source="item.source"
            :title-card="item.title"
            :text-card="item.text"
            :enablse-button-slot="true">
            <v-btn class="px-10 text-subtitle-1" color="#ffc107" :height="57" append-icon="mdi-paw">
              <span>Learn more</span>
            </v-btn>
          </Card> -->
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.conversation {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(auto, 1426px));
  justify-content: center;
  justify-items: center;
  align-content: center;
  gap: 15px;
  &_icons {
    display: flex;

    gap: 100px;
  }
  &_icon {
    display: grid;
    justify-items: center;
    & span {
      display: block;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}
.education_wrapper {
  background-color: var(--color-grey);
  color: #07060b;
  padding: 50px 0px;
  & .education_block {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 422px));
    justify-content: center;
    align-content: center;
    gap: 15px;
    & .title_block {
      grid-column: span 3;
      grid-row: 1;
    }
    & .articles_block {
      grid-column: span 3;
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 15px;
      & .v-btn {
        border: 2px solid #ffc107;
      }
      & span {
        color: #395a03;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
}
.grid_list {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-rows: 250px;
  gap: 15px;
  & .description {
    grid-column: span 2;
    grid-row: 1;
  }
  & .parrot {
    grid-column: 1;
    grid-row: span 2;
  }
  & .lynx {
    grid-column: 2;
    grid-row: 2;
  }
  & .opossums {
    grid-column: 2;
    grid-row: 3;
  }
  & .red_bear {
    grid-column: span 2;
    grid-row: span 2;
  }
  & .coala {
    grid-column: 1;
    grid-row: 3;
  }
  & .bober {
    grid-column: 2;
    grid-row: 3;
  }
}
.galary_wrapper {
  background-color: #07060b;
  & .galary {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, minmax(auto, 600px));
    justify-content: center;
    column-gap: 20px;
    & .galary_first {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      gap: 20px;

      & .main {
        grid-column: span 2;
      }
      & .parrot {
        grid-column: 1;
        grid-row: 2 / 4;
      }
      /*   & .lynx {
    grid-column: 2;
    grid-row: 2;
  }
  & .opossums {
    grid-column: 2;
    grid-row: 3;
  } */
    }
    & .galary_second {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      & .red_bear {
        grid-column: span 2;
      }
      /*   & .coala {
          grid-column: 1;
          grid-row: 3;
        }
        & .bober {
          grid-column: 2;
          grid-row: 3;
        } */
    }
  }
}

.offer_block {
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;

  & h1,
  h6 {
    font-family: gothic;
  }
  & h6 {
    color: #fbb03b;
  }
  & .offer_discover {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-content: start;
    align-items: center;
    & p {
      font-size: 1rem;
    }

    & .whats_on {
      height: 142px;
      display: grid;
      grid-template-columns: repeat(2, minmax(auto, 430px));
      column-gap: 5px;

      & .rabbit_block {
        display: flex;
        padding: 10px 40px 10px 10px;
        background-color: #ffffff;

        & p {
          color: black;
        }
        & .description {
          align-self: center;
        }
        & .rabbit {
          align-self: flex-end;
        }
      }
    }
    & .panda_card {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 2fr;
      align-content: start;
      align-items: center;
      & .panda_img {
        grid-column: 1 /3;
        grid-row: 1;
        z-index: 15;
      }

      & .panda_hourse {
        height: 142px;
        grid-column: 2 / -1;
        grid-row: 1;

        padding: 20px 10px 40px 100px;
        z-index: 1;
        background-color: #395a03;
        display: flex;

        & p {
          margin-left: 15px;
        }
        & .clock {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
