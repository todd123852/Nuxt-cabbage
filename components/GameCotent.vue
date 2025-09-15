<template>
  <div ref="gameContent" class="game-content" :style="{ '--header-height': headerHeight + 'px' }">
    <div class="side-sticky">
      <div class="side-nav-placeholder" :ref="(el) => { if (el) sideNavPlaceholderRef = el as HTMLElement }"></div>
      <div class="side-nav" :class="{ 'is-fixed': isSideNavFixed, 'is-absolute': isSideNavabsoluted }"
        :ref="(el) => { if (el) sideNavRef = el as HTMLElement }">
        <div v-for="(game, index) in gameInfoStore.gameType" :key="game.type" class="scroll-target"
          @click="handleSideNavItemClick(index)" :class="{ 'is-active': currentActiveGameType === game.type }">
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
      <div class="my-hairline tab"></div>
      <van-tabs v-model:active="gameTabActive" id="gameTabs" :ref="(el) => { if (el) gameTabsRef = el as HTMLElement }">
        <van-tab v-for="(tab, index) in gameTabs" :title="tab.name" :key="tab.name">
          <div class="game-diary" v-if="tab.games.length > 0">
            <div class="game-option" v-for="game in tab.games">
              <div class="game-img"></div>
              <div class="game-name">{{ game }}</div>
            </div>
          </div>
          <div v-else class="noneBox">
            <img class="noneImg" :src="noneImg" alt="">
            暫無紀錄
          </div>
        </van-tab>
      </van-tabs>
      <div class="game-type-list">
        <div class="game-list-link" v-for="(game, index) in gameInfoStore.gameType" :key="game.type" :id="game.type"
          :ref="(el) => { if (el) gameRefs[index] = el as HTMLElement }">
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
import noneImg from '~/components/imges/others/img_none_game.avif'
const gameInfoStore = useGameInfo();
const isSideNavabsoluted = ref(false);
const gameTabActive = ref(0);
const gameTabs = [
  {name: '热门', games:['賞金女王', '少林足球', '虎虎生財', '招財喵', '麻將胡了', '麻將胡了2', '麻將胡了3', '麻將胡了4' ]}, 
  {name: '最近', games:[]}, 
  {name: '收藏', games:['麻將胡了4', '少林足球', '虎虎生財', '少林足球']}
];

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
    sideNavRef.value.style.top = (headerHeight.value - ((window.innerHeight * 4.5) / 100)) + 'px';
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
    if (sideNavRef.value && sideNavPlaceholderRef.value && mainScrollContainer.value && gameContent.value) {
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
  if (!mainScrollContainer || !sideNavRef.value || !sideNavPlaceholderRef.value
    || !gameContent.value
  ) {
    return
  };

  const currentScrollTop = mainScrollContainer.value?.scrollTop || 0;
  const gameContentRect = gameContent.value.getBoundingClientRect();

  if (currentScrollTop >= stickyStartScrollTop) {
    // 滑动到页脚之后往上移
    if (currentScrollTop + gameContent.value.offsetTop > gameContentRect.height) {
      isSideNavFixed.value = false;
      sideNavRef.value.style.left = '0';
      isSideNavabsoluted.value = true;
      return
    } else {
      isSideNavabsoluted.value = false;
    }
    // 滑动未达页脚时固定
    if (!isSideNavFixed.value) {
      isSideNavFixed.value = true;
      sideNavRef.value.style.left = `${fixedLeftOffset}px`;
      sideNavPlaceholderRef.value.classList.add('is-visible');
      sideNavPlaceholderRef.value.style.height = `${sideNavRef.value.offsetHeight}px`;
    }
    // 滑动到页脚之后往上移
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
  /* padding-top: .4rem; */
}

.side-sticky {
  position: relative;
}

.side-nav-placeholder {
  display: none;
  /* 默认隐藏 */
  width: 5.4rem;
  margin-right: 1rem;
  flex-shrink: 0;
  /* 防止在 flex 容器中被压缩 */
}

.side-nav-placeholder.is-visible {
  display: block;
  /* 当 side-nav 固定时显示 */
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

.side-nav.is-absolute {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: top .4s ease;
}

.side-nav .scroll-target {
  height: 5vh;
  width: 5.4rem;
  background-color: var(--web_left_bg_q);
  display: flex;
  align-items: center;
  word-wrap: break-word;
  margin: 1.5vh 0;
  border-radius: 10%;
  font-size: 1.5vh;
  cursor: pointer;
  color: var(--neutral_1);
}

.side-nav .scroll-target:last-child {
  margin-bottom: 0;
}

/* 侧边导航项的激活样式 */
.side-nav .scroll-target.is-active {
  /* background-color: #444444;  */
  color: var(--highlight-color, var(--lead));
  /* 示例：高亮文字颜色 */
}

.my-hairline.tab {
  position: absolute;
  width: 100%;
  top: 3.3rem;
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
  margin-bottom: 1rem;
  scroll-margin-top: 12vh;
}

.game-list-link:last-child {
  margin-bottom: 0;
}

.game-list {
  position: relative;
  flex-grow: 1;
  margin: 0;
}

.type-head {
  color: var(--lead);
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
}

.type-tittle {
  display: flex;
}

.type-tittle h3 {
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
  margin-top: 1rem;
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

.game-diary {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: .5rem;
  gap: .8rem;
}

.game-img {
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-color: aquamarine;
  margin: 0 auto;
  border-radius: .7rem;
}

.game-name {
  color: var(--lead);
  text-align: center;
  font-size: 1rem;
}
.noneBox {
  display: flex;
  flex-direction: column;
  color: var(--neutral_3);
  align-items: center;
  padding: 2rem;
}
.noneImg {
  height: 50%;
  width: 50%;
  margin-bottom: 1rem;
}

@media(width > 450px) {
  .game-img {
    aspect-ratio: 1 / 1;
  }
}
</style>