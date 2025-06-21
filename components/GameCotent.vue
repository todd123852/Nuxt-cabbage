<template>
    <div class="game-content" :style="{ '--header-height': headerHeight + 'px' }">
    <div class="side-sticky">
      <div class="side-nav-placeholder" :ref="(el) => { if (el) sideNavPlaceholderRef = el as HTMLElement }"></div>
      <div class="side-nav" :class="{ 'is-fixed': isSideNavFixed }" :ref="(el) => { if (el) sideNavRef = el as HTMLElement }">
        <div
          v-for="(game, index) in gameType"
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
            v-for="(game, index) in gameType"
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
    import slotIcon from '@/components/imges/GameTypeIcon/icon_dtfl_dz_1.png'
    import fishingIcon from '@/components/imges/GameTypeIcon/icon_dtfl_by_1.png'
    import liveIcon from '@/components/imges/GameTypeIcon/icon_dtfl_zr_1.png'
    import sportIcon from '@/components/imges/GameTypeIcon/icon_dtfl_ty_1.png'
    import lotteryIcon from '@/components/imges/GameTypeIcon/icon_dtfl_cp_1.png'
    import esportIcon from '@/components/imges/GameTypeIcon/icon_dtfl_dianjing_1.png'
    import cardsIcon from '@/components/imges/GameTypeIcon/icon_dtfl_qp_1.png'
    import blockchainIcon from '@/components/imges/GameTypeIcon/icon_dtfl_qkl_1.png'
    import hot from '@/components/imges/GameTypeIcon/icon_dtfl_rm_1.png'

    const gameType = reactive([
        {name:'热门', thirdParties: ['PG', 'WG', 'LG', 'PP'], type: 'hot', icon: hot},
        {name:'电子', thirdParties: ['PG', 'WG', 'LG', 'PP'], type: 'slot', icon: slotIcon},
        {name:'捕鱼', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'fishing' , icon: fishingIcon},
        {name:'真人', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'live' , icon: liveIcon},
        {name:'体育', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'sport' , icon: sportIcon},
        {name:'彩票', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'lottery' , icon: lotteryIcon},
        {name:'电竞', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'e-sport' , icon: esportIcon},
        {name:'棋牌', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'cards' , icon: cardsIcon},
        {name:'区块链', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'blockchain' , icon: blockchainIcon}
    ]);
    
    const gameTabActive = ref(0);
    const gameTabs = ['热门', '最近', '收藏'];
    const gameRefs = ref<HTMLElement[]>([]);
    const gameTabsRef = ref<HTMLElement | null>(null); // 获取 van-tabs 容器的引用
    const currentActiveGameType = ref(gameType[0].type); 
    const headerHeight = inject<Ref<number>>('headerHeight', ref(0));   
    const mainScrollContainer = inject<Ref<HTMLElement | null>>('defaultScrollElement', ref(null));   //  main 元素引用

    // 每次组件更新前清空 ref 数组，确保引用是最新的
    onBeforeUpdate(() => {
      gameRefs.value = [];
    });

    const sideNavRef = ref<HTMLElement | null>(null);     
    const sideNavPlaceholderRef = ref<HTMLElement | null>(null);
    const isSideNavFixed = ref(false); // 控制 side-nav 是否为fix
    let stickyStartScrollTop = 0;  //'main' 元素的 scrollTop 值
    let fixedLeftOffset = 0; // side-nav 的 left 偏移量

    // 统一处理侧边栏导航项的点击
    const handleSideNavItemClick = (index: number) => {  
      const targetGame = gameType[index]; // 获取被点击的游戏类型数据
      let targetElement: HTMLElement | null = null; // 目标滚动元素
      
      if (index === 0) { // 如果点击的是第一个元素，即“热门”
        gameTabActive.value = 0; // 切换 van-tabs 到第一个（热门）tab
        targetElement = gameTabsRef.value; // 目标元素是 van-tabs 容器
      } else {
        targetElement = gameRefs.value[index]; // 点击的是其他游戏类型 (非热门)
      }
      
      // 更新侧边栏高亮状态
      currentActiveGameType.value = targetGame.type; 

      // 执行滚动
      if (targetElement) {
        if (mainScrollContainer.value) {
          const targetRect = targetElement.getBoundingClientRect(); 
          const mainRect = mainScrollContainer.value.getBoundingClientRect(); // 主滚动容器

          // 计算目标元素相对于主滚动容器顶部的当前位置

          const targetOffsetTopInMain = targetRect.top - mainRect.top + mainScrollContainer.value.scrollTop;
          
          // 计算最终的滚动位置：目标元素顶部位置 - 头部高度
          const finalScrollPosition = Math.round(targetOffsetTopInMain);
          
          mainScrollContainer.value.scrollTo({
            top: finalScrollPosition,
            behavior: 'smooth'
          });
        }
      } else {
        console.warn(`Target element for ${targetGame.name} at index ${index} is not found.`);
      }
    };

  
  onMounted(() => {        
    if (!mainScrollContainer) {
        console.error("未找到主滚动容器 (main)！无法设置滚动监听器。");
        return;
    }    
    nextTick(() => {      
      if (sideNavRef.value && sideNavPlaceholderRef.value && mainScrollContainer.value) {
      // 获取 main 的 rect
        const sideNavRect = sideNavRef.value.getBoundingClientRect();        
        const mainRect = mainScrollContainer.value.getBoundingClientRect(); 
        
        // 相对于文档顶部的绝对位置：
        const sideNavAbsoluteTop = sideNavRect.top + window.scrollY; 
        const mainAbsoluteTop = mainRect.top + window.scrollY; 
        // console.log(mainAbsoluteTop);
        
        // sideNav 需要滚动的距离 = sideNav 在 main 内容中的初始相对位置
        stickyStartScrollTop = sideNavAbsoluteTop - mainAbsoluteTop;
        stickyStartScrollTop = Math.max(0, stickyStartScrollTop); // 确保不为负

        // 这是 side-nav 在文档流中时，距离视口左边缘的绝对像素距离。
        fixedLeftOffset = sideNavRect.left; 
        
        // 设置占位符的尺寸
        sideNavPlaceholderRef.value.style.width = `${sideNavRect.width}px`;
        sideNavPlaceholderRef.value.style.height = `${sideNavRect.height}px`;
        
        mainScrollContainer.value.addEventListener('scroll', handleScroll);        
        window.addEventListener('resize', handleResize);
        
        handleScroll(); // 首次加载时检查一次
      } else {
        console.warn('未找到所需的一个或多个 DOM 元素 (sideNavRef, sideNavPlaceholderRef)。');
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
  // 检查是否已滚动到吸附点
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
    if (mainScrollContainer.value && sideNavRef.value && sideNavPlaceholderRef.value) {
      const sideNavRect = sideNavRef.value.getBoundingClientRect();
      const mainRect = mainScrollContainer.value.getBoundingClientRect();
      
      // 重新计算吸附点和 left 值
      const sideNavAbsoluteTop = sideNavRect.top + window.scrollY;
      const mainAbsoluteTop = mainRect.top + window.scrollY;
      stickyStartScrollTop = sideNavAbsoluteTop - mainAbsoluteTop;
      stickyStartScrollTop = Math.max(0, stickyStartScrollTop); 

      fixedLeftOffset = sideNavRect.left;

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
    }
    .side-nav .scroll-target {
        height: 5vh;
        width: 5.4rem;
        background-color: #222222;
        display: flex;
        align-items: center;
        word-wrap: break-word;
        margin: 2vh 0;
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
        margin: 2vh 0;
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