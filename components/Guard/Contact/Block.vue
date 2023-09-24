<script setup lang="ts">
import { ref } from "#imports";
import type { ContactUs } from "@prisma/client";

// import { useContactsStore } from "@/stores/contactsStore";
import { useUnionStore } from "@/stores/storeGenerics";
import { storeToRefs } from "pinia";

defineProps<{ contactData: ContactUs }>();

const { contactPage } = storeToRefs(useUnionStore());
// //Contacts Data
// const { contactPage } = storeToRefs(useContactsStore());
const contacts = ref<ContactUs>();
contactPage.value?.length && (contacts.value = contactPage.value[0]);
</script>

<template>
  <div v-if="contactData">
    <v-container>
      <v-col>
        <v-list lines="two" class="bg-grey-darken-4">
          <v-list-subheader class="text-h6 text-white" title="Content Page"></v-list-subheader>
          <v-list-item>
            <CardInline
              max-width-card="1200px"
              class-card="bg-grey-darken-4"
              :title-card="contactData.title"
              class-title="text-amber"
              :text-card="contactData.description"
              :image-source="contactData.imageBgLink"
              image-width="300px"
              image-heigth="200px"
              :enable-button="false" />
          </v-list-item>
        </v-list>
      </v-col>
    </v-container>
    <v-row>
      <v-col cols="12">
        <GuardContactEdit v-if="contactData" :contac-table="contactData" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
