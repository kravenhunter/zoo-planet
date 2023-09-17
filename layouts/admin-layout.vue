<script setup lang="ts">
import { onMounted } from "#imports";
import { useBookingStore } from "@/stores/bookingStore";
import { useContactsStore } from "@/stores/contactsStore";
import { useMainContentStore } from "@/stores/mainContentStore";
import { usePostStore } from "@/stores/postStore";
import { useSpeciesStore } from "@/stores/speciesStore";
import { storeToRefs } from "pinia";

//Species Data
const { specieList } = storeToRefs(useSpeciesStore());
const { loadSpeciesList } = useSpeciesStore();

//Contacts Data
const { contactPage } = storeToRefs(useContactsStore());
const { loadContacts } = useContactsStore();

const { mainPages } = storeToRefs(useMainContentStore());
const { loadPagesContent } = useMainContentStore();

//  Articles
const { postlist } = storeToRefs(usePostStore());
const { loadPostList } = usePostStore();

// Membership Prices & Table
const { membershipTable, ticketTable } = storeToRefs(useBookingStore());
const { loadTables } = useBookingStore();

if (!mainPages.value) {
  await loadPagesContent();
}
if (!postlist.value) {
  await loadPostList();
}

if (!membershipTable.value && !ticketTable.value) {
  await loadTables();
}
if (!contactPage.value) {
  await loadContacts();
}
if (!specieList.value) {
  await loadSpeciesList();
}
const nav = [
  { title: "My News", icon: "mdi-folder", to: "/guard/section/news" },
  { title: "Species", icon: "mdi-account-multiple", to: "/guard/section/species" },
  { title: "Fighting Extintion", icon: "mdi-star", to: "/guard/section/fighting" },
  { title: "Education", icon: "mdi-history", to: "/guard/section/education" },
  { title: "About Us", icon: "mdi-check-circle", to: "/guard/section/aboutus" },
  { title: "Contact Us", icon: "mdi-upload", to: "/guard/section/contactus" },
  { title: "Membership", icon: "mdi-square", to: "/guard/section/membership" },
  { title: "Tickets", icon: "mdi-history", to: "/guard/section/tickets" },
  { title: "Donate", icon: "mdi-cloud-upload", to: "/guard/section/donate" },
];
/* const { $supabaseStore } = useNuxtApp(); */
const open = ["Details"];
const isOpen = false;
/* const check = () => {
  console.log($supabaseStore);
}; */
onMounted(() => {});
</script>

<template>
  <v-layout class="customLayout rounded rounded-md bg-black">
    <v-navigation-drawer color="black pt-10  bg-grey-darken-4">
      <v-list v-model:opened="open">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="John Leider"
          subtitle="john@google.com">
        </v-list-item>
        <v-list-group value="Details">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog-outline"
              title="More Details :"></v-list-item>
          </template>
          <v-list-item title="State :" subtitle="Administrator"> </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in nav" :key="i" :value="item" color="success">
          <template #prepend>
            <v-icon size="30" :icon="item.icon"></v-icon>
          </template>
          <NuxtLink :to="item.to">
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="bg-grey-darken-4" title="Application bar">
      <template #prepend>
        <v-avatar size="40">
          <v-icon color="success" icon="$vuetify" size="50"></v-icon>
        </v-avatar>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped lang="scss">
.customLayout {
  min-height: 100vh;
}
</style>
