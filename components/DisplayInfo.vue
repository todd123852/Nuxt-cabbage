<template>
    <div class="displayContent">
        <div class="displayAccount">
            <van-popover v-model:show="usePopoverCloseStore.displayAccountPopover" 
            :show-arrow="false"
            placement="bottom-start"
            style="border: 1px solid var(--border);"
            >
                <p class="popTittle">默认展示名称</p>
                <div class="infoItem" v-for="(item, index) in useLoginRegistStore.userInfos" :key="item.key" 
                :class="{activeItem: index === activeDisplayItem}"
                @click="selectFn(index)"
                >
                    <i class="bi" :class="item.icon"></i>
                    <p>{{ item.text }}</p>
                </div>
                <template #reference>
                    <div class="selectControl" :class="{activeArrow: usePopoverCloseStore.displayAccountPopover}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                </template>
            </van-popover>
            <div class="info">{{ useLoginRegistStore.userInfos[activeDisplayItem].text }}</div>
            <div class="copyBtn" @click="copyToClickBoard">
                <i class="bi bi-copy"></i>
            </div>
        </div>
        <div class="displayAmount">
            <img :src="cny" alt="">
            <NuxtLink 
            class="amount" 
            to="/center-wallet"
            >{{ freshingAmount ? '加载中' : useLobbyStore.amount.toFixed(2) }}
            </NuxtLink>
            <div class="fresh" :class="{freshing: freshingAmount}" @click="refreshAmount">
                <i class="bi bi-arrow-repeat"></i>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import cny from '~/components/imges/currencyIcon/CNY.jpg'
    import { useLobby } from "~/stores/Lobby";
    import { useLoginRegist } from '~/stores/loginRegist';
    import { usePopoverClose } from '~/stores/PopoverClose';
    const usePopoverCloseStore = usePopoverClose();
    const useLoginRegistStore = useLoginRegist();
    const useLobbyStore = useLobby();
    const freshingAmount = ref<boolean>(false);
    const activeDisplayItem = ref<number>(0);
    const refreshAmount = () => {
        try {
            freshingAmount.value = true;
            setTimeout(() => {
                console.log('模拟从后端拿数据');
                freshingAmount.value = false
            }, 1000)
        } catch (error) {
            console.log('获取账户余额失败');
        }
    }
    const selectFn = (index:number) => {
        activeDisplayItem.value = index;
        usePopoverCloseStore.displayAccountPopover = false;
    }
    const copyToClickBoard = async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(useLoginRegistStore.userInfos[activeDisplayItem.value].text);
            showToast({
                message: '复制成功',
                icon: 'checked',
            });
        } catch (err) {
            showToast({
                message: '重新复制看看呢!',
                icon: 'error',
            });
        }
    }
</script>
<style scoped>
* {
    font-size: .9rem; 
}
    .displayContent {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .displayAccount, .displayAmount{
        color: var(--border);
        display: flex;
        align-items: center;
        min-width: 0;
    }

    .infoItem {
        color: var(--border);
        display: flex;
        align-items: center;
    }
    .infoItem.activeItem {
        color: var(--primary);
    }
    .infoItem .bi {
        margin-right: .7rem;
        font-size: 1.5rem;
    }
    .popTittle {
        color: var(--lead);
        margin: 1rem;
        width: 13rem;
        text-align: start;
    }
    .displayAmount {
        margin-top: .3rem;
        border-radius: 1rem;
        border: solid 1px var(--border);
        color: var(--accent_3);
        height: 1.5rem;
    }

    .displayName {
        font-size: 1rem;
    }
    .infoItem {
        margin: 1rem;
        font-size: 1rem;
        color: var(--neutral_2);
        text-align: start;
    }

    .displayContent svg {
        transform: translateY(0);
        font-size: .7rem;
    }
    .selectControl {
        color: var(--neutral_2);
        transition: all .5s ease;
        transform-origin: center; 
    }
    .selectControl.activeArrow {
        transform: rotate(180deg);
    }
    .bi-caret-down-fill {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
    }
    .copyBtn {
        color: var(--primary);
    }
    .bi-caret-down-fill, .bi-copy {
        cursor: pointer;
    }
    .info {
        color: var(--lead);
        margin: 0 .4rem;
    }
    .displayAmount img {
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 100%;
        transform: translateX(-.2rem);
        z-index: 2;
    }
    .van-popover__content {
        width: 8rem;
        max-width: 8rem;
        overflow: hidden;
        border: 1px solid var(--border);
    }
    .amount {
        font-size: 1rem;
        color: var(--accent_3);
        text-decoration: underline;
        margin: 0 .2rem;
        cursor: pointer;
    }
    .fresh .bi{
        font-size: 1.3rem;
        cursor: pointer;
    }
    .freshing {
        animation: spin .2s infinite;
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>