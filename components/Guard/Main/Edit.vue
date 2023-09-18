<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useMainContentStore } from "@/stores/mainContentStore";
import { storeToRefs } from "pinia";
import type { IContentPage } from "types/IContentPage";

const route = useRoute();

// Main Content Data
//pendingData - returns undefined by default or object
const { mainPages } = storeToRefs(useMainContentStore());
const { addPageContent, updatePageContent } = useMainContentStore();

const pendingData = useIsLoading();
const newsMainPageContent = ref<IContentPage>();

const getRecord = mainPages.value?.find((el) =>
  el.subTitle?.toLocaleLowerCase().includes(String(route.params.id)),
);
newsMainPageContent.value = {
  title: getRecord?.title ?? "",
  imageBgLink: getRecord?.imageBgLink ?? "",
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
const fileData = ref<0 | FileList | undefined>();

const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;
  console.log(event);

  console.log(fileData.value);
};

const addPost = async () => {
  if (newsMainPageContent.value) {
    pendingData.value = !pendingData.value;
    if (getRecord?.id) {
      const result = await updatePageContent(
        getRecord.id,
        fileData.value,
        newsMainPageContent.value,
      );
      delayLoading(result);
    } else {
      if (fileData.value) {
        const result = await addPageContent(fileData.value, newsMainPageContent.value);
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
                  <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
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
        </v-row>
      </v-container>
    </article>
  </section>
</template>

<style scoped lang="scss">
/* .v-overlay {
  pointer-events: all;
  &--active {
    pointer-events: all;
  }
} */
</style>
