<script setup lang="ts">
import { computed, ref } from "#imports";

import { useContactsStore } from "@/stores/contactsStore";

import type { ContactUs } from "@prisma/client";
import { storeToRefs } from "pinia";

//isLoadingContacts - returns false or true
const { isLoadingContacts, contactPage } = storeToRefs(useContactsStore());

const { updateContactContent } = useContactsStore();

const contacts = ref<ContactUs>();
contacts.value = contactPage.value?.find((el) => el.title === "Contact Us");

const dialogModal = ref(false);
const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");

const isEmpty = computed(() => {
  if (contacts.value?.title && contacts.value.extraeDscription) {
    return false;
  }

  return true;
});
const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "Field is empty";
  },
];
const fileData = ref<0 | FileList | undefined>();

const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;
};

const addPost = async () => {
  isLoadingContacts.value = !isLoadingContacts.value;
  if (contacts.value) {
    const result = await updateContactContent(contacts.value.id, fileData.value, {
      imageBgLink: contacts.value.imageBgLink,
      title: contacts.value.title,
      description: contacts.value.description,
      extraeDscription: contacts.value.extraeDscription ?? undefined,
      phone: contacts.value.phone,
      email: contacts.value.email,
      socialLink_1: contacts.value.socialLink_1 ?? undefined,
      socialLink_2: contacts.value.socialLink_2 ?? undefined,
      socialLink_3: contacts.value.socialLink_3 ?? undefined,
      socialLink_4: contacts.value.socialLink_4 ?? undefined,
      socialLink_5: contacts.value.socialLink_5 ?? undefined,
      copyright: contacts.value.copyright,
    });

    setTimeout(() => {
      isLoadingContacts.value = false;
      if (result) {
        titleResult.value = result;
        colorIcon.value = result.toLocaleLowerCase();
        result === "Success" && (iconResult.value = "mdi-check-circle-outline");
        result === "Error" && (iconResult.value = "mdi-close-thick");
        dialogModal.value = !dialogModal.value;
      }
      console.log(isLoadingContacts.value);
    }, 3000);
  }
};
</script>

<template>
  <v-container v-if="contacts" class="position-relative d-flex justify-end" fluid>
    <div class="position-absolute">
      <v-fade-transition hide-on-leave>
        <v-alert v-if="dialogModal" :color="colorIcon" variant="tonal">
          <div class="d-flex align-center justify-center">
            <v-icon :color="colorIcon" :icon="iconResult" size="25"></v-icon>
            <v-card-title class="font-weight-bold">{{ titleResult }}</v-card-title>
          </div>

          <template #append>
            <v-btn size="20" variant="text" @click="dialogModal = false">
              <v-icon :color="colorIcon" icon="$close" size="20"></v-icon>
            </v-btn>
          </template>
        </v-alert>
      </v-fade-transition>
    </div>
    <v-row>
      <v-col cols="12">
        <v-sheet class="pa-2 mx-auto bg-black w-50">
          <v-btn
            :disabled="isEmpty"
            :loading="isLoadingContacts"
            type="button"
            block
            class="my-5"
            color="success"
            @click="addPost"
            >update data</v-btn
          >
          <v-form class="bg-grey-darken-4">
            <v-text-field v-model="contacts.title" :rules="rules" label="Title"></v-text-field>
            <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
            <v-text-field v-model="contacts.phone" :rules="rules" label="Phone"></v-text-field>
            <v-text-field v-model="contacts.email" :rules="rules" label="Email"></v-text-field>
            <v-text-field
              v-model="contacts.copyright"
              :rules="rules"
              label="Copyright"></v-text-field>
            <v-text-field
              v-model="contacts.socialLink_1"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacts.socialLink_2"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacts.socialLink_3"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacts.socialLink_4"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacts.socialLink_5"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacts.description"
              :rules="rules"
              label="Shord Description"></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>

      <v-col cols="6">
        <v-sheet>
          <v-card-title class="text-center">Description</v-card-title>
          <UiElementsAddEditor
            v-if="contacts.extraeDscription"
            v-model:value="contacts.extraeDscription" />
        </v-sheet>
      </v-col>
      <v-col cols="6" class="content_news">
        <div class="editor_content bg-white" v-html="contacts.extraeDscription"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
