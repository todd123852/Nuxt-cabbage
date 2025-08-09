import { useLayoutTransitionStore } from '@/stores/layoutTransition'; 
// 定义布局/页面顺序
const layoutsArray = ['/', '/event', '/regist', '/myInfo', '/login'];
const eventPage = ['/event', '/interest', '', '', '', '', ];
// 计算路径深度
// function getPathDepth(path: string): number {
//   return path.split('/').filter(segment => segment.length > 0).length;
// }
export default defineNuxtRouteMiddleware((to, from) => {
  let transitionName: 'slide-forward' | 'slide-backward';
  const toPath = to.fullPath;
  const fromPath = from.fullPath;

  const layoutTransitionStore = useLayoutTransitionStore();
  layoutTransitionStore.fromPath = from.fullPath;
  
  let toIndex = layoutsArray.indexOf(toPath);
  let fromIndex = layoutsArray.indexOf(fromPath);
  // 如果都是优惠页的情况
  if (eventPage.includes(toPath) && eventPage.includes(fromPath)) {
    toIndex = eventPage.indexOf(toPath);
    fromIndex = eventPage.indexOf(fromPath);

  }
  console.log(toIndex>fromIndex);
  
  if (fromPath === '/' || fromPath === toPath || fromIndex === -1 || toIndex === -1) {
    // console.log('fromIndex: '+fromIndex);
    // console.log('toIndex: '+toIndex);
    transitionName = 'slide-forward'; // 默认前进
  } else {
    // 2. 根据索引比较判断方向
    if (toIndex > fromIndex) {
      transitionName = 'slide-forward'; // 目标索引大于来源索引，前进
    } else {
      transitionName = 'slide-backward'; // 目标索引小于来源索引，后退
    }
  }
  to.meta.pageTransition = {
    name: transitionName,
  };
  from.meta.pageTransition = {
    name: transitionName,
  };
  to.meta.layoutTransition = {
    name: transitionName,
  };
  from.meta.layoutTransition = {
    name: transitionName,
  };
})
