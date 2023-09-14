<script setup lang="ts">
import { definePageMeta, onMounted, reactive, ref, useFetch, useRoute } from "#imports";
import { useImageStorage } from "@/composables/states";
import { useMainContentStore } from "@/stores/mainContentStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const currentId = "8feccc19-4820-460a-a29e-e5e469d7bc1cc";
const titleNews = [
  {
    id: "8feccc19-4820-460a-a29e-e5e469d7bc1cc",
    title: "latest news",
    sourceTitle: "/images/zoo_4.jpg",
    subtitle: "",
    text: "All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability.",
  },
];
const { pendingData } = storeToRefs(useMainContentStore());
const { addPageContent, updatePageContent, getContentByTitle } = useMainContentStore();
const supabaseStorage = useImageStorage();
const state = reactive({
  title: "",
  subTitle: "",
  imageBgLink: "image",
  shortDescription: "",
  description: "",
  extraeDscription: "",
});

const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "You must enter a first name.";
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
  fileData.value && (await addPageContent(fileData.value, state));
};

const getPostById = async (id: string) => {
  try {
    const { data: response, error } = await useFetch(`/api/prisma/post/search-by-id/${id}`);
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
onMounted(() => {
  /*   getAuth(); */
});

definePageMeta({
  layout: "admin-layout",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <section class="edit">
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="content_item">
            <v-sheet class="pa-2">
              <v-form @submit.prevent="addPost">
                <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
                <v-text-field
                  v-model="state.subTitle"
                  :rules="rules"
                  label="SubTitle"></v-text-field>
                <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
                <v-text-field
                  v-model="state.shortDescription"
                  :rules="rules"
                  label="Shord Description"></v-text-field>

                <span class="text-subtitle-1 pl-5">Description</span>
                <UiElementsAddEditor v-model:value="state.description" />
                <v-btn type="submit" block class="mt-2" color="success">Add new</v-btn>
              </v-form>
            </v-sheet>
          </div>
        </v-col>
        <v-col>
          <div class="editor_content bg-white mt-5" v-html="state.description"></div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped></style>
