<template>
    <div class="center-wallet">
        <div class="walletHeader">
            <van-icon @click="useNavigationStore.routerBack" name="arrow-left"  />
            找回余额
        </div>
        <div class="walletBody">
            <div class="action_panel">
                <div class="walletAmount">
                    <div class="amount">
                        当前余额: 
                        <span  class="amountNumber">123</span>
                    </div>
                    <button class="defaultBtn" @click="showRetrieveToast">一键找回</button>
                </div>
                <div class="tips">
                    只能找回余额整数倍(即不含小数点)只能找回余额整数倍(即不含小数点)只能找回余额整数倍(即不含小数点)只能找回余额整数倍(即不含小数点)只能找回余额整数倍(即不含小数点)
                </div>
            </div>
            <div class="platformContent">
                <div class="gameType">
                    <div class="side-nav">
                        <div
                        v-for="(game, index) in gameInfoStore.gameType"
                        :key="game.type"
                        class="scroll-target"
                        @click=""
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
                <div class="gameList">
                    <div class="third_platform">
                        <div class="platform_name">
                            WG
                        </div>
                        <div class="my-hairline"></div>
                        <div class="platform_amount">
                            123
                        </div>
                    </div>
                    <div class="third_platform">
                        <div class="platform_name">
                            JILI
                        </div>
                        <div class="platform_amount">
                            123
                        </div>
                    </div>
                    <div class="third_platform">
                        <div class="platform_name">
                            WG
                        </div>
                        <div class="platform_amount">
                            123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGameInfo } from '~/stores/GameInfo'
import { useNavigation } from '~/stores/Navigation';
const useNavigationStore = useNavigation();
const gameInfoStore = useGameInfo();

    definePageMeta({
        layout: 'mine',
    });

    const showRetrieveToast = () => {
        showToast({
            message: '当前无可拉回余额',
            icon: 'warning',
        });
    }
</script>

<style scoped>
    .center-wallet {
        height: 100vh;
        width: 100%;
        background-color: var(--bg_1);
        overflow: hidden;
    }
    .walletHeader {
        padding: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 7vh;
        background-color: var(--bg_2);
        color:var(--lead);
        font-size: 1.2rem;
    }
    .center-wallet .van-icon {
        position: absolute;
        font-size: 1.3rem;
        left: .7rem;
        color: var(--neutral_1)
    }
    .walletBody {
        height: 94vh;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: .6rem;
    }
    .action_panel {
        padding: .9rem;
        background-color: var(--bg_2);
        border-radius: .5rem;
        color: var(--neutral_2);
    }
    .walletAmount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1rem;
    }
    .amount {
        text-align: start;
    }
    .tips {
        color: var(--neutral_2);
        font-size: .75rem;
        text-align: start;
        margin-top: .5rem;
    }
    .walletBody .defaultBtn {
        margin: 0;
    }
    .amountNumber {
        color: var(--accent_3);
    }
    .platformContent {
        display: flex;
        flex: 1;
    }
    .side-nav {
      margin-right: 1rem;
      overflow-y: auto;
      max-height: 100%; 
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
    .gameList {
        margin: 1.5vh 0;
        width: 100%;
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .7rem;
        align-content: start;
    }
    .third_platform {
        background-color: var(--bg_2);
        border-radius: .4rem;
        height: 4rem;
        display: flex;
        flex-direction: column;
    }
    .platform_name,.platform_amount {
        flex: 1;
        text-align: start;
        padding: .3rem;
    }
    .platform_name {
        font-size: .9rem;
        color: var(--lead);
    }
    .platform_amount {
        font-size: .8rem;
        color: var(--neutral_2);
    }
</style>
