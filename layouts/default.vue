<script setup lang="ts">
import { ref } from "#imports";

const showSearch = ref(false);

const navTop = [
  {
    title: "Shop",
    link: "/info/shop",
  },

  {
    title: "Education",
    link: "/info/education",
  },
  {
    title: "About",
    link: "/info/about",
  },
  {
    title: "Donate",
    link: "/info/test",
  },
  {
    title: "Membership",
    link: "/info/membership",
  },
];
const navigationMain = [
  {
    title: "Visit Our Zoo",
    link: "/",
  },
  {
    title: "Fighting Extinction",
    link: "/info/extinction",
  },
  {
    title: "What’s On",
    link: "/info/whats_on",
  },

  {
    title: "Tickets",
    link: "/info/tickets",
  },
];
const socials = [
  {
    title: "facebook",
    link: "https://www.facebook.com.vn",
    icon: "ri:facebook-fill",
  },
  {
    title: "twitter",
    link: "https://www.twitter.com",
    icon: "mdi:twitter",
  },
  {
    title: "twitter",
    link: "https://www.youtube.com",
    icon: "mdi:youtube",
  },
  {
    title: "instagram",
    link: "https://www.instagram.com",
    icon: "mdi:instagram",
  },
];
</script>

<template>
  <v-layout class="d-flex flex-column pa-0" style="min-height: 100vh">
    <v-app-bar :height="160" class="py-0">
      <Image source="/images/header_bg.jpg" class="pa-10" alte="header_bg">
        <v-row no-gutters>
          <v-col :cols="1" class="logo">
            <v-img src="/images/logos.svg" height="99px" width="126px" />
          </v-col>
          <v-col>
            <v-row justify="end" no-gutters class="mt-4">
              <v-expand-x-transition>
                <UiElementsSearch v-if="showSearch" />
              </v-expand-x-transition>

              <v-btn
                @click="showSearch = !showSearch"
                color="#FBB03B"
                variant="text"
                class="mx-2 text-subtitle-1"
                rounded="xl">
                <UiElementsIcons
                  icon-name="material-symbols:search"
                  color-icon="white"
                  size-width="30"
                  size-heigth="30" />
              </v-btn>
              <v-btn
                v-for="(link, i) in navTop"
                :key="i"
                class="mx-2 text-subtitle-2"
                color="#FBB03B"
                variant="text"
                router
                :to="link.link"
                rounded="xl">
                <!--    <NuxtLink :to="link.link" class="mx-2 text-subtitle-1"> {{ link.title }}</NuxtLink> -->
                {{ link.title }}
              </v-btn>
            </v-row>
            <v-row justify="end" align="end" no-gutters class="mt-4">
              <v-btn
                v-for="(link, i) in navigationMain"
                :key="i"
                color="white"
                variant="text"
                class="mx-2"
                rounded="xl"
                router
                :to="link.link">
                {{ link.title }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </Image>
    </v-app-bar>

    <v-main class="bg-surface-variant main">
      <slot />
    </v-main>
    <footer>
      <section class="subscribe_wrapper">
        <v-img src="/images/parrto_subscribe.png" cover alt="subscribe">
          <div class="subscribe">
            <div class="title_block">
              <v-avatar class="ma-3" size="50" rounded="0">
                <UiElementsIcons
                  icon-name="material-symbols:mail"
                  color-icon="#FBB03B"
                  size-width="50"
                  size-heigth="50" />
              </v-avatar>
              <Card
                class="align-self-center description"
                title-align="center"
                text-align="center"
                title-card="Subscribe to our e-newsletter"
                text-card="Our email newspaper keeps you uo to date  what’s happening in at thr ZOO Planet"
                :enablse-button-slot="true">
                <div class="subscribe_form">
                  <v-text-field
                    label="Your email adress"
                    color="white"
                    single-line
                    variant="outlined"></v-text-field>

                  <v-btn
                    class="px-10 text-subtitle-1 text-white"
                    color="#395A03"
                    variant="flat"
                    :height="57">
                    SUBSCRIBE
                    <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
                  </v-btn>
                </div>
              </Card>
            </div>
          </div>
        </v-img>
      </section>

      <section class="footer">
        <div class="footer_block">
          <div class="footer_list">
            <ul>
              <li class="title">Visit our zoo</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
              <li class="text-subtitle-2">What’s On</li>
              <li class="text-subtitle-2">Venues & Functions</li>
              <li class="text-subtitle-2">Membership</li>
            </ul>
          </div>
          <div class="footer_list">
            <ul>
              <li class="title">animals</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
            </ul>
          </div>
          <div class="footer_list">
            <ul>
              <li class="title">education</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
              <li class="text-subtitle-2">What’s On</li>
              <li class="text-subtitle-2">Venues & Functions</li>
              <li class="text-subtitle-2">Membership</li>
            </ul>
          </div>
          <div class="footer_list">
            <ul>
              <li class="title">conversation</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
              <li class="text-subtitle-2">What’s On</li>

              <li class="text-subtitle-2">Membership</li>
            </ul>
          </div>
          <div class="footer_list">
            <ul>
              <li class="title">get involved</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
              <li class="text-subtitle-2">What’s On</li>
              <li class="text-subtitle-2">Venues & Functions</li>
              <li class="text-subtitle-2">Membership</li>
            </ul>
          </div>
          <div class="footer_list">
            <ul>
              <li class="title">Terms & Conditions</li>
              <li class="text-subtitle-2">Hours & Rates</li>
              <li class="text-subtitle-2">Plan Your Visit</li>
              <li class="text-subtitle-2">Zoo Map</li>
              <li class="text-subtitle-2">What’s On</li>
              <li class="text-subtitle-2">Venues & Functions</li>
              <li class="text-subtitle-2">Membership</li>
            </ul>
          </div>
        </div>
        <div class="footer_copyright">
          <div class="footer_copyright_logo">
            <v-img alt="logo_footer" src="/images/logos.svg" height="99px" width="126px" />
          </div>

          <div class="footer_copyright_title">
            <p class="text-subtitle-2">
              © 2023 Vimeo.com, Inc. All rights reserved. Terms | Privacy | CA Privacy | Copyright |
              Cookies
            </p>
          </div>
          <div class="footer_copyright_socials">
            <h4 class="text-center">FOLOW US</h4>
            <ul>
              <li v-for="(icon, i) in socials" :key="i">
                <NuxtLink :to="icon.link">
                  <v-avatar color="#395A03" class="ma-3" size="47" rounded="50">
                    <UiElementsIcons
                      :icon-name="icon.icon"
                      color-icon="#FBB03B"
                      size-width="25"
                      size-heigth="25" />
                  </v-avatar>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  </v-layout>
</template>

<style scope lang="scss">
.footer {
  color: white;
  &_block {
    background-color: #395a03;
    display: grid;
    grid-template-columns: repeat(6, auto);
    justify-content: center;
    gap: 100px;
    padding: 75px 0;
  }
  &_copyright {
    padding: 57px 0;
    background-color: #284002;
    display: flex;
    justify-content: center;
    gap: 100px;
    &_logo {
      align-self: flex-end;
      justify-self: start;
    }
    &_title {
      align-self: flex-end;
    }
    &_socials {
      align-self: flex-end;
      & h4 {
        font-size: 1rem;
        font-family: gothic;
      }
      & ul {
        display: flex;
        column-gap: 15px;
      }
    }
  }
  &_list {
    & .title {
      font-family: gothic;
      font-size: 1rem;
    }
  }
}
.subscribe {
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;

  & .title_block {
    text-align: center;
    margin-top: 60px;
  }

  &_form {
    width: 100%;
    display: flex;
    column-gap: 50px;
  }
}
</style>
<!--    <v-icon :size="50">mdi-clock-time-four-outline</v-icon> -->
<!--  <v-item-group v-model="model" class="d-flex justify-sm-space-between px-6 pt-2 pb-6">
  <div>
    <v-sheet class="d-flex mb-6 bg-surface-variant" height="100">
      <v-sheet class="ma-2 pa-2">Flex item</v-sheet>
      <v-sheet class="ma-2 pa-2 align-self-center">align-self-baseline</v-sheet>
      <v-sheet class="ma-2 pa-2">Flex item</v-sheet>
    </v-sheet>
  </div>
</template> -->
<!-- <template>
  <div>
    <v-container class="bg-surface-variant">
      <v-row no-gutters style="height: 150px">
        <v-col justify-self="start" align-self="start">
          <v-sheet class="pa-2 ma-2"> .align-self-start </v-sheet>
        </v-col>

        <v-col align-self="center">
          <v-sheet class="pa-2 ma-2"> .align-self-center </v-sheet>
        </v-col>

        <v-col align-self="end">
          <v-sheet class="pa-2 ma-2"> .align-self-end </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template> -->
<!--  <v-card-actions>
                <v-btn
                  color="#FFC107"
                  variant="outlined"
                  prepend-icon="mdi-check-circle"
                  append-icon="mdi-account-circle"
                  v-bind="props">
                  <template #prepend>
                    <v-icon color="success"></v-icon>
                  </template>
                  Button
                  <template #append>
                    <v-icon color="warning"></v-icon>
                  </template>
                </v-btn>
              </v-card-actions> -->

<!-- 
<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader :title="card"></v-list-subheader>

                <template v-for="n in 6" :key="n">
                  <v-list-item>
                    <template #prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>

                    <v-list-item-title :title="`Message ${n}`"></v-list-item-title>

                    <v-list-item-subtitle
                      title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle>
                  </v-list-item>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
 -->
