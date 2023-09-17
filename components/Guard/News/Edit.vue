<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { usePostStore } from "@/stores/postStore";
import type { Post } from "@prisma/client";
import { storeToRefs } from "pinia";

const route = useRoute();

//Modal data
// const dialogModal = ref(false);
// const titleResult = ref("");
// const iconResult = ref("");
// const colorIcon = ref("");
const pendingData = useIsLoading();

//pendingData - returns undefined by default or object
const { postlist } = storeToRefs(usePostStore());

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
// const loadingDelay = (result: string | null) => {
//   setTimeout(() => {
//     pendingData.value = false;
//     if (result) {
//       titleResult.value = result;
//       colorIcon.value = result.toLocaleLowerCase();
//       result === "Success" && (iconResult.value = "mdi-check-circle-outline");
//       result === "Error" && (iconResult.value = "mdi-close-thick");
//       dialogModal.value = !dialogModal.value;
//     }
//   }, 3000);
// };

const addPost = async () => {
  // pendingData.value = !pendingData.value;
  pendingData.value = true;
  if (currentPost.value) {
    const result = await updatePost(currentPost.value?.id, fileData.value, {
      title: currentPost.value.title,
      imageBgLink: currentPost.value?.imageBgLink,
      category: selected.value,
      description: currentPost.value?.description,
      extraeDscription: currentPost.value?.extraeDscription,
    });

    // loadingDelay(result);
    delayLoading(result);
  }
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container v-if="currentPost" class="position-relative d-flex justify-end" fluid>
      <!--       <div class="position-absolute">
        <v-fade-transition hide-on-leave>
          <v-alert v-if="dialogModal" :color="colorIcon" variant="tonal">
            <div class="d-flex align-center justify-center">
              <v-icon :color="colorIcon" :icon="iconResult" size="25"></v-icon>
              <v-card-title class="font-weight-bold">{{ titleResult }}</v-card-title>
            </div>

            <template #append>
              <v-btn size="20" variant="text" @click="dialogModal = false">
                <v-icon :color="colorIcon" icon="$close" size="20"></v-icon>
              </v-btn>
            </template>
          </v-alert>
        </v-fade-transition>
      </div> -->
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
                >update data</v-btn
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
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.editor_content {
  max-height: 1316px;
  overflow-y: auto;
}
</style>
