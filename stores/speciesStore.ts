import { ref } from "#imports";

import type { Specie } from "@prisma/client";

import { defineStore } from "pinia";

import {
  createData,
  deleteDataById,
  loadData,
  updateData,
} from "@/composables/genericCrudFunctions";

import type { ISpecie } from "@/types/ISpecie";

// import supabaseStete from "@/composables/supabaseStete";

export const useSpeciesStore = defineStore("species-store", () => {
  const specieList = ref<Specie[] | null>();
  const pendingData = ref<boolean>(false);

  const loadSpeciesList = async () => {
    const result = await loadData<Specie>("specie", "list");

    specieList.value = result;
  };

  const getSpecietByTitleName = async (title: string) => {
    return specieList.value?.find((el) => el.title === title);
  };
  const addSpecieContent = async (fileData: FileList, content: ISpecie) => {
    if (fileData) {
      const result = await createData<ISpecie>("specie", "create", fileData, content);

      if (result) {
        specieList.value?.unshift({ ...(result as Specie) });
        return "Success";
      }
    }
    return "Error";
  };

  const updateSpecieContent = async (
    idPost: string,
    fileData: 0 | FileList | undefined,
    content: ISpecie,
  ) => {
    if (idPost) {
      const result = await updateData<ISpecie>(idPost, "specie", "update", fileData, content);
      if (result) {
        const converted = result as Specie;
        const filter: Specie[] = [...specieList.value!.filter((el) => el.id !== converted.id)];
        specieList.value = [];
        specieList.value = filter;
        specieList.value.unshift(converted);
      }

      return "Success";
    }
    return "Error";
  };

  const deleteSpecieById = async (idPage: string) => {
    if (idPage) {
      const result = await deleteDataById(idPage, "specie", "delete-by-id");
      return result;
    }
    return "Error";
  };
  return {
    specieList,
    pendingData,
    addSpecieContent,
    getSpecietByTitleName,
    loadSpeciesList,
    updateSpecieContent,
    deleteSpecieById,
  };
});

// export const useSpeciesStore = defineStore("species-store", () => {
//   const specieList = ref<Specie[] | null>();
//   const pendingData = ref<boolean>(false);
//   const supabaseStorage = useImageStorage();
//   // const supabaseStorage = useStoreState();
//   // const { $supabaseStore } = useNuxtApp();

//   // const getFunc = supabaseStete();
//   // const supabaseStore = getFunc();

//   const refrashData = ref<CallableFunction>();
//   const isLoading = computed(() => pendingData);
//   const loadSpeciesList = async () => {
//     try {
//       const {
//         data: response,
//         error,
//         refresh,
//       } = await useFetch<Specie[]>("/api/prisma/specie/list");

//       if (error.value) {
//         throw error.value;
//       }

//       specieList.value = response.value;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   /*  const refrashData = async () => {
//     try {
//       const {
//         data: response,
//         error,
//         refresh,
//       } = await useFetch(`/api/prisma/main-content-pages/list`);
//       if (error) {
//         throw error;
//       }

//       console.log(response);
//       mainPages.value = response.value as ContentPages[];
//     } catch (error) {
//       console.log(error);
//     }
//   }; */
//   /**
//    * Load image to Store .
//    * @param {FileList} fileData - Arguments to upload one image file.
//    * @return {Promise<string>}  Promise string
//    *
//    **/
//   const loadImage = async (fileData: FileList): Promise<string> => {
//     let urls = "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/";
//     if (fileData) {
//       //   const fileName = `${Math.floor(Math.random() * 1000)}${fileData[0]?.name}`;
//       const fileName = `${uuid.v4() + fileData[0].name}`;
//       const { data, error } = await supabaseStorage.storage
//         .from("/images")
//         .upload(fileName, fileData[0]);
//       if (error) {
//         throw error;
//       }
//       console.log(data);
//       urls += data.path;

//       console.log(urls);
//       return urls;
//     }
//     return "image";
//   };

//   const getSpecietByTitleName = async (title: string) => {
//     return specieList.value?.find((el) => el.title === title);
//   };
//   const addSpecieContent = async (fileData: FileList, content: ISpecie) => {
//     try {
//       content.imageBgLink = await loadImage(fileData);
//       const { data: response, error } = await useFetch<string>("/api/prisma/specie/create", {
//         method: "post",
//         body: JSON.stringify(content),
//       });

//       if (error.value) {
//         throw error.value;
//       }
//       return response.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };

//   const updateSpecieContent = async (
//     idPost: string,
//     fileData: 0 | FileList | undefined,
//     content: ISpecie,
//   ) => {
//     try {
//       fileData && (content.imageBgLink = await loadImage(fileData));

//       const { data: response, error } = await useFetch<string>(
//         `/api/prisma/specie/update/${idPost}`,
//         {
//           method: "post",
//           body: JSON.stringify(content),
//         },
//       );

//       // throw new Error("");
//       if (error.value) {
//         throw error.value;
//       }

//       return response.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };
//   const deleteSpecieById = async (idPage: string) => {
//     try {
//       const { data: response, error } = await useFetch<string>(
//         `/api/prisma/specie/delete-by-id/${idPage}`,
//       );
//       if (error.value) {
//         throw error.value;
//       }

//       return response.value;
//     } catch (error) {
//       console.log(error);
//       return "Error";
//     }
//   };
//   return {
//     specieList,
//     pendingData,
//     addSpecieContent,
//     getSpecietByTitleName,
//     loadSpeciesList,
//     updateSpecieContent,
//     deleteSpecieById,
//   };
// });
