<script setup lang="ts">
import { onMounted, reactive, ref, useFetch } from "#imports";
import { useImageStorage } from "@/composables/states";
import type { Session } from "@supabase/supabase-js";

/* const client = useSupabaseAuthClient() */
// const client = useSupabaseClient()
const supabaseStorage = useImageStorage();
const state = reactive({
  title: "",
  imageBgLink: "image",
  description: "",
  category: "",
  extraeDscription: "",
});
const email = ref("");
const password = ref("");
const login = ref("mailtest9999@yandex.ru");
const passwordLogin = ref("sup@b@se2023");
const firstName = ref("");
const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");
const sessionData = ref<Session | null>(null);
const accessToken = ref();
const dialogRegister = ref(false);
const dialogLogIn = ref(false);
const selected = ref("Education");
const currentId = "8feccc19-4820-460a-a29e-e5e469d7bc1cc";
const category = ["Education", "FightingExtinction", "News"];
const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "You must enter a first name.";
  },
];
const fileData = ref<0 | FileList | undefined>();
const loadImage = async () => {
  let urls = "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/";
  if (fileData.value) {
    const fileName = `${Math.floor(Math.random() * 1000)}${fileData?.value[0]?.name}`;
    try {
      const { data, error } = await supabaseStorage.storage
        .from("/images")
        .upload(fileName, fileData.value[0]);
      if (error) {
        throw error;
      }

      console.log(data);
      urls += data.path;
      state.imageBgLink = urls;
      console.log(state.imageBgLink);
    } catch (error) {
      console.log(error);
    }
  }
};
const uploadImage = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;
  console.log(event);

  console.log(fileData.value);
};
const register = async () => {
  try {
    const { data, error } = await supabaseStorage.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw error;
    }
    titleResult.value = "Success";
    iconResult.value = "mdi-check-circle-outline";
    colorIcon.value = "success";
    dialogRegister.value = !dialogRegister.value;
  } catch (error) {
    console.log(error);
    titleResult.value = "Error";
    iconResult.value = "mdi-close-thick";
    colorIcon.value = "error";
    dialogRegister.value = !dialogRegister.value;
  }
};
const logIn = async () => {
  try {
    const { data, error } = await supabaseStorage.auth.signInWithPassword({
      email: login.value,
      password: passwordLogin.value,
    });
    if (error) {
      throw error;
    }

    titleResult.value = "Success";
    iconResult.value = "mdi-check-circle-outline";
    colorIcon.value = "success";
    dialogLogIn.value = !dialogLogIn.value;
  } catch (error) {
    titleResult.value = "Error";
    iconResult.value = "mdi-close-thick";
    colorIcon.value = "error";
    dialogLogIn.value = !dialogLogIn.value;
  }
};

const logOut = async () => {
  try {
    const { error } = await supabaseStorage.auth.signOut();
    if (error) {
      throw error;
    }
    titleResult.value = "Success";
    iconResult.value = "mdi-check-circle-outline";
    colorIcon.value = "success";
    dialogRegister.value = !dialogRegister.value;
    console.log("Success");
  } catch (error) {
    console.log("Error Log Out", error);
    titleResult.value = "Error";
    iconResult.value = "mdi-close-thick";
    colorIcon.value = "error";
    dialogRegister.value = !dialogRegister.value;
  }
};
const getAuth = async () => {
  await supabaseStorage?.auth.getSession().then(({ data: { session } }) => {
    sessionData.value = session;
  });

  supabaseStorage.auth.onAuthStateChange(async () => {
    await supabaseStorage?.auth.getSession().then(({ data: { session } }) => {
      sessionData.value = session;
    });
  });
  console.log(sessionData.value);
};

