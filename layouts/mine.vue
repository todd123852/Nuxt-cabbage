<template>
    <div class="mine-container">
        <slot></slot>
    </div>
</template>
<style scoped>
    .mine-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        position: absolute; 
        background-color: var(--bg_2); 
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>