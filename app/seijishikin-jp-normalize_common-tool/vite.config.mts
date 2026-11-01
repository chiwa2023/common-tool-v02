import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  //plugins: [vue()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'pinia-plugin-persistedstate',
        '@simplewebauthn/browser'
      ],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(import.meta.dirname, "tsconfig.app.json"),
      exclude: [
        'src/components/test/**',
        'src/main.ts',
        'src/App.vue',
        'src/router.ts',
        'src/routePathConstants.ts'
      ]
    })
  ],
})