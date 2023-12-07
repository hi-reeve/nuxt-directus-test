// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        dbConnectionString: process.env.DIRECTUS_DIRECT_URL,
        directus: {
            url: process.env.DIRECTUS_APP_URL,
        },
    },
    modules: ["@nuxt/image", "@unocss/nuxt", "nuxt-directus"],
    imports: {
        dirs: ["libs/**", "composables/**"],
    },
    directus: {
        devtools: true,
        url: process.env.DIRECTUS_APP_URL,
        token: process.env.DIRECTUS_API_TOKEN,
    },
    experimental: {
        componentIslands: true,
        typedPages: true,
    },
});
