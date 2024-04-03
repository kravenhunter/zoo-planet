<script setup lang="ts">
import { computed, reactive, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import sender from "~/composables/sender";
import type { IContacts } from "~/types";
import extractFileFromEvent from "~/utils/extractFileFromEvent";

const props = defineProps<{ contacTable?: IContacts | null }>();
const route = useRoute();
const { createOrUpdateData } = useUnionStorage();
// const { contacTable } = toRefs(props);

const state = reactive({
  title: props.contacTable?.title ?? "",
  description: props.contacTable?.description ?? "",
  email: props.contacTable?.email ?? "",
  extraeDscription: props.contacTable?.extraeDscription ?? "",
  phone: props.contacTable?.phone ?? "",
  socialLink_1: props.contacTable?.socialLink_1 ?? "",
  socialLink_2: props.contacTable?.socialLink_2 ?? "",
  socialLink_3: props.contacTable?.socialLink_3 ?? "",
  socialLink_4: props.contacTable?.socialLink_4 ?? "",
  socialLink_5: props.contacTable?.socialLink_5 ?? "",
  copyright: props.contacTable?.copyright ?? "",
});
const isLoadingContacts = useIsLoading();

const isEmpty = computed(() => !(state?.title && state.extraeDscription));

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
  const createPath = `base/create-by-type/contacts`;
  const updatePath = "contacts/update";

  isLoadingContacts.value = !isLoadingContacts.value;
  if (!isEmpty.value) {
    if (props.contacTable?.id) {
      const resultPromise = await sender(
        { ...state },
        `${updatePath}/${props.contacTable.id}`,
        null,
        createOrUpdateData,
        filCover.value,
        filePreview.value,
      );

      if (resultPromise.statusCode === 200) {
        delayLoading("Success");
      } else {
        delayLoading("Error");
      }
    } else {
      const resultPromise = await sender(
        { ...state },
        createPath,
        null,
        createOrUpdateData,
        filCover.value,
        filePreview.value,
      );

      if (resultPromise.statusCode === 200) {
        delayLoading("Success");
      } else {
        delayLoading("Error");
      }
    }
  }
};
</script>

<template>
  <v-container class="d-flex" fluid>
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
            <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
            <v-file-input clearable label="Image cover" @change="selectCoverImage"></v-file-input>
            <v-file-input
              clearable
              label="Image preview"
              @change="selectPreviewImage"></v-file-input>
            <v-text-field v-model="state.phone" :rules="rules" label="Phone"></v-text-field>
            <v-text-field v-model="state.email" :rules="rules" label="Email"></v-text-field>
            <v-text-field v-model="state.copyright" :rules="rules" label="Copyright"></v-text-field>
            <v-text-field
              v-model="state.socialLink_1"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="state.socialLink_2"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="state.socialLink_3"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="state.socialLink_4"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="state.socialLink_5"
              :rules="rules"
              label="Socials"></v-text-field>
            <v-text-field
              v-model="state.description"
              :rules="rules"
              label="Shord Description"></v-text-field>
          </v-form>
        </v-sheet>
      </v-col>

      <v-col cols="6">
        <v-sheet>
          <v-card-title class="text-center">Description</v-card-title>
          <UiElementsAddEditor v-model:value="state.extraeDscription" />
        </v-sheet>
      </v-col>
      <v-col cols="6" class="content_news">
        <div class="editor_content bg-white" v-html="state.extraeDscription"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
