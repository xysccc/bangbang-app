<template>
  <div class="index_wrapped">
    <!--  上部分-->
    <header>
      <van-swipe lazy-render class="swiper_header" indicator-color="#ffffff" autoplay="2500">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image"/>
        </van-swipe-item>
      </van-swipe>
    </header>
    <!--    功能区-->
    <div class="function_wrapped">
      <div class="function">
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/11/24/zGKtbR.png" alt="" @click="goBangHall">
          <div class="fcn_lab">帮帮大厅</div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/11/24/zGik5j.png" alt="" @click="router.push('/userCollection')">
          <div class="fcn_lab">我的收藏</div>
        </div>
        <div class="function_item" style="margin-top: -20px;" @click="bangRandom">
          <img src="https://s1.ax1x.com/2022/11/24/zGiZ2q.png" alt="" style="width: 100%;height: 72px;"   >
          <div class="svgAnimation" ref="animation2"></div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/11/24/zGiVGn.png" alt="" @click="goWyy">
          <div class="fcn_lab">网易热评</div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/11/24/zGiFaQ.png" alt="" @click="goPhotoWall">
          <div class="fcn_lab">帮帮美图</div>
        </div>
      </div>
    </div>
    <!--    胶囊banner-->
    <div class="banner" @click="release"></div>
    <!--    帮帮大厅-->
    <div class="bbHall_wrapped">
      <div class="bbHall_lab_wrapped">
        <div class="bbHall_lab"><span>为你推荐</span></div>
        <div class="rg">
          # 共845人参与
          <img src="https://s1.ax1x.com/2022/11/24/zGJ3nO.png" alt="">
          <img src="https://s1.ax1x.com/2022/11/24/zGJ8BD.png" alt="">
          <img src="https://s1.ax1x.com/2022/11/24/zGJGHe.png" alt="">
        </div>
      </div>
     <div class="bbHallMain_wrapped">
       <div class="bbHall_main">
         <van-empty description="暂时没有数据~"  v-show="isShow && recommended.length===0"/>
         <div class="vanTabItemList" v-if="isShow">
           <div class="vanTabItem" v-for="(item,index) in recommended" :key="item.id" @click="gobangDetail(item.id)">
             <div class="top">
               <span class="bang_type">    【{{ item.kindName }}】  </span>
               <span class="bang_name">{{ item.name }}</span>

               <span class="bang_urgent" v-if="item.urgent===1">
            <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-VIP"></use>
     </svg>
        </span>
               <span class="jt_right">
                  <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-anniu-jiantouxiangyou_o"></use>
     </svg>
               </span>
             </div>
             <div class="bottom">
               <div class="bang_place">{{ getDetailPlace(item.location) }} </div>
        <div style="display: flex;justify-content: space-between;padding-right: 23px;">
          <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截止</span>
          <span v-else style="color:rgba(172, 172, 172, 1)">已截止</span>
          <span class="bang_money">￥{{ item.money }}</span>
<!--          <span style="color: rgba(42, 130, 228, 1);font-size: 12px;">  <svg class="icon" aria-hidden="true">-->
<!--    <use xlink:href="#icon-dingwei1"></use>-->
<!--</svg>{{userLocation}}同城帮忙</span>-->
        </div>
             </div>
           </div>
         </div>
         <div style="width: 100%;height: 200px;" v-else ref="animation3"></div>
       </div>
     </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script lang="ts" setup>

