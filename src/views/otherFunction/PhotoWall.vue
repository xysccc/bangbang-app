<template>
  <div class="photoWall_wrapped">
    <status-bar/>
    <top-bar :topBarLab="topTitle"/>
    <div class="main">
      <div class="type_item" v-for="(item,index) in listData" :key="index" @click="router.push({path:`/photoWall/${item.type}`})">
        <div class="imgWrapped">
          <img :src="item.imgSrc" alt="" referrerpolicy="no-referrer">
        </div>
        <div class="imgLab">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { reactive, ref } from "vue";
import { api_photoWall } from "@/request/api";
import router from "@/router";
mui.back=function () {
  router.back()
}
const topTitle = ref('帮帮美图')
const listData=reactive( [
  {name:'手机壁纸',type:'phone',imgSrc:'https://pic.netbian.com/uploads/allimg/220107/235423-1641570863b65d.jpg'},
  {name:'动物',type:'animal',imgSrc:'https://pic.netbian.com/uploads/allimg/210307/232017-16151304174998.jpg'},
  {name:'美女',type:'beauty',imgSrc:'https://pic.netbian.com/uploads/allimg/211210/232707-16391500276274.jpg'},
  {name:'车',type:'car',imgSrc:'https://pic.netbian.com/uploads/allimg/211023/234117-1635003677fae7.jpg'},
  {name:'二次元',type:'comic',imgSrc:'https://pic.netbian.com/uploads/allimg/210812/234309-1628782989eba1.jpg'},
  {name:'美食',type:'food',imgSrc:'https://pic.netbian.com/uploads/allimg/171031/102603-15094167632641.jpg'},
  {name:'游戏',type:'game',imgSrc:'https://pic.netbian.com/uploads/allimg/211219/214342-1639921422ac47.jpg'},
  {name:'电影',type:'movie',imgSrc:'https://pic.netbian.com/uploads/allimg/210809/234645-1628524005f154.jpg'},
  {name:'人物',type:'person',imgSrc:'https://pic.netbian.com/uploads/allimg/190922/201809-1569154689c618.jpg'},

  {name:'风景',type:'scenery',imgSrc:'https://pic.netbian.com/uploads/allimg/180826/113958-153525479855be.jpg'},
])

// const getPhoto=async ()=>{
//   const {data:res}=await api_photoWall({type:'food',page:5,size:20})
//   console.log(res.result.list)
// }
// getPhoto()
</script>

<style scoped lang="less">
.main{
  overflow-y: auto;
  height: 90vh;
  padding: 20px 25px 40px;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  flex-flow: row wrap;
  .type_item{
    margin-bottom: 8px;
    .imgWrapped{
      width: 150px;
      height: 100px;
      overflow: hidden;
      img{
        border-radius: 8px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
      }

    }
    .imgLab{
      text-align: center;
      font-size: 16px;
      font-family: "Arial","Microsoft YaHei",serif;
    }
  }
}
</style>
