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
const { data: blogListClient, pending: loadingClient } = await useAsyncData(
    "bloglist-client",
    () =>
        getItems<Blog>({
            collection: "blog",
        }),
    {
        server: false,
    }
);
</script>

<template>
    <div>
        <div>
            <p>Server Side</p>

            <div>
                {{ error }}
            </div>
            <p v-if="loading">Loading...</p>
            <pre v-else>{{ blogList }}</pre>
        </div>
        <div>
            <p>Client side</p>
            <p v-if="loadingClient">Loading...</p>
            <pre v-else>{{ blogListClient }}</pre>
        </div>
    </div>
</template>
