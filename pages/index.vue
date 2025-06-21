<template>
  <div class="home-content">
    <div class="home-page" ref="page">
      <section>
        <div class="section-content">
          <Banner />
          <h1>首页首页首页首页首页首页首页</h1>
          <GameCotent />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useLayoutTransition } from '@/composable/usePageTransition';
const route = useRoute();

  definePageMeta({
    layout: 'default',
    layoutTransition: useLayoutTransition(),
  })
  useSeoMeta({
    title: '厚的首页',
    description: '这是一个人网站',
    keywords: '憨憨憨憨憨憨'
  })
</script>
<style scoped>
  .section-content {
    padding: 0 1vw;
    overflow-y: auto;
  }
  .home-page {
    height: 100%;
  }
  @media (width <= 450px) {
    .section-content {
      padding: 0 2.5vw;
    }
  }
</style>
