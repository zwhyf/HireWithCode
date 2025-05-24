import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {ViewUiResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
      vue(),
    Components({
      // ui库解析器，也可以自定义
      resolvers: [
        ViewUiResolver()
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/_variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})
