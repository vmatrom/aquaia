import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      manifest: {
        name: "AQUA · Water Sports Santa Pola",
        short_name: "AQUA",
        description: "Actividades acuáticas y reservas en Santa Pola",
        theme_color: "#101211",
        background_color: "#101211",
        display: "standalone",
        lang: "es",
        start_url: base,
        scope: base,
        icons: [
          {
            src: `${base}icon.svg`,
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: `${base}icon-192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${base}icon-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        maximumFileSizeToCacheInBytes: 8000000,
      },
    }),
  ],
  server: { host: "127.0.0.1" },
  build: { chunkSizeWarningLimit: 1600 },
});
