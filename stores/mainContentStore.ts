import { ref, useFetch, computed } from "#imports";
import { useImageStorage } from "@/composables/states";
import type { ContentPages } from "@prisma/client";
import { defineStore } from "pinia";
import type { IContentPage } from "types/IContentPage";
import { uuid } from "vue-uuid";

export const useMainContentStore = defineStore("content-store", () => {
  const mainPages = ref<ContentPages[]>();
  const pendingData = ref<any>();
  const supabaseStorage = useImageStorage();
  const isLoading = computed(() => pendingData);
  const loadPagesContent = async () => {
    try {
      const { data: response, error } = await useFetch(`/api/prisma/main-content-pages/list`);
      if (error) {
        throw error;
      }
      console.log(response);
      mainPages.value = response.value as ContentPages[];
    } catch (error) {
      console.log(error);
    }
  };

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
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
    return "image";
  };
  const getContentByTitle = async (title: string) => {
    return mainPages.value?.find((el) => el.title === title);
  };
  const addPageContent = async (fileData: FileList, content: IContentPage) => {
    content.imageBgLink = await loadImage(fileData);

    const {
      pending,
      data: response,
      error,
    } = await useFetch("/api/prisma/main-content-pages/create", {
      method: "post",
      body: JSON.stringify(content),
    });
    pendingData.value = pending;
    console.log(response);

    console.log(pending);
    console.log(error);
  };

  const updatePageContent = async (
    idPost: string,
    fileData: FileList | undefined,
    content: ContentPages,
  ) => {
    try {
      fileData && (content.imageBgLink = await loadImage(fileData));

      const { data: response, error } = await useFetch(
        `/api/prisma/main-content-pages/update/${idPost}`,
        {
          method: "post",
          body: JSON.stringify(content),
        },
      );
      console.log(response);
      if (error) {
        // throw new Error("");
        throw error;
      }
    } catch (error) {
      console.log(error);
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
