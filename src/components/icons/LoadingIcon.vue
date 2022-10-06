<template>
  <div class="total">
    <svg xmlns="http://www.w3.org/2000/svg" class="svg-loading" style="margin:auto;background:transparent;display:block;"
         width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="2">
        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
      </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="2">
      <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
      <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
    </circle>
    </svg>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
.total{
  position: relative;
  width: 100vw;
  height: 100vh;
  /*background-color: rgba(216, 211, 211, 0.1);*/
  background-color: #fff;
  z-index: 1;
}
.svg-loading{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
