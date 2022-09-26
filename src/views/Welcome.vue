<template>
  <div>
    <div class="welcome">
      <home-button @click="go"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeButton from '@/components/HomeButton.vue'
import '@/assets/img/bgTotal.png'
import router from "@/router";

const go = () => {
  if (localStorage.getItem('token')){
    router.push('/home/index')
  }else {
    router.push('/login')
  }
}
</script>

<style scoped lang="less">
.welcome {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background: url('@/assets/img/bgTotal.png') center no-repeat;
  background-size: cover;
}
</style>

