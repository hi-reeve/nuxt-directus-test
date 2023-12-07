<script setup lang="ts">
import { type Blog } from "@/types/blog";

const { getItems } = useDirectusItems();
const {
    data: blogList,
    pending: loading,
    execute,
} = await useAsyncData(
    "bloglist",
    () =>
        getItems<Blog>({
            collection: "blog",
        }),
    {
        immediate: true,
    }
);
</script>

<template>
    <div>
        <div>
            <p v-if="loading">Loading...</p>
            <pre v-else>{{ blogList }}</pre>
        </div>
    </div>
</template>
