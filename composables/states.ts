import { useRuntimeConfig, useState } from "#imports";

import { createClient } from "@supabase/supabase-js";

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
export function useImageStorage() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(supabaseUrl);

  return supabase;
}

export const usefirebaseUser = () =>
  useState("firebaseUser", () => {
    return {};
  });
