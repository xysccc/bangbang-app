<template>
  <loading-cps ref="crx"/>
<!--  1-->
  <header class="my_header" :style="{ backgroundImage:`url(${Info.myInfo.background?Info.myInfo.background:'https://s1.ax1x.com/2022/11/23/z8OOl4.jpg'})`}">
    <div class="toolBar">
      <img src="https://s1.ax1x.com/2022/10/06/x1qSjH.png" alt="" style="width: 30px;height: 30px;" @click="router.push({path:'/chat',query:{id:'1596022488326746114'}})">
      <img src="https://s1.ax1x.com/2022/10/06/x1bzge.png" alt="" style="width: 32px;height: 32px;" @click="goSz">
    </div>
    <div class="tx_wrapped">
      <img :src="Info.myInfo.head" alt="">
    </div>
    <div class="name_wrapped">
      {{Info.myInfo.username}}
    </div>
    <div class="function">
      <div class="changeBackground">
        <van-uploader :after-read="updateBg"  class="bgSc"/>
        <img src="https://s1.ax1x.com/2022/11/20/zMXsGd.png" alt="">
        <span>主页背景</span>
      </div>

      <div class="goPerson" @click="router.push('/person')">
        <img src="https://s1.ax1x.com/2022/11/20/zMXrPH.png" alt="">
        <div>编辑资料</div>
      </div>
    </div>
    <div class="lvBox_wrapped" >
      <div class="lvBox"  >
        <div class="lvLab">
        Lv1 初学乍练
      </div>
        <div class="des">
          等级越高赚钱越多
        </div>
        <div class="arrow">
          <font-awesome-icon icon="fa-solid fa-chevron-right" style="color:#3085e4;font-size: 20px" />
        </div>
        <div style="position: absolute;width: 100%;height: 40px;left: 0;top: 0;z-index: 99" @click="router.push('/userLv')"></div>
      </div>

    </div>
  </header>
  <div class="tab">
    <div class="main">
      <div class="tabItem"  @click="router.push('/userAccount')">
        <img src="https://s1.ax1x.com/2022/11/20/zMXV8s.png" alt="">
        <div class="lab">我的账户</div>
      </div>
      <div class="tabItem" @click="router.push('/userCollection')">
        <img src="https://s1.ax1x.com/2022/11/20/zMXZ2n.png" alt="">
        <div class="lab">我的收藏</div>
      </div>
      <div class="tabItem" @click="router.push('/userFoot')">
        <img src="https://s1.ax1x.com/2022/11/20/zMXevq.png" alt="">
        <div class="lab">我的足迹</div>
      </div>
    </div>
  </div>
  <div class="banner" @click="router.push('/bangHall')">
  </div>
  <div class="myRelease" @click="goMyRelease"></div>
  <div class="myHelp" @click="goUserBang"></div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import router from "@/router";
import { onMounted, reactive, ref } from "vue";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import { api_updatePerson, api_updateTx, getPersonInformation } from "@/request/api";
import LoadingCps from '@/components/LoadingCps.vue'
store.getChatList()
//调用loading的方法的ref
const crx = ref<any>()
//显示页面的标识
const getInformation=()=>{
  getPersonInformation().then((res:any)=>{
    if (res.code!==1) return Toast.fail('获取用户信息失败')
    //获取我的信息成功,赋值到本地
    Info.myInfo=res.result
    crx.value.loading1.clear()
    //服务器拿到的数据
    const data=res.result
    //将服务器日期数据修改后存入pinia
    let date1=new Date(data.birthday)
    data.birthday=`${date1.getFullYear()}年${date1.getMonth() + 1}月${date1.getDate()}日`;
    store.setUserInfo(data)
  })
}
onMounted(()=>{
  crx.value.loading1.true()
  getInformation()
})



