<script setup lang="ts">
import { computed, navigateTo, reactive, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import sender from "~/composables/sender";
import extractFileFromEvent from "~/utils/extractFileFromEvent";

const route = useRoute();

const { mainPages } = storeToRefs(useUnionStorage());

const { createOrUpdateData, loadDataList } = useUnionStorage();

const pendingData = useIsLoading();
// const getRecord = mainPages.value?.find((el) =>
//   el.subTitle?.toLocaleLowerCase().includes(String(route.params.id)),
// );
const getRecord = mainPages.value?.find((el) => el.id === String(route.params.id));

const state = reactive({
  title: getRecord?.title ?? "",
  subTitle: getRecord?.subTitle ?? "",
  shortDescription: getRecord?.shortDescription ?? "",
  description: getRecord?.description ?? "",
  extraeDscription: getRecord?.extraeDscription ?? "",
});

const subtitle = [
  "news",
  "extinction",
  "plan",
  "species",
  "education",
  "aboutus",
  "sponsors",
  "careers",
  "volunteer",
  "membership",
  "tickets",
  "donate",
];

const isEmpty = computed(
  () => !(state.title && state.subTitle && state.shortDescription && state.description),
);

const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "The ield is empty.";
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
  const createPath = `base/create-by-type/main-content-pages`;
  const updatePath = "maincontent/update-by-id";

  pendingData.value = true;
  if (!isEmpty.value) {
    if (getRecord?.id) {
      const resultPromise = await sender(
        { ...state },
        `${updatePath}/${getRecord.id}`,
        null,
        createOrUpdateData,
        filCover.value,
        filePreview.value,
      );

      // const getpackData = await packToFormData(
      //   { ...state },
      //   null,
      //   filCover.value,
      //   filePreview.value,
      // );
      // const result = await createOrUpdateData(
      //   `${updatePath}/${getRecord.id}`,
      //   getpackData,
      // );

      if (resultPromise.statusCode === 200) {
        delayLoading("Success");
        await new Promise((resolve) =>
          setTimeout(() => {
            navigateTo(String(route.query.id));
          }, 2500),
        );
        //   Promise.resolve( delayLoading("Success")).then(() =>  setTimeout(async() => {
        //   await  navigateTo( "/guard/section/main")
        // }, 1000) )
      } else {
        delayLoading("Error");
      }
    } else {
      if (filCover.value && filePreview.value) {
        const resultPromise = await sender(
          { ...state },
          createPath,
          null,
          createOrUpdateData,
          filCover.value,
          filePreview.value,
        );

        // const getpackData = await packToFormData(state, null, filCover.value, filePreview.value);

        // const result = await createOrUpdateData(
        //   `base/create-by-type/main-content-pages`,
        //   getpackData,
        // );
        if (resultPromise.statusCode === 200) {
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
  }
};
</script>

<template>
  <section class="edit">
    <article>
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
                  <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
                  <v-select v-model="state.subTitle" :items="subtitle"></v-select>

                  <v-file-input
                    clearable
                    label="Image cover"
                    @change="selectCoverImage"></v-file-input>
                  <v-file-input
                    clearable
                    label="Image preview"
                    @change="selectPreviewImage"></v-file-input>
                  <v-text-field
                    v-model="state.shortDescription"
                    :rules="rules"
                    label="Shord Description"></v-text-field>
                </v-form>
              </v-sheet>
            </div>
          </v-col>
          <v-col cols="6">
            <v-sheet>
              <v-card-title class="text-center">Description</v-card-title>
              <UiElementsAddEditor v-model:value="state.description" />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <div class="editor_content bg-white" v-html="state.description"></div>
          </v-col>
          <v-col cols="6">
            <v-sheet>
              <v-card-title class="text-center">Extra Description</v-card-title>
              <UiElementsAddEditor v-model:value="state.extraeDscription" />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <div class="editor_content bg-white" v-html="state.extraeDscription"></div>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </section>
</template>
