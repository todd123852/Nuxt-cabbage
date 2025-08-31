<template>
    <div class="popsContent">
        <!-- 语言选择弹窗 -->
        <van-popup 
        v-model:show="useLobbyPopStore.languagePop" 
        :close-on-click-overlay="false"
        class="language_pop"
        ref="languagePop"
        >
            <div class="language-content">
                <p class="language-tittle">选择语言</p>
                <div class="my-hairline"></div>
                <div class="languageMenu">
                    <div v-for="(language, index) in useLobbyPopStore.languges" :key="language" 
                    class="language-item"
                    @click="useLobbyPopStore.activeLanguge = language"
                    >
                        <span>{{ language }}</span>
                        <van-icon name="circle" v-if="language !== useLobbyPopStore.activeLanguge" />
                        <van-icon name="checked" v-else="language === useLobbyPopStore.activeLanguge" />
                        <div>
                            <div class="my-hairline" v-if="index !== useLobbyPopStore.languges.length - 1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close-dialog-Btn">
                <van-icon name="close" @click="useLobbyPopStore.languagePop = false" />
            </div>
        </van-popup>
        <van-popup v-model:show="useLobbyPopStore.logoutPop" class="logout_pop">
            <div class="logout_pop-content">
                <p class="logout_pop_tittle">温馨提示</p>
                <div class="logout_pop_text">
                    <p>是否退出当前账号</p>
                </div>
                <div class="logout_pop_btn">
                    <button @click="signout">确认退出</button>
                    <button @click="useLobbyPopStore.logoutPop = false">我点错了</button>
                </div>
            </div>
            <div class="close-dialog-Btn">
                <van-icon name="close" @click="useLobbyPopStore.logoutPop = false" />
            </div>
        </van-popup>
    </div>
</template>
<script setup lang="ts">
import { useLobbyPop } from '~/stores/lobbyPop';
const useLobbyPopStore = useLobbyPop();
const signout = () => {
    useLobbyPopStore.logoutPop = false;
    useLobbyPopStore.logout();
}
</script>

<style scoped>
@import '~/components/styles/langugePop';
@import '~/components/styles/logoutPop';
.popsContent {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>