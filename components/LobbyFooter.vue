<template>
    <div class="lobby_footer">
        <div class="lobby_footer_nav">
            <div class="nav_tittle" v-for="navTittle in lobbyFooterNavs" :key="navTittle.tittle">
                <div class="tittleText">{{ navTittle.tittle }}</div>
                <div v-for="item in navTittle.subNav" :key="item.name">{{ item.name }}</div>
            </div>
        </div>
        <div class="my-hairline"></div>
        <div class="lobby_footer_contact">
            <p>联系我们</p>
            <div class="contactIcon">
                <a v-for="(item, index) in contactIcons" :key="index" :href="item.link" target="_blank">
                    <div class="contactLink">
                        <img :src="item.icon" alt="">
                    </div>
                </a>
            </div>
            <p>官方频道</p>
            <div class="contactIcon">
                <a v-for="(item, index) in channel" :key="index" :href="item.link" target="_blank">
                    <div class="contactLink">
                        <img :src="item.icon" alt="">
                    </div>
                </a>
            </div>
        </div>
        <div class="my-hairline"></div>
        <div class="companyIntroduction">
            说点什么吧
        </div>
        <div class="partnerLogo">

        </div>
        <div class="copyright">
            <p>Copyright &copy; Cabbage Website. All rights reserved by Hotto.</p>
        </div>
    </div>    
</template>
<script setup lang="ts">
    import telegram from '~/components/imges/contactIcon/telegram.avif'
    import LINE from '~/components/imges/contactIcon/LINE.avif'
    import Facebook from '~/components/imges/contactIcon/Facebook.avif'
    import WhtasApp from '~/components/imges/contactIcon/WhtasApp.avif'
    import TGTV from '~/components/imges/contactIcon/TGTV.avif'
    import eighteenplus from '~/components/imges/contactIcon/18plus.avif'
    const lobbyFooterNavs = reactive([
        {tittle:'娱乐城', subNav:[
            {name:'任务', route:''},
            {name:'返水', route:''},
            {name:'待领取', route:''},
            {name:'VIP', route:''},
            {name:'推广赚钱', route:''},
            {name:'活动', route:''},
            {name:'盲盒抽奖', route:''},
            {name:'', route:''},
        ]},
        {tittle:'游戏', subNav:[
            {name:'热门', route:''},
            {name:'捕鱼', route:''},
            {name:'区块链', route:''},
            {name:'棋牌', route:''},
            {name:'电子', route:''},
            {name:'真人', route:''},
            {name:'试玩', route:''},
        ]},
        {tittle:'支持', subNav:[
            {name:'在线客服', route:''},
            {name:'帮助中心', route:''},
            {name:'有奖反馈', route:''},
        ]},
    ])
    const contactIcons = reactive([
        {icon: telegram, link: 'https://telegram.me/mmisharkk'},
        {icon: LINE, link: 'https://line.me/R/ti/p/mmisharkk'},
        {icon: Facebook, link: 'https://www.facebook.com/mmisharkk'},
        {icon: WhtasApp, link: 'https://api.whatsapp.com/send?phone=123'},
    ])
    const channel = reactive([
        {icon: TGTV, link: ''}
    ])
</script>
<style scoped>
    .lobby_footer {
        padding: 1rem 0;
        width: 100%;
    }
    .lobby_footer_nav {
        display: flex;
        padding: 1rem 0;
    }
    .nav_tittle {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        line-height: 2rem;
    }
    .nav_tittle div {
    }
    .nav_tittle div:first-child {
        color: var(--neutral_2);
    }
    .nav_tittle div:nth-child(n+2) {
        color: var(--neutral_1);
        cursor: pointer;
    }
    .lobby_footer_contact {
        text-align: start;
        color:var(--neutral_2);
        padding-bottom: 1rem;
    }
    .lobby_footer_contact p {
        text-align: start;
        line-height: 3rem;
    }
    .contactIcon {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
    }
    .lobby_footer_contact img {
        width: 2.7rem;
        height: 2.7rem;
    }
</style>