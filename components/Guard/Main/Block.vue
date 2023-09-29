<script setup lang="ts">
import { ref, useRoute } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";

import { storeToRefs } from "pinia";

// import { useBookingStore } from "@/stores/bookingStore";
// import { useContactsStore } from "@/stores/contactsStore";
// import { useMainContentStore } from "@/stores/mainContentStore";
// import { usePostStore } from "@/stores/postStore";
// import { useSpeciesStore } from "@/stores/speciesStore";
import type { ContactUs, ContentPages, MembershipPrice, Post, TicketPrice } from "@prisma/client";

const router = useRoute();

const { postlist, mainPages, contactPage, membershipTable, ticketTable, specieList, planTable } =
  storeToRefs(useUnionStore());

const newsMainPageContent = ref<ContentPages>();
const latestNewsList = ref<Post[]>();
// // Membership Prices
const stateMonth = ref<MembershipPrice>();
const stateYaer = ref<MembershipPrice>();
// // Ticket Prices & Table
const singleState = ref<TicketPrice>();
const unlimitedSTate = ref<TicketPrice>();
// //Contacts Data
const contacts = ref<ContactUs>();

// //Contacts Data
// const { contactPage } = storeToRefs(useContactsStore());
// const contacts = ref<ContactUs>();

// // Main Content Data
// const { mainPages } = storeToRefs(useMainContentStore());

// //  Articles
// const { postlist } = storeToRefs(usePostStore());
// const newsMainPageContent = ref<ContentPages>();
// const latestNewsList = ref<Post[]>();

// // Membership Prices & Table
// const { membershipTable, ticketTable } = storeToRefs(useBookingStore());

// const stateMonth = ref<MembershipPrice>();
// const stateYaer = ref<MembershipPrice>();

// // Ticket Prices & Table
// const singleState = ref<TicketPrice>();
// const unlimitedSTate = ref<TicketPrice>();

//Checking ROutes

if (router.params.id === "news") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "News");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "News");
}
if (router.params.id === "fighting") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Fighting Extinction");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "FightingExtinction");
}
if (router.params.id === "species") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Species");
}

if (router.params.id === "education") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Education");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "Education");
}
if (router.params.id === "aboutus") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "AboutUs");
}
if (router.params.id === "membership") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Membership");
  if (membershipTable.value?.length) {
    stateMonth.value = membershipTable.value[0];
    stateYaer.value = membershipTable.value[1];
  }
}
if (router.params.id === "tickets") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Tickets");
  if (ticketTable.value?.length) {
    singleState.value = ticketTable.value[0];
    unlimitedSTate.value = ticketTable.value[1];
  }
}
if (router.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Donate");
}
if (router.params.id === "contactus") {
  contactPage.value?.length && (contacts.value = contactPage.value[0]);
}
if (router.params.id === "plan") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Plan");
}
</script>

<template>
  <section class="main_content">
    <v-container class="py-8 px-6" fluid>
      <GuardMainPages v-if="router.params.id === 'main' && mainPages" :pages="mainPages" />
      <v-row v-if="newsMainPageContent?.imagePreviewLink">
        <v-col cols="12">
          <CardInline
            max-width-card="1200px"
            class-card="bg-grey-darken-4 mx-auto"
            :title-card="newsMainPageContent.title"
            class-title="text-amber text-center"
            :text-card="newsMainPageContent.shortDescription"
            :image-source="newsMainPageContent.imagePreviewLink"
            image-width="400px"
            image-heigth="300px"
            image-cols-size="4"
            content-cols-sieze="8"
            button-class="px-10 mb-5 mr-5  text-subtitle-1 text-white text-grey-lighten-5 bg-light-blue-darken-4"
            button-position="justify-end"
            button-size="large"
            button-title="Edit"
            :button-params="`/guard/main/${router.params.id}`"
            icon="mdi-paw" />
        </v-col>
      </v-row>

      <GuardNewsList v-if="latestNewsList?.length" :latest-news-list="latestNewsList" />

      <LazyGuardTablesMemberShip
        v-if="router.params.id === 'membership'"
        :monthly="stateMonth"
        :yarly="stateYaer" />

      <LazyGuardContactBlock v-if="contacts" :contact-data="contacts" />

      <LazyGuardSpeciesList
        v-if="router.params.id === 'species' && specieList"
        :speciest="specieList" />
      <LazyGuardTablesTickets
        v-if="router.params.id === 'tickets'"
        :singl-entry="singleState"
        :unlimited="unlimitedSTate" />
      <LazyGuardTablesPlan
        v-if="router.params.id === 'plan' && planTable"
        :plan-prices="planTable" />
    </v-container>
  </section>
</template>

<style scoped></style>
