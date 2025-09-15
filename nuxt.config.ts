import { defineNuxtConfig } from 'nuxt/config'; // 确保导入 defineNuxtConfig
export default defineNuxtConfig({
  // ssr: false , // 控制是否在服务端渲染或浏览器渲染 默认开启
  modules: ['@pinia/nuxt', '@vant/nuxt', '@element-plus/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // 这会告诉 Nuxt 使用 GitHub Pages 的特定构建优化。
  nitro: {
    preset: 'github-pages'
  },
  css:[
    'vant/lib/index.css',
    '~/components/styles/vantCustomize.css',
    'element-plus/dist/index.css', 
    '~/components/styles/element-plus-custom.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'cabbage',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'siteinfos', content: '{"ossBaseUrl":"/"}' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'google', content: 'notranslate' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
});