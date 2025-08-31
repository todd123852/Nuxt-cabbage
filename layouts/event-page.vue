<template>
    <div class="event-page">
        <header>
            <div class="event-nav">
                <div class="nav-header">
                    <div class="event-header-arrow">
                        <van-icon name="arrow-left"
                        @click="useNavigationStore.routerBack" />
                    </div>
                    <van-tabs :active="currentTab" 
                    :before-change="beforeChange"
                    :ellipsis="false"
                    >
                        <van-tab 
                        v-for="type in discountTypes" 
                        :title="type.name" :key="type.name"
                        >
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
import { useEventPage } from '~/stores/EventPage';
import { useNavigation } from '~/stores/Navigation';
const useNavigationStore = useNavigation();
const eventPageStore = useEventPage();
const layoutTransitionStore = useLayoutTransitionStore();
    const route = useRoute();
    const discountTypes = reactive([
        {name: '活动', route: '/event'},
        {name: '利息宝', route: '/interest'},
        // {name: '返水', route: '/interest'},
        // {name: '公积金', route: ''},
        // {name: '任务', route: ''},
        // {name: 'VIP', route: ''},
        // {name: '待领取', route: ''},
        // {name: '领取记录', route: ''},
        {name: '自定义的看你想说什么', route: ''},
    ])
    const beforeChange = (index:number) => {
        navigateTo(discountTypes[index].route);
        active.value = index;
        // 返回 Promise 来执行异步逻辑
        return true
    }
      // 控制TAB标签页
    const currentTab = computed(() => {
        const eventPath = route.path.split('/')[1];        
        const pathIndex = discountTypes.findIndex((type, index) => type.route.includes(eventPath))
        return pathIndex || 0
    });    
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
        background-color: var(--home_bg);
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