<script setup lang="ts">
import { reactive } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import sender from "~/composables/sender";
import type { IMembershipPrice } from "~/types";

const props = defineProps<{
  monthly?: IMembershipPrice;
  yarly?: IMembershipPrice;
}>();

const stateMonth = reactive({
  adult: props.monthly?.adult ?? "11.50",
  childCategoryFirst: props.monthly?.childCategoryFirst ?? "Free",
  childCategorySecond: props.monthly?.childCategorySecond ?? "4.50",
  concession: props.monthly?.concession ?? "8.50",
  seniors: props.monthly?.seniors ?? "10.50",
  teacher: props.monthly?.teacher ?? "8.25",
  supporter: props.monthly?.supporter ?? "5",
});

const stateYaer = reactive({
  adult: props.yarly?.adult ?? "138",
  childCategoryFirst: props.yarly?.childCategoryFirst ?? "Free",
  childCategorySecond: props.yarly?.childCategorySecond ?? "54",
  concession: props.yarly?.concession ?? "102",
  seniors: props.yarly?.seniors ?? "126",
  teacher: props.yarly?.teacher ?? "99",
  supporter: props.yarly?.supporter ?? "60",
});

const { createOrUpdateData, loadDataList } = useUnionStorage();
const loadingMemberPrices = useIsLoading();

const tableRow = [{ title: "Monthly" }, { title: "Yearly" }];

const addPrices = async () => {
  const createPath = `base/create-by-type/membership-price`;
  const updatePath = "base/update-by-type/membership-price";
  const loadDataPath = "base/list-by-type/membership-price";

  loadingMemberPrices.value = true;
  if (props.monthly?.id && props.yarly?.id) {
    // Old
    // const getpackDataMonth = await packToFormData({ ...stateMonth }, props.monthly.id);
    // const getpackDataYar = await packToFormData({ ...stateYaer }, props.yarly.id);
    // const monthlyResult = await createOrUpdateData(
    //   `base/update-by-type/membership-price`,
    //   getpackDataMonth,
    // );
    // const yearlyResult = await createOrUpdateData(
    //   `base/update-by-type/membership-price`,
    //   getpackDataYar,
    // );
    const monthlyPromise = sender(
      { ...stateMonth },
      updatePath,
      props.monthly.id,
      createOrUpdateData,
    );
    const yearlyPromise = sender({ ...stateYaer }, updatePath, props.yarly.id, createOrUpdateData);
    const promiseResult = await Promise.all([monthlyPromise, yearlyPromise]);

    if (promiseResult[0].statusCode === 200) {
      await loadDataList(loadDataPath);
      delayLoading("Success");
    } else {
      console.log(promiseResult[0].statusMessage);

      delayLoading("Error");
    }
  } else {
    const monthlyPromise = sender({ ...stateMonth }, createPath, null, createOrUpdateData);
    const yearlyPromise = sender({ ...stateYaer }, createPath, null, createOrUpdateData);
    const promiseResult = await Promise.all([monthlyPromise, yearlyPromise]);

    if (promiseResult[0].statusCode === 200) {
      await loadDataList(loadDataPath);
      delayLoading("Success");
    } else {
      console.log(promiseResult[0].statusMessage);

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
