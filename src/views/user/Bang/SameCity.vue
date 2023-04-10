<template>
<div class="sameCity_wrapped">
  <status-bar/>
  <top-bar :top-bar-lab="topLab"/>
  <div class="topLab">
    <div class="svg" ref="animation1"></div>
    <div class="fontLab">同城推荐</div>
  </div>
  <div class="sameCityList" v-if="recommended.length">
    <div class="top_wrapped" v-for="(item,index) in recommended" :key="item.id" @click="router.push(`/allBang/${item.id}`)">
      <div class="top">
        <span class="bang_type">【{{ item.kindName }}】</span>
        <span class="bang_name">{{ item.name }}</span>
        <div class="sc">
          <div @click.stop="sc(1,item.id)"  v-if="item.isLike!==1">
            <svg class="icon" aria-hidden="true"  >
              <use xlink:href="#icon-shoucang"></use>
            </svg>
          </div>
          <div @click.stop="sc(0,item.id)" v-else>
            <svg class="icon" aria-hidden="true"  >
              <use xlink:href="#icon-shoucang1"></use>
            </svg>
          </div>
        </div>
        <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
      </div>
      <div class="center">
        <div class="location">{{getDetailPlace(item.location)}}</div>

      </div>
      <div class="bottom">
        <span class="bang_time" v-if="item.state!==0">{{ time(item)}}后截止</span>
        <span v-else style="color: rgba(172, 172, 172, 1);font-size: 16px">任务已过期</span>
        <div class="bang_money">￥{{ item.money }}</div>
      </div>
    </div>
  </div>
  <empty-cps v-else></empty-cps>
<!--  <div class="bbHallMain_wrapped">-->
<!--    <div class="bbHall_main">-->
<!--      <div class="vanTabItemList">-->
<!--        <div class="vanTabItem" v-for="(item,index) in recommended" :key="item.id" @click="gobangDetail(item.id)">-->
<!--          <div class="top">-->
<!--            <span class="bang_type"> 【{{ item.kindName }}】 </span>-->
<!--            <span class="bang_name">{{ item.name }}</span>-->
<!--            <span class="bang_money">￥{{ item.money }}</span>-->
<!--            <span class="bang_urgent" v-if="item.urgent===1">-->
<!--          <svg class="icon" aria-hidden="true">-->
<!--    <use xlink:href="#icon-VIP"></use>-->
<!--</svg>-->
<!--        </span>-->
<!--          </div>-->
<!--          <div class="bottom">-->
<!--            <div class="bang_place">{{ getDetailPlace(item.location) }} </div>-->
<!--            <div style="display: flex;justify-content: space-between;padding-right: 23px;">-->
<!--              <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截止</span>-->
<!--              <span v-else style="color:rgba(172, 172, 172, 1)">已截止</span>-->
<!--              <span style="color: rgba(42, 130, 228, 1);font-size: 12px;">  <svg class="icon" aria-hidden="true">-->
<!--    <use xlink:href="#icon-dingwei1"></use>-->
<!--</svg>{{userLocation}}同城帮忙</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</div>

</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import { computed, onMounted, ref } from "vue";
import { jsonp } from "vue-jsonp";
import { api_cx_form, api_form_qxsc, api_form_sc } from "@/request/api";
import router from "@/router";
import getDetailPlace from "@/utils/location";
import { getTime, twoTimeInterval } from "@/utils/time";
import EmptyCps from "@/components/EmptyCps.vue"
import lottie from "lottie-web";
import sameCity from "@/assets/json/sameCity.json";
const topLab=ref('同城推荐')
//用户定位
const userLocation=ref(``)
//推荐列表数据
const recommended=ref( [])
const getSameCity=()=>{
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
}
onMounted(()=>{
  getSameCity()
})
const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})
//跳转到帮忙详细页面
const gobangDetail=(id:any)=>{
  router.push({
    path:`/allBang/${id}`,
  })
}
const sc=async (i:any,id:any)=>{
  console.log(i,id)
  if (i===0){
    //  取消收藏
    const res:any= await api_form_qxsc({
      taskId:id
    })
    if (res.code!==1) return mui.toast('取消收藏失败')
    mui.toast('取消收藏成功')
    getSameCity()
  }else {
    //  收藏
    const res:any= await api_form_sc({
      taskId:id
    })
    if (res.code!==1) return mui.toast('收藏失败')
    mui.toast('收藏成功')
    getSameCity()
  }
}
const animation1:any=ref(null)
onMounted(()=>{
  lottie.loadAnimation({
    container: animation1.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: sameCity,//渲染动效json
  })
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
.sameCity_wrapped{
  height: 100vh;
  background: linear-gradient(180deg, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
  .topLab{
    border-radius: 15px;
    margin: 21px;
    width: 90%;
    height: 100px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    .fontLab{
      margin-left: 28px;
      color: rgba(42, 130, 228, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: kkht,serif;
      font-size: 28px;
    }
  }
  .sameCityList{
    height: 532px;
    padding-bottom: 20px;
    overflow: auto;
    .top{
      display: flex;
      align-items: center;
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
  }
}
.top_wrapped{
  margin-left: 12px;
  margin-top: 10px;
  width: 350px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
}

</style>
