import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    appType: 'spa',
    plugins: [
      vue({
        isProduction: env.mode === 'production'
      }),
    ],
    resolve: {
      alias: {
        '@': Bun.fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
})
