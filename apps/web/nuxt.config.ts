// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        dbConnectionString: process.env.DIRECTUS_DIRECT_URL,
        public: {
            directus: {
                url: process.env.DIRECTUS_APP_URL,
            },
        },
    },
    modules: ["@nuxt/image", "@unocss/nuxt", "nuxt-directus", "@nuxtjs/i18n"],
    imports: {
        dirs: ["libs/**", "composables/**"],
    },
    directus: {
        devtools: true,
        token: process.env.DIRECTUS_API_TOKEN,
    },
    experimental: {
        componentIslands: true,
        typedPages: true,
    },
    i18n: {
        langDir: resolve("./locales"),
        locales: [
            {
                code: "en",
                name: "English",
                iso: "en-US",
                file: "en.yaml",
            },
            {
                code: "id",
                name: "Bahasa Indonesia",
                iso: "id-ID",
                file: "id.yaml",
            },
        ],
        defaultLocale: "id",
        strategy: "prefix",
        detectBrowserLanguage: {
            useCookie: true,
            redirectOn: "root",
            cookieKey: "i18n_redirected",
            alwaysRedirect: true,
        },
    },
});
