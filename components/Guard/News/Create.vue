<script setup lang="ts">
import { computed, reactive, ref } from "#imports";

import { usePostStore } from "@/stores/postStore";
import { storeToRefs } from "pinia";

//pendingData - returns false or true
const { pendingData } = storeToRefs(usePostStore());

const { createPost } = usePostStore();

const state = reactive({
  title: "",
  imageBgLink: "image",
  category: "",
  description: "",
  extraeDscription: "",
});
const dialogModal = ref(false);
const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");

const selected = ref("Education");
const category = ["Education", "FightingExtinction", "News"];

const isEmpty = computed(() => {
  if (state.title && state.description && state.extraeDscription) {
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
  console.log(event);

  console.log(fileData.value);
};

const addPost = async () => {
  if (fileData.value) {
    pendingData.value = !pendingData.value;
    state.category = selected.value;
    const result = await createPost(fileData.value, state);

    if (result) {
      titleResult.value = result;
      colorIcon.value = result.toLocaleLowerCase();
      result === "Success" && (iconResult.value = "mdi-check-circle-outline");
      result === "Error" && (iconResult.value = "mdi-close-thick");
      dialogModal.value = !dialogModal.value;
    }
  }
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container class="position-relative d-flex justify-center" fluid>
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
                >Create</v-btn
              >
              <v-form>
                <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
                <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
                <v-select v-model="selected" :items="category"></v-select>
                <v-text-field
                  v-model="state.description"
                  :rules="rules"
                  label="Shord Description"></v-text-field>
              </v-form>
              <span class="text-subtitle-1 pl-5">Description</span>
              <UiElementsAddEditor v-model:value="state.extraeDscription" />
            </v-sheet>
          </div>
        </v-col>
        <v-col class="content_news d-flex align-center">
          <div class="editor_content bg-white mt-5" v-html="state.extraeDscription"></div>
        </v-col>
      </v-row>
      <v-fade-transition hide-on-leave class="position-absolute w-100 align-self-center">
        <v-card v-if="dialogModal" append-icon="$close" elevation="16" max-width="500">
          <template #append>
            <v-btn icon="$close" variant="text" @click="dialogModal = false"></v-btn>
          </template>

          <v-divider></v-divider>

          <div class="py-12 text-center">
            <v-icon class="mb-6" :color="colorIcon" :icon="iconResult" size="128"></v-icon>

            <div class="text-h4 font-weight-bold">{{ titleResult }}</div>
          </div>

          <v-divider></v-divider>

          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              rounded
              variant="outlined"
              @click="dialogModal = false">
              Close
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
