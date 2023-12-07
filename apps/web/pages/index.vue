<script setup lang="ts">
import { type Blog } from "@/types/blog";

const { getItems } = useDirectusItems();
const {
    data: blogList,
    pending: loading,
    error,
} = await useAsyncData("bloglist", () =>
    getItems<Blog>({
        collection: "blog",
    })
);
</script>

<template>
    <div>
        <div>
            {{ error }}
        </div>
        <p v-if="loading">Loading...</p>
        <pre v-else>{{ blogList }}</pre>
    </div>
</template>
