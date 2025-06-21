<template>
  <div class="fixed-width-layout">
    <div class="container">
      <section class="section-content">
        <header>
          <div class="head-content" ref="headerElement" :class="{ 'no-download-height': !showDownloadBar }">
            <Download @download-closed="handleDownloadClosed" />
            <div class="search-content">
              <img src="../components/imges/logo.png" alt="">
              <button class="mm" @click="() => console.log(headerHeight)">123</button>
            </div>
          </div>
        </header>
        <div class="my-hairline"></div>
        <main ref="defaultScrollElement">
          <slot :headerHeight="headerHeight"></slot>
        </main>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
  const headerElement = ref<HTMLElement | null>(null);
  const defaultScrollElement = ref<HTMLElement | null>(null);

  const headerHeight = ref(0);
  const showDownloadBar = ref(true); 
  // 测量头部高度的安全函数
  const measureHeaderHeight = () => {
    if (headerElement.value) {
      headerHeight.value = headerElement.value.offsetHeight;
    } else {
      headerHeight.value = 0;
    }
  };
  // 组件挂载时，进行初始测量
  onMounted(() => {
    nextTick(measureHeaderHeight); 
  });
  // 计算头部高度
  watch(
    showDownloadBar,
    () => {
      setTimeout(() => nextTick(measureHeaderHeight), 400);
    }, { immediate: false }
  );
  provide('defaultScrollElement', defaultScrollElement); 
  provide('headerHeight', headerHeight); 
  const handleDownloadClosed = () => {
    showDownloadBar.value = false; // 更新状态，让父组件的布局响应
  };
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: inherit;
  scrollbar-width: 0;
}
.section-content {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  overflow-y: hidden;
}
  .fixed-width-layout {
    display: flex;
    justify-content: center; 
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: var(--home_bg);
  }
  header{
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #0a0a0a;
    border: none;
    flex-grow: 1;
  }
  main {
    flex-grow: 1;
    overflow-y: auto;
    background-color: #0000;
    padding-top: 0;
    scroll-padding-top:12vh;
    overscroll-behavior-y: contain; 
    width: 100%;
  }
  .container {
    width: 100%;
  }
  .closeBtn {
    margin: 0 2%;
    cursor: pointer;
    font-weight: 600;
    line-height: 0;
  }
  .head-content {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #1a1a1a;
    height: 12vh;
    transition: height 0.4s ease;
  }
  .no-download-height {
    height: 7.5vh; /* 只有搜索框的高度 */
  }
  .search-content {
    height: 7.5vh;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search-content img {
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }
  .download {
    height: 4.5vh;
    line-height: 0;
    display: flex;
    flex-grow: 1;
    align-items: center;
    background-color: rgb(98, 202, 243);
    padding: 0 1%;
  }
  .downloadBtn{
    flex: 3;
    height: 3vh;
    padding: 1% 1.5%;
    border: none;
    border-radius: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-size: 1.5vh;
  }
  .closeBtn{
    flex: 1;
  }
  .downloadImg{
    flex: 15;
  }
</style>