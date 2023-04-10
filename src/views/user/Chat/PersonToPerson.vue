<template>
<div class="chat_wrapped" >
  <status-bar style="background-color:#fff;"/>
  <van-config-provider :theme-vars="topBar">
    <van-nav-bar :title="otherPartyInfo.username" @click-left="onClickLeft"
                 left-arrow
    >
      <template #right>
        <img :src="otherPartyInfo.head" style="width: 36px;height: 36px;border-radius: 100%">
      </template>
<!--                 @click-right="goBangForm"-->
    >
    </van-nav-bar>
  </van-config-provider>
  <div class="otherPartyCard">
  <div class="name">对方昵称:{{otherPartyInfo.username}}</div>
    <div class="phone">
      对方电话号码:{{otherPartyInfo.phone}}
    </div>
    <div class="personHello" ref="animation1"></div>
  </div>
  <div class="chatList" ref="chatListRef">
    <div class="chatItem " v-for="(item,index) in chatInfo" :key="item.id" :class="[item.fromId===myInfo.id?'chatItem_rg':'chatItem_lf']">
      <div class="message">{{item.lastContext
        }}</div>
      <img :src="[item.fromId===myInfo.id?`${myInfo.head}`:`${otherPartyInfo.head}`]" alt="">
    </div>
  </div>
  <div class="chat_footer">
  <div class="chatInput">
    <input type="text" placeholder="说点什么吧" v-model="inputVal">

      <transition name="xys2">
        <svg class="icon" aria-hidden="true" v-show="isShowFs" :class="isShowFs?'fs':''" @click="sendMessage">
          <use xlink:href="#icon-fasong"></use>
        </svg>
      </transition>
    <transition name="xys1">
    <svg class="icon" :class="isShowFs?'':'fs'" aria-hidden="true" v-show="!isShowFs" @click="sendMessage">
      <use xlink:href="#icon-fasong-copy-copy"></use>
    </svg>
    </transition>
  </div>
  </div>
</div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import { api_cx_chat, api_cx_person } from "@/request/api";
import { Toast } from "vant";
import { nextTick, onMounted, onUpdated, reactive, ref, watch } from "vue";
import StatusBar from '@/components/StatusBar.vue'
// import '//at.alicdn.com/t/c/font_3680670_ylo3awxxz1k.js'
import { store } from "@/utils/useStore";
import { getTime } from "@/utils/time";
import personHello from "@/assets/json/personHelloJson.json"
import lottie from "lottie-web";
import router from "@/router";
mui.back = function() {
  router.back()
}
const animation1:any=ref(null)
onMounted(()=>{
  lottie.loadAnimation({
    container: animation1.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: personHello,//渲染动效json
  })
})
//聊天显示区域的ref
const chatListRef:any=ref(``)
//返回箭头
const onClickLeft = () => history.back();
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',
}
const route=useRoute()

const myInfo:any=store.userInfo
const chatInfo:any=ref([])

// const socketUrl=`ws://114.116.95.152:3326/im/${route.query.id}`
// const socket=new WebSocket(socketUrl)
let socket:any;
function openSocket() {
  if(typeof(WebSocket) == "undefined") {
    console.log("您的浏览器不支持WebSocket");
  }else{
    console.log("您的浏览器支持WebSocket");
    //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
    //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
    //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
    let socketUrl=`ws://114.116.95.152:3326/im/${  myInfo.id}`
    console.log(socketUrl);
    if(socket!=null){
      socket.close();
      socket=null;
    }
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function() {
      console.log("websocket已打开");
      //socket.send("这是来自客户端的消息" + location.href + new Date());
    };
    //获得消息事件
    socket.onmessage = function(msg:any) {
      store.getChatList()
      const socketData = JSON.parse(msg.data);
          chatInfo.value.push({
            fromId:socketData.result.fromUserId,
            toId:socketData.result.toUserId,
            isRead:1,
            lastContext:socketData.result.contentText,
            sendTime:getTime(new Date()),
          })
      //发现消息进入  开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function(e:any) {
      console.log("websocket已关闭");
      console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    };
    //发生了错误事件
    socket.onerror = function() {
      console.log("websocket发生了错误");
    }
  }
}
function sendMessage() {
  chatListRef.value.scrollTop=chatListRef.value.scrollHeight
  if (typeof WebSocket == 'undefined') {
    console.log('您的浏览器不支持WebSocket')
  } else {
    console.log('您的浏览器支持WebSocket')

        chatInfo.value.push({
          fromId:myInfo.id,
          toId:otherPartyInfo.id,
          isRead:1,
          lastContext:inputVal.value,
          sendTime:getTime(new Date()),
        })


    socket.send(
        '[{"toUserId":"' +
        route.query.id +
        '","contentText":"' +
        inputVal.value +
        '"}]'
    )
  }
  inputVal.value=``
}

  api_cx_chat({fromId:myInfo.id,toId:route.query.id}).then((res:any)=>{
    if (res.code!==1){
      Toast.fail('查询聊天记录失败')
    }else {
      chatInfo.value=res.result
      openSocket()
    }
  })

