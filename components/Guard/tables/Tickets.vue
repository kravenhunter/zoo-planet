<script setup lang="ts">
import { reactive } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import sender from "~/composables/sender";
import type { ITicketPrice } from "~/types";

const props = defineProps<{
  singlEntry: ITicketPrice | null | undefined;
  unlimited: ITicketPrice | null | undefined;
}>();
const loadingMemberPrices = useIsLoading();

const { createOrUpdateData, loadDataList } = useUnionStorage();

const stateSingle = reactive({
  adult: props.singlEntry?.adult ?? "30",
  childCategoryFirst: props.singlEntry?.childCategoryFirst ?? "FREE",
  childCategorySecond: props.singlEntry?.childCategorySecond ?? "FREE",
  concession: props.singlEntry?.concession ?? "22.50",
  seniors: props.singlEntry?.seniors ?? "27.00",
});

const stateUnlimited = reactive({
  adult: props.unlimited?.adult ?? "11.50",
  childCategoryFirst: props.unlimited?.childCategoryFirst ?? "FREE",
  childCategorySecond: props.unlimited?.childCategorySecond ?? "FREE",
  concession: props.unlimited?.concession ?? "8.50",
  seniors: props.unlimited?.seniors ?? "10.50",
});

const addPrices = async () => {
  const createPath = `base/create-by-type/ticket-price`;
  const updatePath = "base/update-by-type/ticket-price";
  const loadDataPath = "base/list-by-type/ticket-price";

  loadingMemberPrices.value = true;

  if (props.singlEntry?.id && props.unlimited?.id) {
    const singlEntryPrimose = sender(
      { ...stateSingle },
      updatePath,
      props.singlEntry.id,
      createOrUpdateData,
    );
    const unlimitedPrimose = sender(
      { ...stateUnlimited },
      updatePath,
      props.unlimited.id,
      createOrUpdateData,
    );
    const promiseResult = await Promise.all([singlEntryPrimose, unlimitedPrimose]);

    if (promiseResult[0].statusCode === 200) {
      await loadDataList(loadDataPath);
      delayLoading("Success");
    } else {
      console.log(promiseResult[0].statusMessage);

      delayLoading("Error");
    }
  } else {
    const singlEntryPrimose = sender({ ...stateSingle }, createPath, null, createOrUpdateData);
    const unlimitedPrimose = sender({ ...stateUnlimited }, createPath, null, createOrUpdateData);
    const promiseResult = await Promise.all([singlEntryPrimose, unlimitedPrimose]);

    if (promiseResult[0].statusCode === 200) {
      await loadDataList(loadDataPath);
      delayLoading("Success");
    } else {
      console.log(promiseResult[0].statusMessage);

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
