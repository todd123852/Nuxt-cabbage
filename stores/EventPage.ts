export const useEventPage = defineStore('EventPage', () => {
    const page = ref<number>(1);
    return {page}
})