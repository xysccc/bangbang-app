<template>
<div style="background-color:#dae2ed;height: 100vh;">
<div class="header">
  <div class="lab">我的等级</div>
  <div class="current_wrapped">
    <van-circle
        v-model:current-rate="currentRate"
        :rate="myRate"
        :speed="100"
        size="280px"
        start-position="left"
        layer-color="#a8a8a8"
        color="#00bf7f"
    >
      <template #default>
        <div class="lvLab_wrapped">
        <div class="lv_score">
          <span style="color: #2ac845">{{myInfo.experience}}</span> / {{totalExp}}
        </div>
          <div class="lv">Lv.{{myInfo.credibility}}</div>
        </div>
      </template>
    </van-circle>

  </div>
  <div class="tab">
  <div class="tabItem">
    <div class="number">
      {{lvInformation.fb}}
    </div>
    <div class="numberLab">
      累计发布
    </div>
  </div>
    <div class="tabItem">
      <div class="number">
        {{lvInformation.bm}}
      </div>
      <div class="numberLab">
        累计帮忙
      </div>
    </div>
    <div class="tabItem">
      <div class="number">
        {{lvInformation.wc}}
      </div>
      <div class="numberLab">
        累计完成
      </div>
    </div>
    <div class="tabItem">
      <div class="number">
        3
      </div>
      <div class="numberLab">
        累计好评
      </div>
    </div>
  </div>
</div>
  <div class="mainBox">
    <div class=" box box1">
      <div class="lab">
        检验规则
      </div>
      <div class="textbox" style="padding: 0 10px">
        <p>一、经验是什么？</p>
        <p>帮帮用户等级是根据用户参加帮帮系统内各部分功能，从中获得经验值来计算的。可以通过发布任务、参加帮忙等来获得经验，从而增加等级，等级越高特权越多、赏金越多！</p>
        <p>二、经验如何获得？</p>
        <p style="margin-bottom: 3px">1.发布帮忙：通过发布求助帮忙来获得经验。</p>
        <p>2.参与帮忙并按时完成：参加其他用户发布的帮忙可以更快地让你火灯更多经验值。</p>
      </div>
    </div>
    <div class="box box2" >
      <div class="lab">
        相关提示
      </div>
      <div class="textbox" style="padding: 0 10px;">
        <p>1.获得经验值的方式只有以上几种，在帮圈内任何活动不获得经验值。</p>
        <p>2.本平台为实名制平台，不可借用他人账号等操作，系统存在惩罚、扣除经验值机制以及对违反平台操作手册的账号进制做任务，严重者以封禁处理，详情请见后续帮帮版本。</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { api_bangCount, getPersonInformation } from "@/request/api";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import router from "@/router";
mui.back=function () {
  router.back()
}
const currentRate = ref(0);
const myRate=ref(0)
const lvInformation=ref([])
const myInfo:any=ref([])
const getLvInformation=async ()=>{
  const res:any= await api_bangCount()
  console.log(res.result)
  lvInformation.value=res.result
}
const getMyInformation=()=>{
  getPersonInformation().then((res:any)=>{
    if (res.code!==1) return Toast.fail('获取用户信息失败')
    //获取我的信息成功,赋值到本地
    myInfo.value=res.result
    myRate.value=myInfo.value.experience/totalExp.value*50
  })
}
getLvInformation()
getMyInformation()
const totalExp:any=computed(()=>{
  switch (myInfo.value.credibility) {
    case 1: return 100;
    case 2: return 150;
    case 3: return 225;
    case 4: return 337;
    case 5: return 505;
    case 6: return 757;
    case 7: return 1135;
    case 8: return 1702;
    case 9: return 2553;
    case 10: return 3829;
    case 11: return 5743;
    case 12: return 8614;
  }
})
</script>

<style scoped lang="less">
.header{
  padding-top: 45px;
  width: 375px;
  height: 282px;
  opacity: 1;
  background: rgba(42, 130, 228, 1);
  border-radius: 0 0 20px 20px;
  .lab{
    letter-spacing: 1px;
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
  .current_wrapped{
    overflow: hidden;
    padding-top:20px;
    display: flex;

    justify-content: center;
    height: 200px;
    //background-color: red;
    .lvLab_wrapped{
      margin-top: 50px;
     .lv_score{
       font-size: 15px;
       color: #a8a8a8;
     }
      .lv{
        font-size: 35px;
        color: #fff;
        font-weight: 600;
      }
    }

  }
  .tab{
    width: 345px;
    height: 75px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    margin-left: 15px;
    margin-top: -35px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(162, 204, 195, 0.6);
    .tabItem{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .number{
    font-size: 18px;
      }
      .numberLab{
        font-size: 14px;
        color: rgba(128, 128, 128, 1);
      }
    }
  }
}
.mainBox{
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  height: 480px;
  .box{
    width: 343px;
    height: 207px;
    opacity: 1;
    border-radius: 10px;
    background: rgba(255, 255, 255, 1);
  }
  .lab{
    margin: 18px 0 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
    width: 95px;
    height: 30px;
    opacity: 1;
    border-radius: 10px;
    background: rgba(42, 130, 228, 1);
  }
  .box1{
    height: 300px;
  }
  .box2{
    margin-top: 15px;
    height: 150px;
    overflow: auto
  }
}
</style>
