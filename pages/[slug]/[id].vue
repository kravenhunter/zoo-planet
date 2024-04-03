<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { IContacts, IContentPage, IMembershipPrice, IPost, ITicketPrice } from "~/types";

const route = useRoute();
const { postlist, specieList, mainPages, contactPage, membershipTable, ticketTable, planTable } =
  storeToRefs(useUnionStorage());

const metaTitle = ref<string>("");
const newsMainPageContent = ref<IContentPage>();
const mainPageList = ref<IContentPage[]>();
const latestNewsList = ref<IPost[]>();
// // Membership Prices
const stateMonth = ref<IMembershipPrice>();
const stateYaer = ref<IMembershipPrice>();
// // Ticket Prices & Table
const singleState = ref<ITicketPrice>();
const unlimitedSTate = ref<ITicketPrice>();
// //Contacts Data
const contacts = ref<IContacts>();
//About Data

//Checking ROutes
if (route.params.id === "news") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "news");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "News");
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "extinction") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "extinction");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "FightingExtinction");
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "plain") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "plan");

  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "species") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "species");
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}

if (route.params.id === "education") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "education");
  latestNewsList.value = postlist.value?.filter((el) => el.category === "Education");
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "about") {
  const about = mainPages.value?.find((el) => el.subTitle === "aboutus");
  const sponsor = mainPages.value?.find((el) => el.subTitle === "sponsors");
  const career = mainPages.value?.find((el) => el.subTitle === "careers");
  const education = mainPages.value?.find((el) => el.subTitle === "education");
  const volunteer = mainPages.value?.find((el) => el.subTitle === "volunteer");
  contactPage.value && (contacts.value = contactPage.value);

  mainPageList.value = [];
  about && mainPageList.value.push(about);
  career && mainPageList.value.push(career);
  education && mainPageList.value.push(education);
  volunteer && mainPageList.value.push(volunteer);
  sponsor && mainPageList.value.push(sponsor);
  contacts.value &&
    mainPageList.value.push({
      id: contacts.value?.id,
      imageBgLink: contacts.value?.imageBgLink,
      imagePreviewLink: contacts.value?.imagePreviewLink,
      title: contacts.value?.title,
      subTitle: contacts.value?.title,
      shortDescription: contacts.value?.description,
      description: contacts.value?.description,
      extraeDscription: contacts.value?.extraeDscription,
    });

  about?.title && (metaTitle.value = about.title);
}
if (route.params.id === "membership") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.title === "Membership");
  if (membershipTable.value?.length) {
    stateMonth.value = membershipTable.value[0];
    stateYaer.value = membershipTable.value[1];
  }
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "ticket") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "tickets");
  if (ticketTable.value?.length) {
    singleState.value = ticketTable.value[0];
    unlimitedSTate.value = ticketTable.value[1];
  }
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
}
if (route.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.title === "Donate");
  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
  mainPageList.value = mainPages.value.filter(
    (el) => el.subTitle === "donate" && el.title !== "Donate",
  );
}
if (route.params.id === "contact") {
  contactPage.value && (contacts.value = contactPage.value);
  contacts.value?.title && (metaTitle.value = contacts.value?.title);
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
      :mane-page="newsMainPageContent"
      :donate-list="mainPageList" />
    <LazyInfoAbout
      v-else-if="route.params.id === 'about' && mainPageList?.length"
      :about-us="mainPageList"
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
