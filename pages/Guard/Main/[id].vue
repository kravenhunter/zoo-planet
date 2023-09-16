<script setup lang="ts">
import {
  computed,
  definePageMeta,
  onMounted,
  reactive,
  ref,
  useFetch,
  useRoute,
  watch,
} from "#imports";
import { useMainContentStore } from "@/stores/mainContentStore";
import { usePostStore } from "@/stores/postStore";
import type { ContentPages, Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();

// Main Content Data
//pendingData - returns undefined by default or object
const { mainPages, pendingData } = storeToRefs(useMainContentStore());
const { addPageContent, updatePageContent, getContentByTitle } = useMainContentStore();

//  Articles
const { postlist } = storeToRefs(usePostStore());

const newsMainPageContent = ref<ContentPages>();
const latestNewsList = ref<Post[]>();

newsMainPageContent.value = mainPages.value?.find((el) =>
  el.subTitle?.toLocaleLowerCase().includes(String(route.params.id)),
);

const state = reactive({
  title: "",
  subTitle: "",
  imageBgLink: "image",
  shortDescription: "",
  description: "",
  extraeDscription: "",
});
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

    await updatePageContent(newsMainPageContent.value?.id, fileData.value, {
      imageBgLink: newsMainPageContent.value?.imageBgLink,
      title: newsMainPageContent.value?.title,
      subTitle: newsMainPageContent.value?.subTitle ?? undefined,
      shortDescription: newsMainPageContent.value?.shortDescription,
      description: newsMainPageContent.value?.description,
      extraeDscription: newsMainPageContent.value?.extraeDscription ?? undefined,
    });
  }
};

const getPostById = async (id: string) => {
  try {
    // const { data: response, error } = await useFetch(`/api/prisma/post/search-by-id/${id}`);
    const {
      data: response,
      error,
      refresh,
    } = await useFetch(`/api/prisma/post/search-by-id/${id}`);
    if (error) {
      throw error;
    }
    console.log(response);

    state.title = response.value.title;
    state.imageBgLink = response.value.imageBgLink;
    state.description = response.value.description;
    state.extraeDscription = response.value.extraeDscription;
  } catch (error) {
    console.log(error);
  }
};
watch(pendingData, (curr, prev) => {
  console.log("Prev", prev);
  console.log("Curr", curr);
});
function getElement() {
  //v-overlay v-overlay--active
  const catchClick = document.querySelector(".v-overlay-container .v-overlay");
  catchClick?.addEventListener("click", (event: Event) => event.stopPropagation());
  console.log(catchClick);
}
onMounted(() => {
  /*   getAuth(); */
  /*   getElement(); */
});

definePageMeta({
  layout: "admin-layout",
});
</script>

<template>
  <section class="edit">
    <article v-if="newsMainPageContent">
      <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-container fluid>
        <v-row>
          <v-col>
            <div class="content_item">
              <v-sheet class="pa-2">
                <div class="loading" v-if="pendingData">
                  <p>Loading.....</p>
                </div>
                <v-btn
                  :disabled="isEmpty"
                  :loading="pendingData"
                  type="button"
                  block
                  class="mt-2"
                  color="success"
                  @click="addPost"
                  >Add new</v-btn
                >
                <v-form>
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
                <span class="text-subtitle-1 pl-5">Description</span>
                <UiElementsAddEditor v-model:value="newsMainPageContent.description" />
              </v-sheet>
            </div>
          </v-col>
          <v-col>
            <div
              class="editor_content bg-white mt-5"
              v-html="newsMainPageContent.description"></div>
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
