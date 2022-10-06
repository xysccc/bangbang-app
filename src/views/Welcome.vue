<template>
  <div>
    <van-swipe  :show-indicators="false"  lazy-render :loop="false" class="my-swipe" >
      <van-swipe-item>
        <img src="@/assets/img/welcome1.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/img/welcome2.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/img/welcome3.png" alt="" @click="go">
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { store } from "@/utils/useStore";
const images = [
  '@/assets/img/welcome1.png',
];
const go = () => {
  localStorage.setItem('first','true')
    router.push('/home/index')
}
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  img{
    width: 100vw;
    height: 100vh;
  }
}
</style>

