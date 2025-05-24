<template>
  <span>
    <slot></slot>
    <span>{{ count }}</span>
  </span>
</template>

<script setup>
    const count = ref(1) 
</script>

<style>

</style>