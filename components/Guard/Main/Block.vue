<script setup lang="ts">
import { ref, useRoute } from "#imports";
import { useBookingStore } from "@/stores/bookingStore";
import { useContactsStore } from "@/stores/contactsStore";
import { useMainContentStore } from "@/stores/mainContentStore";
import { usePostStore } from "@/stores/postStore";
import { useSpeciesStore } from "@/stores/speciesStore";
import type { ContactUs, ContentPages, MembershipPrice, Post, TicketPrice } from "@prisma/client";
import { storeToRefs } from "pinia";

const router = useRoute();

const { specieList } = storeToRefs(useSpeciesStore());
//Contacts Data
const { contactPage } = storeToRefs(useContactsStore());
const contacts = ref<ContactUs>();

// Main Content Data
const { mainPages } = storeToRefs(useMainContentStore());

//  Articles
const { postlist } = storeToRefs(usePostStore());
const newsMainPageContent = ref<ContentPages>();
const latestNewsList = ref<Post[]>();

// Membership Prices & Table
const { membershipTable, loadingMemberPrices, ticketTable } = storeToRefs(useBookingStore());
const { updateMemberShipPrices, addTicketPrices, updateTicketPrices } = useBookingStore();
const tableRow = [{ title: "Monthly" }, { title: "Yearly" }];
const stateMonth = ref<MembershipPrice>();
const stateYaer = ref<MembershipPrice>();

const addPrices = async () => {
  loadingMemberPrices.value = !loadingMemberPrices.value;
  if (stateMonth.value && stateYaer.value) {
    await updateMemberShipPrices(
      stateMonth.value?.id,
      stateYaer.value.id,
      {
        adult: stateMonth.value.adult,
        childCategoryFirst: stateMonth.value.childCategoryFirst,
        childCategorySecond: stateMonth.value.childCategorySecond,
        concession: stateMonth.value.concession,
        seniors: stateMonth.value.seniors,
        teacher: stateMonth.value.teacher,
        supporter: stateMonth.value.supporter,
      },
      {
        adult: stateYaer.value.adult,
        childCategoryFirst: stateYaer.value.childCategoryFirst,
        childCategorySecond: stateYaer.value.childCategorySecond,
        concession: stateYaer.value.concession,
        seniors: stateYaer.value.seniors,
        teacher: stateYaer.value.teacher,
        supporter: stateYaer.value.supporter,
      },
    );
  }
};
// Ticket Prices & Table
const ticketTableHeaders = [
  { title: "Age Ratio" },
  { title: "Single Entry" },
  { title: "Unlimited" },
];
const singleState = ref<TicketPrice>();
const unlimitedSTate = ref<TicketPrice>();
const addTickets = async () => {
  if (singleState.value && unlimitedSTate.value) {
    await addTicketPrices(
      {
        adult: singleState.value.adult,
        childCategoryFirst: singleState.value.childCategoryFirst,
        childCategorySecond: singleState.value.childCategorySecond,
        concession: singleState.value.concession,
        seniors: singleState.value.seniors,
      },
      {
        adult: unlimitedSTate.value.adult,
        childCategoryFirst: unlimitedSTate.value.childCategoryFirst,
        childCategorySecond: unlimitedSTate.value.childCategorySecond,
        concession: unlimitedSTate.value.concession,
        seniors: unlimitedSTate.value.seniors,
      },
    );
  }
};

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
}
if (router.params.id === "donate") {
  newsMainPageContent.value = mainPages.value?.find((el) => el.subTitle === "Donate");
}
if (router.params.id === "contactus") {
  contactPage.value?.length && (contacts.value = contactPage.value[0]);
}
</script>

