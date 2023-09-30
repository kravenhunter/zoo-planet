<script setup lang="ts">
import type { ContentPages, Post } from "@prisma/client";

interface Props {
  fightingMain: ContentPages;
  programs: Post[];
}
defineProps<Props>();

const extinction = {
  sourceTitle: "/images/species_preview.webp",
  title: "Our 27 priority species",
  description: `Meet the native threatened species we're fighting to save from extinction`,
};
</script>

<template>
  <section class="extinction">
    <article class="card">
      <CardColumn :enable-card-slot="true">
        <v-img
          :src="fightingMain.imageBgLink"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="fightingMain.imageBgLink" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="fightingMain.title"></v-card-title>
        </v-img>
      </CardColumn>

      <v-container>
        <CardColumn
          v-if="fightingMain"
          :text-html-card="fightingMain.description"
          :enable-button="false" />
      </v-container>
      <v-container v-if="programs">
        <CardInline
          class="getting_lead_inline"
          max-width-card="1200px"
          class-card="pa-3 mb-16"
          :title-card="programs[0].title"
          class-title="text-green-darken-4 text-center"
          :text-card="programs[0].description"
          class-text="text-center"
          :image-source="programs[0].imagePreviewLink!"
          image-width="650px"
          image-heigth="350px"
          image-cols-size="6"
          :enable-button="false" />
        <v-sheet max-width="700px" class="getting_lead_colemn mx-auto mb-5">
          <CardColumn
            :title-card="programs[0].title"
            :image-source="programs[0].imagePreviewLink!"
            class-title="text-green-darken-4 text center"
            :text-card="programs[0].description"
            class-text="text-center text-black"
            font-title-size="2rem"
            :enable-button="false" />
        </v-sheet>
      </v-container>
      <article class="bg-black pa-16">
        <v-row class="bg-black">
          <v-col cols="12">
            <CardColumn
              title-card="Our 27 priority species"
              class-title="text-amber-darken-2 text center"
              text-card="Meet the native threatened species we're fighting to save from extinction"
              class-text="text-center"
              font-title-size="2rem"
              :enable-button="false" />
          </v-col>
          <v-col>
            <NuxtLink to="/info/species">
              <CardColumn max-width-card="600" class="mx-auto" :enable-card-slot="true">
                <v-img
                  :src="extinction.sourceTitle"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                  cover>
                  <template #sources>
                    <source :srcset="extinction.sourceTitle" />
                  </template>
                </v-img>
              </CardColumn>
            </NuxtLink>
          </v-col>
        </v-row>
      </article>
      <article class="pa-16">
        <v-container>
          <CardColumn
            title-card="How you can help"
            class-title="text-green-darken-4 text center"
            text-card="We inspire communities to take action and help conserve wildlife and wild places. If we all make small changes, then collectively we can make a big difference."
            class-text="text-center text-black"
            font-title-size="2rem"
            :enable-button="false" />
          <div class="retrospective_two">
            <v-col cols="12">
              <NuxtLink :to="{ path: `/news/${programs[1].id}` }">
                <CardColumn heigth-card="100%" max-height-card="475" :enable-card-slot="true">
                  <v-img
                    :src="programs[1].imagePreviewLink!"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                    class="align-end"
                    cover>
                    <template #sources>
                      <source :srcset="programs[1].imageBgLink" />
                    </template>
                    <h4 class="text-amber mb-10 ml-10" v-text="programs[1].title"></h4>
                  </v-img>
                </CardColumn>
              </NuxtLink>
            </v-col>
            <v-col cols="12" v-for="el in programs.slice(2, 4)" :key="el.id">
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
          </div>
          <div class="retrospective_one">
            <v-row align="start">
              <v-col cols="12" lg="8">
                <NuxtLink :to="{ path: `/news/${programs[1].id}` }">
                  <!-- <CardInline
            max-width-card="475"
            :image-source="programs[1].imagePreviewLink!"
            image-width="100%"
            image-heigth="350px"
            image-cols-size="12"
            :enable-button="false" /> -->
                  <CardColumn heigth-card="475px" :enable-card-slot="true">
                    <v-img
                      :src="programs[1].imagePreviewLink!"
                      height="100%"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                      :aspect-ratio="4 / 3"
                      cover>
                      <template #sources>
                        <source :srcset="programs[1].imageBgLink" />
                      </template>
                      <h4 class="text-amber mb-10 ml-10" v-text="programs[1].title"></h4>
                    </v-img>
                  </CardColumn>
                </NuxtLink>
              </v-col>
              <v-col cols="12" lg="4">
                <v-row>
                  <v-col cols="12" lg="12" v-for="el in programs.slice(2, 4)" :key="el.id">
                    <NuxtLink :to="{ path: `/news/${el.id}` }">
                      <CardColumn v-if="programs.length" heigth-card="225" :enable-card-slot="true">
                        <v-img
                          :src="el.imagePreviewLink!"
                          class="align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                          :aspect-ratio="4 / 3"
                          cover>
                          <template #sources>
                            <source :srcset="el.imageBgLink" />
                          </template>
                          <p
                            class="small_title text-amber mb-2 ml-10"
                            v-text="programs[1].title"></p>
                        </v-img>
                      </CardColumn>
                    </NuxtLink>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </article>

      <article class="bg-black pa-16">
        <v-container>
          <v-row>
            <v-col cols="12">
              <CardColumn
                title-card="How we are leading conservation"
                class-title="text-amber-darken-2 text center"
                text-card="We are involved in conservation programs in six countries, eight grass-roots community conservation campaigns, and more than 50 research projects. Each project has been identified and developed to benefit both ecological communities and key species."
                class-text="text-center"
                font-title-size="2rem"
                :enable-button="false" />
            </v-col>
            <div class="conversation_retrospective_one">
              <v-row align="start">
                <v-col cols="6" v-for="el in programs.slice(2, 4)" :key="el.id">
                  <NuxtLink :to="{ path: `/news/${el.id}` }">
                    <CardColumn max-width-card="600" class="mx-auto" :enable-card-slot="true">
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
                  </NuxtLink>
                </v-col>
                <v-col cols="3" v-for="el in programs.slice(2, 6)" :key="el.id">
                  <NuxtLink :to="{ path: `/news/${el.id}` }">
                    <CardColumn max-width-card="600" class="mx-auto" :enable-card-slot="true">
                      <v-img
                        :src="el.imagePreviewLink!"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                        :aspect-ratio="4 / 3"
                        cover>
                        <template #sources>
                          <source :srcset="el.imagePreviewLink!" />
                        </template>
                        <p class="small_title text-amber ml-10" v-text="el.title"></p>
                      </v-img>
                    </CardColumn>
                  </NuxtLink>
                </v-col>
              </v-row>
            </div>
            <div class="conversation_retrospective_two">
              <v-row align="start">
                <v-col cols="12" v-for="el in programs.slice(2, 6)" :key="el.id">
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
          </v-row>
        </v-container>
      </article>
      <article class="pa-16">
        <ProgramsBlock
          :programs-list="programs.slice(0, 5)"
          title="Fighting Extinction Schools Community"
          title-class="text-amber-darken-2 text center"
          text="Get support and grow your network."
          text-class="text-center text-black" />
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
  & h3,
  h4,
  h5,
  h6 {
    font-family: gothic;
    font-size: 1.5rem;
  }
  & .small_title {
    font-family: gothic;
    font-size: 1rem;
  }
}
.extinction {
  height: 100%;
  background-color: var(--color-grey);
}

.card {
  display: grid;
  background-color: var(--color-grey);

  & .getting_lead_colemn {
    display: none;
  }
  & .retrospective_one {
    display: block;
  }
  & .retrospective_two {
    display: none;
  }
  & .conversation_retrospective_one {
    display: block;
  }
  & .conversation_retrospective_two {
    display: none;
  }
  @media (max-width: 1280px) {
    & .getting_lead_inline {
      display: none;
    }
    & .getting_lead_colemn {
      display: block;
    }
    & .retrospective_one {
      display: none;
    }
    & .retrospective_two {
      display: block;
    }
    & .conversation_retrospective_one {
      display: none;
    }
    & .conversation_retrospective_two {
      display: block;
    }
  }

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
