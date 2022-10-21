<template>
  <div class="bt_Wrapped">
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
.bt_Wrapped{
  width: 100vw;
  display: flex;
  justify-content: center;
}
.HomeButton{
  outline: none;
  user-select: none;
  width: 327px;
  height: 56px;
  opacity: 1;
  border-radius: 32px;
  background: rgba(37, 99, 235, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 8px 8px;
  span{
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22.4px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: top;
  }
}
</style>
