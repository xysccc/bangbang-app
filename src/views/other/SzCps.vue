<template>
<transition>
  <div>
    <loading-cps ref="crx"/>
    <top-cps/>
    <home-button :label="buttonLabel" @click="exit"/>
  </div>
</transition>
</template>

<script setup lang="ts">
import GoBack from '@/components/GoBack.vue'
import HomeButton from '@/components/HomeButton.vue'
import LoadingCps from '@/components/LoadingCps.vue'
import { ref } from "vue";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
import axios from "axios";
import { api_exit } from "@/request/api";
import TopCps from '@/components/TopCps.vue'
const crx=ref<any>()
const buttonLabel=ref('退出登录')
const tokenStr=ref(store.getToken)
//退出登录
const exit = () => {
  new Promise(async resolve => {
    crx.value.loading1.true()
    //发送退出请求
    api_exit().then((res:any)=>{
      if (res.code!==1) return Toast.fail('退出失败')
      //退出成功
      crx.value.loading1.clear()
      //清空token
      localStorage.clear()
      store.setIsLogin(false)
      store.setToken('')
      store.setUser({})
      store.setUserInfo({})
      store.setIsSelect('首页')
      router.push('/welcome')
    })
  })
}
</script>

<style scoped lang="less">

</style>
