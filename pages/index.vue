<script setup lang="ts">
import { ref } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { ContentPages, Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const { postlist, specieList, mainPages, contactPage, membershipTable, ticketTable } = storeToRefs(
  useUnionStore(),
);

// Education Data
const educationMain = ref<ContentPages>();
const educationNews = ref<Post[]>();
educationMain.value = mainPages.value?.find((el) => el.subTitle === "Education");
educationNews.value = postlist.value?.filter((el) => el.category === "Education");

// News Data
const newsMain = ref<ContentPages>();
const lastNews = ref<Post[]>();
newsMain.value = mainPages.value?.find((el) => el.subTitle === "News");
lastNews.value = postlist.value?.filter((el) => el.category === "News");

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

const bgImages = [
  {
    id: 1,
    title: "headet main",
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/citten_bg.webp",
  },
  {
    id: 2,
    title: "animals bg",

    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/parrot_bg.webp",
  },
  {
    title: "lynx",
    id: 3,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/LYNX.webp",
  },
  {
    title: "parrot",
    id: 4,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/perrot1.webp",
  },
  {
    title: "coala",
    id: 5,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/coala1.webp",
  },

  {
    title: "panda",
    id: 6,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/panda1.webp",
  },
  {
    title: "opossums",
    id: 7,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/opossums1.webp",
  },
  {
    title: "bobers",
    id: 8,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/bobera.webp",
  },
  {
    title: "red bear",
    id: 9,
    imageBgLink:
      "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/cover/red_bear2.webp",
  },
];
</script>

<template>
  <div class="body">
    <section class="offer">
      <CardColumn :enable-card-slot="true">
        <v-img
          :src="bgImages[0].imageBgLink"
          max-height="100vh"
          :aspect-ratio="16 / 9"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
          cover>
          <template #sources>
            <source :srcset="bgImages[0].imageBgLink" />
          </template>
          <article class="offer_block">
            <Card class="align-self-center" :enable-slot="true">
              <h1 class="text-center text-white">
                JORNEY THOUGH A <br />
                WORLD OF WILDLIFE
              </h1>

              <div class="pain_your_visit">
                <v-btn
                  class="px-10 text-h5"
                  color="#ffc107"
                  variant="outlined"
                  :height="74"
                  append-icon="mdi-paw">
                  Plan your visit
                </v-btn>
                <v-item-group class="pagination align-self-end">
                  <v-item v-for="n in 4" :key="n">
                    <v-btn color="#395A03" height="40" variant="flat" width="40">0{{ n }}</v-btn>
                  </v-item>
                </v-item-group>
              </div>
            </Card>
            <article class="offer_test d-flex">
              <v-row class="justify-center">
                <v-col cols="12" lg="5" md="12" class="d-flex justify-center">
                  <v-card color="transparent" max-width="533">
                    <div class="panda_card">
                      <v-avatar class="ma-3 panda_img" size="181" rounded="50">
                        <v-img
                          :src="bgImages[5].imageBgLink"
                          :alt="bgImages[5].title"
                          cover></v-img>
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

                          <p class="text-subtitle-1 font-weight-medium">9:30am - 5:30pm</p>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>

                <v-col
                  cols="12"
                  lg="3"
                  md="12"
                  v-for="n in 2"
                  :key="n"
                  class="d-flex align-center justify-center">
                  <div class="rabbit_block">
                    <div class="rabbit">
                      <v-avatar class="mx-3 mb-4" size="50" rounded="0">
                        <v-img src="/images/rabbit_in_hat.svg"></v-img>
                      </v-avatar>
                    </div>

                    <div class="description">
                      <h6>What’s On</h6>
                      <p class="text-subtitle-1 font-weight-medium">
                        Decover the animals of Zoo Planet
                      </p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </article>
          </article>
        </v-img>
      </CardColumn>
    </section>

    <section class="galary_wrapper">
      <v-img :src="bgImages[1].imageBgLink" :alt="bgImages[1].title">
        <div class="galary">
          <article class="galary_first">
            <CardItem
              class="main"
              title-card="Our animals"
              text-card=" All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability."
              button-title="See all animals"
              :button-slot="true">
              <v-btn
                class="px-10 py- 10 text-subtitle-1"
                color="#ffc107"
                variant="outlined"
                size="large"
                to="/info/species"
                append-icon="mdi-paw">
                <span>See all animals</span>
              </v-btn>
            </CardItem>
            <CardItem
              :alt="bgImages[3].title"
              :image-source="bgImages[3].imageBgLink"
              class="parrot"
              image-heigth="100%" />
            <CardItem
              :alt="bgImages[2].title"
              :image-source="bgImages[2].imageBgLink"
              class="lynx" />
            <CardItem
              :alt="bgImages[6].title"
              :image-source="bgImages[6].imageBgLink"
              class="opossums" />
          </article>
          <article class="galary_second">
            <CardItem
              class="red_bear"
              :alt="bgImages[8].title"
              :image-source="bgImages[8].imageBgLink" />
            <CardItem
              class="coala"
              :alt="bgImages[4].title"
              :image-source="bgImages[4].imageBgLink" />
            <CardItem
              class="bober"
              :alt="bgImages[7].title"
              :image-source="bgImages[7].imageBgLink" />
          </article>
        </div>
      </v-img>
    </section>
    <section class="education_wrapper">
      <ListBlock
        v-if="educationMain && educationNews"
        :main-content="educationMain"
        :news="educationNews" />
    </section>
    <section class="conversation_wrapper">
      <v-img class="lynx_bg" src="images/lynx_bg.jpg" cover alt=" lynx_bg">
        <div class="d-flex flex-column h-100">
          <v-row>
            <v-container class="d-flex align-center">
              <CardColumn
                :title-card="educationMain?.title"
                class-title="text-amber text-center "
                :text-card="educationMain?.shortDescription"
                class-text="text-center"
                font-title-size="2rem"
                :enable-button="false" />
            </v-container>
            <v-container fluid>
              <v-row>
                <v-col class="conversation_icon" v-for="(icon, i) in conversationIcons" :key="i">
                  <v-avatar class="ma-3" size="104" rounded="50">
                    <UiElementsIcons
                      :icon-name="icon.iconName"
                      color-icon="#FBB03B"
                      size-width="50"
                      size-heigth="50" />
                  </v-avatar>
                  <span>{{ icon.title }}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </div>

        <!-- <article class="conversation">
          <div class="conversation_title">
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
        </article> -->
      </v-img>
    </section>
    <section class="last_news education_wrapper">
      <ListBlock
        v-if="newsMain && lastNews"
        :main-content="newsMain"
        :news="lastNews.slice(0, 3)" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.pain_your_visit {
  display: flex;
  justify-content: space-between;
  @media (max-width: 1280px) {
    display: none;
  }
}
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
    padding: 50px 20px;
    display: grid;
    grid-template-columns: repeat(2, minmax(auto, 600px));
    justify-content: center;
    column-gap: 20px;
    &_first {
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
    }
    &_second {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      & .red_bear {
        grid-column: span 2;
      }
    }
    @media (max-width: 1280px) {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(1, minmax(auto, 600px));
    }
    @media (max-width: 600px) {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(1, minmax(auto, 600px));
    }
  }
}

.offer_test {
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
