<template>
<div class="message_wrapped">
  <status-bar style="background-color:#fff;"/>
  <div class="lab">
    <div class="label">消息</div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-tongzhi"></use>
    </svg>
  </div>
  <div class="search_wrapped">
    <div class="mui-input-row mui-search">
      <input type="search" class="mui-input-clear" placeholder="搜索">
    </div>
  </div>

  <div class="noMessage" v-if="isShow && chatList.length===0">
  </div>
  <div class="messageList" v-if="isShow" >
    <div class="message-item" v-for="(item,index) in chatList" :key="item.id" @click="goChat(item.id)">
      <div class="lf">
        <van-badge  dot :color="[item.login?'#2cc069':'#ccc']">
          <img :src="item.head" alt="">
        </van-badge>
      </div>
      <div class="rg">
        <div class="lab_time">
          <div class="label">{{item.name}}</div>
          <div class="time">{{getTime2(item.sendTime)
            }}</div>
        </div>
        <div class="mes_badge">
          <div class="message">{{item.lastMsg}} </div>
          <div class="badge" v-if="item.isRead!==0">{{item.isRead}}</div>
        </div>
      </div>
    </div>

  </div>
  <div style="margin-top: 120px;"  ref="animation3" v-else></div>
</div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import '@/assets/js/iconfont'
import { onMounted, ref } from "vue";
import { api_cx_chat, api_cx_chatList } from "@/request/api";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import {getTime2} from "@/utils/time";
import router from "@/router";
import lottie from "lottie-web";
import loading from "@/assets/json/loading.json";
const myInfo:any=store.userInfo
const chatList:any=ref( [])
const isShow=ref(false)
//处理数组的方法
function mapArray(target:any) {
  let obj:any = {};
  const result = [];
  target.map((item:any) => {
    let key = item.fromId;
    //如果有这个key，就push一个对象
    if (obj[key]) {
      obj[key].push(item);
      //如果没有这个key，就把对象设置成数组格式（方便后面push进去）
    } else {
      obj[key] = [item];
    }
  });
  //根据obj中有几个对象，挨个push进去，组成最后的数组
  for (const key in obj) {
    const element = obj[key];
    result.push(element);
  }
  return result;
}
const chatListNew=ref([])
const animation3:any = ref(null) //获取dom
onMounted(()=>{
  mui('.mui-input-row input').input();
  // api_cx_chatList().then((res:any)=>{
  //   if (res.code!==1) return Toast.fail('获取消息列表失败')
  //   isShow.value=true
  //   chatList.value=res.result
  //   console.log(chatList.value)
  //   store.getMessage()
  // })
  lottie.loadAnimation({
    container: animation3.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: loading,//渲染动效json
  })
})
const getChatList=async ()=>{
  const res:any=await api_cx_chatList()
  if (res.code!==1) return Toast.fail('获取消息列表失败')
  isShow.value=true
  chatList.value=res.result
  console.log(chatList.value)
  store.getMessage()
}
getChatList()

const goChat=(id:any)=>{
  router.push({
    path:'/chat',
    query:{id:id}
  })
}
</script>

<style scoped lang="less">

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.message_wrapped{
  height: 100vh;
  background-color: #fff;
  .lab{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 29px;
    height: 40px;
    .label{
    font-size: 25px;
      color: #222222;
    }
    svg{
      font-size: 20px;
    }
  }
  .search_wrapped{
    width: 327px;
    height: 36px;
    margin-left: 50%;
    margin-top: 16px;
    transform: translateX(-50%);
  }
  :deep(.mui-search.mui-active:before){
    top: 18px;
  }
  .messageList{
    overflow: scroll;
    height: 600px;
    margin-top: 16px;
    .message-item{
      margin-left: 24px;
      margin-top: 16px;
      width: 327px;
      height: 68px;
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid rgba(237, 237, 237, 1);
      .lf{
        width: 48px;
        height: 48px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        :deep(.van-badge.van-badge--top-right.van-badge--dot.van-badge--fixed){
          width: 16px;
          height: 16px;
        }
        :deep(.van-badge--top-right){
          top: 5px;
          right: 3px;
          border: 3px solid #fff;
        }
      }
      .rg{
        margin-left: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .lab_time{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .label{
            font-size: 16px;
            color: rgba(15, 24, 40, 1);
          }
          .time{
            font-size: 15px;
            color: #b8b9ba;
          }
        }
        .mes_badge{
          padding-right: 10px;
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .message{
            max-width: 200px;
            display: -webkit-box !important;
            overflow: hidden;
            word-break:break-all ;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font-size: 14px;
            color: rgba(173, 181, 189, 1);
          }
          .badge{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            height: 15px;
            border-radius: 100%;
            background-color: #ee0a24;
            color: #fff;
            font-weight: 600;
          }
        }
      }
    }
    :deep(.van-badge--dot){
      top: 40px;
      right: 10px;
      width: 13px;
      height: 13px;
    }
  }
  .noMessage{
    margin-top: 135px;
    width: 100%;
    height: 400px;
    background: url("https://s1.ax1x.com/2022/11/23/z8XTud.png") no-repeat;
    background-size: cover;
  }
}
</style>
