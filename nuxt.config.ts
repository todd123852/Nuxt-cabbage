// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false , // 控制是否在服务端渲染或浏览器渲染 默认开启
  
  modules:['@pinia/nuxt', '@vant/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    layoutTransition: {
      name: 'layout-left'
    }
  }
})
