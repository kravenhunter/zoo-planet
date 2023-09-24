<script setup lang="ts">
import { computed, ref, toRefs } from "#imports";

import { delayLoading, useIsLoading } from "@/composables/states";
import { useContactsStore } from "@/stores/contactsStore";
import { useUnionStore } from "@/stores/storeGenerics";
import type { ContactUs } from "@prisma/client";

const props = defineProps<{ contacTable: ContactUs }>();
//isLoadingContacts - returns false or true
// const { contactPage } = storeToRefs(useContactsStore());

const { updateContactContent } = useContactsStore();
const { updateData } = useUnionStore();

const isLoadingContacts = useIsLoading();
const { contacTable } = toRefs(props);

const isEmpty = computed(() => {
  if (contacTable.value?.title && contacTable.value.extraeDscription) {
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

const filCover = ref<File>();
const filePreview = ref<File>();
const selectCoverImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (filCover.value = fileEvent.files[0]);
  console.log(filCover.value);
};
const selectPreviewImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (filePreview.value = fileEvent.files[0]);
  console.log(filePreview.value);
};
const addPost = async () => {
  isLoadingContacts.value = !isLoadingContacts.value;
  if (contacTable.value) {
    const result = await updateData(
      contacTable.value.id,
      filCover.value,
      filePreview.value,
      {
        imageBgLink: contacTable.value.imageBgLink,
        imagePreviewLink: contacTable.value.imagePreviewLink ?? undefined,
        title: contacTable.value.title,
        description: contacTable.value.description,
        extraeDscription: contacTable.value.extraeDscription ?? undefined,
        phone: contacTable.value.phone,
        email: contacTable.value.email,
        socialLink_1: contacTable.value.socialLink_1 ?? undefined,
        socialLink_2: contacTable.value.socialLink_2 ?? undefined,
        socialLink_3: contacTable.value.socialLink_3 ?? undefined,
        socialLink_4: contacTable.value.socialLink_4 ?? undefined,
        socialLink_5: contacTable.value.socialLink_5 ?? undefined,
        copyright: contacTable.value.copyright,
      },
      "contacts",
      "update",
    );

    delayLoading(result);
  }
};
</script>

<template>
  <v-container v-if="contacTable" class="d-flex" fluid>
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
            <v-text-field v-model="contacTable.title" :rules="rules" label="Title"></v-text-field>
            <v-file-input clearable label="Image cover" @change="selectCoverImage"></v-file-input>
            <v-file-input
              clearable
              label="Image preview"
              @change="selectPreviewImage"></v-file-input>
            <v-text-field v-model="contacTable.phone" :rules="rules" label="Phone"></v-text-field>
            <v-text-field v-model="contacTable.email" :rules="rules" label="Email"></v-text-field>
            <v-text-field
              v-model="contacTable.copyright"
              :rules="rules"
              label="Copyright"></v-text-field>
            <v-text-field
              v-model="contacTable.socialLink_1"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacTable.socialLink_2"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacTable.socialLink_3"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacTable.socialLink_4"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacTable.socialLink_5"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="contacTable.description"
              :rules="rules"
              label="Shord Description"></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>

      <v-col cols="6">
        <v-sheet>
          <v-card-title class="text-center">Description</v-card-title>
          <UiElementsAddEditor
            v-if="contacTable.extraeDscription"
            v-model:value="contacTable.extraeDscription" />
        </v-sheet>
      </v-col>
      <v-col cols="6" class="content_news">
        <div class="editor_content bg-white" v-html="contacTable.extraeDscription"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
