// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		// ...
		'@pinia/nuxt',
		'@vueuse/nuxt',
	],
	css: ['~/assets/styles/global.scss'],
	alias: {
		'@styles': '/<rootDir>/assets/styles',
		types: '/<rootDir>/types',
		assets: '/<rootDir>/assets',
	},
});
