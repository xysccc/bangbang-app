<template>
  <router-view  v-slot="{ Component }">
    <transition enter-active-class="animate__animated animate__backInUp" animate__fast>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import 'animate.css';
import { useStore } from '@/stores'
import { watchEffect } from "vue";
import jwt_decode from 'jwt-decode'//解析token
const store = useStore();
watchEffect(() => { //watchEffect页面一刷新，方法立即被调用
  if (localStorage.token) {
    const token = localStorage.token
    const userInfo = jwt_decode(token)
    store.setIsLogin(true)
    store.setToken(token)
    store.setUser(userInfo)
  }
})
</script>
<style lang="less">
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: linear-gradient(135deg, rgba(244, 149, 108, 0.05) 1%, #f4f4f4 100%);
}
</style>
