<template>
  <div class="index_wrapped">
    <!--  上部分-->
    <header>
      <van-swipe lazy-render class="swiper_header" indicator-color="#ffffff">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image"/>
        </van-swipe-item>
      </van-swipe>
    </header>
    <!--    功能区-->
    <div class="function_wrapped">
      <div class="function">
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/10/21/x64shT.png" alt="" @click="release">
          <div class="fcn_lab"></div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/10/21/x64shT.png" alt="" @click="release">
          <div class="fcn_lab"></div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/10/21/x64shT.png" alt="" @click="release">
          <div class="fcn_lab">发布</div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/10/21/x64shT.png" alt="" @click="goBangHall">
          <div class="fcn_lab"></div>
        </div>
        <div class="function_item">
          <img src="https://s1.ax1x.com/2022/10/21/x64shT.png" alt="" @click="release">
          <div class="fcn_lab"></div>
        </div>
      </div>
    </div>
    <!--    胶囊banner-->
    <div class="banner" @click="release"></div>
    <!--    帮帮大厅-->
    <div class="bbHall_wrapped">
      <div class="bbHall_lab_wrapped">
        <div class="bbHall_lab"><span>为你推荐</span></div>
      </div>
     <div class="bbHallMain_wrapped">
       <div class="bbHall_main">
         <div class="vanTabItemList">
           <div class="vanTabItem" v-for="(item,index) in recommended" :key="item.id" @click="gobangDetail(item.id)">
             <div class="top">
               <span class="bang_type">    【{{ item.kindName }}】  </span>
               <span class="bang_name">{{ item.name }}</span>
               <span class="bang_money">￥{{ item.money }}</span>
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
          <span style="color: rgba(42, 130, 228, 1);font-size: 12px;">  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-dingwei1"></use>
</svg>{{userLocation}}同城帮忙</span>
        </div>
             </div>
           </div>
         </div>
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
import { api_cx_form } from "@/request/api";
import getDetailPlace from "@/utils/location";
import { getTime, twoTimeInterval } from "@/utils/time";
const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})
const images = [
  'https://s1.ax1x.com/2022/10/21/x64c3F.png',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];
//用户定位
const userLocation=ref(``)
//推荐列表数据
const recommended=ref(  [])
onMounted(()=>{
  // 然后调用腾讯接口获取市级地址
   jsonp('https://apis.map.qq.com/ws/location/v1/ip',{
    key:`MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6`,
    output:'jsonp'
  }).then((res:any)=>{
     console.log(res)
     userLocation.value=res.result.ad_info
         .district
     //  查询同城数据
     api_cx_form({location:res.result.ad_info.district,page:`1`,pageSize:`6`}).then((res:any)=>{
       recommended.value=res.result.records
       console.log(recommended.value)
     })
   })
   })



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
  transform: translateY(-40px);

  .function {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 328px;
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
      margin-left: 10px;

      //&:nth-child(3) {
      //  img {
      //    width: 52px;
      //    height: 52px;
      //  }
      //}

      .fcn_lab {
        text-align: center;
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
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
    display: flex;
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
          box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
          margin-top: 12px;
          height: 100px;
          margin-left: 18px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);

          .top {
            .bang_type {
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
              margin-left: 30px;
            }

            .bang_urgent {
              margin-left: 37px;
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
            margin-top: 10px;
            font-size: 14px;

            .bang_place {
              margin-bottom: 4px;
            }

            .bang_time {
              color: rgba(37, 99, 235, 1);
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

    height: 274px;
    width: 300px;

    img {
      width: 375px;
      height: 274px;
    }
  }
}

</style>
