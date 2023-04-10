<template>
<div style="overflow-y: hidden">
  <status-bar/>
  <top-bar :topBarLab="topBarLab"/>
  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="items"
      class="tree"
      style="height: 800px"
      @click-item="changType"
  />

</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import StatusBar from  '@/components/StatusBar.vue'
import TopBar from  '@/components/TopBar.vue'
import { store } from "@/utils/useStore";
import { api_bangType } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";
const topBarLab=ref("请选择帮忙类型")
const activeId = ref(1);
const activeIndex = ref(0);
let items=ref()

api_bangType().then((res:any)=>{
  if (res.code!==1){
    Toast.fail('请求列表失败')
  }else {
     items.value= res.result.map((item:any)=>{
      return{
        text:item.type,
        children:item.kindList.map((_:any)=>{
          return{
            text:_.name,
            id:_.id,
            classId:_.classId
          }
        }),
      }
    })


  }
})
const changType=(i:any)=>{
  console.log(i)
  store.bangForm.bang_type.text=i.text
  store.bangForm.bang_type.type=i.classId
  store.bangForm.bang_type.kind=i.id
  router.back()
}
</script>

<style scoped lang="less">
:deep(.van-sidebar-item--select:before) {
  background-color: #1989fa;
}
:deep(.van-tree-select__item--active) {
  color: #1989fa;
}
</style>
