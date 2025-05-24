const layoutsArray = reactive(['/event', '/regist','/myInfo'])
export default defineNuxtRouteMiddleware((to, from) => {
    if (from.path && to.path) {
        const fNum = layoutsArray.findIndex(route => route === from.path);
        const tNum = layoutsArray.findIndex(route => route === to.path);
        //console.log('fNum: ' +fNum+'tNum: ' +tNum);
        
        if (typeof to.meta.layoutTransition !== 'boolean' && to.meta.layoutTransition &&
            typeof from.meta.layoutTransition !== 'boolean' && from.meta.layoutTransition
        ) {
            if (fNum < tNum) {
                to.meta.layoutTransition.name = 'left-slide';
                from.meta.layoutTransition.name = 'left-slide';
            } else {
                to.meta.layoutTransition.name = 'right-slide';
                from.meta.layoutTransition.name = 'right-slide';
            }
        }
    } else if (typeof to.meta.layoutTransition !== 'boolean' && to.meta.layoutTransition) {
        to.meta.layoutTransition.name = 'left-slide';
    }
})