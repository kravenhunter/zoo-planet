import { useFetch } from "#imports";
import { useImageStorage } from "@/composables/states";

import { uuid } from "vue-uuid";

import { compressToBestSizeImage } from "@/composables/compressFile";
import { getCurrentTime } from "@/composables/getTime";
import type { IMembershipPrice } from "@/types/IMembershipPrice";
import type { ITicketPrice } from "@/types/ITicketPrice";
import type {
  AboutUs,
  ContactUs,
  ContentPages,
  MembershipPrice,
  Post,
  Specie,
  TicketPrice,
} from "@prisma/client";
import type { IContacts } from "types/IContacts";
import type { IContentPage } from "types/IContentPage";
import type { IPost } from "types/IPost";
import type { ISpecie } from "types/ISpecie";

// type ExtendObject = IPost | IContentPage | ISpecie | IContacts | Post;
type ExtendObject = IPost | IContentPage | ISpecie | IContacts;
type ExtendOfTableObject = ITicketPrice | IMembershipPrice;
type ExtendOfModels = Post | ContentPages | Specie | ContactUs | AboutUs;
type ExtendOfTableModels = TicketPrice | MembershipPrice;

type ReqiestMethod =
  | "list"
  | "update"
  | "create"
  | "delete-by-id"
  | "create-ticket-prices"
  | "create-member-prices"
  | "update-member-prices"
  | "update-ticket-prices";

const apiUrl = "/api/prisma";

/**
 * Load List Data .
 * API FULL URL -  `/api/prisma/post/list`
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @return {Promise<T[] | null>}  Promise T[] | null
 *
 **/
export async function loadData<T>(table: string, method: ReqiestMethod): Promise<T[] | null> {
  //   `/api/prisma/post/list`
  const getUrls = `${apiUrl}/${table}/${method}`;

  try {
    const { data: response, error, refresh } = await useFetch<T[]>(getUrls);

    if (error.value) {
      throw error.value;
    }

    return response.value;
  } catch (error) {
    console.log(error);
    return null;
  }
}
/**
 * Load image to Store .
 * API FULL URL -  `/api/prisma/post/list`
 * @param {FileList} fileData - current image
 * @return {Promise<string>}  Promise string
 *
 **/
export async function loadImageToStore(fileData: FileList): Promise<string> {
  const supabaseStore = useImageStorage();

  let urls = "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/";

  if (fileData) {
    //   const fileName = `${Math.floor(Math.random() * 1000)}${fileData[0]?.name}`;
    const fileName = `${uuid.v4()}_compressed_${fileData[0].name}`;
    const newFile = await compressToBestSizeImage(fileData[0]);

    if (newFile?.compressedFILE) {
      try {
        const { data, error } = await supabaseStore.storage
          .from("images")
          .upload(fileName, newFile.compressedFILE);
        if (error) {
          throw error;
        }

        urls += data.path;

        return urls;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return "image";
}

/**
 * Create Record .
 * API FULL URL -  "/api/prisma/post/create"
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @param {FileList} fileData - current image
 * @param {T} content - current object
 * @return {Promise<ExtendOfModels | null>}  Promise string | null - status result Error |  Success | null
 *
 **/
export async function createData<T extends ExtendObject>(
  table: string,
  methodRequest: ReqiestMethod,
  fileData: FileList,
  content: T,
): Promise<ExtendOfModels | null> {
  const getUrls = `${apiUrl}/${table}/${methodRequest}`;

  if (fileData) {
    try {
      console.log("Enter CreateData", getCurrentTime());
      content.imageBgLink = await loadImageToStore(fileData);
      const { data: response, error } = await useFetch<ExtendOfModels>(getUrls, {
        method: "post",
        body: JSON.stringify(content),
      });

      if (error.value) {
        throw error.value;
      }

      console.log("Enter CreateData", getCurrentTime());
      return response.value;
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
/**
 * Update Record
 * API FULL URL -  "/api/prisma/post/update"
 * @param {string} idPost - current id  for request,
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @param {FileList} fileData - current image
 * @param {T} content - current object
 * @return {Promise<string | null>} Promise string | null - status result Error |  Success | null
 *
 **/
export async function updateData<T extends ExtendObject>(
  idPost: string,
  table: string,
  method: ReqiestMethod,
  fileData: 0 | FileList | undefined,
  content: T,
): Promise<ExtendOfModels | null> {
  const getUrls = `${apiUrl}/${table}/${method}/${idPost}`;
  try {
    fileData && (content.imageBgLink = await loadImageToStore(fileData));

    const { data: response, error } = await useFetch<ExtendOfModels | null>(getUrls, {
      method: "post",
      body: JSON.stringify(content),
    });

    if (error.value) {
      throw error.value;
    }
    return response.value;
  } catch (error) {
    console.log(error);
  }
  return null;
}
/**
 * Create Record .
 * API FULL URL -  "/api/prisma/post/create"
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @param {FileList} fileData - current image
 * @param {T} content - current object
 * @return {Promise<ExtendOfTableModels | null>}  Promise string | null - status result Error |  Success | null
 *
 **/
export async function createTablesData<T extends ExtendOfTableObject>(
  table: string,
  methodRequest: ReqiestMethod,
  content: T,
): Promise<ExtendOfTableModels | null> {
  const getUrls = `${apiUrl}/${table}/${methodRequest}`;

  try {
    console.log("Enter CreateData", getCurrentTime());

    const { data: response, error } = await useFetch<ExtendOfTableModels | null>(getUrls, {
      method: "post",
      body: JSON.stringify(content),
    });

    if (error.value) {
      throw error.value;
    }

    console.log("Enter CreateData", getCurrentTime());
    return response.value;
  } catch (error) {
    console.log(error);
  }

  return null;
}

/**
 * Update Record
 * API FULL URL -  "/api/prisma/post/update"
 * @param {string} idPost - current id  for request,
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @param {FileList} fileData - current image
 * @param {T} content - current object
 * @return {Promise<ExtendOfTableModels | null>} Promise string | null - status result Error |  Success | null
 *
 **/
export async function updateTablesData<T extends ExtendOfTableObject>(
  idPost: string,
  table: string,
  methodRequest: ReqiestMethod,
  content: T,
): Promise<ExtendOfTableModels | null> {
  const getUrls = `${apiUrl}/${table}/${methodRequest}/${idPost}`;
  if (idPost) {
    try {
      const { data: response, error } = await useFetch<ExtendOfTableModels | null>(getUrls, {
        method: "post",
        body: JSON.stringify(content),
      });

      if (error.value) {
        throw error.value;
      }
      return response.value;
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

/**
 * Delete Record
 * API FULL URL -  "/api/prisma/post/delete-by-id/id"
 * @param {string} idPost - current id  for request,
 * @param {string} table - current table for request,
 * @param {string} method - current method for request,
 * @return {Promise<string | null>}  Promise string | null - status result Error |  Success | null
 *
 **/
export async function deleteDataById(
  idPost: string,
  table: string,
  method: ReqiestMethod,
): Promise<string | null> {
  const getUrls = `${apiUrl}/${table}/${method}/${idPost}`;
  try {
    const { data: response, error } = await useFetch<string>(getUrls);

    if (error.value) {
      throw error.value;
    }
    return response.value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
