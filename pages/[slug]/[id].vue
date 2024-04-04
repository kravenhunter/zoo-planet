<script setup lang="ts">
import { ref, useRoute, useSeoMeta } from "#imports";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import type { IContentPage, IMembershipPrice, IPost, ITicketPrice } from "~/types";

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
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "aboutus");

  const sponsor = mainPages.value?.find((el) => el.subTitle === "sponsors");
  const career = mainPages.value?.find((el) => el.subTitle === "careers");
  const education = mainPages.value?.find((el) => el.subTitle === "education");
  const volunteer = mainPages.value?.find((el) => el.subTitle === "volunteer");

  mainPageList.value = [];
  career && mainPageList.value.push(career);
  education && mainPageList.value.push(education);
  volunteer && mainPageList.value.push(volunteer);
  sponsor && mainPageList.value.push(sponsor);
  contactPage.value &&
    mainPageList.value.push({
      id: contactPage.value?.id,
      imageBgLink: contactPage.value?.imageBgLink,
      imagePreviewLink: contactPage.value?.imagePreviewLink,
      title: contactPage.value?.title,
      subTitle: contactPage.value?.title,
      shortDescription: contactPage.value?.description,
      description: contactPage.value?.description,
      extraeDscription: contactPage.value?.extraeDscription,
    });

  newsMainPageContent.value?.title && (metaTitle.value = newsMainPageContent.value.title);
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
  contactPage.value?.title && (metaTitle.value = contactPage.value?.title);
}
useSeoMeta({
  title: metaTitle.value ?? "Error result",
  ogTitle: metaTitle.value ?? "Error result",
});
</script>

<template>
  <div class="wrapper">
    <LazyInfoDonate
      v-if="route.params.id === 'donate' && newsMainPageContent"
      :mane-page="newsMainPageContent"
      :donate-list="mainPageList" />
    <LazyInfoAbout
      v-else-if="route.params.id === 'about' && newsMainPageContent"
      :about-us="newsMainPageContent"
      :about-pages="mainPageList" />
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
      v-else-if="route.params.id === 'contact' && contactPage"
      :contact-main="contactPage" />
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
