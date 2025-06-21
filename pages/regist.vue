<template>
    <div>
        <h1>注册页</h1>
    </div>
</template>
<script setup lang="ts">
import { useLayoutTransition } from '@/composable/usePageTransition';

  definePageMeta({
    layout: 'login-regist',
    layoutTransition: useLayoutTransition()
  })
</script>
<style scoped>

</style>