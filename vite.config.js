import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/foodie_frontend/", // Ensure this matches your GitHub repo name
    build: {
        outDir: "dist",
        rollupOptions: {
            input: "index.html",
        },
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
