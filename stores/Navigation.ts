export const useNavigation = defineStore('Navigation', () => {
    const history = reactive<string[]>([]);
    const routerBack = () => {
        if (history.length > 1) {
            history.pop();
            return navigateTo(history[history.length - 1])
        }
        console.log(history);
        
        navigateTo('/')
    }
    return {history, routerBack}
})