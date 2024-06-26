<script setup lang="ts">
import { navigateTo, onMounted, ref, useSeoMeta } from "#imports";
import { useAuthStore } from "@/stores/authStore";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";

const showSearch = ref(false);
const searchRequest = ref<string>("");
const { logOut, checkAuth } = useAuthStore();
const { isAuthorized } = storeToRefs(useAuthStore());
const { mainPages, contactPage, planTable } = storeToRefs(useUnionStorage());
const { loadDataList } = useUnionStorage();
// const { data } = await useFetch("/api/prisma/base/list-by-type/:id");

if (!mainPages.value.length) {
  const newsPromise = loadDataList("base/list-by-type/post");
  const planPricesPromise = loadDataList("base/list-by-type/plan");
  const speciesPromise = loadDataList("base/list-by-type/specie");
  const mainPagesPromise = loadDataList("base/list-by-type/main-content-pages");
  const contactsPromise = loadDataList("base/list-by-type/contacts");
  const membershipPriceыPromise = loadDataList("base/list-by-type/membership-price");
  const ticketPriceыPromise = loadDataList("base/list-by-type/ticket-price");

  await Promise.allSettled([
    newsPromise,
    planPricesPromise,
    contactsPromise,
    speciesPromise,
    mainPagesPromise,
    membershipPriceыPromise,
    ticketPriceыPromise,
  ]);
}
// Contacts Data

const socialsLink = ref<string[]>([]);
const collapseBurger = ref(false);

