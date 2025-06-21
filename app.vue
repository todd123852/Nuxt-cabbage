<template>
  <div>
    <div class="app-container" ref="appContainer">
      <section>
        <NuxtLayout>
          <NuxtPage :page-key="route.fullPath" />  
        </NuxtLayout>
      </section>
      <footer>
        <FooterNav />
      </footer>
      <!-- 充值弹窗 -->
      <ChargePop />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@vant/touch-emulator'; // vant的PC端点击事件
// import { gsap } from 'gsap';
const showChargeWindow = ref(true); // 固定窗口
const route = useRoute();

</script>
<style src="./components/style/vantCustomize.css"></style>
<style>
  *{
    font-family: 'Microsoft YaHei' ,Helvetica, Arial, sans-serif;
    font-size: 2vh;
    scrollbar-width: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-align: center;
    scroll-behavior: smooth;
    text-decoration: none;
    cursor:default;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  html body {
    margin: 0 auto;
    height: 100%;
    width: calc(100vh * 11 / 19.5);
    background-color: #333333;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  .van-popup, .van-overlay{
    width: calc(100vh * 11 / 19.5);
    height: 95%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  /* 气泡样式 */
  .van-badge {
    font-size: .8rem;
    border: none;
    right: -.3rem;
    font-weight: 300;
  }
  .nav-content .van-tabbar--fixed {
    position: relative;
    background-color: black;
  }
  a {
    text-decoration: none;
  }
  .app-container {
    overflow-x: hidden;
    display: flex;
    background-color: var(--home_bg);
    height: 100dvh;
    flex-direction: column; /* 垂直排列子元素 */
    position: relative;
  }
  .app-container section {
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
  }
  footer {
    flex-shrink: 0;
    bottom: 0;
    height: 9vh;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    align-items: center;
    border: none;
  }
  @media (width <= 450px) { /* 或者 (width <= 700px) */
    html body, .van-popup, .van-overlay{
      width: 100%; 
      max-width: 100%;
  }
}
</style>
