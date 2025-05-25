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
      <van-tabs v-model:active="activeTab">
        <!-- 大类列表 -->
        <van-tab v-for="type in chargeTabOpition" 
        :title="type.chargeType"
        :key="type.chargeType"
        >
          <div class="merchantContent">
            <!-- 商户列表 -->
            <div class="merchantItem" 
            v-for="merchant in type.opition"
            :key="merchant.name"
            >
              <van-button icon="plus" 
              type="primary"
              plain hairline
              >
              {{ merchant.name }}</van-button>
            </div>
            <!-- 推荐金额 -->
            <!-- <div class="recommend">
              <div class="amount-btn" v-for="">
  
              </div>
            </div> -->
          </div>
        </van-tab>
      </van-tabs>

    </van-popup>
</template>
<script setup lang="ts">
    import { usePopup } from '@/stores/Popup';
    const popupStore = usePopup();
    const activeTab = ref(0)
    const chargeTabOpition = reactive([
      {
        chargeType:'在线充值', 
        opition: [
          {name: '支付宝', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: '微信转账', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: '银联扫码', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: '云闪付', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: 'K豆钱包', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]},
          {name: '波币钱包', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]},
          {name: 'QQ', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]},
        ], 
        realName:true, 
        tips:'请填写真实姓名', 
        amountInput: true, 
        badge: '213',
        icon:''
      }, 
      {
        chargeType:'数字货币', 
        opition: [
          {name: 'ETH', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: 'USDT', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: 'BTC', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: 'ERC-20', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}, 
          {name: 'No钱包USDT', icon:'', badge:'', recommend:[10, 20, 30, 50, 90]}
        ], 
        realName:true, 
        tips:'请填写真实姓名', 
        amountInput: true, 
        badge: '213',
        icon:''
      }, 
      {
        chargeType:'人工充值', 
        opition: [
          {name: '天天', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '雨柔', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '倪倪', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '精神小妹', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '甜甜奶心', icon:'', badge:'', recommend:[], customTip:''}
        ],  
        realName:false, 
        tips:'', 
        amountInput: false, 
        badge: '213',
        icon:''
      }, 
      {
        chargeType:'银商充值', 
        opition: [
          {name: '币行天下', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '速币通', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '虚拟币阁', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '星辰兑', icon:'', badge:'', recommend:[], customTip:''}, 
          {name: '数字方舟', icon:'', badge:'', recommend:[], customTip:''}
        ],  
        realName:false, 
        tips:'请联系商家获取专属充币账号', 
        amountInput: false, 
        badge: '213',
        icon:''
      }
    ])
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
  .merchantContent {
    display: flex;
    flex-wrap: wrap;
  }
  .header-service-recorder .van-icon {
    color: var(--lead);
    font-size: 1.3rem;
    padding: 1rem .6rem;
  }

</style>