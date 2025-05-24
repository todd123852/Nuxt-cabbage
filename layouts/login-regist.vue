<template>
    <div class="regist-login">
      <div class="container">
        <header>
          <NuxtLink to="/">ᐸ</NuxtLink>
          <h1>欢迎来到注册/登陆页</h1>
          <div>
            <NuxtLink to="/login">登陆</NuxtLink>
            <NuxtLink to="/regist">注册</NuxtLink>
          </div>
        </header>
        <main>
          <slot></slot>
        </main>
      </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
  .regist-login {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  header {
    height: 20vh;
    background-color: blue;
  }
  main {
    height: 80vh;
    background-color: aqua;
  }
</style>