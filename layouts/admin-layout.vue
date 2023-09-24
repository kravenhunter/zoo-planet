<script setup lang="ts">
import { useAlertDialog } from "@/composables/states";
import { useUnionStore } from "@/stores/storeGenerics";
import { storeToRefs } from "pinia";

// import { useBookingStore } from "@/stores/bookingStore";
// import { useContactsStore } from "@/stores/contactsStore";
// import { useMainContentStore } from "@/stores/mainContentStore";
// import { usePostStore } from "@/stores/postStore";
// import { useSpeciesStore } from "@/stores/speciesStore";
// import { storeToRefs } from "pinia";

const { postlist, specieList, mainPages, contactPage, membershipTable, ticketTable, planTable } =
  storeToRefs(useUnionStore());
const { loadDataList } = useUnionStore();
//Alert Instance
const alertDialog = useAlertDialog();

// //Species Data
// const { specieList } = storeToRefs(useSpeciesStore());
// const { loadSpeciesList } = useSpeciesStore();

// //Contacts Data
// const { contactPage } = storeToRefs(useContactsStore());
// const { loadContacts } = useContactsStore();

// const { mainPages } = storeToRefs(useMainContentStore());
// const { loadPagesContent } = useMainContentStore();

// //  Articles
// const { postlist } = storeToRefs(usePostStore());
// const { loadPostList } = usePostStore();

// // Membership Prices & Table
// const { membershipTable, ticketTable } = storeToRefs(useBookingStore());
// const { loadTables } = useBookingStore();

if (
  !mainPages.value &&
  !specieList.value &&
  !postlist.value &&
  !membershipTable.value &&
  !ticketTable.value &&
  !contactPage.value &&
  !planTable.value
) {
  await loadDataList();
}
</script>

<template>
  <v-layout class="customLayout rounded rounded-md bg-black">
    <UiGuardSideBar />
    <UiGuardTopBar />

    <div class="d-flex flex-column position-relative w-100">
      <div
        class="position-absolute d-flex justify-end"
        style="width: 95%; z-index: 100; top: 4.5rem">
        <div class="alert" v-if="alertDialog.dialogModal">
          <v-fade-transition hide-on-leave>
            <v-alert v-if="alertDialog.dialogModal" :color="alertDialog.colorIcon" variant="flat">
              <div class="d-flex align-center justify-center">
                <v-icon color="white" :icon="alertDialog.iconResult" size="25"></v-icon>
                <v-card-title class="font-weight-bold">{{ alertDialog.titleResult }}</v-card-title>
              </div>

              <!-- <template #append>
                <v-btn size="20" variant="text" @click="alertDialog.dialogModal = false">
                  <v-icon color="white" icon="$close" size="20"></v-icon>
                </v-btn>
              </template> -->
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
