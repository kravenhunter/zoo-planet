import { abortNavigation, defineNuxtRouteMiddleware, navigateTo, useCookie } from "#imports";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie<string | null>("supabase-auth-token");
  const { isAuthorized } = storeToRefs(useAuthStore());

  if (token.value) {
    // check if value exists
    isAuthorized.value = !!token.value; // update the state to authenticated
  }

  if (!token.value) {
    abortNavigation();

    return navigateTo("/");
  }
});
