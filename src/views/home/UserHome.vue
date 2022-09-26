<template>
  <div class="home_Wrapped">
    <router-view/>
    <div class="footer">
      <div class="footer_item" v-for="item in footerList" @click="go(item)" :class="item.isSelect===true?'blue':''">
        <div class="item_icon"><i class="iconfont" v-html="item.iconUnicode"></i></div>
        <div class="item_text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useStore } from "@/stores";
import { store } from "@/utils/useStore";


onMounted(()=>{
  //取消动画
  document.querySelector('.home_Wrapped')!.classList.remove("animate__animated","animate__bounceInRight")
  //初始底部栏的首页高亮
   footerList.find(item=>item.text===store.getIsSelect)!.isSelect=true
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
  iconUnicode: T,
  text: T,
  isSelect?: boolean
}

const footerList = reactive<Footer<string>[]>([
  {
    iconUnicode: "1",
    text: "首页",
    isSelect: false

  },
  {
    iconUnicode: "2",
    text: "商品",
    isSelect: false
  },
  {
    iconUnicode: "3",
    text: "信息",
    isSelect: false
  },
  {
    iconUnicode: "&#xe6e9;",
    text: "我的",
    isSelect: false
  }
])

</script>

<style scoped lang="less">
.blue {
  color: blueviolet;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid #ccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .footer_item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;

    i {
      font-size: 23px;
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
