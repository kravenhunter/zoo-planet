<script setup lang="ts">
import { computed, navigateTo, reactive, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";
import { useUnionStorage } from "@/stores/unionStore";
import { storeToRefs } from "pinia";
import extractFileFromEvent from "~/utils/extractFileFromEvent";
import packToFormData from "~/utils/packToFormData";

const route = useRoute();
console.log(route);

const { specieList } = storeToRefs(useUnionStorage());

const { createOrUpdateData } = useUnionStorage();
const pendingData = useIsLoading();
const getRecord = specieList.value?.find((el) => el.id === route.params.id);

const currentSpecie = reactive({
  title: getRecord?.title ?? "",
  imageBgLink: getRecord?.imageBgLink ?? "",
  habitain: getRecord?.habitain ?? "",
  populationTrend: getRecord?.populationTrend ?? "Stable",
  countLeft: getRecord?.countLeft ?? "",
  conservationStatus: getRecord?.conservationStatus ?? "EN",
  shordDescription: getRecord?.shordDescription ?? "",
  description: getRecord?.description ?? "",
  extraeDscription: getRecord?.extraeDscription ?? "",
});
const selected = ref("LC");
const conservationStatus = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];
const selectedPopulation = ref("Stable");
const popelationStatus = ["Decreasing", "Increasing", "Stable"];

console.log(getRecord);
console.log(specieList.value);

selected.value = getRecord ? getRecord.conservationStatus : "LC";
selectedPopulation.value = getRecord ? getRecord.populationTrend : "Stable";

const isEmpty = computed(() => (currentSpecie?.title && currentSpecie.description ? false : true));
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
  pendingData.value = true;

  if (getRecord?.id) {
    currentSpecie.conservationStatus = selected.value;
    currentSpecie.populationTrend = selectedPopulation.value;

    const getpackData = await packToFormData(
      currentSpecie,
      null,
      filCover.value,
      filePreview.value,
    );
    const result = await createOrUpdateData(`specie/update/${getRecord.id}`, getpackData);
    if (result.statusCode === 200) {
      delayLoading("Success");
      await new Promise((resolve) =>
        setTimeout(() => {
          navigateTo(String(route.query.id));
        }, 2500),
      );
    } else {
      delayLoading("Error");
    }
  } else {
    if (filCover.value && filePreview.value) {
      currentSpecie.conservationStatus = selected.value;
      currentSpecie.populationTrend = selectedPopulation.value;

      const getpackData = await packToFormData(
        currentSpecie,
        null,
        filCover.value,
        filePreview.value,
      );

      const result = await createOrUpdateData(`base/create-by-type/specie`, getpackData);
      if (result.statusCode === 200) {
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
};
</script>

<template>
  <section class="edit">
    <v-overlay tabindex="0" :model-value="pendingData" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="d-flex" fluid>
      <v-row>
        <v-col cols="12">
          <v-sheet class="pa-2 mx-auto bg-black w-50">
            <v-btn
              :disabled="isEmpty"
              :loading="pendingData"
              type="button"
              block
              class="my-5"
              color="success"
              @click="addPost"
              >Create</v-btn
            >
            <v-form class="bg-grey-darken-4">
              <v-text-field
                v-model="currentSpecie!.title"
                :rules="rules"
                label="Title"></v-text-field>
              <v-file-input clearable label="Image cover" @change="selectCoverImage"></v-file-input>
              <v-file-input
                clearable
                label="Image preview"
                @change="selectPreviewImage"></v-file-input>
              <v-text-field
                v-model="currentSpecie!.habitain"
                :rules="rules"
                label="Habitain"></v-text-field>
              <v-text-field
                v-model="currentSpecie!.countLeft"
                :rules="rules"
                label="CountLeft"></v-text-field>
              <v-select v-model="selectedPopulation" :items="popelationStatus"></v-select>
              <v-select v-model="selected" :items="conservationStatus"></v-select>

              <v-text-field
                v-model="currentSpecie!.shordDescription"
                :rules="rules"
                label="Shord Description"></v-text-field>
            </v-form>
          </v-sheet>
        </v-col>

        <v-col cols="6">
          <v-sheet>
            <v-card-title class="text-center">Description</v-card-title>
            <UiElementsAddEditor v-if="currentSpecie!" v-model:value="currentSpecie!.description" />
          </v-sheet>
        </v-col>
        <v-col cols="6" class="content_news">
          <div class="editor_content bg-white" v-html="currentSpecie!.description"></div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
