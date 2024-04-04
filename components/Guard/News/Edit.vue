<script setup lang="ts">
import { computed, navigateTo, reactive, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import sender from "~/composables/sender";
import extractFileFromEvent from "~/utils/extractFileFromEvent";

const route = useRoute();

const pendingData = useIsLoading();

const { postlist } = storeToRefs(useUnionStorage());

const { createOrUpdateData } = useUnionStorage();

const category = ["Education", "FightingExtinction", "News"];
const getPost = postlist.value?.find((el) => el.id === String(route.params.id));
const state = reactive({
  title: getPost?.title ?? "",
  description: getPost?.description ?? "",
  category: getPost?.category ?? "News",
  extraeDscription: getPost?.extraeDscription ?? "",
});

const isEmpty = computed(() => !(state.title && state.description && state.extraeDscription));
const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "Field is empty";
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
  const updatePath = "post/update";
  pendingData.value = true;

  if (getPost?.id) {
    const resultPromise = await sender(
      { ...state },
      `${updatePath}/${getPost.id}`,
      null,
      createOrUpdateData,
      filCover.value,
      filePreview.value,
    );

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
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container class="position-relative d-flex justify-end" fluid>
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
                <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
                <v-file-input
                  clearable
                  label="Image cover"
                  @change="selectCoverImage"></v-file-input>
                <v-file-input
                  clearable
                  label="Image preview"
                  @change="selectPreviewImage"></v-file-input>
                <v-select v-model="state.category" :items="category"></v-select>
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
        <v-col class="content_news">
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
