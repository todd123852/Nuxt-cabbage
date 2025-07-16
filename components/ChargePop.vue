<template>
    <van-popup
      v-model:show="popupStore.chargePop"
      position="bottom"
      closeable
      round
      close-icon-position="top-left"
      close-icon="arrow-left"
      :close-on-click-overlay = false
      class="chargePop"
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
        <van-tab v-for="(type, typeIndex) in chargeTabOpition" 
        :title="type.chargeType"
        :key="type.chargeType"
        >
        
          <div class="merchantContent">
            <!-- 商户列表 -->
            <div class="merchantItem" 
            v-for="(merchant, merchantIndex) in type.opition"
            :key="merchant.name"
            >
              <van-button :icon="merchant.icon"
              type="primary"
              plain hairline
              :style="activeBtn === merchantIndex ? 'border-color: #D1AE52; color: #D1AE52' : ''"
              @click="selectMerchant(typeIndex, merchantIndex)"
              >
              {{ merchant.name }}</van-button>
            </div>
          </div>
          <div class="my-hairline"></div>
          <!-- 推荐金额 -->
          <p class="recommendTittle" v-show="currentRecommend.length > 0">充值金额</p>
          <div class="recommend">
            <div class="amount-btn" 
            v-for="(amount, amountIndex) in currentRecommend"
            >
              <van-button
                type="primary"
                plain hairline
                :style="activeAmount === amountIndex ? 'border-color: #D1AE52; color: #D1AE52' : ''"
                @click="selectAmount(amount, amountIndex)"
                >
                {{ amount }}</van-button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="field-content">
        <van-field
          @focus="fieldFocus = true"
          @blur="fieldFocus = false"
          :class="{'field-focus':fieldFocus}"
          v-model="amountInput"
          label-width="1rem"
          clearable
          label="￥"
          placeholder="最小50-最大1000"
        />
      </div>
      <div class="chargeTips">温馨提醒: 充就充大的，别墅住大的</div>
      <van-button type="primary" id="submitCharge">立即充值</van-button>
      <!-- <van-loading id="charge-loading" size="4rem" /> -->
    </van-popup>
</template>
<script setup lang="ts">
    import { usePopup } from '@/stores/Popup';
    const popupStore = usePopup();
    const activeTab = ref(0) // Tab高亮
    const activeBtn = ref(0) // 商户高亮
    const amountInput = ref('') // 输入金额
    const activeAmount = ref<number | null>(null) // 推荐金额高亮
    const chargeTabOpition = popupStore.chargeData
    // 选中的商户
    const activeMerchant: any = computed(() => {
      const currentType = chargeTabOpition[activeTab.value];
      if (currentType && currentType.opition[activeBtn.value]) {
        return currentType.opition[activeBtn.value];
      }
      return {}; // 没有返回空
    });

    // 点击改变商户
    function selectMerchant(typeIndex:number, merchantIndex:number) {
      if (typeIndex === activeTab.value) {
        activeBtn.value = merchantIndex;
      }
      activeAmount.value = null;
    }
    // 点击推荐金额同步输入框
    function selectAmount(amount:number, amountIndex:number) {
      activeAmount.value = amountIndex;
      amountInput.value = amount.toString()
    }
    // 当前推荐金额
    const currentRecommend = computed(() => {
      return activeMerchant.value.recommend ? activeMerchant.value.recommend : [] 
    });
    watch(
      activeTab,
      () => {
        activeBtn.value = 0;
        amountInput.value = '';
        activeAmount.value = null
      }
    )
    watch(activeBtn, () => {
      amountInput.value = '';
      activeAmount.value = null; 
    })

    // 输入框高亮
    const fieldFocus = ref(false);
</script>
<style lang="css" scoped>
:root:root {
  --van-popup-close-icon-margin: 1rem 1rem;
}
  .van-popup, .van-overlay{
    width: calc(100vh * 11 / 19.5);
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .van-popup {
    background-color: var(--bg_2);
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
    padding: .2rem 1rem;
    height: 95%;
  }
  .charge-header {
    display: flex;
    justify-content: space-between;
    height: 3rem;
  }
  .merchantContent {
    display: grid; 
    width: 100%;   
    grid-template-columns: 1fr 1fr; 
    gap: .8rem 1.3vw;
    padding: .8rem 0;
  }
  .chargePop .van-button {
    height: 2.5rem;
    width: 100%;
    padding: 0 .3rem;
    background-color: transparent;
    justify-content: unset;
  }
  .amount-btn .van-button {
    color: var(--neutral_1);
  }
  .van-button__content {
    display: flex;
  }
  .van-button__icon.van-icon {
    flex: 1;
  }
  .van-button__content .van-button__text {
    flex: 9;
  }
  .header-service-recorder .van-icon {
    color: var(--lead);
    font-size: 1.3rem;
    padding: 1rem .3rem;
  }
  .recommend {
    display: grid; 
    width: 100%;   
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    gap: .7rem 1.3vw;
    padding:.7rem 0;
    /* margin: .5rem 0; */
  }
  .recommendTittle {
    color: var(--lead);
    padding: 1rem 0 .5rem .5rem;
    text-align: start;
  }
  .van-button__content .van-icon__image {
    width: 1.5rem;
    height: 1.5rem;
  }
  .chargeTips {
    color: var(--lead);
    text-align: start;
    margin: 1rem 0;
  }
  .van-field {
    border: solid 1px var(--border);
    border-radius: .5rem;
    padding: .6rem;
    background-color: transparent;
    color: var(--border);
    height: 2.6rem;
  }
  .van-field.field-focus {
    border-color: var(--primary);
  }
  #submitCharge {
    background-color: var(--primary);
    color: var(--text_accent3);
    height: 2.7rem;
    border-radius: .5rem;
    font-size: 1rem;
  }
  #charge-loading {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 50%;
  }
</style>