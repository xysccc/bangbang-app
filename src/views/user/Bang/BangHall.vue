<template>
  <div class="BangHall_wrapped">
    <status-bar/>
    <top-bar :top-bar-lab="topLab"/>
    <!--为你推荐-->
    <div class="recommended_wrapped">
      <div class="lab" ref="animation1"></div>
      <div class="lb">
        <van-notice-bar :scrollable="false">
          <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :touchable="false"
              :show-indicators="false"
          >
            <van-swipe-item v-for="(item,index) in randomList" :key="index" @click="router.push(`/allBang/${item.id}`)">
              <div class="swipeLab">【{{item.kindName}}】{{item.name}}  ￥{{item.money}}</div>
            </van-swipe-item>
<!--            <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>-->
<!--            <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>-->
          </van-swipe>
        </van-notice-bar>

      </div>
    </div>
    <!--  导航区-->
    <div class="menu">
      <img src="https://s1.ax1x.com/2022/11/09/zSRe3R.png" @click="router.push('/today')">
      <img src="https://s1.ax1x.com/2022/11/09/zSRZC9.png" @click="router.push('/sameCity')">
      <img src="https://s1.ax1x.com/2022/11/09/zSRE4J.png" @click="router.push('/userCollection')">
    </div>
    <!--  搜索框-->
    <div class="search_wrapped">
      <input type="text" placeholder="&#128269;请输入关键词" v-model="iptVal">
      <van-icon name="clear"   class="clear" @click="clearIpt" v-show="iptVal"/>
    </div>
    <!--    下拉菜单-->
    <div class="DropdownMenu">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="value1" :options="option1" @change="item1Change"/>
        <van-dropdown-item title="筛选" ref="item">
          <van-cell center title="是否加急">
            <template #right-icon>
              <van-switch v-model="switch1" size="24" active-color="#1989fa"/>
            </template>
          </van-cell>
          <van-cell-group inset style="margin-top: 30px;">
            <van-field v-model="minMoney" label="最小赏金" placeholder="请输入最小赏金"/>
            <van-field v-model="maxMoney" label="最大赏金" placeholder="请输入最大赏金"/>
          </van-cell-group>
          <van-cell>
            <van-tree-select
                v-model:active-id="activeId" v-model:main-active-index="activeIndex"
                :items="items"
                style="height: 80%;margin-top: 20px;"
                class="tree"
                @click-item="changType"
            />
          </van-cell>
          <div style="padding: 5px 16px;">
            <van-button type="primary" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!--    列表展示区-->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="list_wrapped">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
          <div class="vanTabItem" v-for="(item,index) in list" :key="item.id" @click="gobangDetail(item.id)">
            <div class="top">
              <span class="bang_type"> 【{{ item.kindName }}】 </span>
              <span class="bang_name">{{ item.name }}</span>
<!--              <span class="bang_money">￥{{ item.money }}</span>-->
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
              <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
              <div style="display: flex;justify-content: space-between;padding-right: 23px;">
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截止</span>
<!--                <span v-else style="color:rgba(172, 172, 172, 1)">已截止</span>-->
<!--                <span style="color: rgba(42, 130, 228, 1);font-size: 12px;">  <svg class="icon" aria-hidden="true">-->
<!--    <use xlink:href="#icon-dingwei1"></use>-->
<!--</svg>同城帮忙</span>-->
                <span v-else style="color: rgba(172, 172, 172, 1);font-size: 16px">任务已过期</span>
                <div class="bang_money">￥{{ item.money }}</div>
              </div>
            </div>
          </div>

        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">

import TopBar from '@/components/TopBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import { computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { store } from "@/utils/useStore";
import router from "@/router";
import { api_bangRandom, api_bangType, api_cx_form } from "@/request/api";
import { Toast } from "vant";
import getDetailPlace from "@/utils/location";
import { getTime, twoTimeInterval } from "@/utils/time";
import lottie from "lottie-web";
import add from "@/assets/json/clickJson.json";
import recommend from "@/assets/json/addJson.json"
mui.back=function () {
  router.back()
}
const animation1:any = ref(null)
onMounted(()=>{
  lottie.loadAnimation({
    container: animation1.value,//选择渲染dom
    renderer: "svg",//渲染格式
    loop: true,//循环播放
    autoplay: true,//是否i自动播放,
    animationData: recommend,//渲染动效json
  })



})

