<template>
<transition enter-active-class="animate__animated animate__bounceInRight">
  <div>
    <loading-cps ref="crx"/>
    <div class="top">
      <go-back style="color:#000;"/>
      <div class="sz" style="width: 100%; display: inline-block; text-align:center;"> 设置</div>
    </div>
    <home-button :label="buttonLabel" @click="exit"/>
  </div>
</transition>
</template>

<script setup lang="ts">
import GoBack from '@/components/GoBack.vue'
import HomeButton from '@/components/HomeButton.vue'
import { ref } from "vue";
import { Toast } from "vant";
import router from "@/router";
import { store } from "@/utils/useStore";
import axios from "axios";
const crx=ref<any>()
const buttonLabel=ref('退出登录')
const tokenStr=ref(store.getToken)
//退出登录
const exit = () => {
  new Promise(async resolve => {
    crx.value.loading1.true()
    //发送退出请求
    const {data:res} = await axios.get('/user/exit')
    console.log(res)
    if (res.code!==1) return Toast.fail('退出失败')
    //退出成功
    crx.value.loading1.clear()
    //清空token
    localStorage.clear()
    store.setIsLogin(false)
    store.setToken('')
    store.setUser({})
    await router.push('/welcome')

  })
}
</script>

<style scoped lang="less">
.top{
  width: 100vw;
  .sz{
    padding-top: 10px ;
    font-size: 18px;
    color: #000;
  }
}
</style>
