<template>
<div class="accountWrapped"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Dialog } from "vant";
import router from "@/router";
import 'vant/es/dialog/style';

onMounted(()=>{
  Dialog.alert({
    message:"我们正在对账户功能维护"
  }).then(()=>{
    router.back()
  })
})
</script>

<style scoped lang="less">
.accountWrapped{
  width: 100vw;
  height: 100vh;
  background: url("https://s1.ax1x.com/2022/11/24/zJsf1S.png") no-repeat;
  background-size: cover;
}
</style>