const iptVal = ref('')
const iptRef:any=ref(null)
const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})
const topLab = ref('帮帮大厅')
const clearIpt = () => {
  iptVal.value=''
}
onMounted(() => {
  mui('.mui-input-row input').input();
  // const clearIcon:any= document.querySelector('.mui-icon-clear')!
  // clearIcon.addEventListener('click',function (e) {
  //   console.log(e)
  // })
})
const value1 = ref(0)
const option1 = [
  {text: '赏金降序', value: 0},
  {text: '赏金升序', value: 1},
]
const switch1 = ref(false);
const item: any = ref(null);
const minMoney = ref('')
const maxMoney = ref('')
const typeId = ref('')
const kindId = ref('')
const total=ref(0)
const onConfirm = () => {
  item.value.toggle();
  console.log('是否加急', switch1.value)
  console.log('最大赏金', maxMoney.value)
  console.log('最小赏金', minMoney.value)
  console.log('typeId', typeId.value)
  console.log('kindId', kindId.value)
  getList(1, '', Number(switch1.value), minMoney.value, maxMoney.value, typeId.value, kindId.value)
};
const activeId = ref(1);
const activeIndex = ref(0);
let items = ref()
const changType = (i: any) => {
  console.log(i)
  typeId.value = i.classId
  kindId.value = i.id
}
const queryList=reactive({page:1,pageSize:5})
const getList = async (moneySort = 1, ...args: any) => {
  const res: any = await api_cx_form({
    page: queryList.page,
    pageSize: queryList.pageSize,
    moneySort: moneySort,
    condition: args[0],
    urgent: args[1],
    minMoney: args[2],
    maxMoney: args[3],
    typeId: args[4],
    kindId: args[5]
  })
  if (res.code !== 1) return loading.value=false
  list.value = res.result.records
  total.value=res.result.total
}
//请求帮忙类型数据
api_bangType().then((res: any) => {
  if (res.code !== 1) {
    Toast.fail('请求列表失败')
  } else {
    items.value = res.result.map((item: any) => {
      return {
        text: item.type,
        children: item.kindList.map((_: any) => {
          return {
            text: _.name,
            id: _.id,
            classId: _.classId
          }
        }),
      }
    })
  }
})
//列表数据
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  getList()
  setTimeout(()=>{
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    loading.value = false;
    console.log(total.value,list.value.length)
    if (list.value.length>=total.value){
      finished.value = true;
    }else {
      queryList.pageSize=queryList.pageSize+5;
      finished.value=false
    }
  },1500)

};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  queryList.pageSize=5
  onLoad();
};
//跳转到帮忙详细页面
const gobangDetail = (id: any) => {
  router.push({
    path: `/allBang/${id}`,
  })
}
const item1Change = () => {
  if (value1.value === 1) {
    getList(0)
  } else {
    getList(1)
  }
}

watch(iptVal, (newVal, oldVal) => {
  // console.log(newVal, oldVal)
  getList(1, newVal)
  console.log(iptRef.value)


},{immediate:true})
const randomList=ref([])
const getRandom=async (n:number)=>{
  const res:any=await api_bangRandom({
    num:n
  })
  if (res.code!==1) return Toast.fail('获取随机任务失败')
  console.log(res.result)
  randomList.value=res.result
}
getRandom(5)
</script>

<style scoped lang="less">

//@font-face {
//  font-family: kkht;
//  src: url("@/assets/fonts/ZCOOL_KuHei_Regular.ttf");
//}
:deep(.van-pull-refresh){
  height: 520px;
  overflow: auto;
  background: linear-gradient(180deg, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.BangHall_wrapped {
  height: 100vh;
  background-color: #fff;
}

.recommended_wrapped {
  display: flex;
  align-items: center;
  width: (711px/2);
  height: (64.82px/2);
  margin-left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  border-radius: 20px;
  background: rgba(0, 174, 255, 0.12);

  .thumb {
    width: (54px/2);
    height: (57px/2);
    margin-left: 10px;
  }

  .lab {
    margin-top: 15px;
    margin-left: 25px;
    width: 55px;
  }

  .lb {
    flex: 1;
    height: 100%;
    :deep(.van-notice-bar__content.van-ellipsis){
      width: 100%;
    }
    .swipeLab{
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  :deep(.van-notice-bar) {
    background-color: transparent;
    height: 33px;
  }

  .notice-swipe {
    height: 33px;
    line-height: 33px;
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;

  img {
    width: (190px/2);
    height: (82px/2);

    &:nth-child(2) {
      margin: 0 30px;
    }
  }
}

.search_wrapped {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  width: 90%;
  height: 36px;
  margin-left: 50%;
  margin-top: 0px;
  transform: translateX(-50%);
  background-color: #e1e1e1;
  input{
    padding-left: 17px;
    color: #757575;
    height: 100%;
    font-size: 16px;
    background-color: transparent;
    &::placeholder{
      font-size: 16px;
      text-align: center;
    }
  }
  .clear{
    display:flex;align-items: center;font-size: 20px;margin-right: 7px;background-color:#e1e1e1;
  }
}

:deep(.mui-search.mui-active:before) {
  top: 18px;
}

:deep(.van-tree-select__item--active) {
  color: #1989fa;
}

:deep(.van-sidebar-item--select:before) {
  background-color: #1989fa;
}
.list_wrapped{
  padding: 10px 5px;

}
.vanTabItem {
  padding: 10px;
  width: 330px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  height: 120px;
  margin-left: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

  .top {
    display: flex;
    justify-content: flex-start;
    .bang_type {
      margin-left: 0px;
      font-size: 16px;
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
      margin-left: 30px;
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
    margin-top: 5px;
    padding-left: 7px;
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
      margin-right: -31.5px;
      color: #fff;
      font-size: 16px;
      background: rgba(212, 48, 48, 1);
      border-radius: 5px 0 0 5px;
    }
  }
}
</style>
