// 定义路由状态的类型
interface RouteTransitionState {
  to: { path: string } | null;
  from: { path: string } | null;
}

// 定义全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
    // 使用 useState 创建一个全局可访问的响应式状态
    // 'routeTransitionState' 是这个状态的唯一键，确保不同组件能访问同一个状态
    const routeTransition = useState<RouteTransitionState>('routeTransitionState', () => ({
        to: null,
        from: null,
    }));
  // 在每次路由变化时更新这个状态
  routeTransition.value = {
    to: { path: to.path }, // 只存储需要的 path 属性
    from: { path: from.path },
  };

  // 可以在这里打印日志验证中间件是否正常工作
  console.log(`[Middleware] From: ${from.path} -> To: ${to.path}`);
});
