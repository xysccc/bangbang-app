<template>
  <div class="userRelease_wrapped">
    <status-bar/>
    <top-bar :topBarLab="topTitle"/>
    <!--  标签页 绑定的是name属性-->
    <van-tabs v-model:active="activeName" :before-change="beforeChange" swipeable>
      <van-tab title="全部" name="a">
        <div class="vanTabItemList" v-if="bangList.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangList" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
        <empty-cps v-else/>
      </van-tab>
      <van-tab title="审核中" name="a">
        <div class="vanTabItemList" v-if="bangListShz.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangListShz" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
     <empty-cps v-else/>
      </van-tab>
      <van-tab title="待接单" name="a">
        <div class="vanTabItemList" v-if="bangListDjd.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangListDjd" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
<empty-cps v-else/>
      </van-tab>
      <van-tab title="已接单" name="a">
        <div class="vanTabItemList" v-if="bangListYjd.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangListYjd" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
<empty-cps v-else/>
      </van-tab>
      <van-tab title="已完成" name="a">
        <div class="vanTabItemList" v-if="bangListYwc.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangListYwc" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
<empty-cps v-else/>
      </van-tab>
      <van-tab title="已关闭" name="a">
        <div class="vanTabItemList" v-if="bangListYgb.length">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
            <div class="vanTabItem" v-for="(item,index) in bangListYgb" :key="item.id" @click="goDetailBang(item.id)">
              <div class="top">
                <span class="bang_name">{{ item.name }}</span>
                <span class="bang_type">{{ item.kindName }}</span>
                <span class="bang_money">￥{{ item.money }}</span>
                <span class="bang_urgent" v-if="item.urgent===1">
          <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-VIP"></use>
</svg>
        </span>
              </div>
              <div class="bottom">
                <div class="bang_place">{{ getDetailPlace(item.location) }}</div>
                <span class="bang_time" v-if="item.state!==0">{{ time(item) }}后截至</span>
                <span class="bangStatus" :class="colorArr(item)">{{ statusLab(item) }}</span>
              </div>
            </div>
          </van-pull-refresh>
        </div>
  <empty-cps v-else/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { computed, onMounted, ref, watch } from "vue";
import HomeButton from "@/components/HomeButton.vue";
import { api_cx_myForm } from "@/request/api";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import EmptyCps from "@/components/EmptyCps.vue"
import getDetailPlace from "@/utils/location";
import { getTime, twoTimeInterval } from "@/utils/time";
import router from "@/router";
mui.back=function () {
  router.back()
}
const topTitle = ref('我的发布')
const activeName = ref('a');
const btnLab = ref('发布新帮忙')
const beforeChange = (i: any) => {
  console.log(i)
  return true
}
const bangList: any = ref([])
const bangListShz: any = ref([])
const bangListYjd: any = ref([])
const bangListYwc: any = ref([])
const bangListYgb: any = ref([])
const bangListDjd: any = ref([])

const getmyBangInfo = () => {
  console.log('调用了获取数据函数')
  api_cx_myForm().then((res: any) => {
    if (res.code !== 1) {
      Toast.fail('获取我的发布列表失败')
    } else {
      bangList.value = res.result
      bangListShz.value = res.result.filter((item: any) => {
        return item.state === 3
      })
      bangListYjd.value = res.result.filter((item: any) => {
        return item.state === 1
      })
      bangListYwc.value = res.result.filter((item: any) => {
        return item.state === 2
      })
      bangListYgb.value = res.result.filter((item: any) => {
        return item.state === 4 || item.state === 5 || item.state === 0
      })
      bangListDjd.value = res.result.filter((item: any) => {
        return item.state === 6
      })
    }
  })
}
getmyBangInfo()

const time = computed(() => {
  return function (item: any) {
    let startTime: any = ref(getTime(new Date()))
    return twoTimeInterval(startTime.value, item.limitTime)
  }
})

const colorArr = computed(() => {
  return function (item: any) {
    switch (item.state) {
      case 0:
        return ['gray']
      case 1:
        return ['blue']
      case 2:
        return ['green']
      case 3:
        return ['yellow']
      case 4:
        return ['gray']
      case 5:
        return ['red']
      case 6:
        return ['purple']
    }
  }
})
const statusLab = computed(() => {
  return function (item: any) {
    switch (item.state) {
      case 0:
        return `已过期`
      case 1:
        return `已接单`
      case 2:
        return `已完成`
      case 3:
        return `审核中`
      case 4:
        return `已取消`
      case 5:
        return `审核失败`
      case 6:
        return `待接单`
    }
  }
})
const loading = ref(false);
const onRefresh = () => {

  getmyBangInfo()
  loading.value = false;
}

const goDetailBang=(id:any)=>{
  router.push({
    path:`/allBang/${id}`,
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

:deep(.van-tabs__line) {
  background-color: rgba(79, 173, 255, 1);
}
:deep(.van-pull-refresh){
  height: 580px;
  overflow: auto;
}
:deep(.van-tab--active) {
  color: rgba(37, 99, 235, 1);
}

:deep(.van-tabs--line .van-tabs__wrap) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
:deep(.van-tabs__nav--line.van-tabs__nav--complete){
  background: transparent;
}

:deep(.bt_Wrapped) {
  position: absolute;
  bottom: 20px;
  left: 0;

  .HomeButton {
    border-radius: 10px;
    width: 315px;
    height: 46px;
  }
}

.userRelease_wrapped {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
}

.vanTabItemList {
  height: 580px;
  overflow: auto;
  background-color: transparent;

  .vanTabItem {
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-top: 10px;
    width: 345px;
    height: 105px;
    margin-left: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .top {
      .bang_type {
        margin-left: 24px;
      }

      .bang_name {
        font-size: 14px;
        color: rgba(33, 33, 33, 1);
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

      .bangStatus {
        position: absolute;
        display: inline-block;
        right: 5px;
        color: rgba(172, 172, 172, 1);
      }

      .gray {
        color: rgba(172, 172, 172, 1);
      }

      .blue {
        color: rgb(137, 176, 237);
      }

      .green {
        color: #18d16c;
      }

      .yellow {
        color: rgb(230, 207, 117);
      }

      .red {
        color: rgb(223, 16, 47);
      }

      .purple {
        color: rgba(149, 104, 202, 0.5);
      }
    }
  }
}
</style>
