import { ref, useFetch } from "#imports";
import type { H3Error } from "h3";
import { acceptHMRUpdate, defineStore } from "pinia";
import type {
  IContacts,
  IContentPage,
  IMembershipPrice,
  IPlan,
  IPost,
  IResponse,
  ISpecie,
  ITicketPrice,
} from "~/types";

//import { uuid } from "vue-uuid";

type TypeTables =
  | "post"
  | "species"
  | "main-pages"
  | "membership-price"
  | "contacts"
  | "ticket-price"
  | "plan";

const apiUrl = "/api/prisma";
export const useUnionStorage = defineStore("union-storage", () => {
  const postlist = ref<IPost[]>([]);
  const specieList = ref<ISpecie[]>([]);
  const mainPages = ref<IContentPage[]>([]);
  const contactPage = ref<IContacts | null>();
  const membershipTable = ref<IMembershipPrice[]>([]);
  const ticketTable = ref<ITicketPrice[]>([]);
  const planTable = ref<IPlan[]>([]);

  const pendingData = ref<boolean>(false);

  /**
   * async Function Returns boolean
   * @param {string} idItem   apiPath
   * @param {TypeTables} table   table name
   * @return {boolean}  boolean
   *
   **/
  const isItemExist = (idItem: string, table: TypeTables): boolean => {
    switch (table) {
      case "post":
        return postlist.value?.some((el) => el.id === idItem) ?? false;
      case "species":
        return specieList.value?.some((el) => el.id === idItem) ?? false;
      case "main-pages":
        return mainPages.value?.some((el) => el.id === idItem) ?? false;
      case "contacts":
        return contactPage.value?.id === idItem ?? false;
      case "membership-price":
        return membershipTable.value?.some((el) => el.id === idItem) ?? false;
      case "ticket-price":
        return ticketTable.value?.some((el) => el.id === idItem) ?? false;
      case "plan":
        return planTable.value?.some((el) => el.id === idItem) ?? false;

      default:
        return false;
    }
  };

  /**
   * async Function Returns void
   * @param {string} table   table
   * @param {T} data   data
   * @param {string?} action   action
   * @return {void}  void.
   *
   **/
  const fillStoreData = <T>(table: string, data: T, action?: string): void => {
    switch (table) {
      case "post":
        action === "create" && postlist.value.push(data as IPost);
        action === "update" &&
          (postlist.value = postlist.value.map((el) => {
            if (el.id === (data as IPost).id) {
              return data as IPost;
            }
            return el;
          }));
        action === "delete" &&
          (postlist.value = postlist.value.filter((el) => el.id !== (data as IPost).id));
        !action && (postlist.value = data as IPost[]);

        break;
      case "species":
        action === "create" && specieList.value.push(data as ISpecie);
        action === "update" &&
          (specieList.value = specieList.value.map((el) => {
            if (el.id === (data as ISpecie).id) {
              return data as ISpecie;
            }
            return el;
          }));
        action === "delete" &&
          (specieList.value = specieList.value.filter((el) => el.id !== (data as ISpecie).id));
        !action && (specieList.value = data as ISpecie[]);

        break;

      case "main-content-pages":
        action === "create" && mainPages.value.push(data as IContentPage);
        action === "update" &&
          (mainPages.value = mainPages.value.map((el) => {
            if (el.id === (data as IContentPage).id) {
              return data as IContentPage;
            }
            return el;
          }));
        action === "delete" &&
          (mainPages.value = mainPages.value.filter((el) => el.id !== (data as IContentPage).id));
        !action && (mainPages.value = data as IContentPage[]);

        break;

      case "contacts":
        action === "create" && (contactPage.value = data as IContacts);
        action === "update" && (contactPage.value = data as IContacts);
        action === "delete" && (contactPage.value = null);
        !action && (contactPage.value = data as IContacts);
        break;

      case "membership-price":
        action === "create" && membershipTable.value.push(data as IMembershipPrice);
        action === "update" &&
          (membershipTable.value = membershipTable.value.map((el) => {
            if (el.id === (data as IMembershipPrice).id) {
              return data as IMembershipPrice;
            }
            return el;
          }));
        action === "delete" &&
          (membershipTable.value = membershipTable.value.filter(
            (el) => el.id !== (data as IMembershipPrice).id,
          ));
        !action && (membershipTable.value = data as IMembershipPrice[]);

        break;
      case "ticket-price":
        action === "create" && ticketTable.value.push(data as ITicketPrice);
        action === "update" &&
          (ticketTable.value = ticketTable.value.map((el) => {
            if (el.id === (data as ITicketPrice).id) {
              return data as ITicketPrice;
            }
            return el;
          }));
        action === "delete" &&
          (ticketTable.value = ticketTable.value.filter(
            (el) => el.id !== (data as ITicketPrice).id,
          ));
        !action && (ticketTable.value = data as ITicketPrice[]);

        break;
      case "plan":
        action === "create" && planTable.value.push(data as IPlan);
        action === "update" &&
          (planTable.value = planTable.value.map((el) => {
            if (el.id === (data as IPlan).id) {
              return data as IPlan;
            }
            return el;
          }));
        action === "delete" &&
          (planTable.value = planTable.value.filter((el) => el.id !== (data as IPlan).id));
        !action && (planTable.value = data as IPlan[]);

        break;

      default:
        break;
    }

    // console.log(categoryList.value);
  };
  /**
   * async Function Returns IResponse
   * @param {string} apiPath   apiPath
   * @return {Promise<IResponse>}  Promise IResponse { statusCode , statusMessage}.
   *
   **/
  const loadDataList = async (apiPath: string): Promise<IResponse> => {
    try {
      // const { data: response2 } = await useFetch<IResponse>(`/api/article/list`);
      const { data: response, error, refresh } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`);
      if (error.value) {
        throw error.value;
      }

      if (!response.value) {
        return {
          statusCode: 400,
          statusMessage: "Response object is null",
        };
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult);

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      const getError = error as H3Error;
      return {
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      };
    }
  };

  /**
   * async Function Pass Data to Create  in Data base and  Returns IResponse
   * @param {string} apiPath   apiPath
   * @param {T} formData   form data type T
   * @return {Promise<IResponse>}  Promise IResponse {statusCode , statusMessage}
   *
   **/
  const createOrUpdateData = async <T extends Record<string, any>>(
    apiPath: string,
    formData: T,
  ): Promise<IResponse> => {
    try {
      const { data: response, error } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`, {
        method: "POST",
        body: formData,
      });

      if (error.value) {
        throw error.value;
      }
      if (!response.value) {
        throw createError({
          statusCode: 401,
          statusMessage: "Response object is null",
        });
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult, response.value.method);

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      const getError = error as H3Error;
      return {
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      };
    }
  };

  /**
   * async Function Returns  void
   * @param {string} apiPath   apiPath
   * @return {Promise<IResponse>}  Promise IResponse {statusCode , statusMessage}
   *
   **/
  const deleteDataById = async (apiPath: string): Promise<IResponse> => {
    try {
      const { data: response, error } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`);

      if (error.value) {
        throw error.value;
      }
      if (!response.value) {
        return {
          statusCode: 400,
          statusMessage: "Response object is null",
        };
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult, "delete");

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      const getError = error as H3Error;
      return {
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      };
    }
  };

  /**
   * async Function Returns  IPost array
   * @param {string} subtitle   subtitle
   * @return {IContentPage | null}   IContentPage | null.
   *
   **/
  const getPageBySubtitle = (subtitle: string): IContentPage | null =>
    mainPages.value.find((el) => el.subTitle === subtitle) ?? null;

  /**
   * async Function Returns  IPost array
   * @param {string} search   search
   * @return {IPost[]}   Post[].
   *
   **/
  const getPostByName = (search: string): IPost[] =>
    postlist.value.filter((el) => el.title.match(search));

  /**
   * async Function Returns  IPost object
   * @param {string} postId   postId
   * @return {IPost | null}   Post | null.
   *
   **/
  const getPostById = (postId: string): IPost | null =>
    postlist.value.find((el) => el.id === postId) ?? null;

  type TReturn = IPost | ISpecie | IContentPage | IMembershipPrice | ITicketPrice | IPlan | null;
  /**
   * async Function Returns boolean
   * @param {string} idItem   idItem
   * @param {TypeTables} table   table name
   * @return {TReturn}   TReturn = IPost | ISpecie |IContentPage|IMembershipPrice| ITicketPrice | IPlan | null
   *
   **/
  const getItemById = (idItem: string, table: TypeTables): TReturn => {
    switch (table) {
      case "post":
        return postlist.value?.find((el) => el.id === idItem) ?? null;
      case "species":
        return specieList.value?.find((el) => el.id === idItem) ?? null;
      case "main-pages":
        return mainPages.value?.find((el) => el.id === idItem) ?? null;
      case "membership-price":
        return membershipTable.value?.find((el) => el.id === idItem) ?? null;
      case "ticket-price":
        return ticketTable.value?.find((el) => el.id === idItem) ?? null;
      case "plan":
        return planTable.value?.find((el) => el.id === idItem) ?? null;

      default:
        return null;
    }
  };

  return {
    pendingData,
    postlist,
    specieList,
    mainPages,
    membershipTable,
    ticketTable,
    planTable,
    contactPage,
    getItemById,
    isItemExist,
    getPostById,
    fillStoreData,
    getPageBySubtitle,
    getPostByName,
    createOrUpdateData,
    loadDataList,
    deleteDataById,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnionStorage, import.meta.hot));
}
