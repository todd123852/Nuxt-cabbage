<template>
  <div>
    <div class="app-container" ref="appContainer">
      <section>
        <NuxtLayout>
          <NuxtPage />
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
const showChargeWindow = ref(true); // 固定窗口
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
/* 共同的过渡活跃状态 */
.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-backward-enter-active,
.slide-backward-leave-active {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

/* 前进动画 */
.slide-forward-enter-from,
.slide-backward-leave-to {
  transform: translateX(100%);
}
.slide-forward-leave-to,
.slide-backward-enter-from {
  transform: translateX(-100%);
}

/* 默认结束状态 */
.slide-forward-enter-to,
.slide-forward-leave-from,
.slide-backward-enter-to,
.slide-backward-leave-from {
  transform: translateX(0%);
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
    overflow-x: hidden;
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
    overflow: hidden;
    display: flex;
    background-color: var(--home_bg);
    height: 100dvh;
    flex-direction: column; /* 垂直排列子元素 */
    position: relative;
  }
  .app-container section {
    flex-grow: 1;
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
  body .van-popup.van-popover .van-popover__arrow {
    position: absolute;
    top: -.1rem;
    right: .5rem;
    width: 1rem;
    height: 1rem;
    background: var(--bg_2);
    border-color: var(--border);
    border-style: solid;
    border-top-width:1px;
    border-width: 1px 0 0 1px;
    transform: translate(-50%) rotate(45deg)
  }
  @media (width <= 450px) { /* 或者 (width <= 700px) */
    html body, .app-container .van-overlay{
      width: 100%; 
      max-width: 100%;
      height: 100vh;
    }
  }
</style>
