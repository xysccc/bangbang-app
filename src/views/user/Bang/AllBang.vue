<template>
  <div class="allBang_wrapped">
    <status-bar/>
    <top-bar :topBarLab="topLab"/>
    <div class="vanTaboneInfo">
      <!--      基本信息start-->
      <div class="top">
        <span class="bang_type">【{{ oneInfo.kindName }}】</span>
        <span class="bang_name">{{ oneInfo.name }}</span>
        <span class="sc">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucangxiao"></use>
        </svg>
        </span>
        <span class="bang_urgent" v-if="oneInfo.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
      </div>
      <div class="center">
        <div class="location">{{getDetailPlace(oneInfo.location)}}</div>
        <span class="bang_money">￥{{ oneInfo.money }}</span>
      </div>
      <div class="bottom">
        <span class="bang_time" v-if="oneInfo.state!==0">{{ time(oneInfo)}}后截止</span>
      </div>

      <!--      基本信息end-->
      <div class="bang_introduceWrapped">
        <div class="lab">帮忙介绍</div>
        <div class="bangMain">{{oneInfo.details}}反</div>
      </div>
      <div class="bang_personInfo">
        <div class="per_lab">发布人</div>
        <div class="box">
          <div class="lf">
            <img :src="releasePersonInfo.head" alt="">
            <span>{{releasePersonInfo.username}}</span>
          </div>
          <div class="rg" @click="goChat(releasePersonInfo.id)"><svg class="icon" aria-hidden="true" v-if="oneInfo.user1Id!==myInfo.id">
            <use xlink:href="#icon-xinxi"></use>
          </svg></div>
        </div>

        <div class="place_lab">发布地点</div>
        <div class="place">{{oneInfo.location}}</div>
      </div>
      <div class="imgList"  v-if="oneInfo.material">
        <img :src="item" alt="" v-for="(item,index) in ImgArr" @click="imgView">
      </div>
<!--      上传任务入口-->
      <div class="imgSc" v-show="!isComplete">
        <div class="completeLab">任务完成上传</div>
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="value" :max-count="3" :after-read="upload_bang_img"
            />
          </template>
        </van-field>
      </div>
      <div class="complete" v-show="isComplete">

        <div class="imgList2">
          <img :src="item" alt="" v-for="(item,index) in oneInfo.finMaterial?.split(',')" @click="imgView2" style="width: 80px;height: 80px;">
        </div>
        <div class="completeLab" style="color: #2ac845;font-size: 20px">接单人已完成任务</div>
      </div>
    </div>

    <home-button :label="btnlab" @click="tj" v-show="!isComplete"/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import StatusBar from '@/components/StatusBar.vue'
import TopBar from "@/components/TopBar.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { api_bangTj, api_cx_one, api_cx_person, api_form_qxsc, api_form_sc, api_jd, api_updateTx } from "@/request/api";
import { ImagePreview, Toast } from "vant";
import { getTime, twoTimeInterval } from "@/utils/time";

