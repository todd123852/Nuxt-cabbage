export const useNavigation = defineStore('Navigation', () => {
    const history = reactive<string[]>([]);
    const routerBack = () => {
        console.log(history);
        if (history.length > 1) {
            history.pop();
            return navigateTo(history[history.length - 1])
        }
        navigateTo('/')
    };
    const saveHistory = (path:string) => {
        if (history.length >= 3 || history.includes(path)) {
            history.unshift();
        }
        history.push(path);
    }
    return {history, routerBack, saveHistory}
})