import { useLayoutTransitionStore } from '@/stores/layoutTransition'; 
import { useLoginRegist } from '~/stores/loginRegist';
import { useNavigation } from '~/stores/Navigation';
// 定义布局/页面顺序
const layoutsArray = ['/', '/event', '/regist', '/myInfo', '/login'];
const eventPage = ['/event', '/interest', '', '', '', '', ];
const pages = ['', 'event', 'regist', 'myInfo', 'login', 'center-wallet', 'mission', 'interest', 'profile', 'rebate', 'report', 'vip']
export default defineNuxtRouteMiddleware((to, from) => {
  let transitionName: 'slide-forward' | 'slide-backward';
  const toPath = to.fullPath;
  const fromPath = from.fullPath;

  // 记录路由历史记录
  const useNavigationStore = useNavigation();
  console.log(useNavigationStore.history);
  // 如果后缀名不在所有页面哩，返回首页
  if (!pages.includes(toPath.split('/')[1])) {
    useNavigationStore.history = [];
    return navigateTo('/')
  }

  // 如果已登陆还进入登录页，跳回首页
  const useloginRegistStore = useLoginRegist(); 
  if (to.path.includes('login') || to.path.includes('regist')) {
    if (useloginRegistStore.isLogin) {  
      useNavigationStore.history = [];
      return navigateTo('/')
    }
  }
  if (!useNavigationStore.isBack) {    
    useNavigationStore.saveHistory(toPath);
  }
  useNavigationStore.isBack = false;
  
  let toIndex = pages.indexOf(toPath.split('/')[1]);
  let fromIndex = pages.indexOf(fromPath.split('/')[1]);
  // 如果都是优惠页的情况
  if (eventPage.includes(toPath) && eventPage.includes(fromPath)) {
    toIndex = eventPage.indexOf(toPath);
    fromIndex = eventPage.indexOf(fromPath);
  }
  console.log('toIndex'+ toIndex);
  console.log('fromIndex'+ fromIndex);
  if (fromPath === '/' || fromPath === toPath || fromIndex === -1 || toIndex === -1) {
    transitionName = 'slide-forward'; // 默认前进
  } else {
    // 2. 根据索引比较判断方向
    if (toIndex > fromIndex) {
      transitionName = 'slide-forward'; // 目标索引大于来源索引，前进
    } else {
      transitionName = 'slide-backward'; // 目标索引小于来源索引，后退
    }
  }
  to.meta.pageTransition = 
  from.meta.pageTransition = 
  to.meta.layoutTransition = 
  from.meta.layoutTransition = {
    name: transitionName,
  };
  // from.meta.pageTransition = {
  //   name: transitionName,
  // };
  // to.meta.layoutTransition = {
  //   name: transitionName,
  // };
  // from.meta.layoutTransition = {
  //   name: transitionName,
  // };
})
