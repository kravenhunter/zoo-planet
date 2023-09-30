import { useRuntimeConfig } from "#imports";

import { createClient } from "@supabase/supabase-js";

export default function () {
  const client = createClient(
    useRuntimeConfig().public.supabaseUrl,
    useRuntimeConfig().public.supabaseUrl,
  );
  const supabase = () => client;
  return supabase;
}
