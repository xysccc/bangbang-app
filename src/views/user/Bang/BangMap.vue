<template>
<div>
  <status-bar/>
  <van-config-provider :theme-vars="topBar">
    <van-nav-bar :title="topBarLab" @click-left="onClickLeft"
                 left-arrow
                 right-text="确定"
                 @click-right="goBangForm"
    >
    </van-nav-bar>

  </van-config-provider>
  <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6&referer=bangbang">
  </iframe>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import TopBar from '@/components/TopBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import { store } from "@/utils/useStore";

const route=useRoute()
onMounted(()=>{
  mui('.mui-input-row input').input();
  // let url = escape(
  //     `${window.location.origin}${window.location.pathname}/#/member/address_form?action=${route.query.action}`
  // )
  // router.go(-1)
  // window.location.href = `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${url}&key=MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6&referer=bangbang`

  window.addEventListener('message', function(event) {
    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
    const loc = event.data;
    if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
      console.log('location', loc);
      store.bangForm.bang_place=loc.poiaddress
    }
  }, false);

})
const topBarLab=ref('选择地址')
//返回箭头
const onClickLeft = () => history.back();
//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
const goBangForm=()=>{
  router.back()
}
</script>

<style scoped lang="less">
.map_wrapped{
  width: 100vw;
  height: 300px;

}
#mapPage{
  width: 100vw;
  height: 100vh;
}

:deep(.mui-search.mui-active:before){
  top: 19px;
}

</style>
