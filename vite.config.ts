import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const fileURLToPath = Bun.fileURLToPath;
  const srcPath = fileURLToPath(new URL("./src", import.meta.url));

  return {
    appType: "spa",
    plugins: [
      vue({
        isProduction: env.mode === "production",
      }),
    ],
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
  };
});
