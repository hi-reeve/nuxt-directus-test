<script setup lang="ts">
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>

<template>
    <nav w-full p-4 bg-white shadow>
        <ul flex space-x-4>
            <li>
                <NuxtLink :to="localePath('/')"> Home </NuxtLink>
            </li>
            <li v-for="locale in locales" :key="locale.code">
                <NuxtLink :to="switchLocalePath(locale.code)">
                    {{ locale.name }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
    <main>
        <slot />
    </main>
</template>
