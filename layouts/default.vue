<template>
  <div class="fixed-width-layout">
    <div class="container">
      <section class="section-content">
        <header ref="page">
          <div class="head-content">
            <div class="download">
              <span @click="hideDownload" class="closeBtn">X</span>
              <div class="downloadImg">放下载横幅的地方</div>
              <button class="downloadBtn">立即下载</button>
            </div>
            <div class="search-content">
              <img src="../components/imges/logo.png" alt="">
              <button @click="sDownload">123</button>
            </div>
          </div>
        </header>
        <main>
          <slot></slot>
        </main>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
    
    const showDownload = ref(true)
    const page = ref(null);
    function sDownload() {
      if (page.value) {
        showDownload.value = true;
        (page.value as HTMLElement).classList.remove('hideDownload')
      }
    }
    function hideDownload() {
      if (page.value) {
        showDownload.value = false;
        (page.value as HTMLElement).classList.add('hideDownload')
      }
    }
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: inherit;
  scrollbar-width: 0;
}
.section-content {
  padding-top: 4.5vh;
}
  .header-trans-enter-active,
  .header-trans-leave-active {
    transition: all 0.3s ease;
  }
  .header-trans-enter-from,
  .header-trans-leave-to {
    transform: translateY(-100%); 
  }
  .fixed-width-layout {
    display: flex;
    justify-content: center; 
    position: relative;
    box-sizing: border-box;
  }
  header{
    position: fixed;
    right: 50%;
    transform: translateX(50%);
    width: calc(100vh * 11 / 19.5);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #0a0a0a;
    border: none;
    flex-grow: 1;
  }
  main {
    overflow-y: auto;
    background-color: #0000;
    padding-top: 9vh;
    transition: padding 0.3s ease;
  }
  .hideDownload+main {
    padding-top: 4.5vh;
  }
  header {
    top: 0;
    z-index: 2;
    transition: transform 0.3s ease;
    background-color: #1a1a1a;
    overflow-x: hidden;
  }
  header.hideDownload {
    transform: translateY(-4.5vh) translateX(50%);
  }
  .container {
    width: 100%;
  }
  .closeBtn {
    margin: 0 2%;
    cursor: pointer;
    font-weight: 600;
    line-height: 0;
  }
  .head-content {
    width: 100vw;
    padding-bottom: 1%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1%;
    box-sizing: border-box;
    background-color: #1a1a1a;
  }
  .head-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 0.1vh;
    width: 100%;
    background: linear-gradient(to bottom, transparent 49.5%, rgba(255, 255, 255, 0.411) 50.5%);
  }
  .search-content {
    flex-grow: 1;
    height: 7.5vh;
    flex-grow: 1;
    padding: 3.5% 1% 1% 2%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search-content img {
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }
  .download {
    height: 4.5vh;
    line-height: 0;
    display: flex;
    flex-grow: 1;
    align-items: center;
    background-color: rgb(98, 202, 243);
    padding: 0 1%;
  }
  .downloadBtn{
    flex: 3;
    height: 3vh;
    padding: 1% 1.5%;
    border: none;
    border-radius: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-size: 1.5vh;
  }
  .closeBtn{
    flex: 1;
  }
  .downloadImg{
    flex: 15;
  }

</style>