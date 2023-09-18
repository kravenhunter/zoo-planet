<script setup lang="ts">
import { reactive } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useBookingStore } from "@/stores/bookingStore";
import type { TicketPrice } from "@prisma/client";

const props = defineProps<{
  singlEntry: TicketPrice | null | undefined;
  unlimited: TicketPrice | null | undefined;
}>();
const loadingMemberPrices = useIsLoading();

const { addTicketPrices, updateTicketPrices } = useBookingStore();

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

// stateMonth.value = {
//   adult: ticketTable.value?.length ? ticketTable.value[0].adult : "",
//   childCategoryFirst: ticketTable.value?.length ? ticketTable.value[0].childCategoryFirst : "",
//   childCategorySecond: ticketTable.value?.length ? ticketTable.value[0].childCategorySecond : "",
//   concession: ticketTable.value?.length ? ticketTable.value[0].concession : "",
//   seniors: ticketTable.value?.length ? ticketTable.value[0].seniors : "",
// };

// stateYaer.value = {
//   adult: ticketTable.value?.length ? ticketTable.value[1].adult : "",
//   childCategoryFirst: ticketTable.value?.length ? ticketTable.value[1].childCategoryFirst : "",
//   childCategorySecond: ticketTable.value?.length ? ticketTable.value[1].childCategorySecond : "",
//   concession: ticketTable.value?.length ? ticketTable.value[1].concession : "",
//   seniors: ticketTable.value?.length ? ticketTable.value[1].seniors : "",
// };

const addPrices = async () => {
  loadingMemberPrices.value = true;
  if (props.singlEntry?.id && props.unlimited?.id) {
    const result = await updateTicketPrices(
      props.singlEntry!.id,
      props.unlimited!.id,
      stateSingle,
      stateUnlimited,
    );
    delayLoading(result);
  } else {
    const result = await addTicketPrices(stateSingle, stateUnlimited);
    delayLoading(result);
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
