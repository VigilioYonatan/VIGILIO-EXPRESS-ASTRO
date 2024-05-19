import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [preact({ compat: true }), tailwind()],
    srcDir: "resources",
    vite: {
        ssr: {
            /*, 'other-lib-you-need'*/
            noExternal: ["react-hook-form"],
        },
    },
});
