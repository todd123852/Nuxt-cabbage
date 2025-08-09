interface ThemeColors {
    primary: string;
    lead: string;
    neutral_1: string;
    neutral_2: string;
    neutral_3: string;
    border: string;
    bg_1: string;
    bg_2: string;
    accent_1: string;
    accent_2: string;
    accent_3: string;
    leftnav_active: string;
    text_primary: string;
    text_accent3: string;
    home_bg: string;
    web_left_bg_q: string;
    skin__web_btmnav_db: string;
};
interface Theme {
    themeName: string;
    themeCss: ThemeColors;
};
const themes: Theme[] = [
    {
        themeName: '深色黑金', 
        themeCss: {
            primary: '#D1AE52', lead: '#E3E3E3', neutral_1: '#999999', neutral_2: '#666666', neutral_3: '#666666', border: '#333333', bg_1: '#0A0A0A', bg_2: '#1A1A1A', accent_1: '#04BE02', accent_2: '#EA4E3D', accent_3: '#FFAA09', leftnav_active: '#999999', text_primary: '#D1AE52', text_accent3: '#703904', home_bg: '#1A1A1A', web_left_bg_q: '#232323', skin__web_btmnav_db: '#0A0A0A'
        }
    },
    {
        themeName: '深色紫金', 
        themeCss: {
            primary: '#F5C62A', lead: '#FFFFFF', neutral_1: '#BCB6D8', neutral_2: '#8A80BA', neutral_3: '#8A80BA', border: '#58479E', bg_1: '#291777', bg_2: '#392785', accent_1: '#04BE02', accent_2: '#EA4E3D', accent_3: '#FFAA09', leftnav_active: '#392785', text_primary: '#392785', text_accent3: '#FFFFFF', home_bg: '#291777', web_left_bg_q: '#402F89', skin__web_btmnav_db: '#392785'
        }
    },
    {
        themeName: '锈红', 
        themeCss: {
            primary: '#FFC300', lead: '#FFFFFF', neutral_1: '#F9B3B3', neutral_2: '#E27E7E', neutral_3: '#E27E7E', border: '#CE4445', bg_1: '#8D0A0B', bg_2: '#A10F10', accent_1: '#19CF2E', accent_2: '#FF2D42', accent_3: '#FFAA09', leftnav_active: '#FFC300', text_primary: '#A10F10', text_accent3: '#FFFFFF', home_bg: '#A10F10', web_left_bg_q: '#CE444566', skin__web_btmnav_db: '#8D0A0B'
        }
    },
    {
        themeName: 'Louis棕', 
        themeCss: {
            primary: '#FFD581', lead: '#FFFFFF', neutral_1: '#AB9284', neutral_2: '#7E6454', neutral_3: '#7E6454', border: '#71503C', bg_1: '#382015', bg_2: '#43281C', accent_1: '#19CF2E', accent_2: '#FF2D42', accent_3: '#FFAA09', leftnav_active: '#FFD581', text_primary: '#43281C', text_accent3: '#FFFFFF', home_bg: '#43281C', web_left_bg_q: '#71503C66', skin__web_btmnav_db: '#3B2318'
        }
    },
    {
        themeName: 'Dior蓝', 
        themeCss: {
            primary: '#FFF0BB', lead: '#FFFFFF', neutral_1: '#A0C5FB', neutral_2: '#6FA4EF', neutral_3: '#6FA4EF', border: '#4974DE', bg_1: '#05309F', bg_2: '#1A45B1', accent_1: '#04BE02', accent_2: '#EA4E3D', accent_3: '#FFAA09', leftnav_active: '#FFF0BB', text_primary: '#1A45B1', text_accent3: '#05309F', home_bg: '#1A45B1', web_left_bg_q: '#4974DE66', skin__web_btmnav_db: '#05309F'
        }
    },
    {
        themeName: 'Gucci绿', 
        themeCss: {
            primary: '#FFD581', lead: '#FFFFFF', neutral_1: '#50CBBD', neutral_2: '#049888', neutral_3: '#049888', border: '#0F7A6E', bg_1: '#023E38', bg_2: '#024E46', accent_1: '#19CF2E', accent_2: '#FF552A', accent_3: '#FFAA09', leftnav_active: '#FDD880', text_primary: '#024E46', text_accent3: '#FFFFFF', home_bg: '#023E38', web_left_bg_q: '#0F7A6E66', skin__web_btmnav_db: '#004D45'
        }
    },

    {
        themeName: 'Hermes橙', 
        themeCss: {
            primary: '#531F0E', lead: '#FFFFFF', neutral_1: '#FEEDD8', neutral_2: '#FED8AA', neutral_3: '#FED8AA', border: '#FFB370', bg_1: '#F26D0A', bg_2: '#FE831D', accent_1: '#58DA57', accent_2: '#DF230E', accent_3: '#F9D115', leftnav_active: '#531F0E', text_primary: '#FFFFFF', text_accent3: '#FFFFFF', home_bg: '#FE831D', web_left_bg_q: '#FFB37066', skin__web_btmnav_db: '#F26D0A'
        }
    }
];
export const useTheme = defineStore('theme', () => {
    function applyTheme(themeCss:object) {
        if (themeCss) {
            const root = document.documentElement;
            // 遍历主题对象中的每个属性（CSS 变量名）和值
            for (const key of Object.keys(themeCss) as Array<keyof ThemeColors>) {
                if (themeCss.hasOwnProperty(key)) {
                    root.style.setProperty(`--${key}`, (themeCss as any)[key]); // 设置 CSS 变量
                }
            }
        } else {
            console.warn(`Theme "${themeCss}" not found.`);
        }
    }
    return {themes, applyTheme}
})