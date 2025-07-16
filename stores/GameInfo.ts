import slotIcon from '@/components/imges/GameTypeIcon/icon_dtfl_dz_1.png'
import fishingIcon from '@/components/imges/GameTypeIcon/icon_dtfl_by_1.png'
import liveIcon from '@/components/imges/GameTypeIcon/icon_dtfl_zr_1.png'
import sportIcon from '@/components/imges/GameTypeIcon/icon_dtfl_ty_1.png'
import lotteryIcon from '@/components/imges/GameTypeIcon/icon_dtfl_cp_1.png'
import esportIcon from '@/components/imges/GameTypeIcon/icon_dtfl_dianjing_1.png'
import cardsIcon from '@/components/imges/GameTypeIcon/icon_dtfl_qp_1.png'
import blockchainIcon from '@/components/imges/GameTypeIcon/icon_dtfl_qkl_1.png'
import hot from '@/components/imges/GameTypeIcon/icon_dtfl_rm_1.png'
export const useGameInfo = defineStore('gameInfo', () => {
    const gameType = reactive([
        {name:'热门', thirdParties: ['PG', 'WG', 'LG', 'PP'], type: 'hot', icon: hot},
        {name:'电子', thirdParties: ['PG', 'WG', 'LG', 'PP'], type: 'slot', icon: slotIcon},
        {name:'捕鱼', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'fishing' , icon: fishingIcon},
        {name:'真人', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'live' , icon: liveIcon},
        {name:'体育', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'sport' , icon: sportIcon},
        {name:'彩票', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'lottery' , icon: lotteryIcon},
        {name:'电竞', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'e-sport' , icon: esportIcon},
        {name:'棋牌', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'cards' , icon: cardsIcon},
        {name:'区块链', thirdParties: ['PA', 'PP', 'DB', 'BG'], type: 'blockchain' , icon: blockchainIcon}
    ]);
    const gameContentTop = ref<number>(270);
    return {gameType, gameContentTop}
})