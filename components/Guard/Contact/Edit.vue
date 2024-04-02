<script setup lang="ts">
import { computed, navigateTo, reactive, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import type { IContacts } from "~/types";
import extractFileFromEvent from "~/utils/extractFileFromEvent";
import packToFormData from "~/utils/packToFormData";

const route = useRoute();
const props = defineProps<{ contacTable: IContacts }>();

const { createOrUpdateData } = useUnionStorage();
// const { contacTable } = toRefs(props);

const state = reactive({
  title: props.contacTable.title ?? "",
  description: props.contacTable.description ?? "",
  email: props.contacTable.email ?? "",
  extraeDscription: props.contacTable.extraeDscription ?? "",
  phone: props.contacTable.phone ?? "",
  socialLink_1: props.contacTable.socialLink_1 ?? "",
  socialLink_2: props.contacTable.socialLink_2 ?? "",
  socialLink_3: props.contacTable.socialLink_3 ?? "",
  socialLink_4: props.contacTable.socialLink_4 ?? "",
  socialLink_5: props.contacTable.socialLink_5 ?? "",
  copyright: props.contacTable.copyright ?? "",
});
const isLoadingContacts = useIsLoading();

const isEmpty = computed(() => (state?.title && state.extraeDscription ? false : true));

const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "Field is empty";
  },
];

const filCover = ref<File | null>();
const filePreview = ref<File | null>();
const selectCoverImage = (event: Event) => {
  filCover.value = extractFileFromEvent(event);
};
const selectPreviewImage = (event: Event) => {
  filePreview.value = extractFileFromEvent(event);
};

const addPost = async () => {
  isLoadingContacts.value = !isLoadingContacts.value;
  if (!isEmpty.value) {
    if (props.contacTable.id) {
      const getpackData = await packToFormData(state, null, filCover.value, filePreview.value);

      const result = await createOrUpdateData(
        `contacts/update/${props.contacTable.id}`,
        getpackData,
      );

      if (result.statusCode === 200) {
        delayLoading("Success");
        await new Promise((resolve) =>
          setTimeout(() => {
            navigateTo(String(route.query.id));
          }, 2500),
        );
      } else {
        delayLoading("Error");
      }
    } else {
      const getpackData = await packToFormData(state, null, filCover.value, filePreview.value);
      const result = await createOrUpdateData(`base/create-by-type/contacts`, getpackData);
      if (result.statusCode === 200) {
        delayLoading("Success");
        await new Promise((resolve) =>
          setTimeout(() => {
            navigateTo(String(route.query.id));
          }, 2500),
        );
      } else {
        delayLoading("Error");
      }
    }
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
