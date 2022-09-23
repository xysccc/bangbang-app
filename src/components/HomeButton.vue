<template>
  <div class="bt-Wrapped">
    <button class="HomeButton"><span>{{label}}</span></button>
  </div>
</template>
<script setup lang="ts">
  const props=defineProps({
    label:{
      type:String,
      default: '开启旅程',
      required: false
    }
  })

</script>

<style scoped lang="less">
.bt-Wrapped{
  width: 66.67vw;
  height:10.93vw;
  margin-left: 50vw;
  transform: translate(-33.3vw,80vh);
}
.HomeButton{
  outline: none;
  user-select: none;
  padding: 0;
  width: 66.67vw;
  height:10.93vw;
  background-color: #F14863;
  border: none;
  border-radius: 18.67vw;
  span{
    font-size: 5.6vw;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: top;
  }
}
</style>
