<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";

import { useUnionStore } from "@/stores/storeGenerics";
import { storeToRefs } from "pinia";
import type { IContentPage } from "types/IContentPage";

const route = useRoute();

const { mainPages } = storeToRefs(useUnionStore());

const { updateData, createData } = useUnionStore();

const pendingData = useIsLoading();
const newsMainPageContent = ref<IContentPage>();

const getRecord = mainPages.value?.find((el) =>
  el.subTitle?.toLocaleLowerCase().includes(String(route.params.id)),
);
newsMainPageContent.value = {
  title: getRecord?.title ?? "",
  imageBgLink: getRecord?.imageBgLink ?? "",
  imagePreviewLink: getRecord?.imagePreviewLink ?? "",
  subTitle: getRecord?.subTitle ?? "",
  shortDescription: getRecord?.shortDescription ?? "",
  description: getRecord?.description ?? "",
  extraeDscription: getRecord?.extraeDscription ?? "",
};

const isEmpty = computed(() => {
  if (!newsMainPageContent.value?.title && !newsMainPageContent.value?.shortDescription) {
    return true;
  }
  return false;
});
const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "The ield is empty.";
  },
];

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
  if (newsMainPageContent.value) {
    pendingData.value = true;
    if (getRecord?.id) {
      const result = await updateData(
        getRecord.id,
        filCover.value,
        filePreview.value,
        newsMainPageContent.value,
        "main-content-pages",
        "update",
      );
      delayLoading(result);
    } else {
      if (filCover.value && filePreview.value) {
        const result = await createData(
          filCover.value,
          filePreview.value,
          newsMainPageContent.value,
          "main-content-pages",
          "create",
        );
        delayLoading(result);
      }
    }
  }
};
</script>

<template>
  <section class="edit">
    <article v-if="newsMainPageContent">
      <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-container class="d-flex" fluid>
        <v-row>
          <v-col cols="12">
            <div class="content_item">
              <v-sheet class="mx-auto pa-2 bg-black w-50">
                <v-btn
                  :disabled="isEmpty"
                  :loading="pendingData"
                  type="button"
                  block
                  class="mt-2"
                  color="success"
                  @click="addPost"
                  >create</v-btn
                >
                <v-form class="bg-grey-darken-4">
                  <v-text-field
                    v-model="newsMainPageContent.title"
                    :rules="rules"
                    label="Title"></v-text-field>
                  <v-text-field
                    v-model="newsMainPageContent.subTitle"
                    :rules="rules"
                    label="SubTitle"></v-text-field>
                  <v-file-input
                    clearable
                    label="Image cover"
                    @change="selectCoverImage"></v-file-input>
                  <v-file-input
                    clearable
                    label="Image preview"
                    @change="selectPreviewImage"></v-file-input>
                  <v-text-field
                    v-model="newsMainPageContent.shortDescription"
                    :rules="rules"
                    label="Shord Description"></v-text-field>
                </v-form>
              </v-sheet>
            </div>
          </v-col>
          <v-col cols="6">
            <v-sheet>
              <v-card-title class="text-center">Description</v-card-title>
              <UiElementsAddEditor v-model:value="newsMainPageContent.description" />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <div class="editor_content bg-white" v-html="newsMainPageContent.description"></div>
          </v-col>
          <v-col cols="6">
            <v-sheet>
              <v-card-title class="text-center">Extra Description</v-card-title>
              <UiElementsAddEditor v-model:value="newsMainPageContent.extraeDscription" />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <div
              class="editor_content bg-white"
              v-html="newsMainPageContent.extraeDscription"></div>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </section>
</template>
