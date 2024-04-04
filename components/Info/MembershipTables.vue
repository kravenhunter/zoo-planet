<script setup lang="ts">
import { computed, ref } from "#imports";
import { useCurrentMemberTab, useSelectedPrecesState, useTotalPrice } from "@/composables/states";
import type { IContentPage, IMembershipPrice } from "~/types";

interface Props {
  membership: IContentPage;
  stateMonth: IMembershipPrice;
  stateYaer: IMembershipPrice;
}

const props = defineProps<Props>();
const currentTab = useCurrentMemberTab();
const selectedPrecesState = useSelectedPrecesState();

const tableRow = [
  { title: "Count persons" },
  { title: "Level person" },
  { title: "Monthly" },
  { title: "Yearly" },
];
const tab = ref("Month");
const items = ["Month", "Year"];
const person = [0, 1, 2, 3, 4, 5];
const totalPrice = useTotalPrice();
const countTotal = computed(() => {
  if (tab.value === "Month") {
    const adult = selectedPrecesState.value.adult * parseData(props.stateMonth?.adult);
    const child = selectedPrecesState.value.child * parseData(props.stateMonth.childCategoryFirst);
    const zooCrew =
      selectedPrecesState.value.zooCrew * parseData(props.stateMonth.childCategorySecond);
    const concession =
      selectedPrecesState.value.concession * parseData(props.stateMonth.concession);
    const senior = selectedPrecesState.value.senior * parseData(props.stateMonth.seniors);
    const teacher = selectedPrecesState.value.teacher * parseData(props.stateMonth.teacher);
    const supporter = selectedPrecesState.value.supporter * parseData(props.stateMonth.supporter);
    const summ = adult + child + zooCrew + concession + senior + teacher + supporter;
    totalPrice.value = summ;
    return summ;
  } else {
    const adult = selectedPrecesState.value.adult * parseData(props.stateYaer.adult);
    const child = selectedPrecesState.value.child * parseData(props.stateYaer.childCategoryFirst);
    const zooCrew =
      selectedPrecesState.value.zooCrew * parseData(props.stateYaer.childCategorySecond);
    const concession = selectedPrecesState.value.concession * parseData(props.stateYaer.concession);
    const senior = selectedPrecesState.value.senior * parseData(props.stateYaer.seniors);
    const teacher = selectedPrecesState.value.teacher * parseData(props.stateYaer.teacher);
    const supporter = selectedPrecesState.value.supporter * parseData(props.stateYaer.supporter);
    const summ = adult + child + zooCrew + concession + senior + teacher + supporter;
    totalPrice.value = summ;
    return summ;
  }
});
totalPrice.value = countTotal.value;
function parseData(price: string) {
  const result = price.match(/\d+/);
  if (result?.length) {
    return Number(result[0]);
  }
  return 0;
}
</script>

