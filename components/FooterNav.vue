<template>
    <div class="footer-nav">
        <div class="nav-content">
            <!-- 底部导航 -->
            <van-tabbar route :border="false">
                <van-tabbar-item 
                v-for="nav in navData"
                :key="nav.name"
                :to="nav.url" 
                :icon="nav.icon"
                active-color="#f8be20"
                @click="showWindow(nav.charge)"
                >{{ nav.name }}</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<script setup>
import { usePopup } from '@/stores/Popup';
const popupStore = usePopup();
    function showWindow(open) {
        if (open) {
            popupStore.chargePop = true
        }
    }
    const navData = reactive([
        {logoImg: 11, url: '/', name: '首页', icon: 'home-o', charge: false},
        {logoImg: 11, url: '', name: '充值', icon: 'pending-payment', charge: true},
        {logoImg: 22, url: '/event', name: '优惠', icon: 'point-gift-o', charge: false},
        {logoImg: 22, url: '/regist', name: '注册', icon: 'friends', charge: false},
        {logoImg: 33, url: '/myInfo', name: '我的', icon: 'user-o', charge: false},
    ])
</script>

<style>
  :root:root {
    --van-tabbar-background: var(--skin__web_btmnav_db);
    --van-tabbar-item-active-color: var(--text_primary);
    --van-tabbar-height	: 9vh;
    --van-tabbar-item-active-background:var(--skin__web_btmnav_db);
    --van-tabbar-item-icon-size: 4vh;
    --van-tabbar-item-font-size: 1rem;
    --van-tabbar-item-icon-margin-bottom: 0.5rem;
    --van-tabbar--fixed-position:reactive;
  }
    .footer-nav .nav-content .van-tabbar-item--active {
        color: var(--primary);
    }
    .nav-content {
        background-color: var(--skin__web_btmnav_db);
    }
    .nav-content .van-tabbar-item__icon {
        margin: 0;
    }
    .footer-nav {
        position: relative;
        height: 100%;
    }
    .footer-nav .van-tabbar-item {
        color: var(--lead);
    }
    .nav-content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .nav-content a {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>