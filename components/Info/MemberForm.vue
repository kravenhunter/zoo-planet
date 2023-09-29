<script setup lang="ts">
import { useCurrentMemberTab, useMemberShipDataFormState } from "@/composables/states";

interface Props {
  index: number;
  title: string;
}

const propps = defineProps<Props>();
const currentTab = useCurrentMemberTab();
const statePersons = useMemberShipDataFormState();
const personList = ["Male", "Female", "Self-described"];

const activateormTag = (index: number) => {
  propps.title === "Adult" && (statePersons.value.adults[index - 1].isEmpty = !index);
  propps.title === "Concessions" && (statePersons.value.concessions[index - 1].isEmpty = !index);
  propps.title === "Child" && (statePersons.value.child[index - 1].isEmpty = !index);
  propps.title === "Zoo Crew" && (statePersons.value.zooCrew[index - 1].isEmpty = !index);
  propps.title === "Senior" && (statePersons.value.senior[index - 1].isEmpty = !index);
  propps.title === "Supporter" && (statePersons.value.supporter[index - 1].isEmpty = !index);
  propps.title === "Teacher" && (statePersons.value.teacher[index - 1].isEmpty = !index);
};
</script>

<template>
  <article class="bg-orange-lighten-5">
    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Adult'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.adults[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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

    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Concessions'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.concessions[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.concessions[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.concessions[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.concessions[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.concessions[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.concessions[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.concessions[index - 1].email"
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

    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Child'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.child[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.child[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.child[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.child[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.child[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.child[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.child[index - 1].email"
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

    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Zoo Crew'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.zooCrew[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.zooCrew[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.zooCrew[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.zooCrew[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.zooCrew[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.zooCrew[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.zooCrew[index - 1].email"
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
    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Teacher'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.teacher[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.teacher[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.teacher[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.teacher[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.teacher[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.teacher[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.teacher[index - 1].email"
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
    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Senior'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.senior[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.senior[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.senior[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.senior[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.senior[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.senior[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.senior[index - 1].email"
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

    <v-sheet class="bg-orange-lighten-5 pa-5 mb-5" v-if="title === 'Supporter'">
      <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
        <template #prepend>
          <v-icon size="25" class="text-h6 font-weight-bold">mdi-account</v-icon>
          <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold"
            >{{ title }} {{ index }}</v-list-item-title
          >
        </template>
      </v-list-item>
      <v-card-text
        >Used for all communication with Zoos Victoria. This is your main contact for your
        household. You may change the primary member by clicking the icon next to another members'
        info.</v-card-text
      >
      <v-divider class="my-5" :thickness="2"></v-divider>
      <v-row>
        <v-col cols="3" class="pl-6">
          <v-radio-group v-model="statePersons.supporter[index - 1].personGender" column>
            <v-radio
              class="text-subtitle-2 pb-3"
              v-for="person in personList"
              :key="person"
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
                v-model="statePersons.supporter[index - 1].firstName"
                label="First name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="statePersons.supporter[index - 1].lastName"
                label="Last name"
                required></v-text-field>
            </v-col>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.supporter[index - 1].phone"
                  label="Phone"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="statePersons.supporter[index - 1].dateOfBirth"
                  label="Date of birth"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.supporter[index - 1].adress"
                  label="Adress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="statePersons.supporter[index - 1].email"
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
    <v-card-actions>
      <v-btn
        class="mx-auto px-10 text-subtitle-1 text-white"
        color="#395A03"
        variant="flat"
        size="x-large"
        @click="currentTab = 'Payment'">
        Payment
        <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
      </v-btn>
    </v-card-actions>
  </article>
</template>

<style scoped></style>
