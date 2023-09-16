// Vuetify
import { defineNuxtPlugin } from "#imports";

// import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// interface ISupabaseClient {
//   supabaseClient: SupabaseClient;
// }

// declare module "#app" {
//   interface NuxtApp {
//     $supabaseStore: ISupabaseClient;
//   }
// }

export default defineNuxtPlugin((nuxtApp) => {
  // const config = useRuntimeConfig();
  // const supabaseUrl = config.public.supabaseUrl;
  // const supabaseKey = config.public.supabaseKey;
  // const supabase = createClient(supabaseUrl, supabaseKey);
  console.log("init supabase plugin");
  // nuxtApp.vueApp.provide("supabaseStore", supabase);
  // nuxtApp.provide("supabaseStore", supabase);

  // return {
  //   provide: {
  //     supabaseStore: supabase,
  //   },
  // };
});
