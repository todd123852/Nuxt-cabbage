<template>
    <van-popup
      v-model:show="popupStore.chargePop"
      position="bottom"
      closeable
      round
      close-icon-position="top-left"
      close-icon="arrow-left"
      :close-on-click-overlay = false
    >
      <div class="charge-header">
        <span></span>
        <p class="charge-tittle">充值</p>
        <div class="header-service-recorder">
          <van-icon name="service-o" />
          <van-icon name="balance-list-o" />
        </div>
      </div>
    
    </van-popup>
</template>
<script setup lang="ts">
    import { usePopup } from '@/stores/Popup';
    const popupStore = usePopup();
</script>
<style lang="css" scoped>
:root:root {
  --van-popup-close-icon-margin: 1rem 1rem;
}
  .charge-tittle {
    font-size: 1.3rem;
    color: var(--lead);
    position: absolute;
    right: 0;
    left: 0;
    margin: 0 auto;
    top: 1rem;
  }
  .van-popup {
    background-color: var(--bg_2);
    padding: .2rem;
  }
  .charge-header {
    display: flex;
    justify-content: space-between;
    height: 3rem;
  }
  .header-service-recorder {
    
  }
  .header-service-recorder .van-icon {
    color: var(--lead);
    font-size: 1.3rem;
    padding: 1rem .6rem;
  }

</style>