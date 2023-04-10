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
      <p>请输入你的验证码</p>
      <h4>输入你的4位验证码，在创建账户时使用</h4>
    </div>
<!--    输入验证码的框-->
    <van-password-input
        :value="value"
        :length="4"
        :gutter="20"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
    style="margin-top: 61px;" />
<!--    数字键盘-->
    <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="showKeyboard = false"
    />
<!--    重新发送验证码-->
    <div class="repeatSendCode" >
      <span class="kfs" v-show="timerInfo.isActive" @click="getCode">重新发送验证码</span>
      <span class="bxfs" v-show="!timerInfo.isActive">{{timerInfo.count}}s后重新发送</span>
    </div>
    <home-button :label="btnLabel" style="margin-top: 12.21vh" @click="go"/>
  </div>
</div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import LoadingCps from '@/components/LoadingCps.vue'
import { onMounted, ref } from "vue";
import { api_getCode, api_yzCode } from "@/request/api";
import router from "@/router";
import { Toast } from "vant";
import HomeButton from "@/components/HomeButton.vue";
import { store } from "@/utils/useStore";
//接收路由传过来的qq邮箱
// const route = useRoute()
// const email=ref()
// email.value=route.query.email
const email_store=store.regInfo.nowRegEmail
//短信验证码框
const value = ref('');

const showKeyboard = ref(true);
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
//返回箭头
const onClickLeft = () => history.back();
//按钮文字
const btnLabel=ref('下一步')
//加载动画的ref
const crx = ref<any>()

//在pinia中拿到定时器相关的值
const timerInfo:any=store.getTimerInfo


//60s倒计时函数
const countDown = () => {
  const storeTimeInfo=store.timeInfo
  console.log('调用了倒计时函数')
  if (!timerInfo.timer) {
    storeTimeInfo.count = storeTimeInfo.time_count
    storeTimeInfo.isActive = false
    storeTimeInfo.timer= setInterval(() => {
      if (storeTimeInfo.count > 0 && storeTimeInfo.count <= storeTimeInfo.time_count) {
        storeTimeInfo.count--
      } else {
        clearInterval(storeTimeInfo.timer!)
        storeTimeInfo.isActive = true
        storeTimeInfo.timer = null
      }
    }, 1000)
  }

}
const getCode=()=>{
  countDown()
  //发送请求
  api_getCode({
    "email": email_store,
  }).then((res: any) => {
    console.log(res)

    // if (res.code!==1) return Toast.fail('获取验证码失败')
    // crx.value.loading1.clear()
    if (res.code !== 1) {
      Toast.fail(`${res.message}`)
      crx.value.loading1.clear()
    } else {
      crx.value.loading1.clear()
      mui.toast(`发送验证码成功`)
      router.push('/reg/reg2')
    }
  }).catch(
      err => {
        Toast.fail('验证码发送失败,请检查邮箱是否正确')
        crx.value.loading1.clear()
      }
  )
}
const go=()=>{
  crx.value.loading1.true()
  api_yzCode({
    email:email_store,
    code:value.value
  }).then((res:any)=>{
    if (res.code !== 1) {
      Toast.fail(`${res.message}`)
      crx.value.loading1.clear()
    } else {
      crx.value.loading1.clear()
      mui.toast(`验证码校验成功`)
      router.push({
        path:`/reg/reg3`,
      })
    }
  })
}
onMounted(()=>{
//   console.log(count.value)
  //页面加载时
//开启倒计时60s
  if (store.getTimerInfo.count===0){
    countDown()
    //发送请求
    api_getCode({
      "email": email_store,
    }).then((res: any) => {
      console.log(res)

      // if (res.code!==1) return Toast.fail('获取验证码失败')
      // crx.value.loading1.clear()
      if (res.code !== 1) {
        Toast.fail(`${res.message}`)
        crx.value.loading1.clear()
        router.push('/login')
      } else {
        crx.value.loading1.clear()
        mui.toast(`发送验证码成功`)
        router.push('/reg/reg2')
      }
    }).catch(
        err => {
          Toast.fail('验证码发送失败,请检查邮箱是否正确')
          crx.value.loading1.clear()
        }
    )
  }

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

     :deep(.van-password-input__security li){
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(96, 165, 250, 1) ;
    }
.repeatSendCode{
  margin: 25px 0 0 15px;
  .kfs{
    font-size: 14px;
    font-weight: 400;
    color: rgba(37, 99, 235, 1);
    text-align: left;
    vertical-align: top;
  }
  .bxfs{
    .kfs;
    color: #64748b;
  }
}


}

</style>

