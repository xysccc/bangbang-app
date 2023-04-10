<template>
<div class="photoWallDetail_wrapped">
  <status-bar/>
  <top-bar :topBarLab="topTitle"/>

    <div class="main">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了~~~~"
          @load="onLoad"
      >
     <div class="box van-clearfix">
       <div class="list_half" style="float:left;padding-bottom: 10px">
         <template v-for="(item,index) in imgList" :key="index">
           <div class="item" v-if="index%2!==0">
             <img :src="item.url" alt="" @click="ylImg(item.url)">
           </div>
         </template>
       </div>
       <div class="list_half" style="float:right;padding-bottom: 10px">
         <template v-for="(item,index) in imgList" :key="index">
           <div class="item" v-if="index%2===0">
             <img :src="item.url" alt="" @click="ylImg(item.url)">
           </div>
         </template>
       </div>
     </div>
      </van-list>
    </div>


</div>


</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { ref } from "vue";
import { useRoute } from "vue-router";
import { api_photoWall } from "@/request/api";
import { ImagePreview } from "vant";
import router from "@/router";
mui.back=function () {
  router.back()
}
const topTitle = ref('照片墙')
const route = useRoute();
const type=route.params.type
const imgList:any=ref([])
const queryList=ref({
  page:1,
  size:15
})
const getPhoto=async ()=>{

  const {data:res}=await api_photoWall({type:type,page:queryList.value.page,size:queryList.value.size})
  imgList.value.push(...res.result.list)
}

const ylImg=(url)=>{
  ImagePreview([`${url}`]);
}
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  console.log('load')
  getPhoto()
  setTimeout(()=>{
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (queryList.value.page > 20) {
      finished.value = true;

    }else {
      queryList.value.page++
      finished.value=false
    }
  },2500)

};
</script>

<style scoped lang="less">

.main{
  box-sizing: border-box;
  height: 720px;
  overflow-y: auto;
  padding: 0 13px;
  .item{
    width: 168px;
    margin-top: 10px;
    img{
      display: block;
      box-shadow: 0 2px 3px #6d6d72;
      border-radius: 10px;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}

</style>