if (contactPage.value) {
  contactPage.value.socialLink_1 && socialsLink.value.push(contactPage.value.socialLink_1);
  contactPage.value.socialLink_2 && socialsLink.value.push(contactPage.value.socialLink_2);
  contactPage.value.socialLink_3 && socialsLink.value.push(contactPage.value.socialLink_3);
  contactPage.value.socialLink_4 && socialsLink.value.push(contactPage.value.socialLink_4);
  contactPage.value.socialLink_5 && socialsLink.value.push(contactPage.value.socialLink_5);
}

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
    link: "/info/donate",
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
    link: "/info/news",
  },

  {
    title: "Tickets",
    link: "/info/ticket",
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
const bgImages = [
  {
    title: "header top",
    imageBgLink: "/images/bgImages/header_bg.webp",
  },
  {
    title: "panda",

    imageBgLink: "/images/bgImages/panda1.webp",
  },
];

const searchHandler = (search: string) => {
  search && navigateTo(`/search/${search}`);
};

onMounted(() => {
  isAuthorized.value = checkAuth();
});

useSeoMeta({
  description: "the best zoo park in the world",
  ogDescription: "the best zoo park in the world",
});
</script>

<template>
  <v-layout class="d-flex flex-column pa-0" style="min-height: 100vh">
    <v-navigation-drawer v-model="collapseBurger" color="black" location="top" temporary>
      <v-col class="burger_nav pt-10">
        <v-row justify="center" class="pb-5">
          <UiElementsSearch
            v-model:value.trim="searchRequest"
            @keyup.enter="searchHandler(searchRequest)" />
        </v-row>
        <v-row justify="center">
          <div class="burger_mein_menu">
            <v-btn
              v-for="(link, i) in navigationMain"
              :key="i"
              color="white"
              variant="text"
              class="mx-2"
              rounded="xl"
              :title="link.title"
              :to="link.link">
              {{ link.title }}
            </v-btn>
          </div>
          <div class="burger_menu">
            <v-btn
              v-for="(link, i) in navTop"
              :key="i"
              class="mx-2 text-subtitle-2"
              color="#FBB03B"
              variant="text"
              :to="link.link"
              :title="link.title"
              rounded="xl">
              {{ link.title }}
            </v-btn>
            <v-btn
              v-if="isAuthorized"
              class="mx-2 text-subtitle-2"
              color="#FBB03B"
              variant="text"
              title="Dashboard"
              to="/guard"
              rounded="xl">
              Dashboard
            </v-btn>
            <v-btn
              v-if="isAuthorized"
              class="mx-2 text-subtitle-2"
              color="#FBB03B"
              variant="text"
              title="Icon-logout"
              rounded="xl"
              @click="logOut">
              <v-icon> mdi-logout </v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-col>
    </v-navigation-drawer>
    <v-app-bar class="navigation py-0" height="160">
      <v-img
        cover
        :src="bgImages[0].imageBgLink"
        :aspect-ratio="16 / 9"
        class="pa-10"
        :alt="bgImages[0].title">
        <v-row no-gutters>
          <v-col :cols="1" class="logo">
            <v-img src="/images/bgImages/logos.svg" height="99px" width="126px" alt="logos" />
          </v-col>
          <v-col class="nav_menu">
            <v-row justify="end" class="mb-5">
              <v-expand-x-transition>
                <UiElementsSearch
                  v-if="showSearch"
                  v-model:value.trim="searchRequest"
                  @keyup.enter="searchHandler(searchRequest)" />
              </v-expand-x-transition>

              <v-btn
                color="#FBB03B"
                variant="text"
                class="mx-2 text-subtitle-1"
                title="btn-search"
                rounded="xl"
                @click="showSearch = !showSearch">
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
                :to="link.link"
                :title="link.title"
                rounded="xl">
                {{ link.title }}
              </v-btn>
              <v-btn
                v-if="isAuthorized"
                class="mx-2 text-subtitle-2"
                color="#FBB03B"
                variant="text"
                title="Dashboard"
                to="/guard"
                rounded="xl">
                Dashboard
              </v-btn>
              <v-btn
                v-if="isAuthorized"
                class="mx-2 text-subtitle-2"
                color="#FBB03B"
                variant="text"
                title="icon-logout-vurger"
                rounded="xl"
                @click="logOut">
                <v-icon> mdi-logout </v-icon>
              </v-btn>
              <AuthLogin v-else />
            </v-row>
            <v-row justify="end" align="end" no-gutters class="mb-5">
              <v-btn
                v-for="(link, i) in navigationMain"
                :key="i"
                color="white"
                variant="text"
                class="mx-2"
                rounded="xl"
                :title="link.title"
                :to="link.link">
                {{ link.title }}
              </v-btn>
            </v-row>
          </v-col>
          <div class="burger_btn">
            <div class="burger_logo">
              <v-img
                src="/images/bgImages/logos.svg"
                height="99px"
                width="126px"
                alt="logos-burger" />
            </div>
            <div class="burger_icon">
              <v-btn
                title="burger-icon"
                icon
                color="white"
                @click="collapseBurger = !collapseBurger">
                <v-icon title="burget-menu" size="x-large">mdi-menu </v-icon>
              </v-btn>
            </div>
          </div>
        </v-row>
      </v-img>
    </v-app-bar>

    <v-main class="bg-surface-variant main">
      <slot />
    </v-main>
    <footer>
      <section class="subscribe_wrapper">
        <v-img src="/images/bgImages/parrto_subscribe.png" cover alt="subscribe">
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
                    title="SUBSCRIBE"
                    class="px-10 text-subtitle-1 text-white"
                    color="#395A03"
                    variant="flat"
                    :height="57">
                    SUBSCRIBE
                    <v-icon title="mdi-paw" :size="30" color="#ffc107" class="ml-3 mb-1"
                      >mdi-paw</v-icon
                    >
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
              <li class="title">Get involved</li>
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
              <li class="text-subtitle-2">Privacy</li>
              <li class="text-subtitle-2">Sit emap</li>
              <li class="text-subtitle-2">News</li>
              <li class="text-subtitle-2">What’s On</li>
              <li>
                <NuxtLink class="text-subtitle-2" to="/info/contact" title="contact-us"
                  >Contact Us</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="footer_copyright">
          <div class="footer_copyright_logo">
            <v-img alt="logo_footer" src="/images/bgImages/logos.svg" height="99px" width="126px" />
          </div>

          <div class="footer_copyright_title">
            <p class="text-subtitle-2">
              {{ contactPage?.copyright }}
            </p>
          </div>
          <div class="footer_copyright_socials">
            <h4 class="text-center">FOLOW US</h4>
            <ul v-if="socialsLink?.length">
              <li v-for="(icon, i) in socials" :key="i">
                <NuxtLink :to="`https://${socialsLink[i]}`" target="_blank" :title="icon.icon">
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
.buerger_menu_block {
  display: grid;

  grid-template-columns: repeat(2, 200px);
}
.burger_menu {
  display: grid;
  justify-content: end;
  grid-template-columns: repeat(2, auto);
}
.burger_mein_menu {
  display: grid;
}

.navigation {
  & .nav_menu,
  .logo {
    @media (max-width: 1280px) {
      display: none;
    }
    // @media (max-width: 600px) {
    //   height: 300px;
    // }
  }

  & .burger_btn {
    display: none;
    @media (max-width: 1280px) {
      display: grid;
      grid-template-columns: repeat(2, auto);
      justify-items: end;
      width: 100%;
    }
  }
}

.footer {
  color: white;
  &_block {
    background-color: #395a03;
    display: grid;
    grid-template-columns: repeat(6, auto);
    justify-content: center;
    column-gap: 100px;
    row-gap: 50px;
    padding: 75px 0;
    @media (max-width: 1280px) {
      display: grid;
      grid-template-columns: repeat(5, auto);
    }
    @media (max-width: 890px) {
      display: grid;
      grid-template-columns: repeat(3, auto);
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
  &_copyright {
    padding: 57px 0;
    background-color: #284002;
    display: flex;
    justify-content: center;
    column-gap: 100px;
    row-gap: 50px;
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
    @media (max-width: 1280px) {
      display: grid;
      justify-items: center;
      align-items: center;
      &_logo {
        justify-self: center;
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
    @media (max-width: 1280px) {
      display: grid;
      margin-bottom: 20px;
    }
  }
}
</style>
