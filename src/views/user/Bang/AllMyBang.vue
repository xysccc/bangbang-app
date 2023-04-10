<template>
<div class="allBang_wrapped">
  <status-bar/>
  <top-bar :topBarLab="topLab"/>
  <div class="tip">不会做任务？点我看详细教程</div>
    <div class="vanTaboneInfo">
<!--      基本信息start-->
      <div class="top_wrapped">
        <div class="top">
          <span class="bang_type">【{{ oneInfo.kindName }}】</span>
          <span class="bang_name">{{ oneInfo.name }}</span>
          <span class="sc">
          <svg class="icon" aria-hidden="true" v-if="oneInfo.isLike!==1" @click="sc(1)">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
           <svg class="icon" aria-hidden="true" v-else @click="sc(0)">
          <use xlink:href="#icon-shoucang1"></use>
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

        </div>
        <div class="bottom">
          <span class="bang_time" v-if="oneInfo.state!==0">{{ time(oneInfo)}}后截止</span>
          <div class="bang_money">￥{{ oneInfo.money }}</div>
        </div>
      </div>
      <div class="statusTip" v-if="oneInfo.state===5"><img src="https://s1.ax1x.com/2022/11/13/zkPzp6.png" alt=""></div>
      <div class="statusTip" v-else-if="oneInfo.state===3"><img src="https://s1.ax1x.com/2022/11/13/zkiPne.png" alt=""></div>
<!--      基本信息end-->
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
  <div class="bang_introduceWrapped">
    <div class="lab">帮忙介绍</div>
    <div class="bangMain">{{oneInfo.details}}</div>
  </div>

      <div class="imgList" v-if="oneInfo.material">
        <div>相关图片</div>
        <img :src="item" alt="" v-for="(item,index) in ImgArr" @click="imgView">
      </div>
      <!--      上传任务入口-->
      <div class="imgSc" v-show="oneInfo.state===1">
        <div class="completeLab">任务完成上传</div>
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="value" :max-count="3" :after-read="upload_bang_img"
            />
          </template>
        </van-field>
      </div>
      <div class="complete" v-show="oneInfo.state===2">

        <div class="imgList2">
          <img :src="item" alt="" v-for="(item,index) in oneInfo.finMaterial?.split(',')" @click="imgView2" style="width: 80px;height: 80px;">
        </div>
        <div class="completeLab">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yiwancheng"></use>
          </svg>
        </div>
      </div>
      <div class="noComplete"  v-show="oneInfo.state===0">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weiwancheng"></use>
        </svg>
      </div>
      <home-button :label="btnlab" v-if="oneInfo.user1Id!==myInfo.id && oneInfo.state===6" @click="jd(oneInfo.id)"/>
      <home-button :label="btnlab1" @click="tj" v-show="oneInfo.state===1"/>

    </div>
</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import StatusBar from '@/components/StatusBar.vue'
import TopBar from "@/components/TopBar.vue";
import { computed, onMounted, reactive, ref } from "vue";
import {
  api_addExp,
  api_bangTj,
  api_cx_one,
  api_cx_person,
  api_form_qxsc,
  api_form_sc,
  api_jd,
  api_updateTx
} from "@/request/api";
import { ImagePreview, Toast } from "vant";
import { getTime, twoTimeInterval } from "@/utils/time";

import getDetailPlace from "@/utils/location";
import HomeButton from '@/components/HomeButton.vue'
import router from "@/router";
import { store } from "@/utils/useStore";
mui.back=function () {
  router.back()
}
const route=useRoute()
const btnlab=ref('报名帮忙')
const btnlab1=ref('提交')
console.log(route.params.id)
const  topLab=ref('帮忙详情')
const oneInfo:any=ref([])
const releasePersonInfo:any=ref([])
const myInfo=ref(store.userInfo)
const ImgArr=ref()
const getOne=async ()=>{
  const res:any=await api_cx_one({
    id:route.params.id
  })
  console.log(res.result)
  if (res.code!==1) return Toast.fail('获取数据失败')
  oneInfo.value=res.result
  ImgArr.value= oneInfo.value.material.split(',')
  await getPerson()
}
const  getPerson=async ()=>{
  const res:any=await api_cx_person({
    id:oneInfo.value.user1Id
  })
  if (res.code!==1) return Toast.fail('获取发布人信息失败')
  releasePersonInfo.value=res.result
}
getOne()


