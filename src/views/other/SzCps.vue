<template>
<transition>
  <div>
    <loading-cps ref="crx"/>
    <status-bar/>
    <home-button :label="buttonLabel" @click="exit"/>
  </div>
</transition>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import HomeButton from '@/components/HomeButton.vue'
import LoadingCps from '@/components/LoadingCps.vue'
import { ref } from "vue";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
import { api_exit } from "@/request/api";
const crx=ref<any>()
const buttonLabel=ref('退出登录')
//退出登录
const exit = () => {
  new Promise(async resolve => {
    crx.value.loading1.true()
    //发送退出请求
    api_exit().then((res:any)=>{
      if (res.code!==1) return Toast.fail('退出失败')
      //退出成功
      crx.value.loading1.clear()
      //清空pinia的数据和localStorage的数据
      // localStorage.clear()
      store.$reset()

      store.setIsSelect('首页')
      router.push('/login')
    })
  })
}
</script>

<style scoped lang="less">

</style>
