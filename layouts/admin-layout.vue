<script setup lang="ts">
const nav = [
  { title: "My News", icon: "mdi-folder" },
  { title: "Species", icon: "mdi-account-multiple" },
  { title: "Fighting Extintion", icon: "mdi-star" },
  { title: "Education", icon: "mdi-history" },
  { title: "About Us", icon: "mdi-check-circle" },
  { title: "Contact Us", icon: "mdi-upload" },
  { title: "Membership", icon: "mdi-square" },
  { title: "Donate", icon: "mdi-cloud-upload" },
  { title: "Tickets", icon: "mdi-history" },
];

const open = ["Details"];
const isOpen = false;
</script>

<template>
  <v-layout class="customLayout rounded rounded-md bg-black">
    <v-navigation-drawer color="black pt-10  bg-grey-darken-4">
      <v-list v-model:opened="open">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="John Leider"
          subtitle="john@google.com">
        </v-list-item>
        <v-list-group value="Details">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog-outline"
              title="More Details :"></v-list-item>
          </template>
          <v-list-item title="State :" subtitle="Administrator"> </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in nav" :key="i" :value="item" color="success">
          <template #prepend>
            <v-icon size="30" :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="bg-grey-darken-4" title="Application bar">
      <template #prepend>
        <v-avatar size="40">
          <v-icon color="success" icon="$vuetify" size="50"></v-icon>
        </v-avatar>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
