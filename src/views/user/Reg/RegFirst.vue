<template>
<div>
  <status-bar/>
<!--  加载动画-->
  <loading-cps ref="crx"/>
  <!--    顶部导航栏-->
  <van-config-provider :theme-vars="topBar">
    <van-nav-bar @click-left="onClickLeft">
      <!--        自定义顶部返回按钮图案-->
      <template #left>
        <van-icon name="arrow-left" size="20px" color="#000"/>
      </template>
    </van-nav-bar>
  </van-config-provider>
  <div class="bd">
    <div class="font_box">
      <p>输入你的QQ邮箱地址</p>
      <h4>我们会给您发送一个验证码来确认您的身份</h4>
    </div>
<!--    占位1-->
    <div class="placeholder_1"></div>
    <div class="input1_wrapped">
      <p>QQ邮箱</p>
      <van-form @submit="getCode">
        <van-field
            v-model="email"
            type="text"
            placeholder="请输入QQ邮箱"
            name="QQ邮箱"
            :rules="[{ pattern:patternEmail, message: '请输入合法qq邮箱' }]"
        >
          <template #left-icon>
            <img src="@/assets/img/Message.png" style="width: 24px;height: 24px;">
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
import LoadingCps from '@/components/LoadingCps.vue'
import { onMounted, ref, watch } from "vue";
import { api_getCode } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
import StatusBar from '@/components/StatusBar.vue'
const btbLabel=ref('下一步')
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
const onClickLeft = () => history.back();

const email = ref('')
const patternEmail = /^[1-9][0-9]{4,10}@qq.com$/
//加载动画的ref
const crx = ref<any>()
//禁用/启用按钮 默认禁用
const loginBtnIsDisabled=ref(true)
watch(email,(newVal,oldVal)=>{
  //禁用/启用登录按钮逻辑
  loginBtnIsDisabled.value = !(patternEmail.test(email.value) && patternEmail.test(email.value));
})
//获取验证码
const getCode=(values:object)=>{
  if (values){
    store.regInfo.nowRegEmail=email.value
    router.push({
      path:'/reg/reg2',
    })
    // crx.value.loading1.true()
    // //发送请求
    // api_getCode({
    //   "email": email.value,
    // }).then((res: any) => {
    //   console.log(res)
    //
    //   // if (res.code!==1) return Toast.fail('获取验证码失败')
    //   // crx.value.loading1.clear()
    //   if (res.code !== 1) {
    //     Toast.fail(`${res.message}`)
    //     crx.value.loading1.clear()
    //   } else {
    //     crx.value.loading1.clear()
    //     mui.toast(`发送验证码成功`)
    //     router.push({
    //       path:`/reg/reg2`,
    //       query: {email:email.value}
    //     })
    //   }
    // }).catch(
    //     err => {
    //       Toast.fail('验证码发送失败,请检查邮箱是否正确')
    //       crx.value.loading1.clear()
    //     }
    // )
  }
}
onMounted(()=>{
  email.value=store.regInfo.nowRegEmail
})
</script>

<style scoped lang="less">
.bd{
  width: 100vw;
  height: 90.32vh;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  .font_box{
    margin-left: 24px;
    padding-top: 16px;
    width: 297px;
    height: 64px;
    display: flex;
    flex-flow: column nowrap;
    p{
      font-size: 24px;
      font-weight: 400;
      letter-spacing: 0.3px;
      line-height: 31.2px;
      color: rgba(15, 23, 42, 1);
      text-align: left;
    }
    h4{
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 21px;
      color: rgba(100, 116, 139, 1);
      text-align: left;
    }
  }
  .placeholder_1{
    height: 5.73vh;
  }
  .input1_wrapped{
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
