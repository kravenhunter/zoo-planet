<script setup lang="ts">
import { onMounted, reactive, ref, useCookie, useFetch } from "#imports";
import { compressToBestSize } from "@/composables/compressFile";
import { useImageStorage } from "@/composables/states";

import Compressor from "compressorjs";

// import { type H3Event } from "h3";

const supabaseStorage = useImageStorage();
const { data } = supabaseStorage.storage
  .from("image_test")
  .getPublicUrl("testfolder/Humboldt_unsplash_5VfZXgBTTlw.jpg");

const state = reactive({
  title: "",
  imageBgLink: "image",
  description: "",
  category: "",
  extraeDscription: "",
});
const email = ref("");
const password = ref("");
const login = ref("");
const passwordLogin = ref("");

const titleResult = ref("");
const iconResult = ref("");
const colorIcon = ref("");

const dialogRegister = ref(false);
const dialogLogIn = ref(false);
const selected = ref("Education");
const currentId = "8feccc19-4820-460a-a29e-e5e469d7bc1cc";
const category = ["Education", "FightingExtinction", "News"];
const previewImage = ref<string>("");
const compressionResult = ref<number>();
const rules = [
  (value: string) => {
    if (value) {
      return true;
    }

    return "You must enter a first name.";
  },
];
const fileData = ref<0 | FileList | undefined>();
const selectedFile = ref<File>();
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

const WIDTH = ref<number>(0);
const compressToBest = async () => {
  if (fileData.value && fileData.value.length) {
    //Create Blob Link
    selectedFile.value = fileData.value[0];
    console.log(selectedFile.value);

    const newImage = new Image();

    if (selectedFile.value) {
      newImage.src = URL.createObjectURL(selectedFile.value);
      newImage.alt = "Compressed image";
      newImage.onload = function () {
        console.log(`${newImage.width} x ${newImage.height}`);
      };
    }

    const newFile = await compressToBestSize(WIDTH.value, selectedFile.value);
    if (newFile) {
      previewImage.value = newFile.preview;
      console.log(newFile.compressedFILE);
    }
  }
};

const convertFile = async () => {
  if (fileData.value) {
    selectedFile.value = fileData.value[0];
    if (selectedFile.value) {
      const urtls = URL.createObjectURL(selectedFile.value);
      console.log(urtls);
      const newImage = new Image();
      newImage.src = URL.createObjectURL(selectedFile.value);
      newImage.alt = "Compressed image";
      const ration = WIDTH.value / newImage.width;
      const currentHeight = newImage.height * ration;

      await new Promise((resolve, reject) => {
        const compress = new Compressor(selectedFile.value!, {
          quality: 0.1,
          // quality: 0.6,
          width: WIDTH.value,
          height: currentHeight,
          mimeType: "image/webp",
          success: resolve,
          error: reject,
        });
      })
        .then((result) => {
          const resultBlob = result as Blob;
          const newFile = new File([resultBlob], resultBlob.name, { type: resultBlob.type });
          console.log(newFile);
          compressionResult.value = Math.floor(newFile.size / 1024);

          const reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = (ev: ProgressEvent<FileReader>) => {
            console.log(ev);

            previewImage.value = ev.target!.result as string;
          };
        })
        .catch((error) => {
          console.log(error);
          return null;
        })
        .finally(() => {
          console.log("Compress complete");
        });
    }
  }
};

