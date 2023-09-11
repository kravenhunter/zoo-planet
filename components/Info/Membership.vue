<script setup lang="ts">
import { ref } from "#imports";

const book = {
  source: "/images/unsplash_8uJ0Am-ZdTA.jpg",
  title: "Membership",
  subtitle1:
    "Join today for only $11.50 a month over 12 months and receive unlimited entry to four unique zoos all year round. Each membership includes:",
  text1:
    "Memberships will auto-rollover in 12 months. A reminder email will be sent 28 days before you are due to roll over to update your details or opt out.",
};
const tableHeaders = [
  {
    title: "Unlimited zoo entry",
  },
  {
    title: "Exclusive Benefits",
  },
  {
    title: "Membership Prices",
  },
  {
    title: "Exclusive discounts",
  },
  {
    title: "Support our zoos to love and care for our animals",
  },
];
const unlimitedList = [
  {
    title:
      "Entry to Melbourne Zoo, Healesville Sanctuary, Werribee Open Range Zoo and Kyabram Fauna Park every day of the year",
  },
  {
    title: "Express entry at each zoo to skip the queues",
  },
  {
    title:
      "Free reciprocal entry to Taronga Zoo, Western Plains Zoo, Adelaide Zoo, Monarto Zoo and Perth Zoo",
  },
];

const exclusive = [
  {
    title: "Kids under 16 join free with an adult membership",
  },
  {
    title: "Member-only events and previews",
  },
  {
    title: "Free subscription to the Zoo News member magazine",
  },
  {
    title: "Access to the Member VIP Zone – online zoo content and activities",
  },
];
const discount = [
  {
    title: "10% off zoo animal experiences",
  },
  {
    title: "15% off at zoo and online shops",
  },
  {
    title: "20% off Vjunior family tickets at Village Cinemas",
  },
  {
    title: "20% off The Amazing Baby Company brands",
  },
  {
    title: "20% off Europcar’s Electric, Hybrid and Plug-in Models",
  },
];
const support = [
  {
    title: "Get involved with Zoos Victoria's Community Conservation programs",
  },
  {
    title:
      "Be part of the commitment of fighting wildlife extinction, including the recovery of 27 threatened native species",
  },
  {
    title: "20% off Vjunior family tickets at Village Cinemas",
  },
  {
    title: "20% off The Amazing Baby Company brands",
  },
  {
    title: "20% off Europcar’s Electric, Hybrid and Plug-in Models",
  },
];

const prices = [
  {
    person: "adult",
    single: "$46.00",
    unlimited: "$11.50 per month",
  },
  {
    person: "Child (4-15 years)",
    single: "FREE weekends and holidays*",
    unlimited: `Children
FREE everyday`,
  },
  {
    person: "Child (0-3 years)",
    single: "FREE",
    unlimited: "FREE",
  },
  {
    person: "Concession** ",
    single: "$34.50",
    unlimited: "$8.50 per month",
  },
  {
    person: "Seniors**",
    single: "$34.50",
    unlimited: "$8.50 per month",
  },
];

const membership = {
  source: "/images/volunteer_2.jpg",
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

const selected = ref(0);

const person = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<template>
  <section class="membership">
    <article class="main_cover">
      <CardItem
        class="card_main"
        colorbg="#f2f2f2"
        image-heigth="600"
        :image-source="membership.source"
        :image-title="membership.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <v-container>
      <article class="description">
        <CardItem colorbg="#f2f2f2" :text-card="membership.subtitle" :text-slot="true">
          <v-card-text>
            <h1 class="text-subtitle-1 font-weight-bold">How would you like to pay?</h1>
            <p class="text-subtitle-2">Total price is the same for both options.</p>
            <p class="text-subtitle-2">{{ membership.text }}</p>
          </v-card-text>
        </CardItem>
        <CardItem colorbg="#f2f2f2" :text-card="membership.subtitle" :text-slot="true">
          <v-card-text>
            <h1 class="text-subtitle-1 font-weight-bold">{{ membership.subtitle }}</h1>
          </v-card-text>
        </CardItem>
      </article>
      <v-row>
        <v-col>
          <article class="table pb-16">
            <v-table theme="light">
              <thead class="bg-orange-lighten-5 text-subtitle-2">
                <tr>
                  <th></th>
                  <th></th>
                  <th class="py-5 text-left font-weight-bold" v-for="(el, i) in tableRow" :key="i">
                    {{ el.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-subtitle-2">
                <tr v-for="(item, i) in tableColumn" :key="i">
                  <td class="pl-7 py-5">
                    <v-select v-model="selected" :items="person"></v-select>
                  </td>
                  <td class="py-5">{{ item.title }}</td>
                  <td class="py-5">{{ monthly[i].price }}</td>
                  <td class="py-5">{{ yarly[i].price }}</td>
                </tr>
              </tbody>
            </v-table>
          </article>
        </v-col>
        <v-col class="px-5" cols="4">
          <article class="order bg-brown-lighten-5">
            <CardItem
              class="card_main"
              image-heigth="100"
              :image-source="membership.source"
              image-title="Summory" />
            <h6 class="text-subtitle-1 text-center my-3">Zoos Planet Membership</h6>
            <v-table>
              <tbody class="text-subtitle-2">
                <tr>
                  <td class="ml-5">1 X Adult</td>
                  <td class="text-end">$11.50</td>
                  <td class="d-flex align-center">
                    <v-icon color="error" icon="mdi-close-thick" size="17px"></v-icon>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </article>
        </v-col>
      </v-row>

      <v-btn class="px-10 text-subtitle-1 text-white" color="#395A03" variant="flat" size="x-large">
        Continue with purchase
        <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
      </v-btn>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.membership {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
  & .bottom_info {
    background-color: #004c67;
  }
}
</style>
