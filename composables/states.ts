import { useRuntimeConfig, useState } from "#imports";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { IAlert } from "types/IAlert";

// Глобальные переменные состояние

export const useCounter = () => useState<number>("counter", () => 0);

export const useColor = () => useState<string>("color", () => "pink");
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
