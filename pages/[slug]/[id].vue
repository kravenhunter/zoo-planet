<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStore } from "@/stores/storeGenerics";
import type { ContactUs, ContentPages, MembershipPrice, Post, TicketPrice } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();
const { postlist, specieList, mainPages, contactPage, membershipTable, ticketTable, planTable } =
  storeToRefs(useUnionStore());

const metaTitle = ref<string | undefined>("");
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
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "extinction") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Fighting Extinction");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "FightingExtinction");
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "plain") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Plan");
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "species") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Species");
  metaTitle.value = newsMainPageContent.value?.title;
}

if (route.params.id === "education") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Education");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "Education");
  metaTitle.value = newsMainPageContent.value?.title;
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

  metaTitle.value = about?.title;
}
if (route.params.id === "membership") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Membership");
  if (membershipTable.value?.length) {
    stateMonth.value = membershipTable.value[0];
    stateYaer.value = membershipTable.value[1];
  }
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "ticket") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Tickets");
  if (ticketTable.value?.length) {
    singleState.value = ticketTable.value[0];
    unlimitedSTate.value = ticketTable.value[1];
  }
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Donate");
  metaTitle.value = newsMainPageContent.value?.title;
}
if (route.params.id === "contact") {
  contactPage.value?.length && (contacts.value = contactPage.value[0]);
  metaTitle.value = contacts.value?.title;
}
useSeoMeta({
  title: metaTitle.value ? metaTitle.value : "Error result",
  ogTitle: metaTitle.value ? metaTitle.value : "Error result",
});
</script>

<template>
  <div class="wrapper">
    <LazyInfoDonate
      v-if="route.params.id === 'donate' && newsMainPageContent"
      :donate="newsMainPageContent" />
    <LazyInfoAbout
      v-else-if="route.params.id === 'about' && eboutData?.length && contacts"
      :about-us="eboutData"
      :contacts="contacts" />
    <LazyInfoExtinction
      v-else-if="route.params.id === 'extinction' && newsMainPageContent && latestNewsList"
      :fighting-main="newsMainPageContent"
      :programs="latestNewsList" />
    <LazyInfoEducation
      v-else-if="route.params.id === 'education' && newsMainPageContent && latestNewsList"
      :education="newsMainPageContent"
      :programs="latestNewsList" />
    <LazyInfoPlain
      v-else-if="route.params.id === 'plain' && planTable && newsMainPageContent"
      :plain="newsMainPageContent"
      :tables="planTable" />
    <LazyInfoNews
      v-else-if="route.params.id === 'news' && newsMainPageContent && latestNewsList"
      :main-content="newsMainPageContent"
      :news="latestNewsList" />
    <LazyInfoSpecies
      v-else-if="route.params.id === 'species' && newsMainPageContent && specieList"
      :species="newsMainPageContent"
      :specie-list="specieList" />
    <LazyInfoContactUs
      v-else-if="route.params.id === 'contact' && contacts"
      :contact-main="contacts" />
    <LazyInfoTiket
      v-else-if="
        route.params.id === 'ticket' && newsMainPageContent && singleState && unlimitedSTate
      "
      :ticket-main="newsMainPageContent"
      :single-state="singleState"
      :unlimited-s-tate="unlimitedSTate" />
    <LazyInfoMember
      v-else-if="route.params.id === 'membership' && newsMainPageContent && stateMonth && stateYaer"
      :member-main="newsMainPageContent"
      :state-month="stateMonth"
      :state-yaer="stateYaer" />

    <LazyTestComponent v-else-if="route.params.id === 'test'" />
    <LazyErrorResult v-else />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100%;

  display: grid;
}
</style>
