<template>
    <div class="login-page">
        <h1>登录页</h1>
    </div>
</template>
<script setup lang="ts">
import { useLayoutTransition } from '@/composable/usePageTransition';
const route = useRoute();

  definePageMeta({
    layout: 'login-regist',
    layoutTransition: useLayoutTransition()
  })
</script>

<style scoped>
    .login-page {
        width: 100%;
        height: 100%;
        position: absolute;
        background: #e29c9c;
    }
</style>
