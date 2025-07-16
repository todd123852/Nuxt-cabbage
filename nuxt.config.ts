import { defineNuxtConfig } from 'nuxt/config'; // 确保导入 defineNuxtConfig

export default defineNuxtConfig({
  // ssr: false , // 控制是否在服务端渲染或浏览器渲染 默认开启
  modules: ['@pinia/nuxt', '@vant/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // 这会告诉 Nuxt 使用 GitHub Pages 的特定构建优化。
  nitro: {
    preset: 'github-pages'
  },
  app: {
    baseURL: '/Nuxt-cabbage/',
    buildAssetsDir: 'nuxt_assets',
    head: {
      title: 'cabbage',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  }
});