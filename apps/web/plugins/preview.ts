export default defineNuxtPlugin(() => {
    const preview = ref(false);

    addRouteMiddleware(
        "preview",
        async to => {
            const isPreview = to.query.preview && to.query.preview === "true";
            // if you don’t need the part with `to.query.token` just set `preview.value = true`
            if (isPreview) {
                preview.value = true;
                return;
            }

            // If leaving the preview page, refresh the page to exit preview mode
            if (preview.value) {
                //@ts-expect-error
                window.location = to.fullPath;
                return;
            }
        },
        { global: true }
    );

    return { provide: { preview } };
});
