<template>
  <loading-cps ref="crx"/>

  <status-bar/>
  <!--  4-->
  <div class="toolBar">
    <img src="https://s1.ax1x.com/2022/10/06/x1qSjH.png" alt="" style="width: 30px;height: 30px;">
    <img src="https://s1.ax1x.com/2022/10/06/x1bzge.png" alt="" style="width: 32px;height: 32px;" @click="goSz">
  </div>
  <!--  4 end-->
<!--  1-->
  <header class="my_header">
    <!--  simple star-->
    <div class="person_information" @click="router.push('/person')">
      <!--    头像-->
      <div class="left_tx"><img :src="Info.myInfo.head"></div>
      <div class="right">
        <!--    姓名那一块-->
        <div class="right-left"><div class="name">{{Info.myInfo.username}}</div><div class="email">邮箱 {{Info.myInfo.email}}</div></div>
        <!--    去详细信息的箭头-->
        <div class="right-right">
          <font-awesome-icon icon="fa-solid fa-chevron-right" style="color:#3085e4;font-size: 20px"/>
        </div>
      </div>
    </div>
    <!--  simple end-->
<!--header_footer star-->
    <div class="header_footer">
<!--      文字那一行-->
      <div class="footer_font">
        <span class="span_lv lv_style" style="display: inline-block;margin: 20px 15px 0 30px;">Lv1</span>
        <span class="lv_describe lv_style">初学乍练</span>
        <span class="upgrade" style="margin-left: 40vw;font-size: 3.2vw;color: rgba(255, 255, 255, 1)" @click="showPopup">升级攻略<van-icon name="arrow" /></span>
<!--        升级攻略弹出层-->
        <van-popup v-model:show="show" round >
          <div class="popup_text">
            升级攻略哈哈哈哈哈哈哈
          </div>
        </van-popup>
      </div>
<!--      进度条-->
      <div class="footer_progressBar">
        <van-progress :percentage="60" :show-pivot="false" stroke-width="9" color="rgba(66, 72, 116, 1)" style="margin-top: 13px"/>

      </div>
    </div>
  </header>
<!--  1 end-->
<!--  2-->
<div class="bill" style="padding: 23px 44px 0 44px">
<div style="float:left;"><img src="https://s1.ax1x.com/2022/10/06/x1Hjyj.png" alt=""><div style="color: rgba(128, 128, 128, 1);font-size: 16px">我的账户</div></div>
  <div style="float:right;"><img src="https://s1.ax1x.com/2022/10/06/x1bifU.png" alt=""><div style="color: rgba(128, 128, 128, 1);font-size: 16px">账单查询</div></div>
</div>
<!-- 2 end -->
<!--  3-->
<div class="my_help" >
<div class="my_help1">
<div class="help_top">我的帮忙</div>
<div class="help_center" @click="goUserBang">
  <div class="help_item"><img src="https://s1.ax1x.com/2022/10/06/x1bRA0.png" alt=""><span>待完成</span></div>
  <div class="help_item"><img src="https://s1.ax1x.com/2022/10/06/x1bg7q.png" alt=""><span>未完成</span></div>
  <div class="help_item"><img src="https://s1.ax1x.com/2022/10/06/x1bcBn.png" alt=""><span>已完成</span></div>
  <div class="help_item"><img src="https://s1.ax1x.com/2022/10/06/x1b6ns.png" alt=""><span>全部</span></div>

</div>
<div class="help_bottom">
  <div class="rg">违规惩罚记录</div>
  <div class="lf" ><van-icon name="arrow" /></div>
</div>
</div>
</div>
<!--3 end-->
  <div class="other">
<div class="other_lf"  @click="goMyRelease">
  <div class="title">我的发布</div>
  <div class="font_img">
    <span>有困难求帮助</span>
    <img src="https://s1.ax1x.com/2022/10/06/x1xJ8x.png" alt="" style="width: 65px;height: 61px;">
  </div>
</div>
<div class="other_rg">
  <span class="title">在线兼职</span>
  <div class="font_img">
    <span>有困难求帮助</span>
    <img src="https://s1.ax1x.com/2022/10/06/x1xY26.png" alt="" style="width: 69px;height: 75px;">
  </div>
