<template>
  <loading-icon v-show="isShow"/>
</template>


<script setup lang="ts">
import LoadingIcon from "@/components/icons/LoadingIcon.vue";
import { ref, toRefs } from "vue";
let isShow = ref(false);
 const loading1=ref({
  clear:()=>{
    isShow.value=false
  },
  true:()=>{
    isShow.value=true
  }
})
defineExpose({
  loading1:loading1
})
</script>

<style scoped>

</style>
