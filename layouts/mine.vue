<template>
    <div class="mine-container">
        <slot></slot>
    </div>
</template>
<style>
    .mine-container {
        width: 100%;
        height: 100%;
        position: absolute; 
        background-color: #f0f0f0; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>