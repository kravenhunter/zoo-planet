<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";
import { usePostStore } from "@/stores/postStore";
import type { Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();

//Modal data
const dialogModal = ref(false);
const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");

//pendingData - returns undefined by default or object
const { pendingData, postlist } = storeToRefs(usePostStore());

const { updatePost } = usePostStore();
const currentPost = ref<Post>();
currentPost.value = postlist.value?.find((el) => el.id === String(route.params.id));

const selected = ref("Education");
const category = ["Education", "FightingExtinction", "News"];

const isEmpty = computed(() => {
  if (currentPost.value?.title && currentPost.value?.description) {
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
const fileData = ref<FileList>();

const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (fileData.value = fileEvent.files);
};

const addPost = async () => {
  pendingData.value = !pendingData.value;
  currentPost.value?.id &&
    (await updatePost(currentPost.value?.id, fileData.value, {
      title: currentPost.value?.title,
      imageBgLink: currentPost.value?.imageBgLink,
      category: selected.value,
      description: currentPost.value?.description,
      extraeDscription: currentPost.value?.extraeDscription,
    }));
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container v-if="currentPost" class="position-relative d-flex justify-center" fluid>
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
                >Update</v-btn
              >
              <v-form>
                <v-text-field
                  v-model="currentPost.title"
                  :rules="rules"
                  label="Title"></v-text-field>
                <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
                <v-select v-model="selected" :items="category"></v-select>
                <v-text-field
                  v-model="currentPost.description"
                  :rules="rules"
                  label="Shord Description"></v-text-field>
              </v-form>
              <span class="text-subtitle-1 pl-5">Description</span>
              <UiElementsAddEditor
                v-if="currentPost.extraeDscription"
                v-model:value="currentPost.extraeDscription" />
            </v-sheet>
          </div>
        </v-col>
        <v-col class="content_news">
          <div class="editor_content bg-white mt-5" v-html="currentPost.extraeDscription"></div>
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
