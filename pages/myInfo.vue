<template>
    <div class="myInfo" :style="{ backgroundImage: `url(${lobby_Img})`}">
        <section>
            <header>
                <div class="header-item">
                    <van-icon name="arrow-left" 
                    @click="useNavigationStore.routerBack()" 
                    />
                    <div class="head-nav">
                        <div class="btnContainer" 
                        v-for="item in headerItem" :key="item.icon"
                        @click="typeof item.action === 'function' && item.action()"
                        >
                            <span>
                                <van-icon :name="item.icon" :badge="item.badge" />
                            </span>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="afterLoginContent" v-if="useLoginRegistStore.isLogin">
                    <div class="userAvator" :style="{backgroundImage:`url(${avator1})`}"
                    @click="navigateTo('/profile')"
                    >
                    </div>
                    <DisplayInfo />
                </div>
                <div class="beforeLoginContent" v-else>
                    <div class="visitorAvator"
                    :style="{ backgroundImage: `url(${visitorImg})` }"
                    ></div>
                    <div class="login_regist_link">
                        <span>请先</span>
                        <NuxtLink to="/login">登录</NuxtLink>
                        <span>或</span>
                        <NuxtLink to="/regist">注册</NuxtLink>
                    </div>
                    <div class="login_regist_btn">
                        <button @click="()=>navigateTo('/login')">登陆</button>
                        <button @click="()=>navigateTo('/regist')">注册</button>
                    </div>
                </div>
            </header>
            <main>
                <div class="navCardContainer">
                    <nav v-for="nav in navCards" 
                    :key="nav.name" 
                    @click="typeof nav.action === 'function' && nav.action()"
                    >
                        <van-icon :name="nav.icon" />
                        <p>{{ nav.name }}</p>
                    </nav>
                </div>
                <div class="vipContainer" v-if="useLoginRegistStore.isLogin">
                    <div class="vipHead">
                        <span>距离<i>VIP1</i>还需投注<b>2.00</b></span>
                        <van-icon name="arrow-right"  />
                    </div>
                    <div class="vipProcess">
                        <div class="vip-icon"></div>
                        <span>晋级再充值</span>
                        <span>晋级再投注</span>
                    </div>
                </div>
                <div class="menuList">
                    <van-cell
                    class="menu-nav"
                    v-for="li in menu.slice(0, menuWithOrWithoutLogout)" :key="li.name"
                    :border="false"
                    :title="li.name" 
                    icon="location-o" 
                    arrow-direction="right"
                    @click="li.action ? li.action() : null;"
                    is-link
                    ></van-cell>
                </div>
            </main>
        </section>
    </div>
</template>
<script setup lang="ts">
import { usePopup } from '@/stores/Popup';
import { useLayoutTransitionStore } from '@/stores/layoutTransition';
import { useEventPage } from '~/stores/EventPage';
import { useLobbyPop } from '#imports';
import { useLoginRegist } from '~/stores/loginRegist';
import { useNavigation } from '~/stores/Navigation';
import visitorImg from '@/components/imges/visitor_avator.avif'
import lobby_Img from '@/components/imges/style_1_topbg_yd.avif'
import avator1 from '~/components/imges/avators/avator1.png'
    const useNavigationStore = useNavigation();
    const useLobbyPopStore = useLobbyPop();
    const useLoginRegistStore = useLoginRegist();
    const layoutTransitionStore = useLayoutTransitionStore();
    const popupStore = usePopup();
    const eventPageStore = useEventPage();
    const router = useRouter();
    definePageMeta({
        layout: 'mine', 
    });
    const chargeAction = () => popupStore.chargePop = true;
    const providentFund = () => {
        eventPageStore.page = 1;
        navigateTo('/interest');
    }

    const navCards = reactive([
        {name: '提现', icon: 'card', action:''},
        {name: '充值', icon: 'coupon', action: chargeAction},
        {name: '公积金', icon: 'cash-back-record', action: providentFund},
        {name: '利息宝', icon: 'discount', action: providentFund},
    ])
    const profileSetting = () => navigateTo('/profile')
    const contactService = () => window.open('https://t.me/mmisharkk', '_blank', 'noopener,noreferrer')
    const headerItem = [
        {name:'客服', icon:'service', badge: '2', action: contactService},
        {name:'消息中心', icon:'chat-o', badge: '99+', action: ''},
        {name:'个人资料', icon:'user', badge: '', action: profileSetting},
    ];
    const toWallet = () => navigateTo('/center-wallet');
    const selectLanguge = () => useLobbyPopStore.languagePop = true;
    const signout = () => useLobbyPopStore.logoutPop = true;
    const menu = reactive([
        {name: '找回余额', action: toWallet},
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
        {name: '选择语言', to: '', action: selectLanguge},
        {name: '常见问题', to: ''},
        {name: '有奖反馈', to: ''},
        {name: '登陆设备', to: ''},
        {name: '关于我们', to: ''},
        {name: '安全退出', to: '', action: signout},
    ])
    const menuWithOrWithoutLogout = computed(() => useLoginRegistStore.isLogin ? menu.length : -1)
