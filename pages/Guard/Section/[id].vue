<script setup lang="ts">
import { definePageMeta, ref, useRoute } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { IContacts, IContentPage, IMembershipPrice, IPost, ITicketPrice } from "~/types";

const router = useRoute();

const { postlist, mainPages, contactPage, membershipTable, ticketTable, specieList, planTable } =
  storeToRefs(useUnionStorage());

const newsMainPageContent = ref<IContentPage>();
const mainPagesList = ref<IContentPage[]>();
const latestNewsList = ref<IPost[]>();
// // Membership Prices
const stateMonth = ref<IMembershipPrice>();
const stateYaer = ref<IMembershipPrice>();
// // Ticket Prices & Table
const singleState = ref<ITicketPrice>();
const unlimitedSTate = ref<ITicketPrice>();
// //Contacts Data
const contacts = ref<IContacts>();

//Checking ROutes
//console.log(mainPages.value);
if (router.params.id === "news") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "news");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "News");
}
if (router.params.id === "extinction") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "extinction");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "FightingExtinction");
}
if (router.params.id === "species") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "species");
}

if (router.params.id === "education") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "education");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "Education");
}
if (router.params.id === "aboutus") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "aboutus");
}
if (router.params.id === "membership") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "membership");
  if (membershipTable.value?.length) {
    stateMonth.value = membershipTable.value[0];
    stateYaer.value = membershipTable.value[1];
  }
}
if (router.params.id === "tickets") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "tickets");
  if (ticketTable.value?.length) {
    singleState.value = ticketTable.value[0];
    unlimitedSTate.value = ticketTable.value[1];
  }
}
if (router.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "donate");

  newsMainPageContent.value = mainPages.value?.find((el) => el.title === "Donate");

  mainPagesList.value = mainPages.value.filter(
    (el) => el.subTitle === "donate" && el.title !== "Donate",
  );
}

if (router.params.id === "plan") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "plan");
}

definePageMeta({
  layout: "admin-layout",
  middleware: ["auth"],
});
</script>

<template>
  <section class="main_content">
    <v-container class="py-8 px-6" fluid>
      <!-- Main Pages List -->
      <GuardMainPages v-if="router.params.id === 'main'" :pages="mainPages" />

      <!-- Donate Pages List -->
      <GuardMainPages
        v-else-if="router.params.id === 'donate'"
        :current-page="newsMainPageContent"
        :pages="mainPagesList" />
      <!-- Curreent Section Page -->
      <GuardMainPages
        v-else-if="router.params.id !== 'contactus'"
        :current-page="newsMainPageContent" />
      <!--       <v-row v-if="newsMainPageContent?.imagePreviewLink">
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
      </v-row> -->
      <!-- Current Section News List -->
      <LazyGuardNewsList
        v-if="
          router.params.id === 'news' ||
          router.params.id === 'extinction' ||
          router.params.id === 'education'
        "
        :latest-news-list="latestNewsList" />
      <!-- MemberShip Table Praces -->
      <LazyGuardTablesMemberShip
        v-if="router.params.id === 'membership'"
        :monthly="stateMonth"
        :yarly="stateYaer" />

      <!-- Contacts -->
      <LazyGuardContactBlock v-if="router.params.id === 'contactus'" :contact-data="contactPage" />
      <!-- List of Species -->
      <LazyGuardSpeciesList v-if="router.params.id === 'species'" :specias="specieList" />

      <!-- Tickets Table Praces -->
      <LazyGuardTablesTickets
        v-if="router.params.id === 'tickets'"
        :singl-entry="singleState"
        :unlimited="unlimitedSTate" />
      <!-- Plan Table Praces -->
      <LazyGuardTablesPlan
        v-if="router.params.id === 'plan' && planTable"
        :plan-prices="planTable" />
    </v-container>
  </section>
</template>

<style scoped></style>

<!-- <template>
  <GuardMainBlock />
</template>
 -->
