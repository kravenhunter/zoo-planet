<script setup lang="ts">
import { navigateTo } from "#imports";
import { useAuthStore } from "@/stores/authStore";

const { logOut } = useAuthStore();
const nav = [
  { title: "Main Pages", icon: "mdi-folder", to: "/guard/section/main" },
  { title: "My News", icon: "mdi-folder", to: "/guard/section/news" },
  { title: "Species", icon: "mdi-account-multiple", to: "/guard/section/species" },
  { title: "Fighting Extintion", icon: "mdi-star", to: "/guard/section/fighting" },
  { title: "Education", icon: "mdi-history", to: "/guard/section/education" },
  { title: "About Us", icon: "mdi-check-circle", to: "/guard/section/aboutus" },
  { title: "Contact Us", icon: "mdi-upload", to: "/guard/section/contactus" },
  { title: "Membership", icon: "mdi-square", to: "/guard/section/membership" },
  { title: "Tickets", icon: "mdi-history", to: "/guard/section/tickets" },
  { title: "Donate", icon: "mdi-cloud-upload", to: "/guard/section/donate" },
  { title: "Plain", icon: "mdi-cloud-upload", to: "/guard/section/plan" },
  { title: "Back", icon: "mdi-cloud-upload", to: "/" },
];
const open = ["Details"];
const signOut = async () => {
  const resultLogout = await logOut();
  if (resultLogout) {
    await navigateTo("/", { replace: true });
  }
};
</script>

<template>
  <v-navigation-drawer color="black pt-10  bg-grey-darken-4">
    <v-list v-model:opened="open">
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        title="John Leider"
        subtitle="john@google.com">
      </v-list-item>
      <v-list-item title="State :" subtitle="Administrator"> </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="(item, i) in nav" :key="i" :value="item" color="success">
        <template #prepend>
          <v-icon size="30" :icon="item.icon"></v-icon>
        </template>
        <NuxtLink :to="item.to">
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </NuxtLink>
      </v-list-item>
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn color="black" block @click="signOut"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
