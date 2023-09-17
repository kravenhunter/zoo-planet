import { ref, useFetch } from "#imports";

import type { ContentPages } from "@prisma/client";

import { defineStore } from "pinia";
import type { IContentPage } from "types/IContentPage";
import { uuid } from "vue-uuid";

import { useImageStorage } from "@/composables/states";

// import supabaseStete from "@/composables/supabaseStete";

export const useMainContentStore = defineStore("content-store", () => {
  const mainPages = ref<ContentPages[] | null>();
  const pendingData = ref<boolean>(false);
  const supabaseStorage = useImageStorage();
  // const supabaseStorage = useStoreState();
  // const { $supabaseStore } = useNuxtApp();

  // const getFunc = supabaseStete();
  // const supabaseStore = getFunc();

  const refrashData = ref<CallableFunction>();

  const loadPagesContent = async () => {
    try {
      const {
        data: response,
        error,
        refresh,
      } = await useFetch<ContentPages[]>("/api/prisma/main-content-pages/list");

      if (error.value) {
        throw error.value;
      }

      mainPages.value = response.value;
    } catch (error) {
      console.log(error);
    }
  };
  /*  const refrashData = async () => {
    try {
      const {
        data: response,
        error,
        refresh,
      } = await useFetch(`/api/prisma/main-content-pages/list`);
      if (error) {
        throw error;
      }

      console.log(response);
      mainPages.value = response.value as ContentPages[];
    } catch (error) {
      console.log(error);
    }
  }; */
  /**
   * Load image to Store .
   * @param {FileList} fileData - Arguments to upload one image file.
   * @return {Promise<string>}  Promise string
   *
   **/
  const loadImage = async (fileData: FileList): Promise<string> => {
    let urls = "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/";
    if (fileData) {
      //   const fileName = `${Math.floor(Math.random() * 1000)}${fileData[0]?.name}`;
      const fileName = `${uuid.v4() + fileData[0].name}`;
      const { data, error } = await supabaseStorage.storage
        .from("/images")
        .upload(fileName, fileData[0]);
      if (error) {
        throw error;
      }
      console.log(data);
      urls += data.path;

      console.log(urls);
      return urls;
    }
    return "image";
  };

  const getContentByTitle = async (title: string) => {
    return mainPages.value?.find((el) => el.title === title);
  };
  const addPageContent = async (fileData: FileList, content: IContentPage) => {
    try {
      content.imageBgLink = await loadImage(fileData);
      const { data: response, error } = await useFetch<string>(
        "/api/prisma/main-content-pages/create",
        {
          method: "post",
          body: JSON.stringify(content),
        },
      );
      if (error.value) {
        throw error.value;
      }
      return response.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };

  const updatePageContent = async (
    idPost: string,
    fileData: 0 | FileList | undefined,
    content: IContentPage,
  ) => {
    try {
      fileData && (content.imageBgLink = await loadImage(fileData));

      const { data: response, error } = await useFetch<string>(
        `/api/prisma/main-content-pages/update/${idPost}`,
        {
          method: "post",
          body: JSON.stringify(content),
        },
      );

      if (error.value) {
        throw error.value;
      }
      return response.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };
  const deleteById = async (idPage: string) => {
    try {
      const { data: response, error } = await useFetch(
        `/api/prisma/main-content-pages/delete-by-id/${idPage}`,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    mainPages,
    pendingData,
    loadPagesContent,
    updatePageContent,
    addPageContent,
    getContentByTitle,
    deleteById,
  };
});
