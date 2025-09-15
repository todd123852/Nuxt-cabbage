export const useNavigation = defineStore('Navigation', () => {
    const history = reactive<string[]>([]);
    const isBack = ref<boolean>(false);
    const routerBack = () => {
        if (history.length > 1) {
            history.pop();
            isBack.value = true;
            return navigateTo(history[history.length - 1])
        }
        navigateTo('/')
    };
    const saveHistory = (path:string) => {
        if (history.length >= 3 || history.includes(path)) {            
            history.shift();
        }
        history.push(path);
    }
    return {isBack, history, routerBack, saveHistory}
})