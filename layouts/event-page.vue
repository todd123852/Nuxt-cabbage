<template>
    <div class="event-page">
        <header>
            <div class="event-nav">
                <div class="nav-header">
                    <div class="event-header-arrow">
                        <van-icon name="arrow-left"
                        @click="() => navigateTo(layoutTransitionStore.fromPath)" />
                    </div>
                    <van-tabs v-model:active="active">
                        <van-tab v-for="type in discountTypes" :title="type" :key="type">
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="my-hairline"></div>
            </div>
        </header>
        <section>
            <slot></slot>
        </section>
    </div>
</template>
<script setup lang="ts">
import { useLayoutTransitionStore } from '@/stores/layoutTransition'; 
const layoutTransitionStore = useLayoutTransitionStore();

    const discountTypes = reactive(['活动', '利息宝', '公积金', '任务', 'VIP', '待领取', '领取记录', '自定义的看你想说什么'])
    const active = ref(0)
</script>
<style scoped>
    .event-page {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 91vh;
        box-sizing: border-box;
        background-color: var(--bg_1);
    }
    header {
        position: relative;
        width: 100%;
        height: 7.5%;
        background-color: var(--bg_2);
    }
    section {
        width: 100%;
        height: 92.5%;
    }
    .bottom-line::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        /* height: 1rem; */
        border-bottom: 3rem;
        border-color: rgb(11, 12, 12);
    }
    .event-nav {
        width: 100%;
    }
    .nav-header {
        display: flex;
    }
    .event-header-arrow {
        padding: .8rem 1rem 1rem 0.5rem;
        color: var(--leftnav_active);
    }
</style>