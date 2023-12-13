<script setup lang="ts">
import { type Blog } from "@/types/blog";

const { getItems } = useDirectusItems();
const { getThumbnail } = useDirectusFiles();
const { locale } = useI18n();
const { data } = await useAsyncData("bloglist", () =>
    getItems<Blog>({
        collection: "blog",
        params: {
            fields: [
                "*",
                "translations.title",
                "translations.content",
                "translations.slug",
                "categories.blog_category_id.translations.name",
            ],
            deep: {
                translations: {
                    _filter: {
                        languages_code: { _eq: locale.value },
                    },
                },
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
    })
);

const localePath = useLocalePath();
</script>

<template>
    <div grid lg:grid-cols-4 grid-cols-1 gap gap-4 p-8>
        <NuxtLink
            v-for="post in data"
            :key="post.id"
            :to="localePath(`/${post.translations[0].slug}`)"
        >
            <div max-w-xs max-h-xs shadow rounded relative bg-white>
                <div max-w-xs relative overflow-hidden>
                    <NuxtImg
                        :src="getThumbnail(post.cover)"
                        :alt="post.translations[0].title"
                        object-cover
                        w-full
                        class="max-h-[200px]"
                    />
                </div>
                <div px-4 py-2>
                    <h2 text-lg font-bold>{{ post.translations[0].title }}</h2>
                    <p text-sm>
                        {{
                            post.categories
                                .map(
                                    c => c.blog_category_id.translations[0].name
                                )
                                .join(", ")
                        }}
                    </p>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
