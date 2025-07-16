import search_icon from '~/components/imges/lobby_icon/search_icon.avif'
import icon_withraw_card from '~/components/imges/lobby_icon/icon_withraw_card.avif'
import icon_vip from '~/components/imges/lobby_icon/icon_vip.avif'
import icon_secrety from '~/components/imges/lobby_icon/icon_secrety.avif'
import icon_transition_record from '~/components/imges/lobby_icon/icon_record.avif'
import icon_pig from '~/components/imges/lobby_icon/icon_pig.avif'
import icon_personal_setting from '~/components/imges/lobby_icon/icon_personal_setting.avif'
import icon_langugue from '~/components/imges/lobby_icon/icon_langugue.avif'
import icon_withdraw from '~/components/imges/lobby_icon/icon_withdraw.avif'
import icon_gamerecord from '~/components/imges/lobby_icon/icon_gamerecord.avif'
import icon_unrecieved from '~/components/imges/lobby_icon/icon_unrecieved.avif'
import icon_report from '~/components/imges/lobby_icon/icon_report.avif'
import icon_misssion from '~/components/imges/lobby_icon/icon_misssion.avif'
import icon_recevied_record from '~/components/imges/lobby_icon/icon_recevied_record.avif'
import icon_all from '~/components/imges/lobby_icon/icon_all.avif'
import dl_share from '~/components/imges/lobby_icon/dl_share.png'
import icon_betting_misson from '~/components/imges/lobby_icon/icon_betting_misson.avif'
import icon_event from '~/components/imges/lobby_icon/icon_event.avif'
import icon_desposit from '~/components/imges/lobby_icon/icon_desposit.avif'
import icon_custom_service from '~/components/imges/lobby_icon/icon_custom_service.avif'
import icon_downloadapp from '~/components/imges/lobby_icon/icon_downloadapp.avif'

export const useLobby = defineStore('lobby', () => {
    const searchIcon = search_icon;
    const iconAll = icon_all;
    const lobbyNav = reactive([
        {name: '推广赚钱',icon: dl_share, action: ''},
        {name: '下载APP',icon: icon_downloadapp, action: ''},
        {name: '客服中心',icon: icon_custom_service, action: ''},
        {name: '充值',icon: icon_desposit, action: ''},
        {name: '优惠中心',icon: icon_event, action: ''},
        {name: 'VIP',icon: icon_vip, action: ''},
        {name: '提现管理',icon: icon_withraw_card, action: ''},
        {name: '安全设置',icon: icon_secrety, action: ''},
        {name: '利息宝',icon: icon_pig, action: ''},
        {name: '个人资料',icon: icon_personal_setting, action: ''},
        {name: '提现',icon: icon_withdraw, action: ''},
        {name: '投注记录',icon: icon_gamerecord, action: ''},
        {name: '待领取',icon: icon_unrecieved, action: ''},
        {name: '个人报表',icon: icon_report, action: ''},
        {name: '任务',icon: icon_misssion, action: ''},
        {name: '领取记录',icon: icon_recevied_record, action: ''},
        {name: '投注任务',icon: icon_betting_misson, action: ''},
        {name: '语言设置',icon: icon_langugue, action: ''},
        {name: '帐户明细',icon: icon_transition_record, action: ''},
    ])
    return {searchIcon, iconAll, lobbyNav}
})