const sc=async (i:any)=>{
  console.log(i)
  if (i===0){
    //  取消收藏
    const res:any= await api_form_qxsc({
      taskId:oneInfo.value.id
    })
    if (res.code!==1) return mui.toast('取消收藏失败')
    mui.toast('取消收藏成功')
    await getOne()
  }else {
    //  收藏
    const res:any= await api_form_sc({
      taskId:oneInfo.value.id
    })
    if (res.code!==1) return mui.toast('收藏失败')
    mui.toast('收藏成功')
    await getOne()
  }
}
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
const addExp=async (exp:number)=>{
  const res:any=await api_addExp({
    experience:exp
  })
  if (res.code!==1) return mui.toast('经验增加失败')
  mui.toast('经验增加成功')
}
const tj= async (id:any)=>{
  const res:any= await api_bangTj({id:oneInfo.value.id,finMaterial:ImgArr1.value.join(',')})
  if (res.code!==1) return Toast.fail('提交失败')
  mui.toast(`${res.message}`)
  await addExp(30)
  await router.push('/home/index')
}
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
const jd= async (id:any)=>{
   const res:any= await api_jd({id:id})
  if (res.code!==1) return Toast.fail('报名失败')
  mui.toast(`${res.message}`)
  await router.push('/home/index')
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

.allBang_wrapped{
  height: 100vh;
  background: linear-gradient(180deg, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
  .vanTaboneInfo{
    .top_wrapped{
      padding: 15px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }
    overflow-y: auto;
    overflow-x: hidden;
    height: 640px;
    padding: 10px 15px;
    .top{
      .bang_type{
        margin-left: -5px;
        font-size: 16px;
        color: rgba(42, 130, 228, 1);
      }
      .bang_name{
        margin-left: 20px;
        color: rgba(33, 33, 33, 1);
        font-size: 16px;
      }
      .sc{
        margin-left: 20px;
        font-size: 20px;
      }
      .bang_urgent{
        position: absolute;
        right: 6px;
        font-size: 18px;
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

    }
    .bottom{
      justify-content: space-between;
      align-items: center;
      display: flex;
      .bang_time{
        color: #2563eb;
        font-size: 15px;
      }
      .bang_money{
        display: flex;
        justify-content: center;
        width: 73px;
        margin-right: -15px;
        color: #fff;
        font-size: 16px;
        background: rgba(212, 48, 48, 1);
        border-radius: 5px 0 0 5px;

      }
    }
    .statusTip{
      margin-left: 10px;
      margin-top: 20px;
      width: 325px;
      height: 152px;
      img{
        width: 325px;
      }
    }
    .bang_introduceWrapped{
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
      background-color: #fff;
      border-radius: 10px;
      padding: 15px;
      margin-top: 10px;
      .lab{
        color: rgba(42, 130, 228, 1);
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
      padding: 15px;
      background-color: #fff;
      border-radius: 15px;
      margin-top: 10px;
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
      .per_lab{
        font-size: 16px;
        color: #2a82e4;
        color: rgba(33, 33, 33, 1);
      }
      .box{
        margin-top: 10px;
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
        margin-top: 15px;
        font-size: 16px;
        color: rgba(33, 33, 33, 1);
      }
      .place{
        margin-top: 6px;
        font-size: 14px;
        color: rgba(110, 110, 110, 1);
      }

    }
    .imgList{
      box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
      background-color: #fff;
      margin-top: 10px;
      border-radius: 10px;
      padding: 15px;
      div{
        font-size: 17px;
        margin-bottom: 10px;
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
      }
      img{
        width: 80px;
        height: 80px;
        &:not(:nth-child(1)){
          margin-left: 0px;
        }
      }
    }

  }
  .imgSc{
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 10px ;
    margin: 10px 0 10px 0;
    border-radius: 10px;
    width: 346px;
    background-color: #fff;
    .completeLab{
      margin-left: 5px;
      font-size: 20px;
    }
  }
  .complete{
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 10px 10px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 346px;
    margin: 15px 0px;
    background-color: #fff;
    border-radius: 10px;
    .completeLab{
      margin-left: 5px;
      font-size: 60px;
    }
  }
  .noComplete{
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    width: 346px;
    background-color: #fff;
    height: 100px;
    margin-top: 15px;
    border-radius: 10px;
    justify-content: flex-end;
    font-size: 60px;
    align-items: center;
    padding-right: 10px;
  }
  :deep(.bt_Wrapped){
    margin-top: 15px;
    margin-left: -15px;
    .HomeButton{
      border-radius: 10px;
      width: 315px;
      height: 46px;
    }
  }
  .tip{
    margin-left: 15px;
    padding: 10px;
    font-size: 16px;
    color: rgba(42, 130, 228, 1);
  }

}

</style>
