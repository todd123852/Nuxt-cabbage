import { gsap } from 'gsap';

interface RouteTransitionState {
  to: { path: string } | null;
  from: { path: string } | null;
}
const layoutsArray = ['/', '/event', '/regist', '/myInfo', '/login']; 
type DoneCallback = () => void;

const getRouteIndex = (path: string | null): number => {
  if (path === null) return -1;
  return layoutsArray.findIndex(routeItem => routeItem === path);
};

export function useLayoutTransition() {
  const routeTransition = useState<RouteTransitionState>('routeTransitionState');
  return {
    css: false, 
    onBeforeEnter(el: Element) {
      gsap.killTweensOf(el); // 清除旧动画
      gsap.set(el, { opacity: 1, x: 0 });
    },
    onEnter(el: Element, done: DoneCallback) {
      gsap.killTweensOf(el);

      // 获取当前导航的 to 和 from 路径
      const toPath = routeTransition.value.to?.path || ''; // 默认空字符串
      const fromPath = routeTransition.value.from?.path || null; // 刷新可能是 null

      const toIndex = getRouteIndex(toPath);
      const fromIndex = getRouteIndex(fromPath);

      let xStart: string; // 新页面进入的起始位置
      let xEnd: string = '0%'; // 新页面进入的结束位置 (屏幕中央)

      if (fromPath === null || toIndex > fromIndex) {
        xStart = '100%'; 
      } else {
        xStart = '-100%'; 
      }

      gsap.fromTo(
        el,
        { x: xStart },
        {
          x: xEnd,
          duration: 0.3,
          ease: 'linear',
          onComplete: () => {
            done();
          },
        }
      );
    },
    onLeave(el: Element, done: DoneCallback) {
      gsap.killTweensOf(el);
      // 获取当前导航的 to 和 from 路径
      const toPath = routeTransition.value.to?.path || '';
      const fromPath = routeTransition.value.from?.path || null;

      const toIndex = getRouteIndex(toPath);
      const fromIndex = getRouteIndex(fromPath);

      let xEnd: string; // 旧页面离开的结束位置

      if (toIndex > fromIndex) {
        xEnd = '-100%'; 
      } else {
        xEnd = '100%'; 
      }

      gsap.to(
        el,
        {
          x: xEnd,
          duration: 0.3,
          ease: 'linear',
          onComplete: done,
        }
      );
    },
  };
}