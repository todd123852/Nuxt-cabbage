<template>
    <Transition name="hide-download" @before-leave="handleAfterLeave">
        <div class="download" v-if="showDownload">
            <span class="closeBtn" @click="showDownload=false">X</span>
            <div class="downloadImg">放下载横幅的地方</div>
            <button class="downloadBtn">立即下载</button>
        </div>
    </Transition>
</template>
<script setup lang="ts">
    const showDownload = ref(true);
    const emit = defineEmits(['download-closed']); // 通知父组件
    // showDownload 状态false
    const handleAfterLeave = () => {        
        emit('download-closed', !showDownload.value); 
    };
</script>
<style scoped>
    button {
        width: 20%;
    }
    .download {
        height: 4.5vh;
        background-color: aqua;
        transition: all .3s ease;
    }
    .hide-download-enter-active,
    .hide-download-leave-active {
        transition: all 0.3s;
    }
    .hide-download-enter-from,
    .hide-download-leave-to {
        transform: translateY(-100%);
        height: 0;
    }

</style>