import getDetailPlace from "@/utils/location";
import HomeButton from '@/components/HomeButton.vue'
import router from "@/router";
import { store } from "@/utils/useStore";
const route=useRoute()
const btnlab=ref('提交')
//是否已完成任务
const isComplete=ref(false)
console.log(route.params.id)
const  topLab=ref('帮忙详情')
const oneInfo:any=ref([])
const releasePersonInfo:any=ref([])
const myInfo=ref(store.userInfo)
const ImgArr=ref()
api_cx_one({
  id:route.params.id
}).then((res:any)=>{
  console.log(res)
  if (res.code!==1) return Toast.fail('获取数据失败')
  console.log('1')
  oneInfo.value=res.result
  isComplete.value=oneInfo.value.state===2
  ImgArr.value= oneInfo.value.material.split(',')
  api_cx_person({
    id:oneInfo.value.user1Id
  }).then((res:any)=>{
    console.log(oneInfo.value.user1Id)
    if (res.code!==1) return Toast.fail('获取发布人信息失败')
    releasePersonInfo.value=res.result

  })
})
const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})
const goChat=(id:any)=>{
  router.push({
    path:'/chat',
    query:{id:id}
  })
}
const imgView=()=>{
  ImagePreview(ImgArr.value)
}
const imgView2=()=>{
  ImagePreview(oneInfo.value.finMaterial.split(','))
}
const tj= async (id:any)=>{
  const res:any= await api_bangTj({id:oneInfo.value.id,finMaterial:ImgArr1.value.join(',')})
  if (res.code!==1) return Toast.fail('提交失败')
  mui.toast(`${res.message}`)
  await router.push('/home/index')
}
// ImagePreview({
//   images: ['http://114.116.95.152:9000/xjbx/70_1667109109423.jpg', 'http://114.116.95.152:9000/xjbx/73_1667109111756.jpg'],
//   closeable: true,
// });
const value: any = ref([]);
let ImgArr1:any=ref([])
const upload_bang_img = (file: any) => {

  const formData = new FormData()
  formData.append('file', file.file)
  api_updateTx(formData).then((res: any) => {
    if (res.code !== 1) return Toast.fail('图片上传失败')
    // userInfo.head = res.message
    const xys1 = value.value.map((item: any) => {
      if (!item.img) {
        item.img = `${res.message}`
      }
      return item
    })
    ImgArr1.value= xys1.map((item:any)=>{
      return item.img
    })

  })
}
const colorArr=computed(()=>{
  return function (item:any){
    switch (item.state) {
      case 0:return['gray']
      case 1:return['blue']
      case 2:return['green']
      case 3:return['yellow']
      case 4:return['gray']
      case 5:return['red']
      case 6:return['purple']
    }
  }
})
const statusLab=computed(()=>{
  return function (item:any){
    switch (item.state) {
      case 0:return`已过期`
      case 1:return`已接单`
      case 2:return`已完成`
      case 3:return`审核中`
      case 4:return`已取消`
      case 5:return`审核失败`
      case 6:return`待接单`
    }
  }
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

.allBang_wrapped{
  height: 100vh;
  background-color: #fff;
  .vanTaboneInfo{
    overflow-y: auto;
    height: 580px;
    margin-top: 35px;
    padding: 0 25px;
    .top{
      .bang_type{
        font-size: 16px;
      }
      .bang_name{
        margin-left: 8px;
        color: rgba(33, 33, 33, 1);
        font-size: 16px;
      }
      .sc{
        margin-left: 3px;
        font-size: 16px;
      }
      .bang_urgent{
        position: absolute;
        right: 6px;
        font-size: 16px;
      }
    }
    .center{
      margin-top: 3px;
      justify-content: space-between;
      align-items: center;
      display: flex;
      .location{
        width: 300px;
        height: auto;
        font-size: 15px;
      }
      .bang_money{
        color: rgba(37, 99, 235, 1);
        font-size: 16px;
      }
    }
    .bottom{
      .bang_time{
        color: #2563eb;
        font-size: 15px;
      }
    }
    .fail{
      width: 325px;
      height: 152px;
      background-color: #ccc;
    }
    .bang_introduceWrapped{
      margin-top: 30px;
      .lab{
        font-size: 16px;
      }
      .bangMain{
        display: flex;
        width: 303px;
        overflow: auto;

        height: 70px;
        font-size: 14px;
        color: rgba(110, 110, 110, 1);
      }
    }
    .bang_personInfo{
      margin-top: 30px;
      .per_lab{
        font-size: 16px;
        color: rgba(33, 33, 33, 1);
      }
      .box{
        margin-top: 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .lf{
          display: flex;
          align-items: center;
          img{
            width: 44px;
            height: 44px;
          }
          span{
            margin-left: 16px;
            font-size: 16px;
            color: rgba(33, 33, 33, 1);
          }
        }
        .rg{
          svg{
            font-size: 33px;
            color: #4f81ff;
          }
        }
      }
      .place_lab{
        margin-top: 48px;
        font-size: 16px;
        color: rgba(33, 33, 33, 1);
      }
      .place{
        margin-top: 15px;
        font-size: 14px;
        color: rgba(110, 110, 110, 1);
      }

    }
    .imgList{
      margin-top: 15px;
      img{
        width: 80px;
        height: 80px;
        &:not(:nth-child(1)){
          margin-left: 15px;
        }
      }
    }
    .imgSc{
      margin-left: -10px;
      margin-top: 15px;
      .completeLab{
        margin-left: 15px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .complete{
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  :deep(.bt_Wrapped){
    position: absolute;
    bottom: 40px;
    left: 0;
    .HomeButton{
      border-radius: 10px;
      width: 315px;
      height: 46px;
    }
  }
}

</style>
