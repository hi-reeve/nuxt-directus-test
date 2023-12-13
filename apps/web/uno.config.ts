import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            provider: "bunny",
            fonts: {
                sans: "montserrat:100,300,400,500,600,700",
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
