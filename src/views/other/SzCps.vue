<template>
  <div class="sz_wrapped">
    <loading-cps ref="crx"/>
    <status-bar/>
<!--    顶部导航栏-->
    <van-config-provider :theme-vars="topBar">
      <van-nav-bar @click-left="onClickLeft">
        <!--        自定义顶部返回按钮图案-->
        <template #left>
          <van-icon name="arrow-left" size="20px" color="#000"/>
        </template>
      </van-nav-bar>
    </van-config-provider>
<!--    设置两个字-->
    <span class="label">设置</span>
    <ul>
      <li class="item" @click="sz">
        <div class="lf">关于我们</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>
      <li class="item">
        <div class="lf">通知</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>
      <li class="item">
        <div class="lf">支付详情</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>
      <li class="item">
        <div class="lf">服务条款</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>
      <li class="item">
        <div class="lf">常见问题</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>
      <li class="item">
        <div class="lf">管理账户</div>
        <div class="rg"><van-icon name="arrow" /></div>
      </li>

    </ul>
    <home-button :label="buttonLabel" @click="exit"/>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import HomeButton from '@/components/HomeButton.vue'
import LoadingCps from '@/components/LoadingCps.vue'
import { onMounted, ref } from "vue";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
import { api_exit } from "@/request/api";
onMounted(()=>{
  mui.back = function() {
    router.back()
  }
})
const crx=ref<any>()
const buttonLabel=ref('退出账号')
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
//退出登录
const exit = () => {
  new Promise(async resolve => {
    crx.value.loading1.true()
    //发送退出请求
    api_exit().then((res:any)=>{
      if (res.code!==1) return Toast.fail('退出失败')
      //退出成功
      crx.value.loading1.clear()
      //清空pinia的数据和localStorage的数据
      // localStorage.clear()
      store.$reset()

      store.setIsSelect('首页')
      router.push('/login')
    })
  })
}
const sz=()=>{
  mui.confirm('\n' +
      '联系电话：18671682176\n' +
      'QQ邮箱：949516815@qq.com\n' +
      '帮帮\n' +
      '发布帮忙、悬赏接单。互帮互助平台\n' +
      '本软件仅为测试使用，如果侵害到您的个人权益，请及时通过以上渠道与我们取得联系。我们一定会聆听您宝贵的经验，快点加入我们，让生活变得更加精彩吧！')
}
</script>

<style scoped lang="less">
.sz_wrapped{
  position: relative;
  height: 100vh;
  background-color: #ffffff;
  :deep(.bt_Wrapped){
    position: absolute;
    bottom: 50px;
    left: 0;
    .HomeButton{
      border-radius: 10px;
      width: 315px;
      height: 46px;
    }
  }
}
.label{
  display: inline-block;
  margin-left: 30px;
  margin-top: 30px;
  width: 48px;
  height: 36px;
  opacity: 1;
  /** 文本1 */
  font-size: 24px;
  font-weight: 400;
  color: rgba(50, 54, 67, 1);
}
ul{
  margin-top: 43px;
}
ul .item{
  width: 100vw;
  height: 21px;
  display: flex;
  justify-content: space-between;
  padding: 0 35px;
  margin-top: 36px;
  .lf{
    width: 100px;
    height: 21px;
    /** 文本1 */
    font-size: 14px;
    font-weight: 400;
    color: rgba(50, 54, 67, 1);
  }

}
</style>
