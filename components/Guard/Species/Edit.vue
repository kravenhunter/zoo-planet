<script setup lang="ts">
import { computed, ref, useRoute } from "#imports";

import { useSpeciesStore } from "@/stores/speciesStore";

import { storeToRefs } from "pinia";
import type { ISpecie } from "types/ISpecie";

// import type { Specie } from "@prisma/client";
const route = useRoute();
//isLoadingContacts - returns false or true
const { pendingData, specieList } = storeToRefs(useSpeciesStore());

const { addSpecieContent, updateSpecieContent } = useSpeciesStore();

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
const getRecord = specieList.value?.find((el) => el.id === route.params.id);
currentSpecie.value = {
  title: getRecord?.title ?? "",
  imageBgLink: getRecord?.imageBgLink ?? "",
  habitain: getRecord?.habitain ?? "",
  populationTrend: getRecord?.habitain ?? "Stable",
  countLeft: getRecord?.countLeft ?? "",
  conservationStatus: getRecord?.conservationStatus ?? "EN",
  shordDescription: getRecord?.shordDescription ?? "",
  description: getRecord?.description ?? "",
  extraeDscription: getRecord?.extraeDscription ?? "",
};

const dialogModal = ref(false);
const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");
const selected = ref("LC");
const conservationStatus = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];
const selectedPopulation = ref("Stable");
const popelationStatus = ["Decreasing", "Increasing", "Stable"];
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
const fileData = ref<0 | FileList | undefined>();

const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;
};
const loadingDelay = (result: string | null) => {
  setTimeout(() => {
    pendingData.value = !pendingData.value;
    if (result) {
      titleResult.value = result;
      colorIcon.value = result.toLocaleLowerCase();
      result === "Success" && (iconResult.value = "mdi-check-circle-outline");
      result === "Error" && (iconResult.value = "mdi-close-thick");
      dialogModal.value = !dialogModal.value;
    }
  }, 3000);
};
const addPost = async () => {
  pendingData.value = false;

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
    const result = await updateSpecieContent(getRecord?.id, fileData.value, currentSpecie.value!);
    loadingDelay(result);
  } else {
    if (fileData.value) {
      currentSpecie.value!.conservationStatus = selected.value;
      currentSpecie.value!.populationTrend = selectedPopulation.value;

      const result = await addSpecieContent(fileData.value, currentSpecie.value!);
      loadingDelay(result);
    }
  }
};
</script>

<template>
  <v-container class="position-relative d-flex justify-end" fluid>
    <div class="position-absolute">
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
    </div>
    <v-row>
      <v-col cols="12" class="">
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
            <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
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
