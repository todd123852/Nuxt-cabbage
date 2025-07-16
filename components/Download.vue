<template>
    <Transition name="hide-download" @before-leave="handleAfterLeave">
        <div class="download" v-if="showDownload" >
            <van-icon class="closeBtn" name="cross" @click="showDownload=false" />
            <div class="downloadImg">放下载横幅的地方</div>
            <button class="downloadBtn" @click="showDownloadPop=true">立即下载</button>
            <van-popup v-model:show="showDownloadPop">
                <div class="download-dialog-content">
                    <div class="download-dialog-head">
                        <img class="app-icon" :src="appIcon" alt="">
                        <span>下载APP，送100万</span>
                    </div>
                    <div class="appTypeBtn">
                        <button v-for="app in appTypes" :key="app"
                        >
                        <i class="bi bi-android2"></i>
                        {{ app }}
                        </button>
                    </div>
                </div>
                <div class="close-dialog-Btn">
                    <van-icon name="close" @click="showDownloadPop = false" />
                </div>
            </van-popup>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import appIcon from '~/components/imges/Logo/app_Icon.png'
    const showDownload = ref(true);
    const showDownloadPop = ref(false);
    const emit = defineEmits(['download-closed']); // 通知父组件
    const appTypes = reactive(['极速版APP', '原生版APP', '快捷APP(PWA)', '桌面快捷'])
    // showDownload 状态false
    const handleAfterLeave = () => {        
        emit('download-closed', !showDownload.value); 
    };
</script>
<style scoped>
    .van-popup, .van-overlay{
        width: calc(100vh * 11 / 19.5);
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .download .van-popup {
        background-color: transparent;
        padding: 3.5rem 1rem;
        color: var(--lead);
    }
    .download-dialog-content {        
        width: 100%;
        height: 100%;
        background-color: var(--bg_2);
        border-radius: 1rem;
        padding: 1rem;
        border: 1px solid var(--border);
    }
    .download-dialog-head {
        display: flex;
        align-items: center;
    }
    .close-dialog-Btn {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
        font-size: 2rem;
    }
    .app-icon {
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
    }
    .appTypeBtn{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .appTypeBtn button {
        width: 48%;
        height: 2.5rem;
        border-radius: .5rem;
        margin-top: 1rem;
        color: var(--text_accent3);
    }
    .appTypeBtn button:nth-child(odd) {
        border: 1px solid var(--primary);
        background-color: transparent;
        color: var(--primary);
    }
    .download {
        height: 4.5vh;
        background-color: var(--lead);
        position:relative;
        line-height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between; 
        padding: .3rem .5rem;
        box-sizing:border-box;
        flex-shrink: 1;
        color:red;
    }
    .downloadBtn {
        height:100%;
        width:5rem;
        border-radius:.3rem;
        background-color: rgb(254, 0, 224);
        font-size:.8rem;
        cursor:pointer;
    }
    .closeBtn {
        color:rgb(254, 0, 224);
        font-size:1.3rem;
    }
    .hide-download-enter-active,
    .hide-download-leave-active {
        transition: all .4s ease;
    }
    .hide-download-enter-from,
    .hide-download-leave-to {
        transform: translateY(-100%);
    }

</style>