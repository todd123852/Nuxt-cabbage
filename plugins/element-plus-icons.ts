import { defineNuxtPlugin } from '#app';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
  // 遍历 ElementPlusIconsVue 对象中的所有导出（即所有图标组件）
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 使用 Vue 应用程序实例的 .component() 方法进行全局注册
    // key 是图标组件的名称（例如 'Edit', 'Share'）
    // component 是图标组件本身
    nuxtApp.vueApp.component(key, component);
  }
});