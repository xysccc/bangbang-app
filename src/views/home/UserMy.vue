<template>
<div v-if="isShowTotal">
  <status-bar/>
<!--  1 star-->
  <header class="my_header">
<!--    设置按钮-->
    <font-awesome-icon icon="fa-solid fa-gear" class="icon-sz" @click="goSz"/>
  </header>
<!--  1 end-->
<!--  2 star-->
  <div class="person_information" @click="router.push('/person')">
<!--    头像-->
  <div class="left_tx"><img :src="Info.myInfo.head"></div>
  <div class="right">
<!--    姓名那一块-->
    <div class="right-left"><div class="name">{{Info.myInfo.username}}</div><div class="email">邮箱 {{Info.myInfo.email}}</div></div>
<!--    去详细信息的箭头-->
    <div class="right-right">
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </div>
  </div>
  </div>
<!--  2 end-->
</div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import router from "@/router";
import {  reactive, ref } from "vue";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import { getPersonInformation } from "@/request/api";



const isShowTotal=ref(false)
getPersonInformation().then((res:any)=>{
  if (res.code!==1) return Toast.fail('获取用户信息失败')
  //获取我的信息成功,赋值到本地
  Info.myInfo=res.result
  //请求成功显示页面
  isShowTotal.value=true
  //将详细信息存到pinia
  store.setUserInfo(res.result)
})
const goSz=()=>{
  router.push('/userSz')
}
interface myInfo{
  head?:string,
  username?:string,
  email?:string
}
const Info=reactive<any>({
  myInfo:{}
})
</script>

<style scoped lang="less">
@font-face {
  font-family: name;
  src: url("@/assets/font/MaShanZheng-Regular.ttf");
}
//最顶部
.my_header{
  width: 100vw;
  height: 4vh;
  padding-right: 20px;
  //设置图标
  .icon-sz{
    float: right;
    font-size: 22px;

  }
}
//简略信息
.person_information{
  margin-top: 20px;
  padding-left: 10px;
display: flex;
  justify-content: space-between;
  //头像盒子
  .left_tx{
    width: 65px;
    height: 65px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .right{
    padding: 0 20px;
    flex:1;
    display: flex;
    justify-content: space-between;
    .right-left{
      //姓名
      .name{
        height: 44.8px;
        font-family: name,serif;
        font-size: 28px;
        font-weight: 500;
        color: #000;
      }
      .email{
        color: rgba(0, 41, 48, 0.65);
      }
    }
    //右侧箭头
    .right-right{
      display: flex;
      align-items: center;
    }
  }
}
</style>
