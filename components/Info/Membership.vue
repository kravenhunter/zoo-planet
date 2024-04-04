<script setup lang="ts">
import { reactive, ref } from "#imports";
import { useSelectedPrecesState } from "@/composables/states";
import type { IContentPage, IMembershipPrice } from "~/types";

interface Props {
  memberMain: IContentPage;
  stateMonth: IMembershipPrice;
  stateYaer: IMembershipPrice;
}

defineProps<Props>();

const state = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  adress: "",
  personGender: "Male",
  email: "",
  isEmpty: true,
};

const statePersons = reactive({
  //   adults: ref<Person[]>([{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }]),
  adults: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
  concessions: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
  child: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
  zooCrew: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
  senior: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
  supporter: [{ ...state }, { ...state }, { ...state }, { ...state }, { ...state }],
});

const personList = ["Male", "Female", "Self-described"];
const selectedPrecesState = useSelectedPrecesState();

const tab = ref("Member");
const items = ["Member", "Details", "Payment", "Confirmation"];
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const count = ref(0);
const nextTab = () => {
  count.value = (count.value + 1) % items.length;
  tab.value = items[count.value];
  console.log(statePersons.adults);
};
const activateormTag = (index: number) => {
  statePersons.adults[index - 1].isEmpty = !index;

  return statePersons.adults[index - 1].isEmpty;
};
</script>

<template>
  <section v-if="memberMain && stateMonth && stateYaer" class="membership">
    <article class="main_cover">
      <CardColumn heigth-card="600" :enable-card-slot="true">
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
      <v-card color="basil" max-width="700" class="mx-auto">
        <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
          <v-tab v-for="item in items" :key="item" :value="item" :disabled="item !== tab">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item v-for="item in items" :key="item" :value="item">
            <v-card color="basil" flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
        <v-card-actions>
          <v-btn class="mx-auto" color="black" variant="flat" @click="nextTab">Next Step</v-btn>
        </v-card-actions>
      </v-card>
    </article>
    <article class="by-membership">
      <v-container>
        <div v-if="selectedPrecesState.adult && statePersons.adults" class="adults_form">
          <v-sheet
            v-for="index in selectedPrecesState.adult"
            :key="index"
            class="bg-orange-lighten-5 pa-5 mb-5">
            <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
              <template #prepend>
                <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
                <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
                  >Adult {{ index }}</v-list-item-title
                >
              </template>
            </v-list-item>
            <v-card-text
              >Used for all communication with Zoos Victoria. This is your main contact for your
              household. You may change the primary member by clicking the icon next to another
              members' info.</v-card-text
            >
            <v-divider class="my-5" :thickness="2"></v-divider>
            <v-row>
              <v-col cols="3" class="pl-6">
                <v-radio-group v-model="statePersons.adults[index - 1].personGender" column>
                  <v-radio
                    v-for="person in personList"
                    :key="person"
                    class="text-subtitle-2 pb-3"
                    :label="person"
                    color="red"
                    :value="person"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="8">
                <form class="form_data">
                  <input hidden name="isEmptiieldtag" :value="activateormTag(index)" />
                  <v-col>
                    <v-text-field
                      v-model="statePersons.adults[index - 1].firstName"
                      label="First name"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="statePersons.adults[index - 1].lastName"
                      label="Last name"
                      required></v-text-field>
                  </v-col>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="statePersons.adults[index - 1].phone"
                        label="Phone"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="statePersons.adults[index - 1].dateOfBirth"
                        label="Date of birth"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="statePersons.adults[index - 1].adress"
                        label="Adress"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="statePersons.adults[index - 1].email"
                        label="Email"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field :counter="10" label="Confirm email" required></v-text-field>
                    </v-col>
                  </v-row>
                </form>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-container>
      <InfoMembershipTables
        v-if="memberMain && stateMonth && stateYaer"
        :membership="memberMain"
        :state-month="stateMonth"
        :state-yaer="stateYaer" />
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
