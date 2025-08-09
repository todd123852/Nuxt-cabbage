<template>
    <div class="sideOffice">
        <input type="checkbox" id="sideMenu-switch">
        <div class="mainside">
            <!-- 放置侧边栏元素 -->
             <p class="menuTittle">主题样式: </p>
             <div class="themeBtns">
                 <button v-for="(theme, index) in themeStore.themes" 
                 :key="theme.themeName" 
                 @click="handleChangeSkin(index)"
                 :class="['skinBtn', { 'activeSkinBtn': skin === theme.themeName }]"
                 :style="{
                    'color': skin === theme.themeName ? theme.themeCss.lead : theme.themeCss.bg_1, 
                    borderColor: theme.themeCss.bg_1,
                    'backgroundColor': skin === theme.themeName ? theme.themeCss.bg_1 : theme.themeCss.lead
                }"
                 >
                    {{ theme.themeName }}
                </button>
             </div>
            <label for="sideMenu-switch" class="switch_label">
            <div class="arrow">
                <i class="bi bi-caret-left"></i>
            </div>
            </label>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useTheme } from '~/stores/Theme';
    const themeStore = useTheme();
    const skin = ref('深色黑金');
    const handleChangeSkin = (index:number) => {
        if (skin.value !== themeStore.themes[index].themeName && themeStore.themes[index].themeName) {
            skin.value = themeStore.themes[index].themeName;
            themeStore.applyTheme(themeStore.themes[index].themeCss);
        }
    }
</script>

<style scoped>
    .sideOffice {
        position: fixed;
        left: 0;
        height: 100vh;
    }
    .mainside {
        position: fixed;
        height: 100%;
        width: 25vw;
        background: linear-gradient(var(--primary), var(--text_accent3));
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        box-shadow: 5px 0 10px rgb(32, 32, 32);
        transition: .3s;
    }
    .switch_label {
        position: absolute;
        background-color: black;
        color: #fff;
        font-size: 30px;
        width: 30px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
        right: -30px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    #sideMenu-switch {
        opacity: 0;
        position: absolute;
        top: -100px;
    }
    #sideMenu-switch:checked + .mainside{
        transform: translateX(-100%);
    }
    #sideMenu-switch:checked + .mainside label .arrow {
        color: aqua;
        transform: scaleX(-1);
    }
    .themeBtns {
        display: flex;
        flex-wrap: wrap;
    }
    .skinBtn {
        background-color: transparent;
        width: 5rem;
        height: 3rem;
        border-radius: .5rem;
        margin: .3rem;
    }
    .menuTittle {
        padding: .3rem;
        font-size: 1.5rem;
        text-align: left;
        font-weight: 600;
    }
</style>
