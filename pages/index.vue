<template>
  <div class="home-content">
    <div class="home-page" ref="page">
      <section>
        <div class="section-content" ref="lobbyTop">
          <Banner />
          <van-notice-bar
            left-icon="volume"
            text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
          >
            <template #right-icon>
              <van-icon name="envelop-o" /> 
            </template>
           </van-notice-bar>
           <div class="lobby_nav-container">
             <div class="lobby_login_btn">
                <button>登陆</button>
                <button>注册</button>
             </div>
             <div class="middle-right-nav">
               <div class="middle_route" v-for="nav in lobbyStore.lobbyNav.slice(0, 3)">
                  <img :src="nav.icon" alt="">
                  <span>{{ nav.name }}</span>
                </div>
               <!-- 中部导航 -->
               <van-popover 
               v-model:show="showPopover" 
               placement="bottom-end"
               style="border: 1px solid var(--border);"
               >
                <van-grid
                  square
                  clickable
                  :border="false"
                  column-num="5"
                  style="width: 20rem;"
                >
                <van-grid-item
                  v-for="opition in lobbyStore.lobbyNav"
                  :key="opition.name"
                  :text="opition.name"
                  :icon="opition.icon"
                  @click="showPopover = false"
                />
                </van-grid>
                <template #reference>
                  <div class="middle_route">
                    <img :src="lobbyStore.iconAll" alt="">
                    <span>更多</span>
                  </div>
                </template>
              </van-popover>
             </div>
           </div>
          <GameCotent />
          <LobbyFooter />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLobby } from '@/stores/Lobby';
const lobbyStore = useLobby();
const showPopover = ref(false);

definePageMeta({
  layout: 'default',
});
useSeoMeta({
  title: '厚的首页',
  description: '这是一个人网站',
  keywords: '憨憨憨憨憨憨'
})
</script>
<style scoped>
  .van-popover .van-icon__image {
    width: 2rem;
    height: 2rem;
  }
  .middle_route {
    width: 3rem;
    color: var(--neutral_3);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .middle_route span {
    font-size: .7rem;
  }
  .middle_route img {
    width: 80%;
    margin-bottom: .3rem;
  }
  .section-content {
    padding: 0 1rem;
    overflow-y: auto;
  }
  .lobby_login_btn button {
    width: 4.5rem;
    height: 1.8rem;
    border-radius: .4rem;
    margin-right: .5rem;
    border: solid 1px var(--primary);
    color: var(--text_accent3);
    font-size: .8rem;
    flex-shrink: 1;
  }
  .lobby_login_btn button:first-child {
    background-color:transparent;
    color: var(--primary);
  }
  .home-page {
    height: 100%;
  }
  .lobby_nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .backTop {
    position: fixed;
    right: 0;
    bottom: 0;
  }
  .middle-right-nav {
    justify-content: space-between;
    display: flex;
    width: 50%;
    max-width: 50%;
  }
  @media (width <= 450px) {
    .section-content {
      padding: 0 1rem;
    }
  }
</style>
