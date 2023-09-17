<script setup lang="ts">
import { onMounted } from "#imports";
import { useAlertDialog } from "@/composables/states";
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

const alertDialog = useAlertDialog();
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

/* const { $supabaseStore } = useNuxtApp(); */

/* const check = () => {
  console.log($supabaseStore);
}; */
onMounted(() => {});
</script>

<template>
  <v-layout class="customLayout rounded rounded-md bg-black">
    <UiGuardSideBar />
    <UiGuardTopBar />

    <!-- <v-main class="d-flex align-center justify-center"> -->
    <!--     <v-main class="d-flex align-center justify-center">
      <slot />
    </v-main> -->

    <div class="d-flex flex-column position-relative w-100">
      <div
        class="position-absolute d-flex justify-end"
        style="width: 95%; z-index: 100; top: 4.5rem">
        <div class="alert">
          <v-fade-transition hide-on-leave>
            <v-alert v-if="alertDialog.dialogModal" :color="alertDialog.colorIcon" variant="tonal">
              <div class="d-flex align-center justify-center">
                <v-icon
                  :color="alertDialog.colorIcon"
                  :icon="alertDialog.iconResult"
                  size="25"></v-icon>
                <v-card-title class="font-weight-bold">{{ alertDialog.titleResult }}</v-card-title>
              </div>

              <template #append>
                <v-btn size="20" variant="text" @click="alertDialog.dialogModal = false">
                  <v-icon :color="alertDialog.colorIcon" icon="$close" size="20"></v-icon>
                </v-btn>
              </template>
            </v-alert>
          </v-fade-transition>
        </div>
      </div>
      <v-main class="d-flex align-center justify-center">
        <slot />
      </v-main>
    </div>
  </v-layout>
</template>

<style scoped lang="scss">
.customLayout {
  min-height: 100vh;
}
</style>