const goSz=()=>{
  router.push('/userSz')
}
interface myInfo{
  head?:string,
  username?:string,
  email?:string
}
const Info=reactive<any>({
  myInfo:{}
})
const goMyRelease=function () {
  router.push('/userRelease')
}
const goUserBang=()=>{
  router.push('/userBang')
}
const updateBg=(file: any) => {
  const formData = new FormData()
  formData.append('file', file.file)
  api_updateTx(formData).then((res: any) => {
    if (res.code !== 1) return Toast.fail('头像上传失败')
    api_updatePerson({background: res.message}).then((res: any) => {
      if (res.code !== 1) return Toast.fail('头像修改失败')
      Toast.success('修改成功')
      getInformation()
    })

  })
}
</script>

<style scoped lang="less">
@font-face {
  font-family: name;
  src: url("@/assets/fonts/MaShanZheng-Regular.ttf");
}
.xys1{
  width: 60px ;
}
//最顶部
.my_header{
  padding-top: 45px;
  width: 100vw;
  height: 320px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.tx_wrapped{
  width: 100%;
  display: flex;
  justify-content: center;
  img{
    width: 10vh;
    height: 10vh;
    border-radius: 10%;
    border: 4px solid #fff;
    box-shadow: 0 0 2px #89b0ed;
  }
}
.name_wrapped{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-size: 22px;
  color: rgba(255, 255, 255, 1);
  font-family:name;
}
.function{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .changeBackground,.goPerson{

    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 80px;
    height: 22px;
    background: rgba(255, 255, 255, 0.45);
    border-radius: 23px;
  }
  .changeBackground{
    padding-left: 5px;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    img{
      width: 16px;
      height: 16px;
    }
    .bgSc{
      position: absolute;
      z-index: 1;
      overflow: hidden;
      opacity: 0;
      width: 80px;
      height: 22px;
      border-radius: 100%;
    }
  }
  .goPerson{
    padding-left: 2px;
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    margin-left: 10px;
    img{
      margin: 0 2px 0 5px;
      width: 12px;
      height: 12px;
    }
  }
}
.lvBox_wrapped{
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  .lvBox{
    width: 275px;
    height: 97px;
    opacity: 1;
    border-radius: 10px;
    background: linear-gradient(90deg, rgba(147, 165, 207, 1) 0%, rgba(228, 239, 233, 1) 100%);
    display: flex;
    padding: 10px 15px;
    .lvLab{
      font-size: 14px;
      font-weight: 500;
      color: rgba(128, 128, 128, 1);
    }
    .des{
      padding-left: 10px;
      line-height: 23px;
      margin-left: 10px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(142, 142, 147, 1);
    }
    .arrow{
      flex:1;
      text-align: right;
    }
  }
}
.tab{


  margin-top: -48px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: url("https://s1.ax1x.com/2022/11/22/z39kVA.png") no-repeat;
  background-size: 355px 165px;
  height: 145px;
  background-position: 10px 0px;
  .main{
    width: 300px;
    //background-color: red;
    height: 72px;
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .tabItem{
      height: 70px;
      flex-direction: column;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
      }
      .lab{
        font-size: 13px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);

      }
    }
  }

}
.banner{
  z-index: 1;
  margin-top: -25px;
  width: 375px;
  background: url("https://s1.ax1x.com/2022/11/20/zMXJ2R.png") no-repeat center;
  height: 100px;
  background-size: 350px 100px;
}
.myRelease{
  margin-top: -25px;
  width: 100%;
  height: 137px;
  background: url("https://s1.ax1x.com/2022/11/22/z39pvD.png") no-repeat center ;
  background-size: 100%   ;
}
.myHelp{
  margin-top: -18px;
  width: 100%;
  height: 135px;
  background: url("https://s1.ax1x.com/2022/11/22/z39SgO.png") no-repeat center center;
  background-size: 100%;
  background-position: 4px;
  background-color: #fff;
}
.toolBar{
  padding: 5px 15px;
  width: 100vw;
  height: 5.09vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
