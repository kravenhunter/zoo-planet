<script setup lang="ts">
import { ref, useRoute } from "#imports";
import { useBookingStore } from "@/stores/bookingStore";

import { storeToRefs } from "pinia";
import type { ITicketPrice } from "types/ITicketPrice";

const route = useRoute();
const dialogModal = ref(false);
const titleResult = ref("Success");
const iconResult = ref("mdi-check-circle-outline");
const colorIcon = ref("");
const { ticketTable, loadingMemberPrices } = storeToRefs(useBookingStore());
const { addTicketPrices, updateTicketPrices } = useBookingStore();

const stateMonth = ref<ITicketPrice>();

const stateYaer = ref<ITicketPrice>();

stateMonth.value = {
  adult: ticketTable.value?.length ? ticketTable.value[0].adult : "",
  childCategoryFirst: ticketTable.value?.length ? ticketTable.value[0].childCategoryFirst : "",
  childCategorySecond: ticketTable.value?.length ? ticketTable.value[0].childCategorySecond : "",
  concession: ticketTable.value?.length ? ticketTable.value[0].concession : "",
  seniors: ticketTable.value?.length ? ticketTable.value[0].seniors : "",
};

stateYaer.value = {
  adult: ticketTable.value?.length ? ticketTable.value[1].adult : "",
  childCategoryFirst: ticketTable.value?.length ? ticketTable.value[1].childCategoryFirst : "",
  childCategorySecond: ticketTable.value?.length ? ticketTable.value[1].childCategorySecond : "",
  concession: ticketTable.value?.length ? ticketTable.value[1].concession : "",
  seniors: ticketTable.value?.length ? ticketTable.value[1].seniors : "",
};
const loadingDelay = (result: string | null) => {
  setTimeout(() => {
    loadingMemberPrices.value = false;
    if (result) {
      titleResult.value = result;
      colorIcon.value = result.toLocaleLowerCase();
      result === "Success" && (iconResult.value = "mdi-check-circle-outline");
      result === "Error" && (iconResult.value = "mdi-close-thick");
      dialogModal.value = !dialogModal.value;
    }
  }, 3000);
};
const addPrices = async () => {
  if (stateMonth.value && stateYaer.value) {
    loadingMemberPrices.value = !loadingMemberPrices.value;
    const result = await addTicketPrices(stateMonth.value, stateYaer.value);
    loadingDelay(result);
  }
};
const updatePrices = async (id: string) => {
  loadingMemberPrices.value = !loadingMemberPrices.value;
  if (stateMonth.value && stateYaer.value && ticketTable.value?.length) {
    const result = await updateTicketPrices(
      ticketTable.value[0].id,
      ticketTable.value[1].id,
      stateMonth.value,
      stateYaer.value,
    );
    loadingDelay(result);
  }
};

const tableRow = [{ title: "Monthly" }, { title: "Yearly" }];
</script>

<template>
  <article class="price_table">
    <v-overlay tabindex="0" :model-value="loadingMemberPrices" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="py-8 px-6 position-relative d-flex justify-end">
      <div class="position-absolute">
        <v-fade-transition hide-on-leave>
          <v-alert v-if="!dialogModal" color="error" variant="flat">
            <div class="d-flex align-center justify-center">
              <v-icon color="white" :icon="iconResult" size="25"></v-icon>
              <v-card-title class="font-weight-bold">{{ titleResult }}</v-card-title>
            </div>

            <template #append>
              <v-btn size="20" variant="text" @click="dialogModal = false">
                <v-icon :color="colorIcon" icon="$close" size="20"></v-icon>
              </v-btn>
            </template>
          </v-alert>
        </v-fade-transition>
      </div>
      <!--       <v-row>
        <v-col cols="12">
          <v-list lines="two" class="bg-grey-darken-4">
            <v-list-subheader
              class="text-h6 text-white"
              title="News main content"></v-list-subheader>
            <v-list-item>
              <CardItem
                image-heigth="200"
                image-width="200"
                :inline="true"
                class="card_main"
                class-card="justify-start"
                class-content="d-flex flex-column align-self-center "
                colorbg="grey-darken-4"
                :image-source="membership.sourceTitle"
                font-title-size="2rem"
                :title-card="membership.title"
                :subtitle-card="membership.text"
                button-title="Edit"
                button-align="align-center"
                :button-slot="true">
                <v-btn
                  class="px-10 text-subtitle-1 mx-auto text-white text-grey-lighten-5"
                  color="light-blue-darken-4"
                  variant="flat"
                  size="large"
                  :to="{ path: `/guard/main/news` }"
                  append-icon="mdi-paw">
                  Edit
                </v-btn>
              </CardItem>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
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
                    <v-text-field v-model="stateMonth!.adult" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.adult" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (4-15 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateMonth!.childCategoryFirst"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.childCategoryFirst" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (0-3 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateMonth!.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateYaer!.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Concession**</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth!.concession" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.concession" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Seniors**</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth!.seniors" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.seniors" label="$0"></v-text-field>
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
    </v-container>
  </article>
</template>

<style scoped lang="scss"></style>
