<template>
  <div class="Reg_Wrapped">
    <loading-cps ref="crx"/>
    <go-back style="color:#fff;"/>
    <head-cps/>
    <div class="bd">
      <span class="span_login">注册</span>
      <div class="div">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="email"
                name="QQ邮箱"
                label="QQ邮箱"
                placeholder="QQ邮箱"
                :rules="[{ pattern:patternEmail, message: '请输入合法邮箱' }]"
            />
            <van-field
                v-model="code"
                name="验证码"
                label="验证码"
                placeholder="验证码"
                :rules="[{ pattern: patternCode, message: '验证码不是4位数字' }]"
            >
              <template #button>
                <van-button size="small" type="primary" @click="getCode">发送验证码</van-button>
              </template>
            </van-field>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import HeadCps from "@/components/HeadCps.vue";
import GoBack from "@/components/GoBack.vue";
import LoadingCps from '@/components/LoadingCps.vue'
import { ref } from "vue";
import { api_getCode, reg } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";

const crx = ref<any>()
const email = ref('')
const password = ref('')
const code = ref('')
const patternCode = /^\d{4}$/
const patternEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const onSubmit = (values: object) => {
  if (values) {
    new Promise(resolve => {
      crx.value.loading1.true()
      setTimeout(() => {
        //发送请求
        reg({
          "account": email.value,
          "code": code.value,
          "password": password.value
        }).then((res: any) => {
          if (res.code !== 1) return  Toast.fail('注册失败')
          crx.value.loading1.clear()
          router.push('/login')
        })
      },1000)
    })
  }
}
const getCode=()=>{
  new Promise(resolve => {
      // Toast.loading('验证中...');
      crx.value.loading1.true()
    //发送请求
    api_getCode({
      "account": email.value,
    }).then((res:any)=>{
      console.log(res)
      // if (res.code!==1) return Toast.fail('获取验证码失败')
      // crx.value.loading1.clear()
      if (res.code!==1){
        Toast.fail(`${res.message}`)
        crx.value.loading1.clear()
      }else {
        crx.value.loading1.clear()
      }
    })
     setTimeout(() => {

    },1000)

  })

  // axios.post('/user/account',{
  //   "account":email.value
  // })
}
</script>

<style scoped lang="less">
.Reg_Wrapped{
  width: 100vw;
  height: 100vh;
  position: relative;
}
.bd {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 72.32vh;
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

  .van-form {
    margin-top: 12vh;
  }

}
</style>
