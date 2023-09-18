<script setup lang="ts">
import { computed, reactive, ref } from "#imports";
import { getCurrentTime } from "@/composables/getTime";
import { delayLoading, useIsLoading } from "@/composables/states";
import { usePostStore } from "@/stores/postStore";

//pendingData - returns false or true

const { createPost } = usePostStore();

const state = reactive({
  title: "",
  imageBgLink: "image",
  category: "",
  description: "",
  extraeDscription: "",
});
// const dialogModal = ref(false);
// const titleResult = ref("");
// const iconResult = ref("");
// const colorIcon = ref("");
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
const fileData = ref<0 | FileList | undefined>();

const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;
  console.log(event);

  console.log(fileData.value);
};

const addPost = async () => {
  pendingData.value = true;
  if (fileData.value) {
    state.category = selected.value;
    const result = await createPost(fileData.value, state);

    // loadingDelay(result);
    console.log("Result addPost", getCurrentTime());
    delayLoading(result);
    console.log("End loading addPost", getCurrentTime());
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
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
