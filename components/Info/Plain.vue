<script setup lang="ts">
const plain = [
  {
    sourceTitle: "/images/plain_visit.png",
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
    sourceTitle: "/images/comunity.jpg",
    title: "Plan your visit",
    description:
      "Prices and payment information, risk assessments, getting here, sensory maps, and more",
  },
];
const tableHeaders = [
  {
    title: "Education level ",
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
const prices = [
  {
    level: "Early Childhood Centres and Kindergartens ",
    admissionCost: "$21",
    faunaParkCost: "Self-guided $8 Education program $12",
    adultRatio: "1 for every 3 children",
  },
  {
    level: "Foundation to Year 12",
    admissionCost: "$21",
    faunaParkCost: "Self-guided $8 Education program $12",
    adultRatio: "1 for every 3 children",
  },
  {
    level: "Tertiary",
    admissionCost: "$21",
    faunaParkCost: "Self-guided $8 Education program $12",
    adultRatio: "1 for every 3 children",
  },
  {
    level: "Student from Special Development School (SDS)",
    admissionCost: "$21",
    faunaParkCost: "Self-guided $8 Education program $12",
    adultRatio: "1 for every 3 children",
  },
];
</script>

<template>
  <section class="plain">
    <article class="main_cover">
      <CardItem
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="plain[0].sourceTitle"
        :image-title="plain[0].title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <v-container>
      <article class="description">
        <CardItem
          colorbg="#f2f2f2"
          :text-card="plain[1].description"
          title-align="pb-10"
          :text-slot="true">
          <v-card-text>
            <h1 class="text-h6 pb-16">{{ plain[1].title }}</h1>
            {{ plain[1].description }}
          </v-card-text>
        </CardItem>
      </article>
      <article class="table pb-16">
        <CardItem
          color-title="#395A03"
          :title-card="plain[2].title"
          title-align="pb-10"
          font-title-size="2rem" />
        <v-table theme="light">
          <thead class="bg-orange-lighten-5 text-subtitle-2">
            <tr>
              <th class="pl-7 py-5 text-left font-weight-bold">{{ tableHeaders[0].title }}</th>
              <th
                class="py-5 text-left font-weight-bold"
                v-for="(el, i) in tableHeaders.slice(1, 4)"
                :key="i">
                {{ el.title }}
              </th>
            </tr>
          </thead>
          <tbody class="text-subtitle-2">
            <tr v-for="(item, i) in prices" :key="i">
              <td class="pl-7 py-5">{{ item.level }}</td>
              <td>{{ item.admissionCost }}</td>
              <td>{{ item.faunaParkCost }}</td>
              <td>{{ item.adultRatio }}</td>
            </tr>
          </tbody>
        </v-table>
      </article>
    </v-container>
    <article class="bottom_info">
      <v-container>
        <CardItem :text-card="plain[2].description" />
      </v-container>
    </article>
  </section>
</template>

<style scoped lang="scss">
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