<template>
  <v-container>
    <article class="description">
      <CardColumn
        v-if="membership"
        :text-html-card="membership.description"
        :enable-button="false" />
    </article>
    <v-row>
      <v-col>
        <article class="table pb-16">
          <v-table theme="light">
            <thead class="bg-orange-lighten-5 text-subtitle-2">
              <tr>
                <th v-for="(el, i) in tableRow" :key="i" class="py-5 text-left font-weight-bold">
                  {{ el.title }}
                </th>
              </tr>
            </thead>
            <tbody class="text-subtitle-2">
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.adult" :items="person"></v-select>
                </td>
                <td class="py-5">Adult</td>
                <td class="py-5">{{ stateMonth.adult }}</td>
                <td class="py-5">{{ stateYaer.adult }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.child" :items="person"></v-select>
                </td>
                <td class="py-5">Child (under 16)</td>
                <td class="py-5">{{ stateMonth.childCategoryFirst }}</td>
                <td class="py-5">{{ stateYaer.childCategoryFirst }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.zooCrew" :items="person"></v-select>
                </td>
                <td class="py-5">Zoo Crew (under 16)</td>
                <td class="py-5">{{ stateMonth.childCategorySecond }}</td>
                <td class="py-5">{{ stateYaer.childCategorySecond }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.concession" :items="person"></v-select>
                </td>
                <td class="py-5">Concession</td>
                <td class="py-5">{{ stateMonth.concession }}</td>
                <td class="py-5">{{ stateYaer.concession }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.senior" :items="person"></v-select>
                </td>
                <td class="py-5">Senior</td>
                <td class="py-5">{{ stateMonth.seniors }}</td>
                <td class="py-5">{{ stateYaer.seniors }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.teacher" :items="person"></v-select>
                </td>
                <td class="py-5">Teacher (professional membership)</td>
                <td class="py-5">{{ stateMonth.teacher }}</td>
                <td class="py-5">{{ stateYaer.teacher }}</td>
              </tr>
              <tr>
                <td class="pl-7 py-5">
                  <v-select v-model="selectedPrecesState.supporter" :items="person"></v-select>
                </td>
                <td class="py-5">Supporter (Zoo entry not included)</td>
                <td class="py-5">{{ stateMonth.supporter }}</td>
                <td class="py-5">{{ stateYaer.supporter }}</td>
              </tr>
            </tbody>
          </v-table>
        </article>
        <v-divider></v-divider>
      </v-col>

      <v-col class="px-5" cols="12" lg="4">
        <article class="order bg-brown-lighten-5">
          <CardColumn :enable-card-slot="true">
            <v-img
              v-if="membership.imageBgLink"
              :alt="membership.title"
              :src="`/${membership.imageBgLink}`"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
              :max-height="100"
              :aspect-ratio="16 / 9"
              cover>
              <template #sources>
                <source :srcset="`/${membership.imageBgLink}`" />
              </template>
              <v-card-title class="text-amber text-center mb-1">Summory</v-card-title>
            </v-img>
          </CardColumn>

          <v-sheet class="bg-orange-lighten-5 font-weight-bold py-5 text-center">
            <h6 class="text-subtitle-2 font-weight-bold">Zoos Planet Membership</h6></v-sheet
          >
          <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
            <v-tab v-for="item in items" :key="item" :value="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item v-for="item in items" :key="item" :value="item">
              <v-table v-if="item === 'Month'">
                <tbody class="text-subtitle-2">
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.adult }} X Adult</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.adult) * selectedPrecesState.adult }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.adult"
                        title="close-icon"
                        color="error"
                        icon="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.adult = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.child }} X Child</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.childCategoryFirst) * selectedPrecesState.child }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.child"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.child = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.zooCrew }} X Zoo Crew Child</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.childCategorySecond) * selectedPrecesState.zooCrew }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.zooCrew"
                        title="mdi-close-thick"
                        color="error"
                        icon="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.zooCrew = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.concession }} X Concession</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.concession) * selectedPrecesState.concession }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.concession"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.concession = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.senior }} X Senior</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.seniors) * selectedPrecesState.senior }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.senior"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.senior = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.teacher }} X Teacher</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.teacher) * selectedPrecesState.teacher }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.teacher"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.teacher = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.supporter }} X Supporter</td>
                    <td class="text-end">
                      ${{ parseData(stateMonth.supporter) * selectedPrecesState.supporter }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.supporter"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.supporter = 0"></v-icon>
                    </td>
                  </tr>
                  <tr class="bg-orange-lighten-5 font-weight-bold">
                    <td class="py-5">Total per Month</td>

                    <td class="text-end">${{ countTotal }}</td>
                    <td>
                      <span class="text-subtitle-2"> {{ tab }}</span>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-table v-else-if="item === 'Year'">
                <tbody class="text-subtitle-2">
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.adult }} X Adult</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.adult) * selectedPrecesState.adult }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.adult"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.adult = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.child }} X Child</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.childCategoryFirst) * selectedPrecesState.child }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.child"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.child = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.zooCrew }} X Zoo Crew</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.childCategorySecond) * selectedPrecesState.zooCrew }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.zooCrew"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.zooCrew = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.concession }} X Concession</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.concession) * selectedPrecesState.concession }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.concession"
                        color="error"
                        title="mdi-close-thick"
                        icon="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.concession = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.senior }} X Senior</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.seniors) * selectedPrecesState.senior }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.senior"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.senior = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.teacher }} X Teacher</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.teacher) * selectedPrecesState.teacher }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.teacher"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.teacher = 0"></v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td class="ml-5">{{ selectedPrecesState.supporter }} X Supporter</td>
                    <td class="text-end">
                      ${{ parseData(stateYaer.supporter) * selectedPrecesState.supporter }}
                    </td>
                    <td class="d-flex align-center">
                      <v-icon
                        v-if="selectedPrecesState.supporter"
                        color="error"
                        icon="mdi-close-thick"
                        title="mdi-close-thick"
                        size="17px"
                        @click="selectedPrecesState.supporter = 0"></v-icon>
                    </td>
                  </tr>
                  <tr class="bg-orange-lighten-5 font-weight-bold">
                    <td class="py-5">Total per Month</td>

                    <td class="text-end">${{ countTotal }}</td>
                    <td>
                      <span class="text-subtitle-2"> {{ tab }}</span>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
          <v-card-actions>
            <v-btn
              title=" Buy tickets"
              class="text-subtitle-1 text-white"
              color="#395A03"
              variant="flat"
              size="x-large"
              width="100%"
              :disabled="!totalPrice"
              @click="currentTab = 'Details'">
              Buy tickets
              <v-icon title="mdi-paw" :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
            </v-btn>
          </v-card-actions>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>