<template>
  <section class="main_content">
    <v-container class="py-8 px-6" fluid>
      <v-row v-if="newsMainPageContent">
        <v-col cols="12">
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader class="text-h6 text-white" title="Content Page"></v-list-subheader>
            <v-list-item>
              <CardItem
                image-heigth="200"
                image-width="200"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="newsMainPageContent?.imageBgLink"
                font-title-size="2rem"
                :title-card="newsMainPageContent?.title"
                :subtitle-card="newsMainPageContent?.shortDescription"
                button-title="Edit"
                button-align="align-center"
                :button-slot="true">
                <v-btn
                  class="px-10 text-subtitle-1 mx-auto text-white text-grey-lighten-5"
                  color="light-blue-darken-4"
                  variant="flat"
                  size="large"
                  :to="{ path: `/guard/main/${router.params.id}` }"
                  append-icon="mdi-paw">
                  Edit
                </v-btn>
              </CardItem>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row v-if="latestNewsList?.length">
        <v-col cols="12">
          <v-btn
            class="px-10 text-subtitle-1 ma-6 text-white text-grey-lighten-5"
            color="light-blue-darken-4"
            variant="flat"
            size="large"
            to="/guard/posts/create"
            append-icon="mdi-paw">
            Create post
          </v-btn>
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader class="text-h6 text-white" title="News & Programs"></v-list-subheader>
            <v-list-item v-for="(el, i) in latestNewsList" :key="i">
              <CardItem
                :shadow-card="10"
                image-heigth="200"
                image-width="300"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="el.imageBgLink"
                font-title-size="2rem"
                :title-card="el.title"
                :subtitle-card="el.description"
                button-title="Edit"
                button-align="align-self-end"
                :button-slot="true">
                <v-btn
                  class="px-10 text-subtitle-1 text-white text-grey-lighten-5"
                  color="light-blue-darken-4"
                  variant="flat"
                  size="large"
                  append-icon="mdi-paw"
                  :to="{ path: `/guard/posts/${el.id}` }">
                  Edit
                </v-btn>
              </CardItem>
              <v-divider></v-divider>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row v-if="stateMonth && stateYaer">
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th></th>
                  <th>
                    <div class="loading" v-if="loadingMemberPrices">
                      <p>Loading.....</p>
                    </div>
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th class="py-5 text-left font-weight-bold" v-for="(el, i) in tableRow" :key="i">
                    {{ el.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-subtitle-2">
                <tr>
                  <td class="pl-7 py-5">Adult</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.adult" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.adult" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (under 16)</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.childCategoryFirst" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.childCategoryFirst" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Zoo Crew (under 16)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateMonth.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.childCategorySecond" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Concession</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.concession" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.concession" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Senior</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.seniors" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.seniors" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Teacher</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.teacher" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.teacher" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Supporter</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth.supporter" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer.supporter" label="$0"></v-text-field>
                  </td>
                </tr>
                <!--                 <tr v-for="(item, i) in tableColumn" :key="i">
                  <td class="pl-7 py-5">{{ item.title }}</td>
                  <td class="py-5">{{ monthly[i].price }}</td>
                  <td class="py-5">{{ yarly[i].price }}</td>
                </tr> -->
                <tr>
                  <td class="d-flex justify-end align-center py-10">
                    <v-btn
                      :loading="loadingMemberPrices"
                      class="text-subtitle-1 text-white text-grey-lighten-5"
                      color="light-blue-darken-4"
                      variant="flat"
                      size="x-large"
                      @click="addPrices"
                      append-icon="mdi-paw">
                      Update prices
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </article>
        </v-col>
      </v-row>
      <v-row v-if="singleState && unlimitedSTate">
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th></th>
                  <th>
                    <div class="loading" v-if="loadingMemberPrices">
                      <p>Loading.....</p>
                    </div>
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th
                    class="py-5 text-left font-weight-bold"
                    v-for="(el, i) in ticketTableHeaders"
                    :key="i">
                    {{ el.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-subtitle-2">
                <tr>
                  <td class="pl-7 py-5">Adult</td>
                  <td class="py-5">
                    <v-text-field v-model="singleState.adult" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="unlimitedSTate.adult" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (4-15 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="singleState.childCategoryFirst"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field
                      v-model="unlimitedSTate.childCategoryFirst"
                      label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (0-3 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="singleState.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field
                      v-model="unlimitedSTate.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Concession</td>
                  <td class="py-5">
                    <v-text-field v-model="singleState.concession" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="unlimitedSTate.concession" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Senior</td>
                  <td class="py-5">
                    <v-text-field v-model="singleState.seniors" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="unlimitedSTate.seniors" label="$0"></v-text-field>
                  </td>
                </tr>

                <tr>
                  <td class="d-flex justify-end align-center py-10">
                    <v-btn
                      :loading="loadingMemberPrices"
                      class="text-subtitle-1 text-white text-grey-lighten-5"
                      color="light-blue-darken-4"
                      variant="flat"
                      size="x-large"
                      @click="addTickets"
                      append-icon="mdi-paw">
                      Update prices
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </article>
        </v-col>
      </v-row>
      <LazyGuardContactBlock v-if="contacts" :contact-data="contacts" />

      <LazyGuardSpeciesList v-if="router.params.id === 'species'" />
      <LazyGuardTablesTickets v-if="router.params.id === 'tickets'" />
    </v-container>
  </section>
</template>

<style scoped></style>
