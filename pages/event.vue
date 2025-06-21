<template>
    <div class="event-container">
        <h1>优惠页优惠页优惠页优惠页优惠页优惠页</h1>
    </div>
</template>

<script setup lang="ts">
import { useLayoutTransition  } from '@/composable/usePageTransition';

  definePageMeta({
    layout: 'event-page',
    layoutTransition: useLayoutTransition()
  })
</script>
<style>
    .event-container {
        position: absolute;
        height: 100%;
        width: 100%;
    }

</style>