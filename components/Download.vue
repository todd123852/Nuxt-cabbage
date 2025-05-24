<template>
    <div class="head-content" ref="head">
        <div class="download">
            <button @click="hideDownload">X</button>
        </div>
        <div class="search-content">
            <button @click="sDownload">123</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    const showDownload = ref(true)
    const head = ref(null);
    function sDownload() {
        if (head.value) {
            showDownload.value = true;
            (head.value as HTMLElement).style.transform = 'translateY(0)'
        }
    }
    function hideDownload() {
        if (head.value) {
            showDownload.value = false;
            (head.value as HTMLElement).style.transform = 'translateY(-100%)'
        }
    }
</script>
<style scoped>
    button {
        width: 20%;
    }
    .head-content {
        position: sticky;
        top: 0;
        height: 5%;
        transition: all 0.3s ease-out;
    }
    .search-content {
        background-color: blueviolet;
        transition: all 0.3s ease-out;
    }
    .download {
        background-color: aqua;
    }
    .hide-download-enter-active,
    .hide-download-leave-active {
        transition: all 0.4s;
    }
    .hide-download-enter-from,
    .hide-download-leave-to {
        transform: translateY(-100%); 
    }

</style>