const customCompressor = () => {
  if (fileData.value && fileData.value.length) {
    selectedFile.value = fileData.value[0];

    const reader = new FileReader();

    if (selectedFile.value && selectedFile.value.type.includes("image")) {
      console.log("file correct", selectedFile.value);
      reader.readAsDataURL(selectedFile.value);
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const currentImage = new Image();
        currentImage.src = ev.target!.result as string;
        selectedFile.value?.name && (currentImage.title = selectedFile.value?.name);
        currentImage.onload = (e) => {
          console.log("current image", e);
          console.log(currentImage.width);

          // const currentWidth = (e?.target as HTMLImageElement).width;
          // const currentHeight = (e?.target as HTMLImageElement).height;
          const currentWidth = currentImage.width;
          const currentHeight = currentImage.height;

          const canvas = document.createElement("canvas");
          const ration = WIDTH.value / currentWidth;

          canvas.width = WIDTH.value;
          canvas.height = currentHeight * ration;
          const canvasContext = canvas.getContext("2d");
          canvasContext!.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

          selectedFile.value &&
            (previewImage.value = canvasContext!.canvas.toDataURL(selectedFile.value.type, 0.5));

          urlToFile();
        };
      };
    } else {
      console.log("wrong type file");
    }
  }
};
function urlToFile() {
  const arr = previewImage.value.split(",");
  console.log(arr);

  // data:/image/jpeg;base64 use RegexArray to get   image/jpeg
  const regArr = arr[0].match(/:(.*?);/);
  console.log("regex Arr", regArr);

  if (arr.length) {
    let mime: string;
    regArr?.length && (mime = regArr[1]);
    const dataImage = arr[1];

    const decryptedData: string = atob(dataImage);
    let n = decryptedData.length;
    const dataUintArr = new Uint8Array(n);
    while (n--) {
      dataUintArr[n] = decryptedData.charCodeAt(n);
    }
    if (selectedFile.value) {
      const newFile = new File([dataUintArr], selectedFile.value.name, { type: mime! });

      console.log("newFile", newFile);
    }
  }
}
const uploadImage = async (event: Event) => {
  previewImage.value = "";
  const fileEvent = event.target as HTMLInputElement;
  fileData.value = fileEvent.files?.length && fileEvent.files;

  const input = document.querySelector(".fileinput .mdi-close-circle");
  input?.addEventListener("click", (eventClick: Event) => {
    fileData.value = 0;
    previewImage.value = "";
  });

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
    console.log(data.session);
    const createSession = useCookie<string | null>("supabase-auth", {
      default: () => null,
      watch: "shallow",
    });
    createSession.value = JSON.stringify(data.session);

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
const text = () => {
  const delCookie = useCookie("supabase-auth");
  console.log(delCookie.value);
  delCookie.value = null;
  console.log(delCookie.value);
};
const logOut = async (event: Event) => {
  try {
    const { error } = await supabaseStorage.auth.signOut();
    if (error) {
      throw error;
    }
    const delCookie = useCookie("supabase-auth");

    console.log(delCookie.value);
    delCookie.value = null;
    console.log(delCookie.value);
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
const checkAuth = async () => {
  try {
    console.log("Get Auth");
    const getSession = useCookie("supabase-auth");
    const getlocalData = localStorage.getItem("sb-epjfkkmrnhyxzevpvbjf-auth-token");

    const getData = getlocalData && JSON.parse(getlocalData);
    getSession.value = getlocalData;

    const { data, error } = await supabaseStorage.auth.getSession();

    if (error) {
      throw error;
    }
    console.log(getSession.value);
    console.log(getData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const getAuth = async () => {
  console.log("Get Auth");
  const { data, error } = await supabaseStorage.auth.getSession();
  console.log(data.session);

  supabaseStorage.auth.onAuthStateChange(async (user) => {
    console.log(user);
    await supabaseStorage.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
    });
  });
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
const link = "https://ik.imagekit.io/aap8orwyc";
const img = "Humboldt_unsplash_5VfZXgBTTlw.jpg";
onMounted(async () => {
  await getAuth();
});
</script>

<template>
  <div class="about_wrapper">
    <AuthLogin />
    <v-btn color="primary" @click="checkAuth"> Open Dialog </v-btn>
    <v-btn color="primary" @click="text"> Delete Cookie </v-btn>

    <v-container>
      <v-sheet>
        <NuxtImg
          format="webp"
          width="600px"
          height="600px"
          :src="`${link}/tr:w-600/${img}`"
          alt="imageTitle"
          title="imageTitle"
          class="align-end text-white image_content">
        </NuxtImg>
      </v-sheet>

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
          <v-btn type="button" block class="mt-2" to="/guard">Gou to Admin</v-btn>
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
      <v-img v-if="previewImage" :src="previewImage" max-height="300px"> </v-img>
      <v-sheet width="400" class="mx-auto">
        <v-form @submit.prevent="compressToBest">
          <v-text-field v-model="WIDTH" :rules="rules" label="Enter image size"></v-text-field>
          <v-card-text v-if="compressionResult">{{ compressionResult }} KB</v-card-text>
          <v-file-input
            class="fileinput"
            clearable
            accept="image/png, image/jpeg, image/jpg"
            show-size
            counter
            label="File input"
            @click:clear="clean"
            @change="uploadImage"></v-file-input>
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
