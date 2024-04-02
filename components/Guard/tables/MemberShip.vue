<script setup lang="ts">
import { navigateTo, reactive, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import type { IMembershipPrice } from "~/types";
import packToFormData from "~/utils/packToFormData";

const props = defineProps<{
  monthly?: IMembershipPrice;
  yarly?: IMembershipPrice;
}>();

const route = useRoute();
console.log(route);
const stateMonth = reactive({
  adult: props.monthly?.adult ?? "",
  childCategoryFirst: props.monthly?.childCategoryFirst ?? "",
  childCategorySecond: props.monthly?.childCategorySecond ?? "",
  concession: props.monthly?.concession ?? "",
  seniors: props.monthly?.seniors ?? "",
  teacher: props.monthly?.teacher ?? "",
  supporter: props.monthly?.supporter ?? "",
});

const stateYaer = reactive({
  adult: props.monthly?.adult ?? "",
  childCategoryFirst: props.yarly?.childCategoryFirst ?? "",
  childCategorySecond: props.yarly?.childCategorySecond ?? "",
  concession: props.yarly?.concession ?? "",
  seniors: props.yarly?.seniors ?? "",
  teacher: props.yarly?.teacher ?? "",
  supporter: props.yarly?.supporter ?? "",
});

const { createOrUpdateData } = useUnionStorage();
const loadingMemberPrices = useIsLoading();

const tableRow = [{ title: "Monthly" }, { title: "Yearly" }];

const addPrices = async () => {
  loadingMemberPrices.value = true;
  if (props.monthly?.id && props.yarly?.id) {
    //  const { data } = await useFetch("/api/prisma/base/create-by-type/membership-price");

    const getpackDataMonth = await packToFormData(stateMonth, props.monthly.id);
    const getpackDataYar = await packToFormData(stateMonth, props.yarly.id);
    const monthlyResult = await createOrUpdateData(
      `base/update-by-type/membership-price`,
      getpackDataMonth,
    );
    const yearlyResult = await createOrUpdateData(
      `base/update-by-type/membership-price`,
      getpackDataYar,
    );

    if (monthlyResult.statusCode === 200 && yearlyResult.statusCode === 200) {
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
    const getpackDataMonth = await packToFormData(stateMonth, null);
    const getpackDataYar = await packToFormData(stateMonth, null);
    const monthlyResult = await createOrUpdateData(
      `base/create-by-type/membership-price`,
      getpackDataMonth,
    );
    const yearlyResult = await createOrUpdateData(
      `base/create-by-type/membership-price`,
      getpackDataYar,
    );
    if (monthlyResult.statusCode === 200 && yearlyResult.statusCode === 200) {
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
</script>

<template>
  <article class="price_table">
    <v-overlay tabindex="0" :model-value="loadingMemberPrices" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="py-8 px-6">
      <v-row>
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th></th>
                  <th v-for="(el, i) in tableRow" :key="i" class="py-5 text-left font-weight-bold">
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
                  <td class="pl-7 py-5">Child (under 16)</td>
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
                  <td class="pl-7 py-5">Zoo Crew (under 16)</td>
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
                  <td class="pl-7 py-5">Concession</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth!.concession" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.concession" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Senior</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth!.seniors" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.seniors" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">Teacher</td>
                  <td class="py-5">
                    <v-text-field v-model="stateMonth!.teacher" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="stateYaer!.teacher" label="$0"></v-text-field>
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
