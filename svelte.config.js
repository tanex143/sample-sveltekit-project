import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            edge: false,
        }),
        alias: {
            $db: "./src/db",
            $funcstions: "./src/functions",
            $stores: "./src/stores",
        },
    },

    preprocess: [
        vitePreprocess(),
        preprocess({
            postcss: true,
        }),
    ],
};

export default config;
