<template>
    <div ref="gameContent" class="game-content" :style="{ '--header-height': headerHeight + 'px' }">
    <div class="side-sticky">
      <div class="side-nav-placeholder" :ref="(el) => { if (el) sideNavPlaceholderRef = el as HTMLElement }"></div>
      <div class="side-nav" :class="{ 'is-fixed': isSideNavFixed }" :ref="(el) => { if (el) sideNavRef = el as HTMLElement }">
        <div
          v-for="(game, index) in gameInfoStore.gameType"
          :key="game.type"
          class="scroll-target"
          @click="handleSideNavItemClick(index)" :class="{ 'is-active': currentActiveGameType === game.type }"
        >
          <div class="nav-tittle">
            <img class="nav-icon" :src="game.icon" />
            <div class="nav-name">
              {{ game.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-list">
      <van-tabs 
        v-model:active="gameTabActive" 
        id="gameTabs" 
        :ref="(el) => { if (el) gameTabsRef = el as HTMLElement }"
      >
        <van-tab v-for="(tab, index) in gameTabs" :title="tab" :key="tab">
          <GameDiary v-if="index === 0" /> 
        </van-tab>
      </van-tabs>
      <div class="game-type-list">
          <div
            class="game-list-link"
            v-for="(game, index) in gameInfoStore.gameType"
            :key="game.type"
            :id="game.type"
            :ref="(el) => { if (el) gameRefs[index] = el as HTMLElement }"
          >
            <div class="my-hairline"></div>
            <div class="type-head">
              <div class="type-tittle">
                <img class="type-icon" :src="game.icon" />
                <h3>{{ game.name }}</h3>
              </div>
              <NuxtLink>全部</NuxtLink>
            </div>
            <div class="game-banner" v-for="platform in game.thirdParties" :key="platform">
              <div class="platformName">{{ platform }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useGameInfo } from '~/stores/GameInfo'
const gameInfoStore = useGameInfo();
    
    const gameTabActive = ref(0);
    const gameTabs = ['热门', '最近', '收藏'];
    const gameRefs = ref<HTMLElement[]>([]);
    const gameTabsRef = ref<HTMLElement | null>(null); // 获取 van-tabs 容器的引用
    const currentActiveGameType = ref(gameInfoStore.gameType[0].type); 
    const headerHeight = inject<Ref<number>>('headerHeight', ref(0));   
    const showDownloadBar = inject<Ref<boolean>>('showDownloadBar', ref(true));
    const mainScrollContainer = inject<Ref<HTMLElement | null>>('defaultScrollElement', ref(null));   //  main 元素引用
    const gameContent = ref<HTMLElement | null>(null); // 游戏列表最顶部
    // 每次组件更新前清空 ref 数组，确保引用是最新的
    onBeforeUpdate(() => {
      gameRefs.value = [];
    });

    const sideNavRef = ref<HTMLElement | null>(null);     
    const sideNavPlaceholderRef = ref<HTMLElement | null>(null);
    const isSideNavFixed = ref(false); // 控制 side-nav 是否为fix

    // 传递给爷组件展示置顶按钮的高度
    const gameContentTop = ref<number>(270);
    onMounted(() => gameInfoStore.gameContentTop = gameContent.value?.offsetTop || 270);

    let stickyStartScrollTop = 0;  //'main' 元素的 scrollTop 值
    watch(showDownloadBar, () => {
      if (!showDownloadBar.value && sideNavRef.value) {
        sideNavRef.value.style.top = (headerHeight.value - ((window.innerHeight*4.5)/100)) + 'px';
      }
    });
    let fixedLeftOffset = 0 // side-nav 的 left 偏移量

    // 统一处理侧边栏导航项的点击
    const handleSideNavItemClick = (index: number) => {  
      const targetGame = gameInfoStore.gameType[index]; // 获取被点击的游戏类型数据
      let targetElement: HTMLElement | null = null; // 目标滚动元素
      
      if (index === 0) { // 如果点击的是第一个元素，即“热门”
        gameTabActive.value = 0; 
      } else {
        targetElement = gameRefs.value[index]; // 点击的是其他游戏类型 (非热门)
      }
      
      // 更新侧边栏高亮状态
      currentActiveGameType.value = targetGame.type; 

      // 执行滚动
      if (targetElement) {
        if (mainScrollContainer.value) {
          const targetRect = targetElement.getBoundingClientRect(); 
          const mainRect = mainScrollContainer.value.getBoundingClientRect(); 
  
          // 计算目标元素相对于主滚动容器顶部的当前位置
          const targetOffsetTopInMain = targetRect.top - mainRect.top + mainScrollContainer.value.scrollTop;
          
          // 计算最终的滚动位置：目标元素顶部位置 - 头部高度
          const finalScrollPosition = Math.round(targetOffsetTopInMain);
          
          mainScrollContainer.value.scrollTo({
            top: finalScrollPosition,
            behavior: 'smooth'
          });
        }
      } else if (mainScrollContainer.value && gameContent.value) {
        mainScrollContainer.value.scrollTo({
          top: gameContent.value.offsetTop,
          behavior: 'smooth'
        });
      }
    };

  
  onMounted(() => {        
    if (!mainScrollContainer) {
        console.error("未找到主滚动容器 (main)！无法设置滚动监听器。");
        return;
    }    
    nextTick(() => {         
      window.addEventListener('load', handleResize);
      if (sideNavRef.value && sideNavPlaceholderRef.value && mainScrollContainer.value&&gameContent.value) {
        const sideNavRect = sideNavRef.value.getBoundingClientRect();        
        stickyStartScrollTop = gameContent.value.offsetTop;

        // ，距离视口左边缘的绝对像素距离。
        const bodyRect = document.body.getBoundingClientRect();
        fixedLeftOffset = bodyRect.left + (bodyRect.height * 0.02);
        
        // 设置占位符的尺寸
        sideNavPlaceholderRef.value.style.width = `${sideNavRect.width}px`;
        sideNavPlaceholderRef.value.style.height = `${sideNavRect.height}px`;
        
        mainScrollContainer.value.addEventListener('scroll', handleScroll);        
        window.addEventListener('resize', handleResize);
        
        handleScroll(); // 首次加载时检查一次
      } else {
        console.warn('未找到所需的一个或多个 DOM 元素');
      }
    });
});
// 卸载后清理事件
onUnmounted(() => {
  if (mainScrollContainer.value) {
    mainScrollContainer.value.removeEventListener('scroll', handleScroll);
  }
  window.removeEventListener('resize', handleResize);
});

// --- 滚动事件处理函数 ---
const handleScroll = () => {    
  if (!mainScrollContainer || !sideNavRef.value || !sideNavPlaceholderRef.value) {    
    return
  };

  const currentScrollTop = mainScrollContainer.value?.scrollTop|| 0;

  if (currentScrollTop >= stickyStartScrollTop) {
    if (!isSideNavFixed.value) {
      isSideNavFixed.value = true;      
      sideNavRef.value.style.left = `${fixedLeftOffset}px`;
      sideNavPlaceholderRef.value.classList.add('is-visible');
      sideNavPlaceholderRef.value.style.height = `${sideNavRef.value.offsetHeight}px`; 
    }
  } else {
    // 尚未达到吸附点，或已向上滚动
    if (isSideNavFixed.value) {  
      
      isSideNavFixed.value = false;
      sideNavRef.value.style.left = ''; // 移除固定时的 left
      sideNavPlaceholderRef.value.classList.remove('is-visible');
    }
  }
};

// --- 窗口大小变化处理函数 ---
const handleResize = () => {
  nextTick(() => {
    console.log(gameContent.value?.offsetTop);
    gameInfoStore.gameContentTop = gameContent.value?.offsetTop || 270;
    if (sideNavRef.value && sideNavPlaceholderRef.value && gameContent.value) {
      const sideNavRect = sideNavRef.value.getBoundingClientRect();

      const bodyRect = document.body.getBoundingClientRect();
      fixedLeftOffset = bodyRect.left + (bodyRect.height * 0.02);
      
      // 重新计算吸附点和 left 值
      stickyStartScrollTop = gameContent.value.offsetTop;
      sideNavPlaceholderRef.value.style.width = `${sideNavRect.width}px`;
      sideNavPlaceholderRef.value.style.height = `${sideNavRect.height}px`;

      if (isSideNavFixed.value) {
        sideNavRef.value.style.left = `${fixedLeftOffset}px`;
      }      
      handleScroll(); // 重新检查滚动状态
    }
  });
};

</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
    .game-content {
      display: flex;
      height: 100%;
      width: 100%;
      padding: .4rem 0;
    }
    .side-nav-placeholder {
      display: none; /* 默认隐藏 */
      width: 5.4rem;
      margin-right: 1rem;
      flex-shrink: 0; /* 防止在 flex 容器中被压缩 */
    }
    .side-nav-placeholder.is-visible {
      display: block; /* 当 side-nav 固定时显示 */
    }

    .side-nav {
      margin-right: 1rem;
      overflow-y: auto;
      max-height: 100%; 
      z-index: 10;
    }
    .side-nav.is-fixed {
      position: fixed; 
      top: var(--header-height);
      left: auto; 
      transition: top .4s ease;
    }
    .side-nav .scroll-target {
      height: 5vh;
      width: 5.4rem;
      background-color: #222222;
      display: flex;
      align-items: center;
      word-wrap: break-word;
      margin: 1.5vh 0;
      border-radius: 10%;
      font-size: 1.5vh;
      cursor: pointer;
      color: var(--neutral_1);
    }
        /* 侧边导航项的激活样式 */
    .side-nav .scroll-target.is-active {
        background-color: #444444; /* 示例：更深的背景色 */
        color: var(--highlight-color, #ffffff); /* 示例：高亮文字颜色 */
    }

    .nav-tittle {
        flex-grow: 1;
        display: flex;
        align-items: center;
    }
    .nav-name {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto; 
        text-align: center;
        font-size: .7rem;
        color: var(--neutral_1);
    }
    .nav-icon {
        flex-shrink: 0;
        flex-basis: 1.7rem;
        margin-right: .3rem;
        width: 1.7rem;
    }
    .game-list-link {
        scroll-margin-top: 12vh;
    }
    .game-list {
        flex-grow: 1;
        margin: 0;
    }
    .type-head {
        color: var(--lead);
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
    }
    .type-tittle {
        display: flex;
    }
    .type-tittle h3{
        font-size: 1.2rem;
    }
    .type-head a {
        font-size: .8rem;
        color: var(--neutral_1);
        cursor: none;
    }
    .game-banner {
      position: relative;
      height: 7.2rem;
      background-color: bisque;
      margin-bottom: 1rem;
      border-radius: .5rem;
    }
    .platformName {
        position: absolute;
        top: 50%;
        left: 15%;
    }
    .type-icon {
        width: 2rem;
        margin-right: .5rem;
    }
</style>