import { tr } from "element-plus/es/locale/index.mjs";
import { useLobby } from "~/stores/Lobby";
export const useLoginRegist = defineStore('loginRegist', () => {
    const passwordReg= /^[a-zA-Z0-9~!@$*^]{8,16}$/;
    const accountReg = /^[a-zA-Z0-9]{8,16}$/;
    const emailReg = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    // 用邮箱还是账号登陆
    const loginType = ref<number>(0);
    const registType = ref<number>(0);
    // 确认是否登陆成功
    const isLogin = useCookie<boolean>('islogin', {
        default: () => false,
        watch: true
    });
    const username = useCookie<string>('username', {
        default: () => '',
        watch: true
    });
    const password = useCookie<string>('password', {
        default: () => '',
        watch: true
    });
    const userId = useCookie<string>('userId', {
        default: () => '',
        watch: true
    });
      // 检查密码
    function checkPaw(password:string) {
        return {isLegal: passwordReg.test(password)};
    }
    // 检查账号
    function checkAcc(account:string) {
        // 邮箱校验
        if (account.includes('@')) {      
            const ok = emailReg.test(account);
            return {type: 1, isLegal: ok}
        // 账号校验
        } else {
            const ok = accountReg.test(account);
            return {type: 0, isLegal: ok}
        }
    }
    const userInfos = [
        {text: username, icon: 'bi-person-fill', key: 'account'},
        {text: '+63 534653123123', icon: 'bi-phone', key: 'phoneNumber'},
        {text: userId, icon: 'bi-person-badge', key: 'memberId'}
    ]
    const useLobbyStores = useLobby();
    // 注册或登陆成功回调参数
    const loginSucess = (account:string) => {
        isLogin.value = true;
        userId.value = String(Math.floor(Math.random() * 1000000000) + 1000000000);
        username.value = account;
        useLobbyStores.amount = 0
    }
    return {loginType, registType, isLogin, username, password, userId, userInfos,checkAcc, checkPaw, loginSucess}
})