<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";
import { delayLoading, useIsLoading } from "@/composables/states";

import { useUnionStore } from "@/stores/storeGenerics";
import { storeToRefs } from "pinia";
import type { ISpecie } from "types/ISpecie";

// import type { Specie } from "@prisma/client";
const route = useRoute();
//isLoadingContacts - returns false or true

const { specieList } = storeToRefs(useUnionStore());

const { updateData, createData } = useUnionStore();
const pendingData = useIsLoading();

// const currentSpecie = ref<ISpecie>({
//         title: "",
//         imageBgLink: "",
//         habitain:  "",
//         countLeft: "",
//         conservationStatus: 'EN',
//         shordDescription:  "",
//         description:  "",
//         extraeDscription:  "",
// });
const currentSpecie = ref<ISpecie>();
const selected = ref("LC");
const conservationStatus = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];
const selectedPopulation = ref("Stable");
const popelationStatus = ["Decreasing", "Increasing", "Stable"];

const getRecord = specieList.value?.find((el) => el.id === route.params.id);
selected.value = getRecord ? getRecord.conservationStatus : "LC";
selectedPopulation.value = getRecord ? getRecord.populationTrend : "Stable";
currentSpecie.value = {
  title: getRecord?.title ?? "",
  imageBgLink: getRecord?.imageBgLink ?? "",
  habitain: getRecord?.habitain ?? "",
  populationTrend: getRecord?.populationTrend ?? "Stable",
  countLeft: getRecord?.countLeft ?? "",
  conservationStatus: getRecord?.conservationStatus ?? "EN",
  shordDescription: getRecord?.shordDescription ?? "",
  description: getRecord?.description ?? "",
  extraeDscription: getRecord?.extraeDscription ?? "",
};

const isEmpty = computed(() => {
  if (currentSpecie.value?.title && currentSpecie.value.description) {
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

  if (getRecord?.id) {
    currentSpecie.value!.conservationStatus = selected.value;
    currentSpecie.value!.populationTrend = selectedPopulation.value;
    // const result = await updateSpecieContent(getRecord?.id, fileData.value, {
    //   title: currentSpecie.value!.title,
    //   imageBgLink: currentSpecie.value!.imageBgLink,
    //   populationTrend: selectedPopulation.value,
    //   habitain: currentSpecie.value!.habitain,
    //   countLeft: currentSpecie.value!.countLeft,
    //   conservationStatus: selected.value,
    //   shordDescription: currentSpecie.value!.shordDescription,
    //   description: currentSpecie.value!.description,
    //   extraeDscription: currentSpecie.value!.extraeDscription ?? undefined,
    // });
    const result = await updateData(
      getRecord.id,
      filCover.value,
      filePreview.value,
      currentSpecie.value!,
      "specie",
      "update",
    );
    delayLoading(result);
  } else {
    if (filCover.value && filePreview.value) {
      currentSpecie.value!.conservationStatus = selected.value;
      currentSpecie.value!.populationTrend = selectedPopulation.value;

      const result = await createData(
        filCover.value,
        filePreview.value,
        currentSpecie.value!,
        "specie",
        "create",
      );
      delayLoading(result);
    }
  }
};
</script>

<template>
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
</template>

<style scoped lang="scss"></style>
