import { computed, ref, useFetch } from "#imports";
import supabaseStete from "@/composables/supabaseStete";
import type { Post } from "@prisma/client";
import { defineStore } from "pinia";
import type { IPost } from "types/IPost";
import { uuid } from "vue-uuid";

// import { useImageStorage } from "@/composables/states";

export const usePostStore = defineStore("post-store", () => {
  const postlist = ref<Post[]>();
  const pendingData = ref<boolean>(false);
  // const supabaseStorage = useImageStorage();
  // const supabaseStorage = useStoreState();
  const getFunc = supabaseStete();
  // const { $supabaseStore } = useNuxtApp();
  const supabaseStore = getFunc();

  const refrashData = ref<CallableFunction>();
  const isLoading = computed(() => pendingData);
  const loadPostList = async () => {
    try {
      const { data: response, error, refresh } = await useFetch("/api/prisma/post/list");

      // const { data: response, error } = await useAsyncData("pagesContent", () =>
      //   $fetch("/api/prisma/main-content-pages/list"),
      // );

      // refrashData.value = refresh;

      if (error.value) {
        throw error.value;
      }

      postlist.value = response.value as Post[];
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
      try {
        const { data, error } = await supabaseStore.storage
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
    return postlist.value?.find((el) => el.title === title);
  };
  const createPost = async (fileData: 0 | FileList | undefined, content: IPost) => {
    try {
      if (fileData) {
        content.imageBgLink = await loadImage(fileData);
      }

      const { data: response, error } = await useFetch<string>("/api/prisma/post/create", {
        method: "post",
        body: JSON.stringify(content),
      });
      console.log(pendingData.value);

      setTimeout(() => {
        pendingData.value = !pendingData.value;
      }, 3000);

      console.log(pendingData.value);

      if (error.value) {
        throw error.value;
      }
      return response.value;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };

  const updatePost = async (idPost: string, fileData: FileList | undefined, content: IPost) => {
    try {
      fileData && (content.imageBgLink = await loadImage(fileData));

      const { data: response, error } = await useFetch<string>(
        `/api/prisma/post/update/${idPost}`,
        {
          method: "post",
          body: JSON.stringify(content),
        },
      );
      console.log(response);

      // throw new Error("");
      if (error.value) {
        throw error.value;
      }
      return response.value;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };
  const getById = async (idPage: string) => {
    // try {
    //     const { data: response, error } = await useFetch(
    //       `/api/prisma/post/search-by-id/${idPage}`,
    //     );
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    return postlist.value?.find((el) => el.id === idPage);
  };
  const deleteById = async (idPage: string) => {
    try {
      const { data: response, error } = await useFetch(`/api/prisma/post/delete-by-id/${idPage}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    postlist,
    pendingData,
    getById,
    loadPostList,
    createPost,
    updatePost,
    getContentByTitle,
    deleteById,
  };
});
