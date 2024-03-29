/* eslint-disable n/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  imports: { autoImport: false },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxt/image"],

  runtimeConfig: {
    private: {
      stripeSK: process.env.STRIPE_SK_KEY,
      endpoinSK: process.env.ENDPOINT_SECRET,
    },
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      stripePK: process.env.STRIPE_PK_KEY,
    },
  },
  // image: {
  //   provider: "supabase",
  //   supabase: {
  //     baseURL: "https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/ec8697b5-0988-44b5-866c-a2a32cad4955fighting_extinction_cover.jpg",
  //   },
  // },
  app: {
    pageTransition: { name: "blog", mode: "out-in" },
    head: {
      titleTemplate: "%s | ZOO PLANET",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        { name: "description", content: " ZOO PLANET - the zoo planet blog" },
        {
          name: "keywords",
          content: " ZOO PLANET, news,blog, zoo news",
        },
        { name: "ogTitle", content: " ZOO PLANET - the zoo  news blog" },
        { name: "ogDescription", content: " ZOO PLANET - a blog of  zoo world" },
        // Запрет активации  телефона поссылке
        { name: "format-detection", content: "telephone=no" },
        //Запрет индексации  картинок и ссылок, текст контента доступен
        { name: "robots", content: "noimageindex, nofollow" },
        { name: "author", content: "Sergio Below" },
        { name: "copyright", content: "Sergio Below" },
      ],
    },
  },
  css: [
    "~/assets/styles/global.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  alias: {
    "@styles": "/<rootDir>/assets/styles",
    types: "/<rootDir>/types",
    assets: "/<rootDir>/assets",
  },
  // alias: {
  //   *     'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
  //   *     'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
  //   *     'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  //   *   }
  postcss: {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ["cover 99.5%", "not IE < 9"],
      },
    },
  },
});
