// export const useTransition = defineStore('trasition', () => {
//     const route = useRoute();
//     const slide = ref('right-slide');
//     watch(() => route.path, (newPath, oldPath) => {
//         if (newPath.split('').length > (oldPath || '').split('').length) {
//             slide.value = 'left-slide'
//         } else {
//             slide.value = 'right-slide'
//         }
//     },{ immediate: true }) 
//     return { slide };
// })