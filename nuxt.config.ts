// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  imports: { autoImport: false },
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
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

        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  css: ["~/assets/styles/global.scss", "vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  alias: {
    "@styles": "/<rootDir>/assets/styles",
    types: "/<rootDir>/types",
    assets: "/<rootDir>/assets",
  },
});
