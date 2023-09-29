import { ref, useCookie } from "#imports";
import { useImageStorage } from "@/composables/states";
import type { Session } from "@supabase/supabase-js";
import { acceptHMRUpdate, defineStore } from "pinia";

interface IToken {
  access_token: string;
  expire: number;
}

export const useAuthStore = defineStore("auth-store", () => {
  const sessionData = ref<Session | null>(null);
  const supabaseStorage = useImageStorage();
  const isAuthorized = ref(false);

  const checkAuth = () => {
    const res = false;
    const currentCookie = useCookie<IToken | null>("supabase-auth-token");
    const getlocalDataJSON = localStorage.getItem("sb-epjfkkmrnhyxzevpvbjf-auth-token");
    if (getlocalDataJSON && currentCookie.value) {
      sessionData.value = JSON.parse(getlocalDataJSON) as Session;

      // const parseObject = JSON.parse(getlocalDataJSON) as Session;

      sessionData.value.expires_at &&
        currentCookie.value.expire !== sessionData.value.expires_at &&
        (currentCookie.value = {
          access_token: sessionData.value.access_token,
          expire: sessionData.value.expires_at!,
        });
      return true;
    } else if (getlocalDataJSON) {
      sessionData.value = JSON.parse(getlocalDataJSON) as Session;

      currentCookie.value = null;
      currentCookie.value = {
        access_token: sessionData.value.access_token,
        expire: sessionData.value.expires_at!,
      };
      return true;
    }
    currentCookie.value = null;

    return false;
  };

  const register = async (emailUser: string, passswordUser: string) => {
    try {
      const { data, error } = await supabaseStorage.auth.signUp({
        email: emailUser,
        password: passswordUser,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logIn = async (emailUser: string, passswordUser: string) => {
    try {
      const { data, error } = await supabaseStorage.auth.signInWithPassword({
        email: emailUser,
        password: passswordUser,
      });

      if (error) {
        throw error;
      }
      isAuthorized.value = true;
      sessionData.value = data.session;
      const createSession = useCookie<string | null>("supabase-auth-token", {
        default: () => null,
        watch: "shallow",
      });
      createSession.value = JSON.stringify({
        access_token: data.session.access_token,
        expire: data.session.expires_at,
      });
      console.log(createSession.value);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      const { error } = await supabaseStorage.auth.signOut();
      if (error) {
        throw error;
      }
      const delCookie = useCookie("supabase-auth-token");
      console.log(delCookie.value);
      delCookie.value = null;
      console.log(delCookie.value);
      sessionData.value = null;
      isAuthorized.value = false;
      console.log("Success");
    } catch (error) {
      console.log("Error Log Out", error);
    }
  };

  return {
    isAuthorized,
    sessionData,
    register,
    logIn,
    logOut,
    checkAuth,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