const addPost = async () => {
  state.category = selected.value;
  // await loadImage();

  const { data: response, error } = await useFetch("/api/prisma/post/create", {
    method: "post",
    body: JSON.stringify(state),
    // body: {
    //   data: { ...state },
    // },
  });

  console.log(response);
  console.log(error);
};
const update = async (idPost: string) => {
  state.category = selected.value;
  try {
    fileData.value && (await loadImage());

    const { data: response, error } = await useFetch(`/api/prisma/post/update/${idPost}`, {
      method: "post",
      body: JSON.stringify(state),
    });
    console.log(response);
    if (error) {
      // throw new Error("");
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteById = async (idPost: string) => {
  try {
    const { data: response, error } = await useFetch(`/api/prisma/post/delete-by-id/${idPost}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const getPostById = async (id: string) => {
  try {
    const { data: response, error } = await useFetch(`/api/prisma/post/search-by-id/${id}`);
    if (error) {
      throw error;
    }
    console.log(response);

    state.title = response.value.title;
    state.imageBgLink = response.value.imageBgLink;
    state.description = response.value.description;
    state.extraeDscription = response.value.extraeDscription;
    selected.value = response.value.category;
  } catch (error) {
    console.log(error);
  }
};
const clean = (event: Event) => {
  console.log(event);
};
onMounted(() => {
  getAuth();
});
</script>

<template>
  <div class="about_wrapper">
    <!--     <div class="grid">
      <div class="list1 grid">
        <div class="text1">text1 Lorem ipsum dolor sit amet.</div>
        <div class="text2">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text3">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text4">text2 Lorem ipsum dolor sit amet.</div>
      </div>
      <div class="list2 grid">
        <div class="text1">text1 Lorem ipsum dolor sit amet.</div>
        <div class="text2">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text3">text2 Lorem ipsum dolor sit amet.</div>
      </div>
    </div> -->
    <!--  <Card2
          colorbg="black"
          class-card="pb-2"
          image-source="/images/red_bear.jpg"
          image-title="Top 10 Australian beaches"
          title-card="Australian beaches"
          subtitle-card="Number 10"
          text-card="  Lorem  Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia laudantium id et animi voluptatum libero!"
          button-title="See all animals"
          button-size="large"
          btn-text-size="text-subtitle-1"
          icon-button="mdi-paw" /> -->
    <!--     <div class="galary">
      <div class="galary_first">
        <CardItem
          class="main"
          colorbg="black"
          title-card="Australian beaches"
          title-align="text-center"
          subtitle-card="Number 10"
          sun-title-align="text-center"
          text-card=" All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability."
          text-align="text-center"
          button-title="See all animals"
          button-size="large"
          btn-text-size="text-subtitle-1"
          button-align="justify-center"
          button-class="text-none"
          icon-button="mdi-paw" />
        <CardItem image-source="/images/parrot_galary.jpg" class="parrot" image-heigth="100%" />
        <CardItem image-source="/images/lynx_galary.jpg" class="lynx" />
        <CardItem image-source="/images/animal1.jpg" class="opossums" />
      </div>
      <div class="galary_second">
        <CardItem class="red_bear" image-source="/images/red_bear.jpg" />
        <CardItem class="coala" image-source="/images/coala.jpg" />
        <CardItem class="bober" image-source="/images/bober.jpg" />
      </div>
    </div> -->
    <v-container>
      <v-sheet min-height="450" width="400" class="mx-auto position-relative d-flex">
        <v-form @submit.prevent="register" class="position-absolute w-100 align-self-center">
          <v-card-title>Register</v-card-title>
          <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
          <v-text-field v-model="password" :rules="rules" label="Password"></v-text-field>

          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
        <v-fade-transition hide-on-leave>
          <v-card
            v-if="dialogRegister"
            append-icon="$close"
            class="mx-auto w-100"
            elevation="16"
            max-width="500">
            <template #append>
              <v-btn icon="$close" variant="text" @click="dialogRegister = false"></v-btn>
            </template>

            <v-divider></v-divider>

            <div class="py-12 text-center">
              <v-icon class="mb-6" :color="colorIcon" :icon="iconResult" size="128"></v-icon>

              <div class="text-h4 font-weight-bold">{{ titleResult }}</div>
            </div>

            <v-divider></v-divider>

            <div class="pa-4 text-end">
              <v-btn
                class="text-none"
                color="medium-emphasis"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialogRegister = false">
                Close
              </v-btn>
            </div>
          </v-card>
        </v-fade-transition>
      </v-sheet>
    </v-container>
    <v-container>
      <v-sheet min-height="450" width="400" class="mx-auto position-relative d-flex">
        <v-sheet class="position-absolute w-100 align-self-center">
          <v-form @submit.prevent="logIn">
            <v-card-title>Login</v-card-title>
            <v-text-field v-model="login" :rules="rules" label="Email"></v-text-field>
            <v-text-field v-model="passwordLogin" :rules="rules" label="Password"></v-text-field>

            <v-btn type="submit" block class="mt-2">Submit</v-btn>
          </v-form>
          <v-btn type="submit" block class="mt-2" @click="logOut">Log Out</v-btn>
        </v-sheet>

        <v-fade-transition hide-on-leave>
          <v-card
            v-if="dialogLogIn"
            append-icon="$close"
            class="mx-auto w-100"
            elevation="16"
            max-width="500">
            <template #append>
              <v-btn icon="$close" variant="text" @click="dialogLogIn = false"></v-btn>
            </template>

            <v-divider></v-divider>

            <div class="py-12 text-center">
              <v-icon class="mb-6" :color="colorIcon" :icon="iconResult" size="128"></v-icon>

              <div class="text-h4 font-weight-bold">{{ titleResult }}</div>
            </div>

            <v-divider></v-divider>

            <div class="pa-4 text-end">
              <v-btn
                class="text-none"
                color="medium-emphasis"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialogLogIn = false">
                Close
              </v-btn>
            </div>
          </v-card>
        </v-fade-transition>
      </v-sheet>
    </v-container>

    <v-container>
      <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent="loadImage">
          <v-text-field v-model="firstName" :rules="rules" label="First name"></v-text-field>
          <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-container>

    <v-row>
      <v-col>
        <div class="content_item">
          <v-sheet>
            <v-btn
              rout
              type="submit"
              block
              class="mt-2"
              color="info"
              @click="getPostById(currentId)"
              >Current Post</v-btn
            >
            <v-btn type="submit" block class="mt-2" color="primary" @click="update(currentId)"
              >Update Current</v-btn
            >
            <v-btn type="submit" block class="mt-2" color="success" @click="addPost">Add new</v-btn>
            <v-btn type="submit" block class="mt-2" color="success" @click="deleteById(currentId)"
              >Delete</v-btn
            >
            <v-form>
              <v-text-field v-model="state.title" :rules="rules" label="Title"></v-text-field>
              <v-select v-model="selected" :items="category"></v-select>
              <v-file-input clearable label="File input" @change="uploadImage"></v-file-input>
            </v-form>
          </v-sheet>
          <label for="description">Content Editor</label>
          <UiElementsAddEditor v-model:value="state.description" />
        </div>
      </v-col>
      <v-col>
        <div class="editor_content bg-white mt-5" v-html="state.description"></div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.galary {
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 600px));
  justify-content: center;
  column-gap: 20px;
}
.galary_second {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  & .red_bear {
    grid-column: span 2;
  }
  /*   & .coala {
    grid-column: 1;
    grid-row: 3;
  }
  & .bober {
    grid-column: 2;
    grid-row: 3;
  } */
}
.galary_first {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 20px;

  & .main {
    grid-column: span 2;
  }
  & .parrot {
    grid-column: 1;
    grid-row: 2 / 4;
  }
  /*   & .lynx {
    grid-column: 2;
    grid-row: 2;
  }
  & .opossums {
    grid-column: 2;
    grid-row: 3;
  } */
}
.about_wrapper {
  padding: 20px 0;
  height: 2000px;
  overflow-y: scroll;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  font-size: 1rem;
  gap: 15px;
}
.list2 {
  & .text1 {
    background-color: bisque;
    color: black;
    grid-column: span 2;
    grid-row: span 2;
  }
  & .text2 {
    background-color: bisque;
    color: black;
    grid-column: 1;
    grid-row: 3;
  }
  & .text3 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 3;
  }
}
.list1 {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;

  & .text1 {
    background-color: bisque;
    color: black;
    grid-column: span 2;
    grid-row: 1;
  }
  & .text2 {
    background-color: bisque;
    color: black;
    grid-column: 1;
    grid-row: span 2;
  }
  & .text3 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 2;
  }
  & .text4 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 3;
  }
}
</style>
