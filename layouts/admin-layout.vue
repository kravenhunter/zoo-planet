<script setup lang="ts">
import { useAlertDialog } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";

const { mainPages } = storeToRefs(useUnionStorage());

//Alert Instance
const alertDialog = useAlertDialog();

// const { data, error } = await useFetch<IResponse>(
//   "/api/prisma/base/list-by-type/main-content-pages",
// );
// console.log(error.value);
// console.log(data.value?.objectResult);
const { loadDataList } = useUnionStorage();

if (!mainPages.value.length) {
  const mainPagesPromise = loadDataList("base/list-by-type/main-content-pages");
  const newsPromise = loadDataList("base/list-by-type/post");
  const planPricesPromise = loadDataList("base/list-by-type/plan");
  const speciesPromise = loadDataList("base/list-by-type/specie");
  const contactsPromise = loadDataList("base/list-by-type/contacts");
  const membershipPriceыPromise = loadDataList("base/list-by-type/membership-price");
  const ticketPriceыPromise = loadDataList("base/list-by-type/ticket-price");

  await Promise.allSettled([
    newsPromise,
    planPricesPromise,
    contactsPromise,
    speciesPromise,
    mainPagesPromise,
    membershipPriceыPromise,
    ticketPriceыPromise,
  ]);
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
