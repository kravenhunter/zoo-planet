import { useRuntimeConfig, useState } from "#imports";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { IAlert } from "types/IAlert";
import type { IPerson, ISelectedPrices } from "types/ITypes";

interface IFormState {
  adults: IPerson[];
  concessions: IPerson[];
  child: IPerson[];
  zooCrew: IPerson[];
  teacher: IPerson[];
  senior: IPerson[];
  supporter: IPerson[];
}

// Глобальные переменные состояние
const stateDataForm = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  adress: "",
  personGender: "Male",
  email: "",
  isEmpty: true,
};

export const useCurrentMemberTab = () => useState<string>("currentTab", () => "Member");
export const useTotalPrice = () => useState<number>("totalPrice", () => 0);
export const useMemberShipDataFormState = () =>
  useState<IFormState>("formstate", () => {
    return {
      adults: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      concessions: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      child: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      zooCrew: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      senior: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      teacher: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
      supporter: [
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
        { ...stateDataForm },
      ],
    };
  });
export const useSelectedPrecesState = () =>
  useState<ISelectedPrices>("prices", () => {
    return {
      adult: 0,
      child: 0,
      zooCrew: 0,
      concession: 0,
      senior: 0,
      teacher: 0,
      supporter: 0,
    };
  });
export const useCounter = () => useState<number>("counter", () => 0);
export const usePrevieLink = () => useState<string>("preview", () => "");

export const useStoreState = () =>
  useState("supabase", () => {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseKey = config.public.supabaseKey;
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log(supabaseUrl);

    return supabase;
  });

export const useSupabaseObject = () =>
  useState<SupabaseClient | null>("supabase-object", () => null);

export const useIsLoading = () => useState<boolean>("loading", () => false);
export const useAlertDialog = () =>
  useState<IAlert>("alert-dialog", () => {
    return {
      dialogModal: false,

      titleResult: "Success",
      iconResult: "mdi-check-circle-outline",
      colorIcon: "success",
    };
  });

export function delayLoading(result: string | null) {
  const alertDialog = useAlertDialog();
  const isLoading = useIsLoading();

  setTimeout(() => {
    result &&
      (alertDialog.value = {
        titleResult: result,
        colorIcon: result.toLocaleLowerCase(),
        iconResult: result === "Success" ? "mdi-check-circle-outline" : "mdi-close-thick",

        dialogModal: true,
      });

    isLoading.value = false;

    setTimeout(() => {
      alertDialog.value = {
        dialogModal: false,

        titleResult: "",
        colorIcon: "",
        iconResult: "",
      };
    }, 2000);
  }, 2000);
}

let instance: SupabaseClient | null = null;
export function useImageStorage() {
  const counter = useCounter();

  // if (!supabaseObject.value) {
  //   console.log("init", !supabaseObject.value);
  //   Избавляет от ошибки  POCO при  передачи ссылки createClient реактивной переменной
  // const supabase = createClient(supabaseUrl, supabaseKey);
  // копируем объект
  //   supabaseObject.value = JSON.parse(JSON.stringify(supabase));
  // }
  if (!instance) {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseKey = config.public.supabaseKey;
    instance = createClient(supabaseUrl, supabaseKey);
    counter.value += 1;
  }

  return instance;
}
export const useIsAuth = () =>
  useState<string | null>("isAuth", () => {
    return localStorage.getItem("sb-epjfkkmrnhyxzevpvbjf-auth-token");
  });
