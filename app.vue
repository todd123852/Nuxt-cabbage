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
// 固定窗口
const showChargeWindow = ref(true);

</script>
<style src="./components/style/vantCustomize.css"></style>
<style>
  *{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2vh;
    scrollbar-width: 0;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    text-align: center
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
  }
  .van-popup, .van-overlay{
    width: calc(100vh * 11 / 19.5);
    height: 90%;
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
  /* 注册页过渡效果 right-slide*/
  .right-slide-enter-active,.right-slide-leave-active, 
  .left-slide-enter-active,.left-slide-leave-active ,
  .layout-left-enter-active,.layout-left-leave-active
  {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);; 
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .right-slide-leave-to, .left-slide-enter-from,
  .layout-right-leave-to, .layout-left-enter-from 
  {
    transform: translateX(100%); 
  }
  .right-slide-enter-from, .left-slide-leave-to,
  .layout-right-enter-from , .layout-left-leave-to 
  {
    transform: translateX(-100%); 
  }
  .right-slide-enter-to ,.right-slide-leave-from, 
  .left-slide-enter-to ,.left-slide-leave-from,
  .layout-right-enter-to ,.layout-right-leave-from
  {
    opacity: 1;
  }
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }

  .app-container {
    overflow-x: hidden;
    display: flex;
    background-color: var(--home_bg);
    height: 100vh;
    width: calc(100vh * 11 / 19.5);
    flex-direction: column; /* 垂直排列子元素 */
    position: relative;
  }
  .app-container section {
    flex-grow: 1;
    overflow-y: auto;
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

</style>