</div>
  </div>

</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import router from "@/router";
import { onMounted, reactive, ref } from "vue";
import { Toast } from "vant";
import { store } from "@/utils/useStore";
import { getPersonInformation } from "@/request/api";
import LoadingCps from '@/components/LoadingCps.vue'

//调用loading的方法的ref
const crx = ref<any>()
//显示页面的标识
onMounted(()=>{
  crx.value.loading1.true()
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
})
//弹出层
const show = ref(false);
const showPopup = () => {
  show.value = true;
};

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
  width: 100vw;
  height: 26.08vh;
  background: url("https://s1.ax1x.com/2022/10/06/x1tpIe.png") no-repeat;
  background-size: 100vw 26.72vh;
}
//简略信息
.person_information{
  padding: 49px 10px 0 15px;
display: flex;
  justify-content: space-between;
  //头像盒子
  .left_tx{
    width: 17.6vw;
    height: 8.4vh;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .right{
    padding: 0 20px;
    flex:1;
    display: flex;
    justify-content: space-between;
    .right-left{
      //姓名
      .name{
        height: 36px;
        font-family: name,serif;
        font-size: 28px;
        font-weight: 500;
        color: #000;
      }
      .email{
        width: 52.53vw;
        height: 3.05vh;
        opacity: 1;
        /** 文本1 */
        font-size: 16px;
        font-weight: 500;
        color: rgba(128, 128, 128, 1);
      }
    }
    //右侧箭头
    .right-right{
      display: flex;
      align-items: center;
    }
  }
}
.lv_style{
  opacity: 1;
  /** 文本1 */
  font-size: 16px;
  font-weight: 500;
  color: rgba(229, 229, 229, 1);
}
.popup_text{
  width: 70vw;
  height: 38.17vh;
}
.bill{
  background-color: #f4f4f4;
  height: 14.21vh;
  img{
    width: 14.73vw;
    height: 6.25vh;
  }
}
.my_help{
  width: 94.67vw;
  height: 19.72vh;
  background-color: rgba(42, 130, 228, 0.19);
  border-radius: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
  .my_help1{
    width: 94.67vw;
    height: 16.79vh;
    border-radius: 20px;
    background: rgba(42, 130, 228, 0.15);
    transform: translateY(11.5px);
    .help_top{
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
      margin-left: 14px;
      margin-bottom: 10px;
    }
   .help_center{
     position: relative;
     display: grid;
     grid-template-columns: 1fr 1fr 1fr 1fr;
     height: 60px;
     .help_item{
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column;
       margin-left: 25px;
       font-size: 15px;
       img{
         width: 30px;
         height: 35px;
       }
       span{
         display: inline-block;
         width: 48px;
       }
     }
     &::after{
       content: '';
       position: absolute;
       width: 95vw;
       height: 2px;
       bottom: -10px;
       left: 0;
       background-color: rgba(255,255,255,1);
     }
   }
    .help_bottom{
      margin-top: 13px;
      padding: 0 14px;
    display: flex;
      font-size: 15px;
      justify-content: space-between;
    }
  }
}
.other{
  display: flex;
  margin-top: 1.91vh;
  width: 100vw;
  height: 14.63vh;
  padding: 0 13px;
  justify-content: space-between;
  .title{
    display: inline-block;
    margin: 6px 0 0 15px;
    width: 64px;
    opacity: 1;
    /** 文本1 */
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
  .font_img{
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      width: 51px;
      height: 44px;
      opacity: 1;
      /** 文本1 */
      font-size: 16px;
      font-weight: 500;
      color: rgba(128, 128, 128, 1);
      text-align: left;
    }
  }
  .other_lf{
    width: 42.67vw;
    height: 14.63vh;
    opacity: 1;
    border-radius: 20px;
    background: rgba(0, 186, 173, 0.08);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

  }
  .other_rg{
    width: 42.67vw;
    height: 14.63vh;
    opacity: 1;
    border-radius: 20px;
    background: rgba(255, 141, 26, 0.05);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  }

}
.toolBar{
  padding: 5px 15px;
  width: 100vw;
  height: 5.09vh;
  background-color: #f3f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
