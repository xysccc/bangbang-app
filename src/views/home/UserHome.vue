<template>
  <div class="home_Wrapped" style="height: 100vh;">
<!--    <div class="div" ref="animation1"></div>-->
    <router-view/>

      <div class="fb" ref="animation1" @click="router.push('/bang/release')"></div>
      <van-tabbar route active-color="#627df1">
        <van-tabbar-item replace to="/home/index">
          <span style="font-size: 15px">首页</span>
          <template #icon="props">
            <svg class="icon" aria-hidden="true" :class="props.active ? 'blue':''" style="font-size: 32px">
              <use xlink:href="#icon-a-shouye1"></use>
            </svg>

          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/home/shortVideo">
          <span style="font-size: 15px">看看</span>
          <template #icon="props">
            <svg class="icon" aria-hidden="true" :class="props.active ? 'blue':''" style="font-size: 32px">
              <use xlink:href="#icon-remen"></use>
            </svg>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
        </van-tabbar-item>
        <van-tabbar-item replace to="/home/message" :badge="noRead">
          <span style="font-size: 15px">信息</span>
          <template #icon="props">
            <svg class="icon" aria-hidden="true" :class="props.active ? 'blue':''" style="font-size: 32px">
              <use xlink:href="#icon-xiaoxi"></use>
            </svg>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/home/my" >
          <span style="font-size: 15px">我的</span>
          <template #icon="props">
            <svg class="icon" aria-hidden="true" :class="props.active ? 'blue':''" style="font-size: 32px">
              <use xlink:href="#icon-wode"></use>
            </svg>
          </template>
        </van-tabbar-item>
      </van-tabbar>



  </div>

</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useStore } from "@/stores";
import { store } from "@/utils/useStore";
import lottie from "lottie-web"
import personHello from "@/assets/json/personHelloJson.json"
import recommend from "@/assets/json/addJson.json"
import click from "@/assets/json/recommendedJson.json"
import add from "@/assets/json/clickJson.json"
import { api_cx_chatList } from "@/request/api";
import { Toast } from "vant";
const animation1:any = ref(null) //获取dom
onMounted(() => {
    // mui.init();
    let clickNum = 0;
    mui.back = function() {
      clickNum++;
      if(clickNum > 1) {
        plus.runtime.quit();
      } else {
        mui.toast("再按一次退出帮帮哟~~");
      }
      setTimeout(function() {
        clickNum = 0
      }, 2000);
      return false;
    }
  lottie.loadAnimation({
    container: animation1.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: add,//渲染动效json
  })

  //取消动画
  document.querySelector('.home_Wrapped')!.classList.remove("animate__animated", "animate__bounceInRight")

})

const blue = ref('')



interface Footer<T> {
  imgSrc?: T,
  text?: T,
  styleStr?:T,
  imgSrc1?:T,
  isSelect?: boolean
}

const footerList = reactive<Footer<string>[]>([
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1Eqmt.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1Exfg.png',
    styleStr:'width:27.5px;height:22.5px',
    text: "首页",
    isSelect: false

  },
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1EOTf.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1EL0P.png',
    styleStr:'width:25.5px;height:25.5px',
    text: "信息",
    isSelect: false
  },
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1EvtS.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1Ejk8.png',
    text: "我的",
    isSelect: false,
    styleStr:'width:18.5px;height:24.8px',
  },
])
const noRead:any=ref(null)
const getMessageList=async ()=>{
  const res:any=await api_cx_chatList()
  if (res.code!==1) return Toast.fail('获取未读消息失败 ')
  noRead.value= res.result.reduce(((oldVal:any,newVal:any)=>{
    oldVal+=newVal.isRead
    return oldVal
  }),0)
  if (noRead.value===0){
    noRead.value=null
  }
}
getMessageList()
store.getMessage=getMessageList
const getChatList=async ()=>{
  const res:any=await api_cx_chatList()
  if (res.code!==1) return Toast.fail('获取消息列表失败')
  store.getMessage()
}
store.getChatList=getChatList
</script>

<style scoped lang="less">
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.blue{
  color: #627df1;
}
:deep(.van-tabbar.van-tabbar--fixed.van-hairline--top-bottom.van-safe-area-bottom){
  border-top: 1px solid #cccccc;
  padding: 10px 0;
}

  .fb{
    position: absolute;
    bottom: 0;
    width: 120px;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
