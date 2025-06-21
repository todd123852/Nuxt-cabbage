import zfb from '@/components/imges/chargeIcon/icon_cz_zfb.png'
import wx from '@/components/imges/chargeIcon/icon_cz_wx.png'
import jd from '@/components/imges/chargeIcon/icon_cz_jd.png'
import qq from '@/components/imges/chargeIcon/icon_cz_qq.png'
import upi from '@/components/imges/chargeIcon/icon_cz_upi.png'
import union from '@/components/imges/chargeIcon/icon_cz_union.png'
import yzf from '@/components/imges/chargeIcon/icon_cz_yzf.png'
import kdpay from '@/components/imges/chargeIcon/icon_cz_kdpay.png'
import btc from '@/components/imges/chargeIcon/icon_cz_btc.png'
import usdt from '@/components/imges/chargeIcon/icon_cz_szhb.png'
import usdc from '@/components/imges/chargeIcon/icon_cz_usdc.png'
import eth from '@/components/imges/chargeIcon/icon_cz_eth.png'
import kjcz from '@/components/imges/chargeIcon/icon_cz_kjcz.png'


export const usePopup = defineStore('popup', () => {
    const chargePop = ref(false);
    const chargeData = reactive([
        {
          chargeType:'在线充值', 
          opition: [
            {name: '支付宝', icon: zfb, badge:'', recommend:[1, 2, 3, 50, 90]}, 
            {name: '微信转账', icon: wx, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: '银联扫码', icon: union, badge:'', recommend:[100, 200, 300, 500, 90]}, 
            {name: '云闪付', icon: yzf, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'K豆钱包', icon: kdpay, badge:'', recommend:[10, 20, 30, 50, 90]},
            {name: '京东支付', icon: jd, badge:'', recommend:[10, 20, 30, 50, 90]},
            {name: 'QQ', icon: qq, badge:'', recommend:[10, 20, 30, 50, 90]},
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
            {name: 'ETH', icon:eth, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'USDT', icon:usdt, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'BTC', icon:btc, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'USDC', icon:usdc, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'No钱包USDT', icon:kjcz, badge:'', recommend:[10, 20, 30, 50, 90]}
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
            {name: '币行天下', icon:btc, badge:'', recommend:[], customTip:''}, 
            {name: '速币通', icon:upi, badge:'', recommend:[], customTip:''}, 
            {name: '虚拟币阁', icon:btc, badge:'', recommend:[], customTip:''}, 
            {name: '星辰兑', icon:btc, badge:'', recommend:[], customTip:''}, 
            {name: '数字方舟', icon:btc, badge:'', recommend:[], customTip:''}
          ],  
          realName:false, 
          tips:'请联系商家获取专属充币账号', 
          amountInput: false, 
          badge: '213',
          icon:''
        },
        {
          chargeType:'转账充值', 
          opition: [
            {name: 'ETH', icon:eth, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'USDT', icon:usdc, badge:'', recommend:[10, 20, 30, 50, 90]}, 
            {name: 'BTC', icon:btc, badge:'', recommend:[10, 20, 30, 50, 90]}, 
          ], 
          realName:true, 
          tips:'请填写真实姓名', 
          amountInput: true, 
          badge: '213',
          icon:''
        }, 
      ])
    return { chargePop, chargeData }
})