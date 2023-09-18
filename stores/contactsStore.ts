import { ref } from "#imports";

import type { ContactUs } from "@prisma/client";

import { defineStore } from "pinia";

import {
  createData,
  deleteDataById,
  loadData,
  updateData,
} from "@/composables/genericCrudFunctions";
import { useImageStorage } from "@/composables/states";
import type { IContacts } from "types/IContacts";

export const useContactsStore = defineStore("contacts-store", () => {
  const contactPage = ref<ContactUs[] | null>();
  const isLoadingContacts = ref<boolean>(false);
  const supabaseStorage = useImageStorage();

  const loadContacts = async () => {
    const result = await loadData<ContactUs>("contacts", "list");
    contactPage.value = result;
  };

  const addContactContent = async (fileData: FileList, content: IContacts) => {
    if (fileData) {
      const result = await createData<IContacts>("contacts", "create", fileData, content);

      if (result) {
        contactPage.value = [];

        contactPage.value.push({ ...(result as ContactUs) });
        return "Success";
      }
    }
    return "Error";
  };

  const updateContactContent = async (
    idPost: string,
    fileData: 0 | FileList | undefined,
    content: IContacts,
  ) => {
    if (idPost) {
      const result = await updateData<IContacts>(idPost, "contacts", "update", fileData, content);

      if (result) {
        contactPage.value = [];

        contactPage.value.push({ ...(result as ContactUs) });
        return "Success";
      }
    }
    return "Error";
  };

  const deleteContactsById = async (idPage: string) => {
    if (idPage) {
      const result = await deleteDataById(idPage, "contacts", "delete-by-id");
      return result;
    }
    return "Error";
  };
  return {
    contactPage,
    isLoadingContacts,
    loadContacts,
    addContactContent,
    updateContactContent,
  };
});

// export const useContactsStore = defineStore("contacts-store", () => {
//   const contactPage = ref<ContactUs[] | null>();
//   const isLoadingContacts = ref<boolean>(false);
//   const supabaseStorage = useImageStorage();

//   const loadContacts = async () => {
//     try {
//       const {
//         data: response,
//         error,
//         refresh,
//       } = await useFetch<ContactUs[]>("/api/prisma/contacts/list");

//       if (error.value) {
//         throw error.value;
//       }
//       console.log("Contacts", response.value);
//       contactPage.value = response.value;
//     } catch (error) {
//       console.log(error);
//     }
//   };

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

//   const addContactContent = async (fileData: FileList, content: IContacts) => {
//     try {
//       content.imageBgLink = await loadImage(fileData);
//       const { data: response, error } = await useFetch<string>("/api/prisma/contacts/create", {
//         method: "post",
//         body: JSON.stringify(content),
//       });
//       console.log(isLoadingContacts.value);

//       setTimeout(() => {
//         isLoadingContacts.value = !isLoadingContacts.value;
//       }, 3000);

//       if (error.value) {
//         throw error.value;
//       }
//       return response.value;
//     } catch (error) {
//       console.log(error);
//       setTimeout(() => {
//         isLoadingContacts.value = !isLoadingContacts.value;
//       }, 3000);
//       return "Error";
//     }
//   };

//   const updateContactContent = async (
//     idPost: string,
//     fileData: 0 | FileList | undefined,
//     content: IContacts,
//   ) => {
//     try {
//       fileData && (content.imageBgLink = await loadImage(fileData));

//       const { data: response, error } = await useFetch<string>(
//         `/api/prisma/contacts/update/${idPost}`,
//         {
//           method: "post",
//           body: JSON.stringify(content),
//         },
//       );

//       setTimeout(() => {
//         isLoadingContacts.value = !isLoadingContacts.value;
//       }, 3000);

//       // throw new Error("");
//       if (error.value) {
//         throw error.value;
//       }

//       return response.value;
//     } catch (error) {
//       console.log(error);
//       setTimeout(() => {
//         isLoadingContacts.value = !isLoadingContacts.value;
//       }, 3000);

//       return "Error";
//     }
//   };

//   return {
//     contactPage,
//     isLoadingContacts,
//     loadContacts,
//     addContactContent,
//     updateContactContent,
//   };
// });
