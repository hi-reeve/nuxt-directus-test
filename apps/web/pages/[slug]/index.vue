<script setup lang="ts">
const { $preview } = useNuxtApp();

const route = useRoute("slug");
// For the preview request we need to specify a different key, otherwise the cached/generated data will be returned by useAsyncData
const keyPrfx = $preview.value ? "-preview" : "";

const { data } = await useFetch(`/api/blog/${route.params.slug}`, {
    key: `blog-${route.params.slug}${keyPrfx}`,
});
</script>

<template>
    <div>
        <pre>
			{{ data }}
		</pre
        >
    </div>
</template>