</script>
<style scoped>
    .myInfo {
        width: 100%;
        height: 100vh;
        position: relative;
        background-color: var(--home_bg);
        background-size: 100% 35%;
        background-repeat: no-repeat;
        padding: 0 1rem;
    }
    section {
        height: 100%;
    }
    .myInfo .van-icon {
        color: var(--primary);
    }
    header {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 1.5rem;
    }
    .header-item {
        display: flex;
        justify-content: end;
        align-items: center;
        color: var(--lead);
    }
    .myInfo .header-item .van-icon-arrow-left {
        position: absolute;
        font-size: 1.2rem;
        left: .5rem;
        top: 3rem;
        margin: 0;
    }
    .header-item .van-icon {
        font-size: 1.2rem;
        margin-top: 1.8rem;
    }
    main {
        width: 100%;
    }
    .head-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 35%;
    }
    .avator {
        height: 3rem;
        width: 3rem;
        border-radius: 100%;
        background-color: orange;
    }
    .visitorAvator {
        height: 3.2rem;
        width: 3.2rem;
        border-radius: 10%;
        background-size: 100%;
    }
    .beforeLoginContent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .7rem ;
        width: 100%;
    }
    .login_regist_link {
        font-weight: 600;
    }
    .login_regist_link span {
        color: var(--neutral_1);
    }
    .login_regist_link a{
        color: var(--lead);
        cursor: pointer;
        margin: 0 .5rem;
    }
    .login_regist_btn {
        width: 38%;
        display: flex;
        justify-content: space-between;
    }
    .login_regist_btn button {
        height: 2rem;
        width: 47%;
        border-radius: 13%;
        font-size: .8rem;
        border: solid .1rem var(--primary);
        cursor: pointer;
    }
    .login_regist_btn button:first-child {
        color: var(--text_accent3);
        background-color: var(--primary);
    }
    .login_regist_btn button:last-child {
        color: var(--primary);
        background-color: transparent
    }
    .navCardContainer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 1rem;
    }
    .navCardContainer p {
        font-size: .8rem;
        color: var(--lead);
    }
    .navCardContainer .van-icon {
        font-size: 2rem;
    }
    .vipContainer {
        width: 100%;
        background-color: var(--primary);
        padding: 1.5rem;
        border-radius: .8rem;
        color: var(--text_accent3);
    }
    .vipContainer .van-icon {
        color: var(--text_accent3);
    }
    .vip-icon {
        width: 3rem;
    }
    .menuList {
        background-color: transparent;
        color: var(--lead);
    }
    .menu-nav {
        cursor: pointer;
    }
    .btnContainer p{
        font-size: 0.6rem;
    }

    .userAvator {
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        background-size: 100%;
        background-color: aliceblue;
        margin-right: 1rem;
    }
    .afterLoginContent {
        display: flex;
        margin-bottom: 1rem;
    }
</style>