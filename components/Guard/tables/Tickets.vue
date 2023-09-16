<script setup lang="ts">
import { onMounted, reactive, useRoute } from "#imports";
import { useBookingStore } from "@/stores/bookingStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const { membershipTable, pendingData } = storeToRefs(useBookingStore());
const { addMembershipPreces, loadTables, updateMemberShipPrices } = useBookingStore();

const stateMonth = reactive({
  adult: "",
  childCategoryFirst: "",
  childCategorySecond: "",
  concession: "",
  seniors: "",
  teacher: "",
  supporter: "",
});
const stateYaer = reactive({
  adult: "",
  childCategoryFirst: "",
  childCategorySecond: "",
  concession: "",
  seniors: "",
  teacher: "",
  supporter: "",
});

const addPrices = async () => {
  pendingData.value = !pendingData.value;
  await addMembershipPreces(stateMonth, stateYaer);
};
const updatePrices = async (id: string) => {
  pendingData.value = !pendingData.value;
  await updateMemberShipPrices(id, stateMonth, stateYaer);
};

const membership = {
  sourceTitle: "/images/volunteer_2.jpg",
  title: "Membership",
  subtitle: "Who should we include in the membership?",
  text: `Your monthly instalment plan will auto-rollover in 12 months. 
  We will send you a reminder, via email, 28 days before you are due to roll over to update your details or opt out. `,
};

const tableRow = [{ title: "Monthly" }, { title: "Yearly" }];
const tableColumn = [
  { title: "Adult" },
  { title: "Child (under 16)" },
  { title: "Zoo Crew (under 16)" },
  { title: "Concession" },
  { title: "Senior" },
  { title: "Teacher (professional membership)" },
  { title: "Supporter (Zoo entry not included)" },
];

const monthly = [
  {
    price: "$11.50",
  },
  {
    price: "Free",
  },
  {
    price: "$4.50",
  },
  {
    price: "$8.50",
  },
  {
    price: "$10.50",
  },
  {
    price: "$8.25",
  },
  {
    price: "$5.00",
  },
];

const yarly = [
  {
    price: "$11.50",
  },
  {
    price: "Free",
  },
  {
    price: "$4.50",
  },
  {
    price: "$8.50",
  },
  {
    price: "$10.50",
  },
  {
    price: "$8.25",
  },
  {
    price: "$5.00",
  },
];

onMounted(async () => {
  !membershipTable.value && (await loadTables);
  console.log(membershipTable.value);
});
</script>

<template>
  <article class="price_table">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="py-8 px-6">
      <v-row>
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
      </v-row>
      <v-row>
        <v-col cols="12">
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th></th>
                  <th>
                    <div class="loading" v-if="pendingData">
                      <p>Loading.....</p>
                    </div>
                  </th>
                  <th></th>
                </tr>
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
                <!--                 <tr v-for="(item, i) in tableColumn" :key="i">
                  <td class="pl-7 py-5">{{ item.title }}</td>
                  <td class="py-5">{{ monthly[i].price }}</td>
                  <td class="py-5">{{ yarly[i].price }}</td>
                </tr> -->
                <tr>
                  <td class="d-flex justify-end align-center py-10">
                    <v-btn
                      :loading="pendingData"
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
