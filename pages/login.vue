<template>
  <div class="login-page">
    <main>
      <form action="#" method="post" class="formContent">
        <p class="loginTypeText">支持邮箱/账号登陆</p>
        <div class="input_place">
          <el-input
            v-model="account"
            placeholder="请输入邮箱/账号"
            :maxlength="16"
            clearable
            @focus.once="accountTouched = true"
          >
            <template #prefix>
              <van-icon name="contact" />
            </template>
          </el-input>
          <p class="input_alert" v-show="!accountStatus.isLegal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
            </svg>
            请输入邮箱/帐号
          </p>
        </div>
        <div class="input_place">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            :maxlength="16"
            clearable
            type="password"
            show-password
            @focus.once="passwordTouched = true"
          >
            <template #prefix>
              <van-icon name="lock" />
            </template>
          </el-input>
          <p class="input_alert" v-show="!passwordStatus.isLegal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
            </svg>
            8-16位, 英文/数字/符号
          </p>
          <label for="rememberLoginAcc" class="remember">
            <input type="checkbox" :checked="rememberLoginAcc">
            <span>记住账号/密码</span>
          </label>
        </div>
      </form>
      <van-button 
      :loading="isBtnLoading"
      text="登陆"
      type="primary" 
      @click="submitLogin"
      />
      <div class="loginSelect">
        <div class="contactTryPlay">
          <span  v-for="item in loginHelps" 
          :key="item.text"
          @click="item.action"
          >
            {{ item.text }}
          </span>
        </div>
        <div class="thirdPartyLogin">
          <span>绑定登陆</span>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import {useLoginRegist} from '~/stores/loginRegist'
const loginstore = useLoginRegist();
definePageMeta({
  layout: 'login-regist', 
});
  const rememberLoginAcc = ref(true);
  const account = ref('');
  const password = ref('');
  // 账号密码类型/合法 
  const accountTouched = ref(false);
  const passwordTouched = ref(false);
  const accountStatus = computed(() => {
    if (!accountTouched.value) {
      return {type: 0, isLegal: true}
    }
    return loginstore.checkAcc(account.value);
  });
  const passwordStatus = computed(() => {
    if (!passwordTouched.value) {
      return {isLegal: true}
    }
    return loginstore.checkPaw(password.value);
  });
  const isBtnLoading = ref(false)
  const loginHelps = reactive([
    {text: '联系客服', action: () => window.open('https://t.me/mmisharkk', '_blank', 'noopener,noreferrer')},
    {text: '免费试玩', action: () => showToast({ message: '功能维护中', icon: 'warning'})},
    {text: '忘记密码', action: () => showToast({ message: '重新注册吧', icon: 'warning'})}
  ])
  async function submitLogin() {    
    accountTouched.value = passwordTouched.value = true
    if (loginstore.checkAcc(account.value).isLegal && loginstore.checkPaw(password.value).isLegal) {
      console.log(loginstore.checkAcc(account.value));
      
      isBtnLoading.value = true;
      const loginInfo = {
        username: account.value,
        password: password.value
      }
      try {
        const res = await fetch('https://hmajax.itheima.net/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: JSON.stringify(loginInfo)
        })
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        showToast({
          message: '登陆成功',
          icon: 'checked',
        });
        loginstore.loginSucess(account.value);
        navigateTo('/')
      } catch (error:any) {
        showToast({
          message: error.message,
          icon: 'clear',
        });
      } finally {
        isBtnLoading.value = false;
      }
    } else {

    }
  }

</script>

<style scoped>
  @import '~/components/styles/loginRegist.css';
</style>