const otherPartyInfo:any=ref([])
api_cx_person({
  id:route.query.id
}).then((res:any)=>{
  if (res.code!==1) return Toast.fail('获取发布人信息失败')
  otherPartyInfo.value=res.result
})
const isShowFs=ref(false)
const inputVal=ref('')
watch(inputVal,(newVal,oldVal)=>{
  isShowFs.value = !!newVal;
})
onUpdated(()=>{
    chatListRef.value.scrollTop=chatListRef.value.scrollHeight
})
onMounted(()=>{

})
</script>

<style scoped lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.chat_wrapped{
  height: 100vh;
  background-color: #fff;
}
.otherPartyCard{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
  margin-top: 13px;
  width: 344px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 40px 0px rgba(26, 77, 160, 0.16);
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  .name{
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2.5px;
    color: rgba(0, 0, 0, 1);
  }
  .phone{
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 1);
  }
  .personHello{
    width: 100px;
    position: absolute;
    right: 0;
  }
}
.chatList{
  border-top: 1px solid  rgba(234, 236, 239, 1);
  padding: 37px 20px 15px;
  margin-top: 20px;
  width: 100vw;
  height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
  .chatItem{
    margin-top: 15px;
  }
  .chatItem_rg{
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    img{
      width: 36px;
      height: 36px;
      border-radius: 100%;
    }
    .message{
      letter-spacing: .6px;
      padding: 5px 15px;
      margin-right: 18px;
      max-width: 261px;
      min-height: 30px;
      background: rgba(255, 231, 174, 1);
      border-radius: 10px;
      font-size: 15px;
      color: rgba(63, 72, 112, 1);
      font-family: 'Helvetica Neue', Helvetica, sans-serif;
    }
  }
  .chatItem_lf{
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    img{
      width: 36px;
      height: 36px;
      border-radius: 100%;
    }
    .message{
      padding: 5px 15px;
      letter-spacing: .6px;
      margin-left: 18px;
      max-width: 261px;
      min-height: 30px;
      height: auto;
      background: rgba(236, 243, 254, 1);
      border-radius: 10px;
      font-size: 15px;
      color: rgba(63, 72, 112, 1);
      font-family: 'Helvetica Neue', Helvetica, sans-serif;
    }
  }
}
.chat_footer{
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 64px;
  overflow:hidden;
  background: rgba(249, 249, 249, 1);
  .chatInput{
    display: flex;
    width: 100%;
    padding-right: 17px;
    align-items: center;
    input{
      flex: 1;
      margin-left: 36px;
      height: 38px;
      font-size: 14px;
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(243, 243, 243, 1);
      border-radius: 19px;
      &::placeholder{
        font-size: 14px;
        color: rgba(83, 88, 110, 0.6);
      }
    }
    .xx{
      font-size: 25px;
      margin-left: 15px;
    }
    .fs{
      font-size: 25px;
      margin-left: 20px;
    }
  }

}

.xys1-enter-active,
.xys1-leave-active {
  transition: all 1s ;
}
.xys2-enter-active,
.xys2-leave-active {
  transition: all 1s ;
}
.xys2-enter-from,.xys2-leave-to{
  opacity: 0;
}
.xys2-enter-to,.xys2-leave-from{
  opacity: 1;
}
.xys1-enter-from,.xys1-leave-to{
  opacity: 0;
}
.xys1-enter-to,.xys1-leave-from{
  opacity: 1;
}
.xys1-move{
  transition: all;
}
.xys2-move{
  transition: all;
}
.xys1-leave-active {
  transition: all;
  /*添加定位 删除的时候才有动画*/
  position: absolute;
}
.xys2-leave-active {
  transition: all;
  /*添加定位 删除的时候才有动画*/
  position: absolute;
}
</style>
