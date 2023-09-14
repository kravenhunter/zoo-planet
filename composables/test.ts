import { useRuntimeConfig } from "#imports";

export default () => {
  const config = useRuntimeConfig();
  console.log(config.public.SUPABASE_URL);
};
