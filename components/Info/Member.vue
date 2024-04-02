<script setup lang="ts">
import { useCurrentMemberTab, useSelectedPrecesState } from "@/composables/states";
import type { IContentPage, IMembershipPrice } from "~/types";

interface Props {
  memberMain: IContentPage;
  stateMonth: IMembershipPrice;
  stateYaer: IMembershipPrice;
}

defineProps<Props>();

const selectedPrecesState = useSelectedPrecesState();
const currentTab = useCurrentMemberTab();

const items = ["Member", "Details", "Payment", "Confirmation"];

const goBack = () => {
  selectedPrecesState.value = {
    adult: 0,
    child: 0,
    zooCrew: 0,
    concession: 0,
    senior: 0,
    teacher: 0,
    supporter: 0,
  };

  currentTab.value = "Member";
};
</script>

<template>
  <section v-if="memberMain && stateMonth && stateYaer" class="membership">
    <article class="main_cover">
      <CardColumn :enable-card-slot="true">
        <v-img
          v-if="memberMain.imageBgLink"
          :alt="memberMain.title"
          :src="`/${memberMain.imageBgLink}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          :max-height="600"
          :aspect-ratio="16 / 9"
          cover>
          <template #sources>
            <source :srcset="`/${memberMain.imageBgLink}`" />
          </template>
          <v-card-title
            class="text-amber text-center mb-10"
            v-text="memberMain.title"></v-card-title>
        </v-img>
      </CardColumn>
    </article>
    <article class="tabs">
      <v-container>
        <v-card color="basil">
          <v-tabs v-model="currentTab" bg-color="transparent" color="basil" grow>
            <v-tab v-for="item in items" :key="item" :value="item" :disabled="item !== currentTab">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-window v-model="currentTab">
            <v-window-item v-for="item in items" :key="item" :value="item">
              <v-card v-if="item === 'Member'" color="basil" flat>
                <InfoMembershipTables
                  v-if="memberMain && stateMonth && stateYaer"
                  :membership="memberMain"
                  :state-month="stateMonth"
                  :state-yaer="stateYaer" />
              </v-card>
              <v-card v-if="item === 'Details'" color="basil" flat>
                <div v-if="selectedPrecesState.adult" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.adult"
                    :key="personNumber"
                    :index="personNumber"
                    title="Adult" />
                </div>
                <div v-if="selectedPrecesState.concession" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.concession"
                    :key="personNumber"
                    :index="personNumber"
                    title="Concessions" />
                </div>
                <div v-if="selectedPrecesState.child" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.child"
                    :key="personNumber"
                    :index="personNumber"
                    title="Child" />
                </div>
                <div v-if="selectedPrecesState.zooCrew" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.zooCrew"
                    :key="personNumber"
                    :index="personNumber"
                    title="Zoo Crew" />
                </div>
                <div v-if="selectedPrecesState.teacher" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.teacher"
                    :key="personNumber"
                    :index="personNumber"
                    title="Teacher" />
                </div>
                <div v-if="selectedPrecesState.senior" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.senior"
                    :key="personNumber"
                    :index="personNumber"
                    title="Senior" />
                </div>
                <div v-if="selectedPrecesState.supporter" class="adults_form">
                  <InfoMemberForm
                    v-for="personNumber in selectedPrecesState.supporter"
                    :key="personNumber"
                    :index="personNumber"
                    title="Supporter" />
                </div>
              </v-card>

              <v-card-text v-if="item === 'Payment'">
                <InfoMemberShipPayment />
              </v-card-text>

              <CardColumn
                v-if="item === 'Confirmation'"
                title-card="Payment confimed!"
                class-title="text-center"
                text-card="Please, visit us to get your tikets.We are open every day 9am - 5pm"
                class-text="text-center"
                :button-slot="true">
                <v-btn
                  class="mx-auto my-5 px-10 text-subtitle-1 text-white"
                  color="#395A03"
                  variant="flat"
                  size="x-large"
                  @click="goBack">
                  Go back
                  <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
                </v-btn>
              </CardColumn>
            </v-window-item>
          </v-window>
        </v-card>
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
