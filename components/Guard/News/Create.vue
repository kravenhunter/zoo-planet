<script setup lang="ts">
import { computed, reactive, ref } from "#imports";

import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStore } from "@/stores/storeGenerics";

const { createData } = useUnionStore();
const state = reactive({
  title: "",
  imageBgLink: "image",
  imagePreviewLink: "",
  category: "",
  description: "",
  extraeDscription: "",
});

const pendingData = useIsLoading();

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
  pendingData.value = true;
  if (filCover.value && filePreview.value) {
    state.category = selected.value;
    const result = await createData(filCover.value, filePreview.value, state, "post", "create");

    delayLoading(result);
  }
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container class="d-flex" fluid>
      <v-row>
        <v-col>
          <div class="content_item">
            <v-sheet class="pa-2">
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
                <v-file-input
                  clearable
                  label="Image cover"
                  @change="selectCoverImage"></v-file-input>
                <v-file-input
                  clearable
                  label="Image preview"
                  @change="selectPreviewImage"></v-file-input>
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
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
