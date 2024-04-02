<script setup lang="ts">
import type { IContentPage, IPlan } from "~/types";

defineProps<{ plain?: IContentPage; tables: IPlan[] }>();
const plainText = [
  {
    sourceTitle: "/images/plan/plain_visit.webp",
    title: "Plan your visit",
    description: "",
  },
  {
    sourceTitle: "",
    title:
      "Thank you for choosing Zoos Victoria as a learning destination. You will find everything you need here to plan your excursion at Healesville Sanctuary, Kyabram Fauna Park, Melbourne Zoo, and Werribee Open Range Zoo.",
    description:
      "Our inspiring education programs are included with your admission price and support the Victorian Curriculum and the VEYLDF",
  },
  {
    sourceTitle: "",
    title: "Cost and supervision ratios",
    description: `Please Note:

The minimum number of students for an education program is 12 (exceptions made for SDS schools).
Prices are in Australian dollars and are valid from 1 January 2023 to 31 December 2023.
Zoo memberships are not valid for school, early childhood centre and kindergarten visits. 
Self-guided excursions mean you and your students can choose your own adventure and wander the zoo at your leisure.
School excursions are only available on weekdays during the Victorian school term.`,
  },

  {
    sourceTitle: "",
    title: "Fighting Extinction Schools Community",
    description: "Get support and grow your network.",
  },
  {
    sourceTitle: "/images/plan/community.webp",
    title: "Plan your visit",
    description:
      "Prices and payment information, risk assessments, getting here, sensory maps, and more",
  },
];
const tableHeaders = [
  {
    title: "Education level",
  },
  {
    title: "Admission cost (includes education program)",
  },
  {
    title: "Kyabram Fauna Park admission cost",
  },
  {
    title: "Adult-student ratio (recommended)",
  },
];
</script>

<template>
  <section v-if="plain && tables" class="plain">
    <article>
      <CardColumn :enable-card-slot="true">
        <v-img
          v-if="plain.imageBgLink"
          :alt="plain.title"
          :src="`/${plain.imageBgLink}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${plain.imageBgLink}`" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="plain.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <article>
      <v-container>
        <CardColumn
          class-title="text-green-darken-4 "
          :text-html-card="plain.description"
          :enable-button="false" />

        <v-table theme="light" class="table">
          <thead class="bg-orange-lighten-5 text-subtitle-2">
            <tr>
              <th class="pl-7 py-5 text-left font-weight-bold">{{ tableHeaders[0].title }}</th>
              <th
                v-for="(el, i) in tableHeaders.slice(1, 4)"
                :key="i"
                class="py-5 text-left font-weight-bold">
                {{ el.title }}
              </th>
            </tr>
          </thead>
          <tbody class="text-subtitle-2">
            <tr v-for="item in tables" :key="item.id">
              <td class="pl-7 py-5">{{ item.title }}</td>
              <td>{{ item.admission }}</td>
              <td>{{ item.faunaPark }}</td>
              <td>{{ item.adultRatio }}</td>
            </tr>
          </tbody>
        </v-table>
        <CardColumn
          v-if="plain.extraeDscription"
          class-title="text-green-darken-4 "
          :text-html-card="plain.extraeDscription"
          :enable-button="false" />
      </v-container>
    </article>
    <v-container> </v-container>
    <article class="bottom_info">
      <v-container>
        <CardItem :text-card="plainText[2].description" />
      </v-container>
    </article>
  </section>
</template>

<style scoped lang="scss">
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
.plain {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
  & .bottom_info {
    background-color: #004c67;
  }
}
</style>
