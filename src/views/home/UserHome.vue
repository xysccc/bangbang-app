<template>
  <div class="home_Wrapped">
    <router-view/>
    <div class="footer">
      <div class="footer_item" v-for="item in footerList" @click="go(item)">
        <!--:class="item.isSelect===true?'blue':''"-->
        <div class="item_icon">
          <img :src="item.imgSrc" v-if="!item.isSelect" :style="item.styleStr">
          <img :src="item.imgSrc1" v-if="item.isSelect" :style="item.styleStr">
        </div>
        <div class="item_text" :style="item.isSelect?'color:#6d86f2':''">{{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useStore } from "@/stores";
import { store } from "@/utils/useStore";


onMounted(() => {
  //取消动画
  document.querySelector('.home_Wrapped')!.classList.remove("animate__animated", "animate__bounceInRight")
  //初始底部栏的首页高亮
  footerList.find(item => item.text === store.getIsSelect)!.isSelect = true
})
watchEffect(() => {
  store.setIsSelect('首页')
})
const blue = ref('')
const go = (item: any) => {
  const title = item.text
  //将当前选中状态存入pinia
  store.setIsSelect(title)
  footerList.forEach(item => {
    item.isSelect = false
  })
  // footerList.find(_=>_.text===store.getIsSelect)!.isSelect=true
  //选中高亮
  item.isSelect = true

  switch (title) {
    case '我的':
      router.push('/home/my')
      break
    case '首页':
      router.push('/home/index')
      break
  }
}


interface Footer<T> {
  imgSrc?: T,
  text?: T,
  styleStr?:T,
  imgSrc1?:T,
  isSelect?: boolean
}

const footerList = reactive<Footer<string>[]>([
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1Eqmt.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1Exfg.png',
    styleStr:'width:27.5px;height:22.5px',
    text: "首页",
    isSelect: false

  },
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1EOTf.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1EL0P.png',
    styleStr:'width:25.5px;height:25.5px',
    text: "信息",
    isSelect: false
  },
  {
    imgSrc:'https://s1.ax1x.com/2022/10/06/x1EvtS.png',
    imgSrc1:'https://s1.ax1x.com/2022/10/06/x1Ejk8.png',
    text: "我的",
    isSelect: false,
    styleStr:'width:18.5px;height:24.8px',
  },
])

</script>

<style scoped lang="less">
.blue {
  color: #627df1;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid #ccc;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .footer_item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;

    .item_icon{
      margin: 10px 0 8px 0;
    }
    .item_text{
      width: 40px;
      height: 15px;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 0px;
      color: rgba(179, 179, 179, 1);
      text-align: center;
      vertical-align: top;
    }
  }
}

////登录下半部分
//.bd{
//  display: flex;
//  flex-flow: column nowrap;
//  align-items: center;
//  justify-content: center;
//  position: absolute;
//  top: 30vh;
//  width: 100vw;
//  height: 61.32vh;
//  opacity: 1;
//  border-radius: 5.33vw;
//  background: rgba(255, 255, 255, 1);
//}
</style>
