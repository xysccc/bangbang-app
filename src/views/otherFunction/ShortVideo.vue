<template>
<div style=" height: 100vh;overflow-y: hidden">

  <van-swipe style="height: 100vh;" vertical :show-indicators="false" :loop="false"  @change="onChange">
    <van-swipe-item v-for="(item,index) in VideoList" :key="index">
      <div class="main_wrapped" @click="playVideo(index)">
        <div class="video_wrapped" style="position: relative;">
          <video :src="item.playUrl"
                 ref="video1" @timeupdate="timeUpdate" :poster="item.coverUrl" ></video>
          <div class="icon_noPlay" v-show="!isPlay"><svg class="icon" aria-hidden="true"  >
            <use xlink:href="#icon-bofang"></use>
          </svg>
          </div>
          <van-progress :percentage="per" :show-pivot="false"/>

        </div>
        <div class="personInformation">
          <div class="lf">
            <div class="username">@ {{item.userName}}</div>

          </div>
          <div class="rg" style="display: flex;justify-content: space-between;align-items: center; width: 100%;">
            <div class="text">{{item.title}}</div>
            <div class="tx"><img :src="item.userPic" alt=""></div>
          </div>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>

</div>
</template>

<script lang="ts" setup>
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { nextTick, onMounted, ref } from "vue";
import { api_shortVideo,api_shortVideo1 } from "@/request/api";
import { store } from "@/utils/useStore";
store.getChatList()
onMounted(()=>{
  mui.init();
  mui.plusReady(function(){
    plus.navigator.setStatusBarStyle('light');
  });
})
const topTitle = ref('短视频')
const VideoList:any=ref([])
const queryList={page:0,size:20}
const getShortVideo=async ()=>{
const {data:res}=await api_shortVideo({
  page:queryList.page,
  size:queryList.size
})
  console.log('6间房',res.result.list)
  VideoList.value.push(...res.result.list.map((item:any)=>{
    return{
      id:item.id,
      title:item.title,
      userName:item.alias,
      userPic:item.picuser,
      coverUrl:item.picurl,
      playUrl:item.playurl
    }
  }))
  const {data:res1}=await api_shortVideo1({
    page:queryList.page,
    size:queryList.size
  })
  console.log('好看视频',res1.result.list)
  VideoList.value.push(...res1.result.list)
  //乱序
  VideoList.value.sort((a:any,b:any)=>{
    return Math.random()-0.5
  })
  console.log(VideoList.value)
}
getShortVideo()
const video1 = ref('')
const isPlay=ref(false)
const per=ref(0)

const playVideo=(index:any)=>{
  isPlay.value=!isPlay.value
  console.log(video1.value[index])
  if (video1.value[index].paused){
    video1.value[index].play()
  }else {
    video1.value[index].pause()
  }
}
//进度更新
const timeUpdate=(e:any)=>{
  // console.log(e.target.currentTime,e.target.duration)
  per.value=e.target.currentTime/e.target.duration*100
  if (per.value===100){
    e.target.play()
    per.value=0
  }
}
const onChange=(index:number)=>{
  console.log(video1.value)
  per.value=0
  nextTick(()=>{
    isPlay.value=true
  })
  video1.value[index].play()
  video1.value[index-1].src=VideoList.value[index-1].playUrl
  video1.value[index+1].src=VideoList.value[index+1].playUrl
  isPlay.value=false
  console.log(index)
  if (index+1+10===VideoList.value.length){
    console.log(123)
    queryList.page++
    getShortVideo()
  }
}
</script>

<style scoped lang="less">
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.main_wrapped{
  position: relative;
  background-color: #000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 770px;
  //background-color: red;
  .video_wrapped{
    position: relative;
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;


    video{
      width: 100%;
      height: auto;
    }
    .icon_noPlay{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 50px;
      height: 50px;
      svg{
        font-size: 50px;
        color: rgba(239, 231, 231, 0.61);
      }
    }

  }
  .personInformation{
    color: #fff;
    position: absolute;
    bottom: 65px;
    left: 0;
    padding: 10px 10px;
    width: 100%;
    margin-top: 50px;
    .username{
      font-size: 19px;
    }
    .text{
      padding: 5px;
      font-size: 16px;
    }
    .tx{
      img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
    }
  }
}
</style>
