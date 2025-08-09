<template>
  <div class="fixed-width-layout">
    <div class="container">
      <section class="section-content" :class="{ 'no-scroll': isLoading }">
        <header>
          <div class="head-content" ref="headerElement" 
          :class="{ 'no-download-bar': !showDownloadBar }"
          >
            <Download @download-closed="handleDownloadClosed" />
            <div class="search-content" 
            :class="{ 'no-download-bar': !showDownloadBar }">
              <img class="lobby-logo" src="../components/imges/logo.png" alt="">
              <div class="search-route-item">
                <img class="search-Icon" :src="searchIcon" alt="">
                <span>搜索</span>
              </div>
            </div>
          </div>
          <div class="my-hairline" style="height: 1px;"></div>
        </header>
        <main ref="defaultScrollElement" :class="{ 'no-scroll': isLoading }">
          <slot :headerHeight="headerHeight"></slot>
          <div class="backTop"
            v-show="showBackTop"
            @click="backTop"
          >
          <van-icon name="back-top" />
        </div>
        </main>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
  import searchIcon from '@/components/imges/lobby_icon/search_icon.avif'
  import { useGameInfo } from '~/stores/GameInfo'
  const gameInfoStore = useGameInfo();
  const headerElement = ref<HTMLElement | null>(null);
  const defaultScrollElement = ref<HTMLElement | null>(null);
  const headerHeight = ref(0);
  const showDownloadBar = ref(true); 
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
  
  const handleDownloadClosed = () => {
    showDownloadBar.value = false; // 更新状态，让子组件的布局响应
  };
  const isLoading = ref(true); // 等待期间禁止滑动
  onMounted(() => {
    window.addEventListener('load', handlePageLoad);
    setTimeout(() => {      
      isLoading.value = false;
    }, 500); // 至少显示 0.5 秒，避免闪烁
  });
  const handlePageLoad = () => isLoading.value = false;
  provide('defaultScrollElement', defaultScrollElement); 
  provide('headerHeight', headerHeight); 
  provide('showDownloadBar', showDownloadBar); 

  // 置顶方法
  const showBackTop = ref(false); // 展示置顶图标
  const scrollTop = ref(0); 
  const handleScroll = () => {
    scrollTop.value = defaultScrollElement.value?.scrollTop || 0;
  };
  onMounted(() => defaultScrollElement.value?.addEventListener('scroll', handleScroll)); // 监听滚动
  watch(scrollTop, () => 
    scrollTop.value > gameInfoStore.gameContentTop ? showBackTop.value = true : showBackTop.value = false
  )
  function backTop() {
    if (defaultScrollElement.value) {
      defaultScrollElement.value.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: inherit;
  scrollbar-width: 0;
}
header {
  z-index: 11;
  margin-bottom: 1px;;
}
.search-route-item {
  height: 100%;
  width: 3rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  color: var(--neutral_1);
  padding: .3rem 0;
  justify-content: center;
  align-items: center;
}
.search-route-item span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: .8rem;
  cursor: pointer;
}
.search-Icon {
  width: 2.1rem;
  height: auto;
  cursor: pointer;
}
.section-content {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 91vh;
  overflow-y: hidden;
}
.no-scroll {
  overflow: hidden;
  height: 100vh;
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
  }
  main {
    flex-grow: 1;
    overflow-y: auto;
    padding-top: 0;
    scroll-padding-top:12vh;
    overscroll-behavior-y: contain; 
    width: 100%;
  }
  .container {
    width: 100%;
  }
  .head-content {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--bg_2);
    height: 12vh;
    transition: all .4s ease;
    flex-shrink: 1;
    overflow: hidden;
  }
  .head-content.no-download-bar {
    height: 7.5vh; /* 只有 search-content 的高度 */
  }
  .search-content {
    position: absolute;
    width: 100%;
    height: 7.5vh;
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 4.5vh;
    transition: all .4s ease;
  }
  .search-content.no-download-bar {
    top: 0;
  }
  .lobby-logo {
    width: auto;
    max-width: 100%;
    height: 100%;
  }
  .backTop {
    position: absolute;
    right: .2rem;
    bottom: .2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10%;
    border: solid 1px var(--border);
    background-color: var(--bg_2);
    opacity: .7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--primary);
  }
</style>