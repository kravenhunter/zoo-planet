import { useRuntimeConfig } from "#imports";

import { createClient } from "@supabase/supabase-js";

// const client = createClient(
//   useRuntimeConfig().public.supabaseUrl,
//   useRuntimeConfig().public.supabaseUrl,
// );

// const supabase = () => client;

// export const useSupabaseState = () => useState("supabase", () => client);

// export default function () {
//   const client = createClient(
//     useRuntimeConfig().public.supabaseUrl,
//     useRuntimeConfig().public.supabaseUrl,
//   );
//   return useState("supabase", () => client);
// }

export default function () {
  const client = createClient(
    useRuntimeConfig().public.supabaseUrl,
    useRuntimeConfig().public.supabaseUrl,
  );
  const supabase = () => client;
  return supabase;
}
