<template>
  <div class="home-content">
    <div class="home-page" ref="page">
      <header>
      </header>
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
  definePageMeta({
    layoutTransition:{
      name: 'layout-left',
    },
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
</style>
