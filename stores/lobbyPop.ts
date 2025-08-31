import { useLoginRegist } from '~/stores/loginRegist';
export const useLobbyPop = defineStore('lobbyPop', () => {
    const downloadPop = ref<boolean>(false);
    const languagePop = ref<boolean>(false);
    const logoutPop = ref<boolean>(false);

    const languges = reactive(['繁体中文', '简体中文', 'Chinese', 'Mandarin']);
    const activeLanguge = ref(languges[0]);
    // 登出逻辑
    const useLoginRegistStore = useLoginRegist();
    const logout = () => {
        useLoginRegistStore.isLogin = false;
        navigateTo('/')
    }

    return {downloadPop, languagePop, languges, activeLanguge, logoutPop, logout}
})