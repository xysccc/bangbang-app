<template>
<div class="wyy_wrapped">
  <status-bar/>
  <top-bar :topBarLab="topTitle"/>
  <div class="container">
    <van-swipe class="my-swipe" indicator-color="white" :loop="false" @change="onChange" :show-indicators="false">
    <template  v-for="(item,index) in data" :key="index">
      <van-swipe-item v-if="!isShow">
        <div class="main" >


            <div class="img_wrapped">
              <img :src="item.cover" alt="">
            </div>
            <div class="songName">
              {{item.song}}
            </div>
            <div class="singName">
              {{item.sing}}
            </div>
            <div class="mainBuzz">
              <div class="mainText">{{item.content.replace(/n/g,',')}}</div>
              <div class="music">
                <!--          <iframe :src="data.url"></iframe>-->
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86  :src="item.src" ref="audioRef"></iframe>
              </div>
              <div class="textPerson">来自 @{{item.name}}</div>
            </div>
          </div>

      </van-swipe-item>
    </template>
      <van-swipe-item v-if="isShow" >
<!--        <van-loading type="spinner" color="#1989fa"-->
<!--        >预计20s左右,请耐心等待哦~~</van-loading>-->

      <div class="svg" ref="animation1" style="margin-top: 95px;background-color:rgba(255,255,255,0.57);">

      </div>
        <div class="lab" style="font-size: 17px;display: flex;justify-content: center;background-color:rgba(255,255,255,0.57);height: 40px;align-items: center;"> 预计5s左右,请耐心等待哦~~</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { nextTick, onMounted, ref } from "vue";
import { api_wyyMusic } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";
import lottie from "lottie-web";
import loading from "@/assets/json/loading.json";
mui.back=function () {
  router.back()
}
const animation1:any=ref(null)
onMounted(()=>{
  lottie.loadAnimation({
    container: animation1.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: loading,//渲染动效json
  })
})
const topTitle = ref('网易热评')
const data:any=ref([])
let itemData:any={}
const src=ref('')
const audioRef:any=ref('')


const getMusic=async (total:number)=>{
const timer:any =setInterval(async ()=>{
    const {data:res}=await api_wyyMusic().catch(err=>{
      clearInterval(timer)
      Toast.clear()
      Toast.fail('请求失败!请稍后访问')
      router.push('/home/index')
    })
  console.log(res)
    itemData=res.data
    itemData.src=`https://music.163.com/outchain/player?type=2&id=${res.data.id}&auto=0&height=66`
    if (data.value.length<total){
       data.value.push(itemData)
    }else{
      isShow.value=false
      clearInterval(timer)
    }
    if (data.value.length===total){
      Toast.clear()
    }
  },2000)

}
getMusic(3)
const onChange = (index:number) => {
  if (data.value[index-1]){
    audioRef.value[index-1].src=data.value[index-1].src
  }
if (data.value[index+1]){
  audioRef.value[index+1].src=data.value[index+1].src
}

  if(index+1===data.value.length){
    isShow.value=false
    getMusic(data.value.length+5)
  }
  if (index+1===data.value.length){
    Toast.loading({
      message:'别着急,在拼命加载~',
      forbidClick:true
    })
    Toast.setDefaultOptions({duration:60000})
  }
}
const isShow=ref(true)
</script>

<style scoped lang="less">
.wyy_wrapped{
  height: 100vh;
  //background-color: rgba(204, 204, 204, 0.1);
  background-size:cover;
  background: url("@/assets/img/wyyBgc.jpg") center center;
  backdrop-filter: blur(50px);
  background-position: center -285px;
  :deep(.van-loading.van-loading--spinner){
    background-color: #fff;
    border-radius: 5px;
  }
  .container{
    .van-swipe-item{
      width: 100vw !important;
    }
    margin-top: 70px;
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    .main{

      border-radius: 10px;
      margin-left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      width: 70%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.42);
      box-shadow: 0 0 4px 3px rgba(225, 219, 219, 0.69);
      .img_wrapped{
        margin-top: 15px;
        width: 140px;
        height:140px;
        img{
          display: block;
          box-shadow: 0 0 4px 3px rgba(225, 219, 219, 0.69);
          border-radius: 100%;
          width: 100%;
          height: 100%;
        }
      }
      .songName{
        text-align: center;
        margin-top: 25px;
        font-size: 18px;
        color: #000;
        font-weight: 600;
        font-family: "Arial","Microsoft YaHei UI",serif;
      }
      .singName{
        font-size: 15px;
        color: #929090;
        font-family: Gadugi,serif;
      }
      .mainBuzz{
        //margin-top: 20px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        height: 280px;
        //background-color:red;
        padding: 20px 10px;
        .mainText{
          font-size: 14px;
          padding: 0 15px;
          font-family: 方正清刻本悦宋简体,serif;
          text-overflow: ellipsis;
          height: 180px;
          overflow-y: scroll;
        }
        .textPerson{
          margin-top: 15px;
          text-align: center;
          letter-spacing: 1px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
