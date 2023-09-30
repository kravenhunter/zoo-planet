<script setup lang="ts">
import type { ContentPages, TicketPrice } from "@prisma/client";

interface Props {
  ticketMain: ContentPages;
  singleState: TicketPrice;
  unlimitedSTate: TicketPrice;
}

defineProps<Props>();
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
</script>

<template>
  <section class="tikets">
    <article class="main_cover">
      <CardColumn :enable-card-slot="true">
        <v-img
          :alt="ticketMain.title"
          :src="ticketMain.imageBgLink"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="ticketMain.imageBgLink" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="ticketMain.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <v-container>
      <article class="description">
        <CardColumn
          v-if="ticketMain"
          :text-html-card="ticketMain.description"
          :enable-button="false" />
      </article>
      <article class="table pb-16">
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
                  class="my-10 ticket_btn font-weight-bold"
                  color="#01579b"
                  variant="flat"
                  size="x-large"
                  title="Buy ticket"
                  append-icon="mdi-paw"
                  to="/info/help">
                  Buy ticket
                </v-btn>
              </td>
              <td>
                <v-btn
                  title="Become a Zoo Member"
                  class="ticket_btn font-weight-bold justify-start"
                  color="#01579b"
                  variant="flat"
                  size="x-large"
                  append-icon="mdi-paw"
                  to="/info/membership">
                  Become a Zoo Member
                </v-btn>
              </td>
            </tr>
            <tr>
              <td class="pl-7 py-5">Adult</td>
              <td>{{ singleState.adult }}</td>
              <td>{{ unlimitedSTate.adult }}</td>
            </tr>
            <tr>
              <td class="pl-7 py-5">Child (4-15 years)</td>
              <td>{{ singleState.childCategoryFirst }}</td>
              <td>{{ unlimitedSTate.childCategoryFirst }}</td>
            </tr>
            <tr>
              <td class="pl-7 py-5">Child (0-3 years)</td>
              <td>{{ singleState.childCategorySecond }}</td>
              <td>{{ unlimitedSTate.childCategorySecond }}</td>
            </tr>
            <tr>
              <td class="pl-7 py-5">Concession**</td>
              <td>{{ singleState.concession }}</td>
              <td>{{ unlimitedSTate.concession }}</td>
            </tr>
            <tr>
              <td class="pl-7 py-5">Seniors**</td>
              <td>{{ singleState.seniors }}</td>
              <td>{{ unlimitedSTate.seniors }}</td>
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
.v-btn {
  font-size: 1rem;
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
}
.v-card {
  &-title {
    font-family: gothic;
    font-size: 2.5rem;
  }
  & h4 {
    font-family: gothic;
    font-size: 1.5rem;
  }
}

.tikets {
  background-color: #f2f2f2;
  & .table td,
  th {
    font-size: 1rem;
    @media (max-width: 1000px) {
      font-size: 1.5rem;
    }
  }
  & .main_cover {
    max-height: 800px;
  }
  & .bottom_info {
    background-color: #004c67;
  }
}
</style>
