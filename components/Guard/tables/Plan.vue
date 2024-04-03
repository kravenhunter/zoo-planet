<script setup lang="ts">
import { reactive } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import sender from "~/composables/sender";
import type { IPlan } from "~/types";

const props = defineProps<{
  planPrices?: IPlan[];
}>();
const loadingMemberPrices = useIsLoading();

const { createOrUpdateData, loadDataList } = useUnionStorage();

const getfirstTable = props.planPrices && props.planPrices[0];
const getsecondTable = props.planPrices && props.planPrices[1];
const getthirdTable = props.planPrices && props.planPrices[2];

const firstTable = reactive({
  title: getfirstTable?.title ?? "Early Childhood Centres and Kindergartens ",
  admission: getfirstTable?.admission ?? "23",
  faunaPark: getfirstTable?.faunaPark ?? "15",
  adultRatio: getfirstTable?.adultRatio ?? "1 for every 3 children",
});
const secondTable = reactive({
  title: getsecondTable?.title ?? "Foundation to Year 2",
  admission: getsecondTable?.admission ?? "23",
  faunaPark: getsecondTable?.faunaPark ?? "15",
  adultRatio: getsecondTable?.adultRatio ?? "1 for every 5  students",
});
const thirdTable = reactive({
  title: getthirdTable?.title ?? "Tertiary",
  admission: getthirdTable?.admission ?? "23",
  faunaPark: getthirdTable?.faunaPark ?? "15",
  adultRatio: getthirdTable?.adultRatio ?? "1 for every 5  students",
});
const addPrices = async () => {
  const createPath = "base/create-by-type/plan";
  const updatePath = `base/update-by-type/plan`;
  const loadDataPath = "base/list-by-type/plan";
  loadingMemberPrices.value = true;
  if (getfirstTable?.id && getsecondTable?.id && getthirdTable?.id) {
    const firstTablePromise = sender(
      { ...firstTable },
      updatePath,
      getfirstTable.id,
      createOrUpdateData,
    );
    const secondTablePromise = sender(
      { ...secondTable },
      updatePath,
      getsecondTable.id,
      createOrUpdateData,
    );
    const thirdTablePromise = sender(
      { ...thirdTable },
      updatePath,
      getthirdTable.id,
      createOrUpdateData,
    );

    const promiseResult = await Promise.all([
      firstTablePromise,
      secondTablePromise,
      thirdTablePromise,
    ]);

    if (promiseResult[0].statusCode === 200) {
      await loadDataList(loadDataPath);
      delayLoading("Success");
    } else {
      console.log(promiseResult[0].statusMessage);

      delayLoading("Error");
    }
  } else {
    const firstTablePromise = sender({ ...firstTable }, createPath, null, createOrUpdateData);
    const secondTablePromise = sender({ ...secondTable }, createPath, null, createOrUpdateData);
    const thirdTablePromise = sender({ ...thirdTable }, createPath, null, createOrUpdateData);
    const promiseResult = await Promise.all([
      firstTablePromise,
      secondTablePromise,
      thirdTablePromise,
    ]);

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
  { title: "Education level" },
  { title: "Admission cost (includes education program)" },
  { title: "Kyabram Fauna Park admission cost" },
  { title: "Adult-student ratio (recommended)" },
];
</script>

<template>
  <article class="price_table">
    <v-overlay tabindex="0" :model-value="loadingMemberPrices" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="py-8 px-6 d-flex" fluid>
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
                  <td class="pl-7 py-5" style="width: 400px">
                    <v-text-field v-model="firstTable.title" label="Level"></v-text-field>
                  </td>
                  <td class="py-5" style="width: 200px">
                    <v-text-field v-model="firstTable.admission" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="firstTable.faunaPark" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="firstTable.adultRatio" label="$0"></v-text-field>
                  </td>
                </tr>

                <tr>
                  <td class="pl-7 py-5">
                    <v-text-field v-model="secondTable.title" label="Level"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="secondTable.admission" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="secondTable.faunaPark" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="secondTable.adultRatio" label="$0"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td class="pl-7 py-5">
                    <v-text-field v-model="thirdTable.title" label="Level"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="thirdTable.admission" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="thirdTable.faunaPark" label="$0"></v-text-field>
                  </td>
                  <td class="py-5">
                    <v-text-field v-model="thirdTable.adultRatio" label="$0"></v-text-field>
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
