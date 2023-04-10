<template>
<div>
  <status-bar/>
  <!--  加载动画-->
  <loading-cps ref="crx"/>
  <!--    顶部导航栏-->
  <van-config-provider :theme-vars="topBar">
    <van-nav-bar  title="设置你的密码">
    </van-nav-bar>
  </van-config-provider>
  <div class="bd">
  <div class="placeholder_1"></div>
    <div class="input_wrapped">
      <p>密码</p>
      <van-form @submit="reg">
        <van-field
            v-model="password"
            type="password"
            placeholder="请设置密码"
            name="设置密码"
            :rules="[{ pattern:patterPassword, message: '密码至少八个字符，至少一个字母和一个数字' }]"
        >
          <template #left-icon>
            <img src="@/assets/img/lock.png" style="width: 24px;height: 24px;">
          </template>
        </van-field>
        <p>确认密码</p>
        <van-field
            v-model="repeatPassword"
            type="password"
            placeholder="重复密码"
            name="重复密码"
            :rules="[{ required:true, validator:validatorRepeatPassword, message: '两次密码输入不一致' }]"
        >
          <template #left-icon>
            <img src="@/assets/img/lock.png" style="width: 24px;height: 24px;">
          </template>
        </van-field>
        <!--        提交的按钮-->
        <van-button class="loginBtn" :disabled="loginBtnIsDisabled"  :style="loginBtnIsDisabled?'opacity:.3':'opacity:1'" native-type="submit">
          <div class="btnLabel">下一步</div>
        </van-button>
      </van-form>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import LoadingCps from '@/components/LoadingCps.vue'
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { api_reg } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
//接收路由传过来的qq邮箱
// const route = useRoute()
// const email=ref()
// email.value=route.query.email
const email_store=store.regInfo.nowRegEmail
//加载动画的ref
const crx = ref<any>()
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '16px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}

//禁用/启用按钮 默认禁用
const loginBtnIsDisabled=ref(true)

const password = ref('')
const repeatPassword = ref('')
const patterPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
watch([password,repeatPassword],(newVal,oldVal)=>{
  //禁用/启用登录按钮逻辑
  loginBtnIsDisabled.value = !(patterPassword.test(password.value) && password.value === repeatPassword.value);
})
//重复密码的函数验证
const validatorRepeatPassword: any = (val: any) => {
  if (password.value !== repeatPassword.value) {
    return false
  }
}
const reg=(values:object)=>{
  loginBtnIsDisabled.value=true
  if (values){
      api_reg({
        email:email_store,
        password:password.value
      }).then((res:any)=>{
        if (res.code!==1){
          //失败
          loginBtnIsDisabled.value=false
          Toast.fail(`${res.message}`)
          crx.value.loading1.clear()
        }else {
          crx.value.loading1.clear()
          mui.toast(`注册成功`)
          router.push('/login')
        }
      })
  }
}
</script>

<style scoped lang="less">
.bd{
  width: 100vw;
  height: 90.32vh;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  .placeholder_1{
    height: 10.81vh;
  }
  .input_wrapped{
    margin-left: 24px;
    width: 327px;
    height: 85px;
    .van-cell {
      border: 1px solid rgba(226, 232, 240, 1);
      border-radius: 16px;
      margin: 15px 0;
    }
  }
  .loginBtn {
    width: 327px;
    height: 56px;
    border-radius: 32px;
    background: rgba(37, 99, 235, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 8px 8px 8px;
    margin-top: 16.67vh;
    .van-button__content {
      width: 50px;
      height: 24px;
      opacity: 1;
      .van-button__text {
        .btnLabel{
          color: #ffffff ;
          text-shadow: 0 2px 4px rgba(0, 0, 0, .25);
          font-size: 16px;
        }

      }

    }


  }
}

</style>
