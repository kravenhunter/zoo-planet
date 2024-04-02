<script setup lang="ts">
import { navigateTo, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import type { IPlan } from "~/types";
import packToFormData from "~/utils/packToFormData";

const props = defineProps<{
  planPrices?: IPlan[];
}>();
const loadingMemberPrices = useIsLoading();
const route = useRoute();
console.log(route);

const { createOrUpdateData } = useUnionStorage();
const firstTable = ref<IPlan>();
const secondTable = ref<IPlan>();
const thirdTable = ref<IPlan>();
// console.log(props.planPrices);
firstTable.value = props.planPrices && { ...props.planPrices[0] };
secondTable.value = props.planPrices && { ...props.planPrices[1] };
thirdTable.value = props.planPrices && { ...props.planPrices[2] };

const addPrices = async () => {
  loadingMemberPrices.value = true;
  if (firstTable.value?.id && secondTable.value?.id && thirdTable.value?.id) {
    //  const { data } = await useFetch("/api/prisma/base/create-by-type/membership-price");

    const getpackfirstTable = await packToFormData(firstTable.value, firstTable.value.id);
    const getpacksecondTable = await packToFormData(secondTable.value, secondTable.value.id);
    const getpackthirdTable = await packToFormData(thirdTable.value, thirdTable.value.id);

    const firstTableResult = await createOrUpdateData(
      `base/update-by-type/plan`,
      getpackfirstTable,
    );
    const secondTableResult = await createOrUpdateData(
      `base/update-by-type/plan`,
      getpacksecondTable,
    );
    const thirdTableResult = await createOrUpdateData(
      `base/update-by-type/plan`,
      getpackthirdTable,
    );

    if (
      firstTableResult.statusCode === 200 &&
      secondTableResult.statusCode === 200 &&
      thirdTableResult.statusCode === 200
    ) {
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
    const getpackfirstTable = await packToFormData(firstTable.value, null);
    const getpacksecondTable = await packToFormData(secondTable.value, null);
    const getpackthirdTable = await packToFormData(thirdTable.value, null);

    const firstTableResult = await createOrUpdateData(
      `base/create-by-type/plan`,
      getpackfirstTable,
    );
    const secondTableResult = await createOrUpdateData(
      `base/create-by-type/plan`,
      getpacksecondTable,
    );
    const thirdTableResult = await createOrUpdateData(
      `base/create-by-type/plan`,
      getpackthirdTable,
    );

    if (
      firstTableResult.statusCode === 200 &&
      secondTableResult.statusCode === 200 &&
      thirdTableResult.statusCode === 200
    ) {
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
          <article v-if="firstTable && secondTable && thirdTable" class="table pb-16">
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
