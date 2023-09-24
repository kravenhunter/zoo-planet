<script setup lang="ts">
import { ref, useRoute } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { ContactUs, ContentPages, MembershipPrice, Post, TicketPrice } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist, specieList, mainPages, contactPage, membershipTable, ticketTable, planTable } =
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
//About Data

const eboutData = ref<ContentPages[]>();

//Checking ROutes
if (route.params.id === "news") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "News");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "News");
}
if (route.params.id === "extinction") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Fighting Extinction");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "FightingExtinction");
}
if (route.params.id === "plain") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Plan");
}
if (route.params.id === "species") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Species");
}

if (route.params.id === "education") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Education");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "Education");
}
if (route.params.id === "about") {
  const about = mainPages.value?.find((el) => el.subTitle === "AboutUs");
  const sponsor = mainPages.value?.find((el) => el.subTitle === "Sponsors");
  const career = mainPages.value?.find((el) => el.subTitle === "Careers");
  const education = mainPages.value?.find((el) => el.subTitle === "Education");
  const volunteer = mainPages.value?.find((el) => el.subTitle === "Volunteer");
  contactPage.value?.length && (contacts.value = contactPage.value[0]);

  eboutData.value = [];

  about &&
    sponsor &&
    career &&
    education &&
    volunteer &&
    contacts.value &&
    (eboutData.value = [
      about,
      sponsor,
      career,
      education,
      volunteer,
      {
        id: contacts.value?.id,
        timeStamp: contacts.value?.timeStamp,
        imageBgLink: contacts.value?.imageBgLink,
        imagePreviewLink: contacts.value?.imagePreviewLink,
        title: contacts.value?.title,
        subTitle: contacts.value?.title,
        shortDescription: contacts.value?.description,
        description: contacts.value?.description,
        extraeDscription: contacts.value?.extraeDscription,
      },
    ]);
}
if (route.params.id === "membership") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Membership");
  if (membershipTable.value?.length) {
    stateMonth.value = membershipTable.value[0];
    stateYaer.value = membershipTable.value[1];
  }
}
if (route.params.id === "ticket") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Tickets");
  if (ticketTable.value?.length) {
    singleState.value = ticketTable.value[0];
    unlimitedSTate.value = ticketTable.value[1];
  }
}
if (route.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Donate");
}
if (route.params.id === "contact") {
  contactPage.value?.length && (contacts.value = contactPage.value[0]);
}
</script>

<template>
  <div class="wrapper">
    <InfoAbout
      v-if="route.params.id === 'about' && eboutData?.length && contacts"
      :about-us="eboutData"
      :contacts="contacts" />
    <InfoExtinction
      v-if="route.params.id === 'extinction' && newsMainPageContent && latestNewsList"
      :fighting-main="newsMainPageContent"
      :programs="latestNewsList" />
    <InfoEducation
      v-if="route.params.id === 'education' && newsMainPageContent && latestNewsList"
      :education="newsMainPageContent"
      :programs="latestNewsList" />
    <InfoPlain
      v-if="route.params.id === 'plain' && planTable && newsMainPageContent"
      :plain="newsMainPageContent"
      :tables="planTable" />
    <InfoNews
      v-if="route.params.id === 'news' && newsMainPageContent && latestNewsList"
      :main-content="newsMainPageContent"
      :news="latestNewsList" />
    <InfoSpecies
      v-if="route.params.id === 'species' && newsMainPageContent"
      :species="newsMainPageContent" />
    <InfoContactUs v-if="route.params.id === 'contact'" />
    <InfoTiket
      v-if="route.params.id === 'ticket' && newsMainPageContent && singleState && unlimitedSTate"
      :ticket-main="newsMainPageContent"
      :single-state="singleState"
      :unlimited-s-tate="unlimitedSTate" />
    <InfoMembership
      v-if="route.params.id === 'membership' && newsMainPageContent && stateMonth && stateYaer"
      :membership="newsMainPageContent"
      :state-month="stateMonth"
      :state-yaer="stateYaer" />
    <TestComponent v-if="route.params.id === 'test'" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;

  display: grid;
}
</style>
