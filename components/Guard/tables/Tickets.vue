<script setup lang="ts">
import { navigateTo, reactive, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import type { ITicketPrice } from "~/types";
import packToFormData from "~/utils/packToFormData";

const props = defineProps<{
  singlEntry: ITicketPrice | null | undefined;
  unlimited: ITicketPrice | null | undefined;
}>();
const loadingMemberPrices = useIsLoading();
const route = useRoute();
console.log(route);
const { createOrUpdateData } = useUnionStorage();

const stateSingle = reactive({
  adult: props.singlEntry?.adult ?? "",
  childCategoryFirst: props.singlEntry?.childCategoryFirst ?? "",
  childCategorySecond: props.singlEntry?.childCategorySecond ?? "",
  concession: props.singlEntry?.concession ?? "",
  seniors: props.singlEntry?.seniors ?? "",
});

const stateUnlimited = reactive({
  adult: props.unlimited?.adult ?? "",
  childCategoryFirst: props.unlimited?.childCategoryFirst ?? "",
  childCategorySecond: props.unlimited?.childCategorySecond ?? "",
  concession: props.unlimited?.concession ?? "",
  seniors: props.unlimited?.seniors ?? "",
});

const addPrices = async () => {
  loadingMemberPrices.value = true;

  if (props.singlEntry?.id && props.unlimited?.id) {
    //  const { data } = await useFetch("/api/prisma/base/create-by-type/membership-price");

    const getpacksinglEntry = await packToFormData(props.singlEntry, props.singlEntry?.id);
    const getpackunlimited = await packToFormData(props.unlimited, props.unlimited.id);

    const singlEntryResult = await createOrUpdateData(
      `base/update-by-type/ticket-price`,
      getpacksinglEntry,
    );
    const unlimitedResult = await createOrUpdateData(
      `base/update-by-type/ticket-price`,
      getpackunlimited,
    );

    if (singlEntryResult.statusCode === 200 && unlimitedResult.statusCode === 200) {
      delayLoading("Success");
      await new Promise((resolve) =>
        setTimeout(() => {
          navigateTo(String(route.query.id));
        }, 2500),
      );
    } else {
      delayLoading("Error");
    }
  } else {
    const getpacksinglEntry = await packToFormData(props.singlEntry, null);
    const getpackunlimited = await packToFormData(props.unlimited, null);

    const singlEntryResult = await createOrUpdateData(
      `base/create-by-type/ticket-price`,
      getpacksinglEntry,
    );
    const unlimitedResult = await createOrUpdateData(
      `base/create-by-type/ticket-price`,
      getpackunlimited,
    );

    if (singlEntryResult.statusCode === 200 && unlimitedResult.statusCode === 200) {
      delayLoading("Success");
      await new Promise((resolve) =>
        setTimeout(() => {
          navigateTo(String(route.query.id));
        }, 2500),
      );
    } else {
      delayLoading("Error");
    }
  }
};

const ticketTableHeaders = [
  { title: "Age Ratio" },
  { title: "Single Entry" },
  { title: "Unlimited" },
];
</script>

<template>
  <article class="price_table">
    <v-overlay tabindex="0" :model-value="loadingMemberPrices" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="py-8 px-6 d-flex">
      <v-row>
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th
                    v-for="(el, i) in ticketTableHeaders"
                    :key="i"
                    class="py-5 text-left font-weight-bold">
                    {{ el.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-subtitle-2">
                <tr>
                  <td class="pl-7 py-5">Adult</td>
                  <td class="py-5">
                    <v-text-field v-model="stateSingle.adult" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateUnlimited.adult" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (4-15 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateSingle.childCategoryFirst"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateUnlimited.childCategoryFirst"
                      label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Child (0-3 years)</td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateSingle.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field
                      v-model="stateUnlimited.childCategorySecond"
                      label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Concession**</td>
                  <td class="py-5">
                    <v-text-field v-model="stateSingle.concession" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateUnlimited.concession" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Seniors**</td>
                  <td class="py-5">
                    <v-text-field v-model="stateSingle.seniors" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateUnlimited.seniors" label="$0"></v-text-field>
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
                      append-icon="mdi-paw"
                      @click="addPrices">
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
