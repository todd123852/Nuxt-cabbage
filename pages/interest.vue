<template>
    <div class="interest-content">
        <div class="interest-top">
            <div class="transform">
                <div>
                    <van-badge :content="'askjdm'" :offset="['1rem', '-0.5rem']"
                    :color="'var(--accent_3)'">
                        <span>已存入 </span><span class="amount">0.00</span>
                    </van-badge>
                </div>
                <div class="transformBtn">
                    <button>转入</button>
                    <button>转出</button>
                </div>
            </div>
            <div class="withdraw">
                <div class="withdrawInform">
                    <div class="settleRound">
                        <span>结算周期</span>
                        <span class="settleTime"> 1小时 </span>
                        <span>(封顶 <span class="settleTime">无限制</span> )</span>
                    </div>
                    <div class="unreceived">
                        <span>待领取 <span class="settleTime">0.00</span> (已领取 0.00)</span>
                    </div>
                </div>
                <button>领取</button>
            </div>
        </div>
        <van-tabs v-model:active="active">
            <van-tab 
            v-for="item in interestTabs" 
            :title="item.name" :key="item.key"
            >
            <!-- 规则版面 -->
            <div class="rules-content" v-if="item.key === 'rules'">
                <div class="rulesBox">
                    <div v-for="(rule, index) in item.content">
                        <strong>{{ (index + 1 ) + '.' }} {{ rule.tittle }}</strong>
                        {{ rule.text }}
                    </div>
                </div>
            </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: 'event-page',
    });
    const active = ref(0);
    const interestTabs = reactive([
        {name: '利息规则', content:[
            {tittle: '收益介绍:', text: '存入利息宝的金额，至少满足一个完整周期才能产生利息，若中途提前转出则该周期不计算收益，例如：当前结算周期为1小时，则2025/01/01 00:00:01转入的金额，将在2025/01/01 01:00:01产生第一个周期利息;'},
            {tittle: '结算周期:', text: '当前利息的结算周期为1小时'},
            {tittle: '年利率:', text: '当前年利率为88'},
            {tittle: '计算公式:', text: '利息收益=存入金额 * 年利率 / 结算周期;'},
            {tittle: '举例说明', text: 'A于2025/01/01 00:00:01存入10,000，年利率为88%，结算周期为1小时，则于2025/01/01 01:00:01获得首次利息收益，计算方式如下:首次利息 =10,000*88%/365天/24小时*1小时 = 1.004566'},
            {tittle: '转入门槛:', text: '每次转入金额必须大于等于20（即≥20），转入金额无上限，越多收益越大'},
            {tittle: '利息封顶:', text: '当前利息封顶最多只能结算10个周期，超出则不再产生利息，记得定期或经常来领取收益，以免错过更多收益哦'},
            {tittle: '领取时间:', text: '当前为隔天领取，即当天产生的利息，要等到第二天0点后才能领取'},
            {tittle: '稽核倍数:', text: '当前稽核倍数为1倍（投注流水要求），即所领取的利息，需要进行投注后，才能提现，投注仅限电子'},
            {tittle: '活动声明:', text: '本功能仅限账号本人进行正常游戏投注，禁止租借账号、无风险投注(对赌、对刷、低赔刷水)、恶意套利、使用外挂程式、机器人、利用协议、漏洞、接口、群控或其他技术手段参与，一经查核属实，本平台有权终止会员登录、暂停会员使用网站、及没收奖金和不当盈利的权利，无需特别通知;'},
            {tittle: '解释说明:', text: '会员领取利息宝奖励时，本平台将默认会员同意且遵守对应条件等相关规定，为避免文字理解歧义，本平台保有本活动最终解释权。'},
        ], key: 'rules'},
        {name: '记录明细', content:[
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
            {time: '', transformType: '', amount: 10, tittle:'', text:''},
        ], key: 'record'}
    ])
</script>
<style scoped>
    * {
        font-size: .9rem;
        --van-tabs-line-height: 2.7rem;
    }
    :root:root {
        --van-tab-font-size: .9rem;
        --van-badge-size: 1rem;
        --van-badge-background:var(--accent_3);
        
    }
    span {
        color: var(--neutral_2);
        line-height: 1rem;
    }
    button {
        width: 4.9rem;
        height: 2.2rem;
        border-radius: .6rem;
        margin-left: .7rem;
        color: var(--lead);
        background-color: var(--neutral_1);
        border: none;
    }
    .amount {
        color: var(--lead);
        font-size: 1rem;
    }
    .settleTime {
        color: var(--lead);
    }
    .interest-content {
        width: 100%;
        position: absolute;
        padding-top: 1.5rem;
        background-color: var(--bg_2);
    }
    .withdraw, .transform {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .7rem;
    }
    .transform {
        margin-bottom: .4rem;
    }
    .withdrawInform {
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .settleRound {
        margin-bottom: .7rem;
    }
    .rules-content {
        background-color: var(--bg_1);
        padding: .7rem;
    }
    .rules-content div,  .rules-content strong{
        color: var(--neutral_2);
        font-size: 1rem;
        text-align: start;
        line-height: 1.6rem;
    }
    .rulesBox {
        background-color: var(--bg_2);
        border-radius: .5rem;
        padding: .5rem;
        height: 60vh;
        overflow: scroll;
    }
    .rulesBox div:nth-child(1) ~ div {
        margin-top: 1.5rem;
    }
</style>