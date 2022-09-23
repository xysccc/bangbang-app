<template>
 <div class="Login_Wrapped">
   <loading-cps ref="crx"/>
   <head-cps/>
   <div class="bd">
     <span class="span_login">登录</span>
     <div class="div">
       <van-form @submit="onSubmit">
         <van-cell-group inset>
           <van-field
               v-model="username"
               name="用户名"
               label="用户名"
               placeholder="用户名"
               :rules="[{ pattern, message: '请输入合法邮箱' }]"
           />
           <van-field
               v-model="password"
               type="password"
               name="密码"
               label="密码"
               placeholder="密码"
               :rules="[{ required: true, message: '请填写密码' }]"
           />
         </van-cell-group>
         <div style="margin: 16px;">
           <van-button round block type="primary" native-type="submit">
             提交
           </van-button>
         </div>
       </van-form>
       <router-link to="/reg" class="reg">没有账号?<span class="reg_right">去注册<van-icon name="arrow" /></span></router-link>
     </div>
   </div>
 </div>
</template>
<script setup lang="ts">
import { login } from '@/request/api';
import { ref } from "vue";
import { useStore } from "@/stores";
import jwt_decode from 'jwt-decode'
import router from "@/router";
import LoadingCps from '@/components/LoadingCps.vue'
import HeadCps from "@/components/HeadCps.vue";
import axios from "axios";
import { Toast } from "vant";
//解析token
const store = useStore()
const username = ref('')
const password = ref('')
const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const crx=ref<any>()
const onSubmit = (values: object) => {
  if (values) {
    new Promise(resolve => {
      // Toast.loading('验证中...');
      crx.value.loading1.true()
      //发送请求
      login({
        "account": username.value,
        "password": password.value
      }).then((res: any) => {
        console.log(res)
        if (res.code !== 1) return Toast.fail('登陆失败')
        crx.value.loading1.clear()
        // Toast.success('登陆成功');
        const token = res.result.token
        //token存到本地
        localStorage.setItem("token", token);
        //相关信息
        const userInfo = jwt_decode(token)
        store.setIsLogin(true)
        store.setToken(token)
        store.setUser(userInfo)
        router.push('/home')
      })
     ;
    });

  }

};
</script>
<style lang="less">
.Login_Wrapped{
  width: 100vw;
  height: 100vh;
  position: relative;
}
//登录上半部分


//登录下半部分
.bd {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 70.32vh;
  opacity: 1;
  border-radius: 5.33vw;
  background: rgba(255, 255, 255, 1);
  //登录两个字的span
  .span_login {
    display: block;
    position: absolute;
    left: 10.13vw;
    top: 2.00vh;
    width: 17.6vw;
    height: 6.11vh;
    opacity: 1;
    /** 文本1 */
    font-size: 8.0vw;
    font-weight: 400;
    color: rgba(56, 56, 56, 0.63);
    text-align: left;
    vertical-align: top;
  }
  //表单样式
  .van-form {
    margin-top: 10vh;
  }
  //去注册那行样式
  .reg{
    display: inline-block;
    width: 100vw;
    text-align: center;
    color: #545454;
    .reg_right{
      color: #1989fa;
    }
  }
}
</style>
