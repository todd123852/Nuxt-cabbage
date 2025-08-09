export const usePersonalInfo = defineStore('PersonalInfo', () => {
    const showInfo = ref('11111111');
    const phoneNum = ref('');
    const email = ref('');
    const realName = ref('');
    const citizenship = ref('');
    const kyc = ref('0');
    const birthplace = ref('');
    const birthaddress = ref('');
    const birthaddressDetails = ref('');
    const residencePlace = ref('');
    const residenceAddress = ref('');
    const residenceAddressDetails = ref('');
    const permanentPlace = ref('');
    const permanentAddress = ref('');
    const permanentAddressDetails = ref('');
    const employer = ref('');
    const work = ref('');
    const wechatAcc = ref('');
    const whatsAppAcc = ref('');
    const facebookAcc = ref('');
    const telegramAcc = ref('');
    const lineAcc = ref('');
    const twitterAcc = ref('');
    const threadsAcc = ref('');
    const insgramAcc = ref('');
    const birthday = ref('');
    const registDate = ref('');
    const birth = ref('生日');
    const info = ref('默认展示信息') 
    interface ProfileInputItem {
        name: string;
        model: Ref<string>;
        holder: string;
        isInput: boolean;
        tittle: boolean;
        selectType: boolean | SelectTypeObject;
        paste: boolean;
        icon: string;
        disabled?: boolean;
    }
    interface SelectTypeObject {
        type: 'ul' | 'pop' | 'checkbox' | string; 
        options?: SelectOption[]; 
        [key: string]: any; 
    }
    interface SelectOption {
        value: string | number; 
        label?: string;
    }
    const profileInput:ProfileInputItem[] = [
        {name: '', model: info, holder: '默认展示信息', isInput: false, tittle: true, selectType: false, paste: false, icon: ''},
        {name: 'infoType', model: showInfo, holder: 'account', isInput: true, tittle: false, selectType: {type: 'ul', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: 'UserFilled', disabled: true},
        {name: 'phone', model: phoneNum, holder: 'phone', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: phoneNum.value === ''},
        {name: '', model: email, holder: '请绑定邮箱', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: realName, holder: '请输入真实姓名', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: kyc, holder: '请进行KYC认证', isInput: false, tittle: false, selectType: false, paste: false, icon: ''},
        {name: '', model: citizenship, holder: '请选择国籍/地区', isInput: true, tittle: false, selectType: {type: 'ul', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: birthplace, holder: '出生地', isInput: true, tittle: true, selectType: false, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: birthaddress, holder: '请选择出生地址', isInput: true, tittle: false, selectType: {type: 'pop', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: birthaddressDetails, holder: '出生详细地址', isInput: true, tittle: false, selectType: false, paste: true, icon: '', disabled: email.value === ''},
        {name: '', model: residencePlace, holder: '当前居住地', isInput: true, tittle: true, selectType: false, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: residenceAddress, holder: '请选择当前居住地址', isInput: true, tittle: false, selectType: {type: 'pop', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: residenceAddressDetails, holder: '当前居住详细地址', isInput: true, tittle: false, selectType: false, paste: true, icon: '', disabled: email.value === ''},
        {name: '', model: permanentPlace, holder: '永久居住地', isInput: true, tittle: true, selectType: false, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: permanentAddress, holder: '请选择永久居住地址', isInput: true, tittle: false, selectType: {type: 'pop', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: permanentAddressDetails, holder: '永久居住详细地址', isInput: true, tittle: false, selectType: false, paste: true, icon: ''},
        {name: '', model: employer, holder: '雇主名称', isInput: true, tittle: false, selectType: false, paste: true, icon: '', disabled: email.value === ''},
        {name: '', model: work, holder: '工作性质', isInput: true, tittle: false, selectType: {type: 'ul', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: email.value === ''},
        {name: '', model: wechatAcc, holder: '请输入微信号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: whatsAppAcc, holder: '请输入WhatsApp号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: facebookAcc, holder: '请输入Facebook号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: telegramAcc, holder: '请输入Telegram号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: lineAcc, holder: '请输入Line号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: twitterAcc, holder: '请输入Twitter号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: threadsAcc, holder: '请输入Threads号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: insgramAcc, holder: '请输入Insgram号', isInput: true, tittle: false, selectType: false, paste: false, icon: '', disabled: true},
        {name: '', model: birth, holder: '生日', isInput: false, tittle: true, selectType: false, paste: false, icon: '', disabled: birth.value === ''},
        {name: '', model: birthday, holder: '年 月 日', isInput: true, tittle: false, selectType: {type: 'pop', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: ''},
        {name: '', model: registDate, holder: '注册日期', isInput: true, tittle: true, selectType: false, paste: false, icon: ''},
    ]
})