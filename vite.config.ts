import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import type { file } from "bun";
import { replace } from "lodash";

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
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
  };
});
