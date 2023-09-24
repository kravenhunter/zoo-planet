<script setup lang="ts">
import { ref } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStore } from "@/stores/storeGenerics";
import type { PlanPrice } from "@prisma/client";

const props = defineProps<{
  planPrices: PlanPrice[] | undefined;
}>();
const loadingMemberPrices = useIsLoading();

const { createPlanData, updatePlanPrices } = useUnionStore();
const firstTable = ref<PlanPrice>();
const secondTable = ref<PlanPrice>();
const thirdTable = ref<PlanPrice>();
console.log(props.planPrices);
firstTable.value = props.planPrices && { ...props.planPrices[0] };
secondTable.value = props.planPrices && { ...props.planPrices[1] };
thirdTable.value = props.planPrices && { ...props.planPrices[2] };

const addPrices = async () => {
  if (firstTable.value?.id && secondTable.value?.id && thirdTable.value?.id) {
    loadingMemberPrices.value = true;
    const result = await updatePlanPrices(
      firstTable.value?.id,
      secondTable.value?.id,
      thirdTable.value?.id,
      "plan",
      "update",
      firstTable.value,
      secondTable.value,
      thirdTable.value,
    );
    delayLoading(result);
  }

  // if (props.singlEntry?.id && props.unlimited?.id) {
  //   const result = await updateTicketPrices(
  //     props.singlEntry!.id,
  //     props.unlimited!.id,
  //     stateSingle,
  //     stateUnlimited,
  //   );
  //   delayLoading(result);
  // } else {
  //   const result = await createPlanData(firstState, secondState, thirdState);
  //   delayLoading(result);
  // }
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
          <article class="table pb-16" v-if="firstTable && secondTable && thirdTable">
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
                <!-- <tr>
                  <td class="pl-7 py-5" v-for="el in statePlan.secodn" :key="el">{{ el }}</td>
                </tr> -->
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
