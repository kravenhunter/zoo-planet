<script setup lang="ts">
const book = {
  source: "/images/unsplash_8uJ0Am-ZdTA.jpg",
  title: "Book tickets ",
  subtitle1: "We are open every day 9am – 5pm",
  text1:
    "We recommend all non-members pre-book online, including babies, even if attending on a day when kids visit free.",
  subtitle2: "What kind of zoo ticket would you like?",

  text2: `*Victorian Government school holidays and public holidays. Must be accompanied by an adult or someone aged 16 and over.

**Concession tickets and memberships apply to Australian Pensioner Concession Card, full-time Student Card at an Australian school or tertiary institution, Healthcare Card, Disability Concession, DVA Gold and White Card, Australian Seniors Card, Seniors Business Discount card or Victorian Carer ‘We Care’ card holders.`,
};
const tableHeaders = [
  {
    title: "Age Ratio ",
  },
  {
    title: "Single Entry",
  },
  {
    title: "Unlimited Entry",
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
</script>

<template>
  <section class="tikets">
    <article class="main_cover">
      <CardItem
        class="card_main"
        colorbg="#f2f2f2"
        image-heigth="600"
        :image-source="book.source"
        :image-title="book.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <v-container>
      <article class="description">
        <CardItem colorbg="#f2f2f2" :text-card="book.text1" title-align="pb-10" :text-slot="true">
          <v-card-text>
            <h1 class="text-subtitle-1 font-weight-bold">{{ book.subtitle1 }}</h1>
            <p class="text-subtitle-2">{{ book.text1 }}</p>
          </v-card-text>
        </CardItem>
      </article>
      <article class="table pb-16">
        <CardItem
          color-title="#395A03"
          :title-card="book.subtitle2"
          title-align="pb-10"
          font-title-size="2rem" />
        <v-table theme="light">
          <thead class="bg-orange-lighten-5 text-subtitle-2">
            <tr>
              <th class="pl-7 py-5 text-left font-weight-bold">{{ tableHeaders[0].title }}</th>
              <th
                class="py-5 text-left font-weight-bold"
                v-for="(el, i) in tableHeaders.slice(1, 3)"
                :key="i">
                {{ el.title }}
              </th>
            </tr>
          </thead>
          <tbody class="text-subtitle-2">
            <tr>
              <td></td>
              <td>
                <v-btn
                  class="my-10 text-subtitle-2 font-weight-bold"
                  color="#01579b"
                  variant="flat"
                  size="x-large"
                  append-icon="mdi-paw"
                  router
                  to="/info/help">
                  Buy ticket
                </v-btn>
              </td>
              <td>
                <v-btn
                  class="text-subtitle-2 font-weight-bold justify-start"
                  color="#01579b"
                  variant="flat"
                  size="x-large"
                  append-icon="mdi-paw"
                  router
                  to="/info/help">
                  Become a Zoo Member
                </v-btn>
              </td>
            </tr>
            <tr v-for="(item, i) in prices" :key="i">
              <td class="pl-7 py-5">{{ item.person }}</td>
              <td>{{ item.single }}</td>
              <td>{{ item.unlimited }}</td>
            </tr>
          </tbody>
        </v-table>
      </article>
    </v-container>
    <article class="bottom_info">
      <v-container>
        <CardItem :text-card="book.text2" />
      </v-container>
    </article>
  </section>
</template>

<style scoped lang="scss">
.tikets {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
  & .bottom_info {
    background-color: #004c67;
  }
}
</style>
