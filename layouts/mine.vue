<template>
    <div class="mine-container" @scroll="usePopoverCloseStore.displayAccountPopover = false">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
    import { usePopoverClose } from '~/stores/PopoverClose';
    const usePopoverCloseStore = usePopoverClose();
</script>
<style scoped>
    .mine-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: absolute; 
        background-color: var(--home_bg); 
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>