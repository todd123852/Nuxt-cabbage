export const usePopoverClose = defineStore('PopoverClose', () => {
    const displayAccountPopover = ref(false);
    const middleNavPopover = ref(false)
    return {displayAccountPopover, middleNavPopover}
})