<script setup lang="ts">
import { computed, ref } from "#imports";
import { useAuthStore } from "@/stores/authStore";

const dialog = ref(false);
const loading = ref(false);
const { logIn } = useAuthStore();

const email = ref("mailtest9999@yandex.ru");
const password = ref("sup@b@se2023");

const isDisabledButton = computed(() => {
  if (email.value && password.value) {
    return false;
  }
  return true;
});

const load = async () => {
  loading.value = true;
  await logIn(email.value, password.value);
  setTimeout(() => {
    loading.value = false;
    dialog.value = false;
  }, 3000);
};
</script>

<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template #activator="{ props }">
      <v-btn
        class="mx-2 text-subtitle-2"
        color="#FBB03B"
        variant="text"
        router
        v-bind="props"
        rounded="xl">
        Sign In
      </v-btn>
    </template>
    <v-card color="grey-darken-4">
      <v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            class="text-end"
            :disabled="loading"
            size="20"
            variant="text"
            @click="dialog = false">
            <v-icon color="white" icon="$close" size="20"></v-icon>
          </v-btn>
        </v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Email*" v-model="email" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-card-subtitle>*indicates required field</v-card-subtitle>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mx-auto mb-5 px-10 text-subtitle-1 text-white"
          color="light-blue-darken-4"
          size="x-large"
          :disabled="isDisabledButton"
          :loading="loading"
          @click="load"
          variant="flat">
          Log In
          <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
