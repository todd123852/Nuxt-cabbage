<template>
    <div class="myInfo">
        <section>
            <header>
                <div class="header-item">
                    <van-icon name="arrow-left" />
                    <div class="head-nav">
                        <div class="btnContainer" 
                        v-for="item in headerItem" :key="item.icon">
                            <div class="icon-box">
                                <van-icon :name="item.icon" :badge="item.badge" />
                            </div>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="memberInfo">
                    <div class="avator">图</div>
                </div>
            </header>
            <main>
                <div class="navCardContainer">
                    <nav>提现</nav>
                    <nav>充值</nav>
                    <nav>利息宝</nav>
                    <nav>公积金</nav>
                </div>
                <div class="vipContainer">
                    <div class="vipHead"></div>
                    <div class="vipProcess"></div>
                </div>
                <div class="menuList">
                    <van-cell
                    v-for="li in menu" :key="li.name"
                    id="menu-list"
                    :border="false"
                    :title="li.name" 
                    icon="location-o" 
                    arrow-direction="right"
                    is-link
                    >{{  }}</van-cell>
                </div>
            </main>
        </section>
    </div>
</template>
<script setup lang="ts">
import { useLayoutTransition } from '@/composable/usePageTransition';

  definePageMeta({
    layout: 'mine',
    layoutTransition: useLayoutTransition()
  })
    const headerItem = [
        {name:'客服', icon:'service', badge: '2'},
        {name:'消息中心', icon:'chat-o', badge: '99+'},
        {name:'个人资料', icon:'user', badge: ''},
    ];
    const menu = reactive([
        {name: '找回余额', to: ''},
        {name: '账户明细', to: ''},
        {name: '投注记录', to: ''},
        {name: '个人报表', to: ''},
        {name: '提现管理', to: ''},
        {name: '推广赚钱', to: ''},
        {name: '合作联营', to: ''},
        {name: '第三方担保与理赔', to: ''},
        {name: '个人资料', to: ''},
        {name: '安全中心', to: ''},
        {name: '找到我们', to: ''},
        {name: '选择语言', to: ''},
        {name: '常见问题', to: ''},
        {name: '有奖反馈', to: ''},
        {name: '登陆设备', to: ''},
        {name: '关于我们', to: ''},
        {name: '安全退出', to: ''},
    ])
</script>
<style scoped>
    .myInfo {
        width: 100%;
        height: 100vh;
    }
    header {
        width: 100%;
        height: 14vh;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .header-item .van-icon-arrow-left {
        position: absolute;
        font-size: 1.2rem;
        left: .3rem;
        top: .3rem;
    }
    main {
        width: 100%;
    }
    .header-item {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(126, 197, 135);
    }
    .head-nav {
        flex: 1;
        display: flex;
        justify-content: end;
        align-items: center;
    }
    .memberInfo {
        flex: 1;
        background-color: rgb(193, 166, 218);
    }
    .navCardContainer {
        height: 10vh;
        background-color: rgb(150, 192, 202);
    }
    .vipContainer {
        height: 10vh;
        background-color: rgb(126, 197, 135);
    }
    .menuList {
        background-color: rgb(233, 24, 59);
        color: var(--lead);
    }
    .btnContainer, .icon-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 1.8%;
        font-size: 1.4rem;
        min-width: 2.8rem;
        max-width: 2.8rem;
    }
    .btnContainer p{
        font-size: 0.6rem;
    }
</style>