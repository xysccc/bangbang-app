<template>

<!--  <router-view  v-slot="{ Component }">-->
<!--    <transition enter-active-class="animate__animated animate__bounceInRight"  animate__fast>-->
<!--      <component :is="Component"></component>-->
<!--    </transition>-->
<!--  </router-view>-->
<router-view/>
</template>
<script setup lang="ts">
//mui
// import './assets/mui.min.js'
import './assets/mui.min.css'
import 'animate.css';

import { useStore } from '@/stores'
import { onMounted, watchEffect } from "vue";
import jwt_decode from 'jwt-decode'
 //解析token
const store = useStore();
// console.log(mui)
// mui.toast('yes')
onMounted(()=>{
  mui.init();
  mui.plusReady(function(){
    plus.navigator.setStatusBarStyle('dark');
  });

})

// const userInfo=(e:any)=>{
//   console.log(toRaw(e))
//   localStorage.setItem('userInfo',JSON.stringify(toRaw(e)))
// }
watchEffect(() => { //watchEffect页面一刷新，方法立即被调用
  // if (localStorage.token) {
  //   const token = localStorage.token
  //   // const userInfo1=JSON.parse(localStorage.getItem('userInfo')!)
  //   const user = jwt_decode(token)
  //   store.setIsLogin(true)
  //   store.setToken(token)
  //   store.setUser(user)
  //   // store.setUserInfo(userInfo1)
  // }
})



</script>
<style lang="less">
#app {
  width: 100vw;
  height: 100%;
  margin: 0;
  background-image: linear-gradient(135deg, rgba(244, 149, 108, 0.05) 1%, #f4f4f4 100%);
}
input[type=text],input[type=password],input[type=tel]{
  border: 0;
  padding: 0 0 0 7px;
  margin: 0;
  height: 30px;
}

</style>
