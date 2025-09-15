<template>
    <div class="regist-login">
      <div class="container">
        <header>
          <NuxtLink to="/">
            <van-icon style="font-size: 1.5rem;" name="arrow-left" />
          </NuxtLink>
        </header>
        <article>
          <strong>🧧新人豪华大礼包 让您赢在起跑线🧧</strong><br>
          <strong>🧧新人豪华大礼包 让您赢在起跑线🧧</strong><br>
          <strong>🧧新人豪华大礼包 让您赢在起跑线🧧</strong><br>
          <strong>🧧新人豪华大礼包 让您赢在起跑线🧧</strong><br>
        </article>
        <div class="tabsContent">
          <div class="my-hairline tab"></div>
          <van-tabs :active="currentTab" :before-change="switchTab">
            <van-tab>
              <template #title>
              <div class="tabTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                </svg>              
                <span class="tabTitleText">注册</span>
              </div>
              </template>
            </van-tab>
            <van-tab>
              <template #title>
                <div class="tabTitle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                  <span>登陆</span>
                </div>
              </template>
            </van-tab>
          </van-tabs>
        </div>
        <main>
          <slot></slot>
        </main>
        <div class="fastLogin">
          <img v-for="(type, index) in fastLoginTypes" :src="type" alt="" :key="index">
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
  import fb from '~/components/imges/contactIcon/Facebook.avif'
  import line from '~/components/imges/contactIcon/LINE.avif'
  import google from '~/components/imges/contactIcon/google.avif'
  import zalo from '~/components/imges/contactIcon/zalo.avif'
  const fastLoginTypes = reactive([fb, line, google, zalo]);
  const tabs = ['/regist', 'login']
  const route = useRoute();
  // 处理TAB跳转
  const switchTab = (index:number) => {
    navigateTo(tabs[index]);
    return true
  }
  // 控制TAB标签页
  const currentTab = computed(() => {
    if (route.path.includes('/login')) {
      return 1;
    } else if (route.path.includes('/regist')) {
      return 0;
    }
    return 0;
  });

</script>
<style scoped>
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
  .container {
    padding: 0 1.3rem;
  }
  article {
    padding: 0 4rem;
    color: var(--lead);
  }
  main {
    position: relative;
  }
  .loginRegistTab * {
    text-align: start;
  }
  .regist-login {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  header {
    padding: 1rem 0;
    text-align: start;
  }
  header .van-icon {
    color: var(--leftnav_active);
  }
  .tabsContent {
    position: relative;
  }
  main {
    height: 80vh;
  }
  .my-hairline.tab {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .fastLogin img {
    height: 3rem;
    width: 3rem;
    margin: .5rem;
  }
  .tabsContent .bi {
    height: 1.4rem;
    margin-right: .5rem;
  }
  .loginRegistTab {
    position: relative;
  }
  .tabTitle {
    display: flex;
    align-items: center;
  }
</style>