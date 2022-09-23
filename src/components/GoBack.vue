<template>
  <van-icon name="arrow-left" class="back" size="30" @click="router.back()"/>
</template>

<script setup lang="ts">
import router from "@/router";
</script>

<style scoped lang="less">
.back{
  font-size: 18px;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 10px;
  //color: rgba(255, 255, 255, 0.86);
  color: transparent;
}
</style>
