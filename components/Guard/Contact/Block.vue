<script setup lang="ts">
import { ref } from "#imports";
import { useContactsStore } from "@/stores/contactsStore";
import type { ContactUs } from "@prisma/client";
import { storeToRefs } from "pinia";

defineProps<{ contactData: ContactUs }>();
//Contacts Data
const { contactPage } = storeToRefs(useContactsStore());
const contacts = ref<ContactUs>();
</script>

<template>
  <div v-if="contactPage">
    <v-container>
      <v-col>
        <v-list lines="two" class="bg-grey-darken-4">
          <v-list-subheader class="text-h6 text-white" title="Content Page"></v-list-subheader>
          <v-list-item>
            <CardItem
              image-heigth="200"
              image-width="200"
              :inline="true"
              class="card_main"
              class-card="justify-start"
              class-content="d-flex flex-column align-self-center "
              colorbg="grey-darken-4"
              :image-source="contactData.imageBgLink"
              font-title-size="2rem"
              :title-card="contacts?.title"
              :subtitle-card="contactData.description"
              button-title="Edit"
              button-align="align-center"
              :button-slot="true">
            </CardItem>
          </v-list-item>
        </v-list>
      </v-col>
    </v-container>
    <v-row>
      <v-col cols="12">
        <GuardContactEdit />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