import { computed, getCurrentInstance, onMounted, reactive, ref } from "vue";
import router from "@/router";
import { jsonp } from 'vue-jsonp'
import { api_bangRandom, api_cx_form } from "@/request/api";
import getDetailPlace from "@/utils/location";
import { getTime, twoTimeInterval } from "@/utils/time";
import { Toast } from "vant";
import lottie from "lottie-web";
import click from "@/assets/json/recommendedJson.json"
import loading from "@/assets/json/loading.json";
import { store } from "@/utils/useStore";
const animation2:any = ref(null) //获取dom
const animation3:any = ref(null) //获取dom
store.getChatList()
onMounted(()=>{
  lottie.loadAnimation({
    container: animation2.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: click,//渲染动效json
  })
  lottie.loadAnimation({
    container: animation3.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: loading,//渲染动效json
  })
    }

)
const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})
const images = [
  'https://s1.ax1x.com/2022/10/21/x64c3F.png',
  'https://s1.ax1x.com/2022/11/26/zt28JA.png',
  'https://s1.ax1x.com/2022/11/26/zt23id.png',
  'https://s1.ax1x.com/2022/11/26/zt2GRI.png',
];
//用户定位
const userLocation=ref(``)
//推荐列表数据
const recommended=ref(  [])
const isShow=ref(false)
// onMounted(()=>{
//   // 然后调用腾讯接口获取市级地址
//    jsonp('https://apis.map.qq.com/ws/location/v1/ip',{
//     key:`MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6`,
//     output:'jsonp'
//   }).then((res:any)=>{
//      console.log(res)
//      userLocation.value=res.result.ad_info
//          .district
//      //  查询同城数据
//      api_cx_form({location:res.result.ad_info.district,page:`1`,pageSize:`6`}).then((res:any)=>{
//        recommended.value=res.result.records
//        console.log(recommended.value)
//        isShow.value=true
//      })
//    })
//    })
const getIndexData=async (n:number)=>{
  const res:any=await api_bangRandom({
    num:n
  })
  if (res.code!==1) return Toast.fail('获取随机任务失败')
  console.log(res.result)
  recommended.value=res.result
  isShow.value=true
}
getIndexData(4)

