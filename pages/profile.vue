<template>
    <div class="profile-content">
        <div class="profile-header">
            <van-icon @click="navigateTo('/myInfo')" name="arrow-left"  />
            <span>个人资料</span>
        </div>
        <div class="profileBody">
            <div class="avatorArea">
                <div class="avator">

                </div>
                <div class="avator_right">
                    <div class="setAvator">
                        设置
                    </div>
                    <div class="copyId">
                        ID: 1234564879
                    </div>
                </div>
            </div>
            <div class="profileInputsPlace">
                <div class="profileInput" v-for="item in profileInput" :key="item.holder">
                    <!-- 显示标题 -->
                    <p class="input_tittle" v-if="item.tittle">{{ item.holder }}</p>

                    <!-- 显示选择器菜单 -->
                    <el-select 
                    v-else-if="typeof item.selectType === 'object' && item.selectType.type === 'ul'"
                    v-model="item.model.value" 
                    :placeholder="item.holder" 
                    >
                        <el-option
                        v-for="option in item.selectType.options"
                        :key="option.value"
                        :label="option.value"
                        :value="option.value"
                        />
                    </el-select>

                    <!-- 显示输入框 -->
                    <el-input
                    v-else-if="item.isInput"
                    :disabled="false"
                    v-model="item.model.value"
                    :placeholder="item.holder"
                    :prefix-icon="item.icon"
                    clearable
                    />
                </div>
            </div>
        </div>
        <div class="profile-footer">
            <button @click="navigateTo('/myInfo')">上一页</button>
            <button>保存</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: 'mine',
    });
    const router = useRouter();
    const showInfo = ref('');
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
        {name: '', model: birth, holder: '生日', isInput: false, tittle: true, selectType: false, paste: false, icon: ''},
        {name: '', model: birthday, holder: '年 月 日', isInput: true, tittle: false, selectType: {type: 'pop', options: [{value: 'hotto'}, {value:'123456789'}, {value: '+63 98***47'}]}, paste: false, icon: '', disabled: birthday.value === ''},
        {name: '', model: registDate, holder: '注册日期', isInput: true, tittle: true, selectType: false, paste: false, icon: '', disabled: false},
    ]
</script>

<style scoped>
    .profile-content {
        height: 100vh;
        width: 100%;
        background-color: var(--bg_1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .profile-content input {
        text-align: start;
    }
    input{
        text-align: start;
    }
    .profile-footer {
        background-color: var(--bg_2);
        position: absolute;
        width: 100%;
        padding: 1rem .3rem;
        bottom: 0;
        height: 9vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .profile-header {
        padding: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 7vh;
        background-color: var(--bg_2);
        color:var(--lead);
        font-size: 1.2rem;
    }
    .profileBody {
        padding: .7rem;
        padding-bottom: 9.5vh;
        overflow-y: scroll;
        flex: 1;
    }
    .avatorArea {
        display: flex;
        align-items: center;
        color: var(--lead);
        font-size: .8rem;
    }
    .avator {
        width: 4.4rem;
        height: 4.4rem;
        background-color: pink;
        margin-right: .7rem;
    }
    .avator_right div{
        text-align: start;
        font-size: .8rem;  
        line-height: 1.2rem;   
    }
    .profile-footer button:first-child {
        background-color:transparent;
        color: var(--primary);
    }
    .profile-footer button {
        border: 1px solid var(--primary);
        color: var(--text_accent3);
        flex: 1;
        margin: 0 .3rem;
        height: 100%;
        border-radius: .5rem;
    }
    .profile-header .van-icon {
        position: absolute;
        font-size: 1.3rem;
        left: .7rem;
        color: var(--neutral_1)
    }
    .profile-content .el-input__wrapper {
        width: 100%;

    }
    .profile-content .el-input .el-input__icon {
        width: 2rem;
        height: 2rem;
    }
    .input_tittle {
        color: var(--lead);
        font-size: .9rem;
        text-align: start;
        margin-top: .7rem;
    }
</style>