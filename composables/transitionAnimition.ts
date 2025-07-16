// composables/pageTransitions.ts
import { gsap } from 'gsap';
import type { TransitionProps } from 'vue'; // 导入 Vue 的 TransitionProps 类型

type DoneCallback = () => void;

// 定义向左滑动的动画对象（旧页面向左滑出，新页面从右滑入）
export const slideLeftTransition: TransitionProps = {
  css: false, // 禁用 CSS 过渡

  onBeforeEnter(el: Element) {
    console.log('onBeforeEnter');
    
    gsap.killTweensOf(el);
    gsap.set(el, { opacity: 1, x: '100%', position: 'absolute', width: '100%', height: '100%' });
  },
  onEnter(el: Element, done: DoneCallback) {
    gsap.killTweensOf(el);
    gsap.to(el, {
      x: '0%',
      duration: 0.5,
      ease: 'linear',
      onComplete: done,
    });
  },
  onLeave(el: Element, done: DoneCallback) {
    gsap.killTweensOf(el);
    gsap.to(el, {
      x: '-100%',
      duration: 0.5,
      ease: 'linear',
      onComplete: done,
    });
  },
};

// 定义向右滑动的动画对象（旧页面向右滑出，新页面从左滑入）
export const slideRightTransition: TransitionProps = {
  css: false, // 禁用 CSS 过渡

  onBeforeEnter(el: Element) {
    gsap.killTweensOf(el);
    gsap.set(el, { opacity: 1, x: '-100%', position: 'absolute', width: '100%', height: '100%' });
  },
  onEnter(el: Element, done: DoneCallback) {
    gsap.killTweensOf(el);
    gsap.to(el, {
      x: '0%',
      duration: 0.3,
      ease: 'linear',
      onComplete: done,
    });
  },
  onLeave(el: Element, done: DoneCallback) {
    gsap.killTweensOf(el);
    gsap.to(el, {
      x: '100%',
      duration: 0.3,
      ease: 'linear',
      onComplete: done,
    });
  },
};