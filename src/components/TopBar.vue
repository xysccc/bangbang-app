<template>
  <div class="topBar">
    <!--    顶部导航栏-->
    <van-config-provider :theme-vars="topBar">
      <van-nav-bar :title="topBarLab" @click-left="onClickLeft"
                   left-arrow
      >
      </van-nav-bar>

    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
//返回箭头
const onClickLeft = () => history.back();
const props=defineProps({
  topBarLab:{
    type:String,
    default:'顶部栏'
  }
})
</script>

<style scoped lang="less">
:deep( .van-nav-bar__content) {
  .van-icon-arrow-left:before{
    color: #000;
  }
}
</style>
