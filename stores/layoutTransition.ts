export const useLayoutTransitionStore = defineStore('layoutTransition', () => {
    const direction = ref<'forward' | 'backward'>('forward');
    const fromPath = ref<string>('')
    function setDirection(newDirection: 'forward' | 'backward') {
        direction.value = newDirection; // 访问 ref 的值需要用 .value
    }
    return {direction, setDirection,fromPath};
});