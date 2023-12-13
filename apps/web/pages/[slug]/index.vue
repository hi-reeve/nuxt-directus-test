<script setup lang="ts">
import type { Blog } from "~/types/blog";

const { $preview } = useNuxtApp();
const { getItems } = useDirectusItems();
const { getThumbnail } = useDirectusFiles();
const route = useRoute("slug");

const { locale } = useI18n();
// For the preview request we need to specify a different key, otherwise the cached/generated data will be returned by useAsyncData
const keyPrfx = $preview.value ? "-preview" : "";
const { data } = await useAsyncData(
    `post-${route.params.slug}${keyPrfx}-${locale.value}`,
    () =>
        getItems<Blog>({
            collection: "blog",
            params: {
                fields: [
                    "*",
                    "translations.title",
                    "translations.content",
                    "translations.slug",
                    "translations.languages_code",
                    "categories.blog_category_id.translations.name",
                ],
                filter: {
                    translations: {
                        slug: {
                            _eq: route.params.slug,
                        },
                    },
                },
                deep: {
                    categories: {
                        blog_category_id: {
                            translations: {
                                _filter: {
                                    languages_id: { _eq: locale.value },
                                },
                            },
                        },
                    },
                },
            },
        }),
    {
        transform: dt => dt[0],
    }
);

const setI18nParams = useSetI18nParams({});
setI18nParams({
    en: { slug: data.value?.translations[0].slug },
    id: { slug: data.value?.translations[1].slug },
});

const localeContent = computed(() => {
    return data.value?.translations.find(
        t => t.languages_code === locale.value
    );
});
</script>

<template>
    <div p-8>
        <h1 text-3xl font-bold>{{ localeContent?.title }}</h1>
        <p>
            {{
                data?.categories
                    .map(c => c.blog_category_id.translations[0].name)
                    .join(", ")
            }}
        </p>
        <div>
            <NuxtImg
                :src="getThumbnail(data!.cover)"
                :alt="data?.translations[0].title"
                class="max-w-xs"
            />
        </div>
        <div>
            <div v-html="localeContent?.content" />
        </div>
    </div>
</template>
