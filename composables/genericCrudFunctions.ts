import { useFetch } from "#imports";
import { useImageStorage } from "@/composables/states";

import { uuid } from "vue-uuid";

import type { IContacts } from "types/IContacts";
import type { IContentPage } from "types/IContentPage";
import type { IPost } from "types/IPost";
import type { ISpecie } from "types/ISpecie";

type ExtendObject = IPost | IContentPage | ISpecie | IContacts;

export async function loadData<T>(link: string): Promise<T[] | null> {
  try {
    const { data: response, error, refresh } = await useFetch<T[]>(link);

    if (error.value) {
      throw error.value;
    }
    return response.value;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loadImageToStore(fileData: FileList): Promise<string> {
  const supabaseStore = useImageStorage();

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
}

export async function createData<T extends ExtendObject>(
  fileData: 0 | FileList | undefined,
  content: T,
  link: string,
): Promise<string | null> {
  if (fileData) {
    try {
      content.imageBgLink = await loadImageToStore(fileData);
      const { data: response, error } = await useFetch<string>(link, {
        method: "post",
        body: JSON.stringify(content),
      });

      if (error.value) {
        throw error.value;
      }

      return response.value;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  return "Error";
}

export async function updateData<T extends ExtendObject>(
  idPost: string,
  fileData: 0 | FileList | undefined,
  content: T,
  link: string,
): Promise<string | null> {
  try {
    fileData && (content.imageBgLink = await loadImageToStore(fileData));

    const { data: response, error } = await useFetch<string>(`${link}${idPost}`, {
      method: "post",
      body: JSON.stringify(content),
    });

    if (error.value) {
      throw error.value;
    }
    return response.value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function deleteDataById(idPost: string, link: string): Promise<string | null> {
  try {
    const { data: response, error } = await useFetch<string>(`${link}${idPost}`);

    if (error.value) {
      throw error.value;
    }
    return response.value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