//发布点击函数
const release=()=>{
  router.push('/bang/release')
}
//跳转到帮忙详细页面
const gobangDetail=(id:any)=>{
  router.push({
    path:`/allBang/${id}`,
  })
}
//点击跳转帮帮大厅
const goBangHall=()=>{
  router.push('/bangHall')
}
//跳转照片墙
const goPhotoWall = () => {
  router.push('/photoWall')
}
//跳转网易云音乐
const goWyy = () => {
  router.push('/wyy')
}
//跳转到短视频
const goShortVideo = () => {
  router.push('/shortVideo')
}
const bangRandom=()=>{
  console.log(123)
  getRandom(1)
}
const getRandom=async (n:number)=>{
  const res:any=await api_bangRandom({
    num:n
  })
  if (res.code!==1) return Toast.fail('获取随机任务失败')
  console.log(res.result)
  await router.push({
    path:`/allBang/${res.result[0].id}`
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
.index_wrapped {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
  overflow-y: auto;
}



header {
  position: relative;

  :deep(.van-swipe__indicators) {
    transform: translate(100px, -20px);

    i {
      width: 8px;
      height: 3px;
      border-radius: 0;

      &:nth-child(2) {
        background-color: #b9deff;
      }
    }

  }

  .search_wrapped {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 42px;
    width: 337px;
    height: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #71b9f9;

    .ipt {
      display: flex;
      align-items: center;

      i {
        font-size: 15px;
        margin: 0 10px;
      }

      .search_lab {
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
        vertical-align: middle;
      }
    }

    i {
      font-size: 16px;
      margin-right: 10px;
      color: #fff;
    }
  }
}

.function_wrapped {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 129px;
  background: url("https://s1.ax1x.com/2022/10/21/xcSUiD.png") no-repeat;
  background-size: 375px 129px;
  transform: translateY(-30px);

  .function {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 67px;

    img {
      //width: 48px;
      //height: 67px;
      width: 52px;
      height: 52px;
    }

    .function_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 4px;

      &:nth-child(3) {
        margin-left: 4px;
        img{
          width: 71px;
          object-fit: contain;
        }
      }

      .fcn_lab {
        text-align: center;
        font-size: 13px;
        color: rgba(0, 0, 0, 1);
      }
      .svgAnimation{
        position: absolute;
        left: -22px;
        top: -18px;
        width: 150px;
      }
    }
  }
}

.banner {
  width: 375px;
  height: 98px;
  background: url("https://s1.ax1x.com/2022/10/21/x64rNV.png") no-repeat center/375px 98px;
  transform: translateY(-42px);
  background-color: #fff;
}

.bbHall_wrapped {
  width: 355px;
  transform: translateY(-30px);

  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;

  .bbHall_lab_wrapped {
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 355px;
    height: 70px;

    .bbHall_lab {
      margin-left: 20px;
      margin-top: 20px;
      width: 126px;
      height: 47px;
      background-color: rgba(79, 173, 255, 0.19);
      border-radius: 20px;
      transform: translateY(-0.1rem);
      line-height: 47px;
      text-align: center;
  span{
    font-size: 20px;
    font-weight: 400;
    color: rgba(42, 130, 228, 1);
    text-shadow: 1px 2px 4px  rgba(0, 0, 0, 0.25);
  }
    }
    .rg{
      padding-left: 8px;
      margin-top: 11px;
      width: 159px;
      height: 30px;
      opacity: 1;
      background: rgba(42, 130, 228, 0.3);
      border: 1px solid rgba(255, 255, 255, 0);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
      color: #2a82e4;
      img{
        width: 19px;
        height: 19px;
        object-fit: cover;
        background-color: red;
        border-radius: 100%;
        &:nth-child(1){
          margin-left: 5px;
          z-index: 1;
        }
        &:nth-child(2){
          margin-left: -12px;
          margin-top: -18px;
        }
        &:nth-child(3){
          position: absolute;
          right: 2px;
          top: -15px;
        }
      }
    }
  }
  .bbHallMain_wrapped{
    width: 100%;
    height: 360px;
    .bbHall_main{
      .vanTabItemList {
        padding: 10px 0;
        overflow-y: auto;
        height: 350px;
        border-radius: 15px;

        .vanTabItem {
        padding: 10px;
          width: 324px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 4px  rgba(0, 0, 0, 0.25);
          margin-top: 12px;
          height: 100px;
          margin-left: 18px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);

          .top {
            margin-left: -8px;
            .bang_type {
              font-size: 15px;
              margin-left: 4px;
            }

            .bang_name {
              font-size: 14px;
              color: rgba(33, 33, 33, 1);
              margin-left: 15px;
            }

            .bang_money {
              color: rgba(37, 99, 235, 1);
              font-size: 14px;
              margin-left: 23px;
            }

            .bang_urgent {
              margin-left: 17px;
              font-size: 16px;
            }
            .jt_right{
              font-size: 20px;
              position: absolute;
              right: 0;
              top: -5px;
            }
          }

          .bottom {
            position: relative;
            margin-top: 8px;
            font-size: 14px;

            .bang_place {
              margin-bottom: 4px;
            }

            .bang_time {
              color: rgba(37, 99, 235, 1);
            }

            .bang_money{
              display: flex;
              justify-content: center;
              width: 73px;
              margin-right: -32px;
              margin-top: -5px;
              color: #fff;
              font-size: 16px;
              background: rgba(212, 48, 48, 1);
              border-radius: 5px 0 0 5px;

            }
          }
        }
      }
    }
  }
}

.swiper_header {
  .van-swipe-item {
    &:nth-child(1) {
      img {
        width: 380px;
      }
    }
    //&:nth-child(2) {
    //  img {
    //    object-fit: cover;
    //    object-position: -20px  0px;
    //  }
    //}
    &:nth-child(3) {
      img {
        object-fit: cover;
        object-position: 0px  0px;
      }
    }
    &:nth-child(4) {
      img {
        object-fit: cover;
        //object-position: -28px  0px;
      }
    }
    img {
      width: 375px;
      height: 280px;
    }
  }}


</style>
