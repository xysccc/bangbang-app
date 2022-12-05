<template>
  <div class="Login_Wrapped">
    <loading-cps ref="crx"/>
    <status-bar/>
    <!--    顶部导航栏-->
    <van-config-provider :theme-vars="topBar">
      <van-nav-bar title="登录">

      </van-nav-bar>

    </van-config-provider>

    <div class="bd">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <label class="label">QQ邮箱</label>
            <van-field
                v-model="email"
                type="text"
                placeholder="请输入QQ邮箱"
                name="QQ邮箱"
                :rules="[{ pattern:patternEmail, message: '请输入合法qq邮箱' }]"
            >
              <template #left-icon>
                <img src="../../../assets/img/Message.png" style="width: 24px;height: 24px;">
              </template>
            </van-field>
            <label class="label">密码</label>
            <van-field
                v-model="password"
                :type="isShowPassword?'text':'password'"
                name="密码"
                placeholder="请输入8位以上数字加字母混合密码"
                :rules="[{ required: true,pattern:patterPassword, message: '密码至少八个字符，至少一个字母和一个数字' }]"
                ref="passwordRef"
            >
              <template #left-icon>
                <img src="../../../assets/img/lock.png" style="width: 24px;height: 24px;">
              </template>
              <template #right-icon>
                <img src="../../../assets/img/passwordFalse.png" style="width: 22px;height: 15px;"
                     v-show="isShowPassword" @click="changShowPassword">
                <img src="../../../assets/img/passwordTrue.png" style="width: 22px;height: 15px;"
                     v-show="!isShowPassword" @click="changShowPassword">
              </template>
            </van-field>
          </van-cell-group>

          <router-link to="/retrieve Password" class="retrievePassword">忘记密码?</router-link>
          <div style="display: flex;justify-content: center;">
            <!--            提交的按钮-->
            <van-button class="loginBtn" :disabled="loginBtnIsDisabled"
                        :style="loginBtnIsDisabled?'opacity:.3':'opacity:1'" native-type="submit">
              <div class="btnLabel">登录</div>
            </van-button>
          </div>
        </van-form>
        <div class="fgx">
          <div class="or">OR</div>
        </div>
        <div class="otherLogin_wrapped">
          <div class="otherLogin">
            <div class="otherLogin_item item_qq">
              <img src="../../../assets/img/qq.png">
            </div>
            <div class="otherLogin_item item_wx">
              <img src="../../../assets/img/wx.png">
            </div>
            <div class="otherLogin_item item_dx">
              <img src="../../../assets/img/dx.png">
            </div>
          </div>
        </div>
        <router-link to="/reg" class="reg">没有账号?<span class="reg_right">去注册<van-icon name="arrow"/></span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getPersonInformation, login } from '@/request/api';
import { nextTick, onMounted, reactive, ref, toRaw, watch } from "vue";
import { useStore } from "@/stores";
import jwt_decode from 'jwt-decode'
import router from "@/router";
import LoadingCps from '@/components/LoadingCps.vue'
import { Toast } from "vant";
import StatusBar from "@/components/StatusBar.vue";

//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
//显隐密码
const isShowPassword = ref(false)
const changShowPassword = ref(() => {
})
//禁用/启用按钮 默认禁用
const loginBtnIsDisabled = ref(true)
//解析token
const store = useStore()
const email = ref('')
const password = ref('')
const patternEmail = /^[1-9][0-9]{4,10}@qq.com$/
const patterPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
//加载动画的ref
const crx = ref<any>()
watch([password, email], (newVal, oldVal) => {
  //显隐密码逻辑
  if (!password.value) {
    //密码框没有值禁用点击事件
    changShowPassword.value = () => {
      Toast({
        message: '请输入密码',
        position: 'bottom'
      })
    }
    isShowPassword.value = false
  } else {
    changShowPassword.value = () => {
      isShowPassword.value = !isShowPassword.value
    }
  }
//禁用/启用登录按钮逻辑
  loginBtnIsDisabled.value = !(patternEmail.test(email.value) && patterPassword.test(password.value));
})


//登录函数
const onSubmit = (values: object) => {
  if (values) {
    // Toast.loading('验证中...');
    crx.value.loading1.true()
    //发送请求
    login({
      "email": email.value,
      "password": password.value
    }).then((res: any) => {
      if (res.code !== 1) {
        mui.toast(`${res.message}`)
        crx.value.loading1.clear()
      } else {
        crx.value.loading1.clear()
        // Toast.success('登陆成功');
        mui.toast('登陆成功')
        const token = res.result.token
        const userInfo:any = jwt_decode(token)
        store.setIsLogin(true)
        store.setToken(token)
        console.log(userInfo)
        store.setUser(userInfo)
        getPersonInformation().then((res:any)=>{
          if (res.code!==1) return Toast.fail('获取用户信息失败')
          //服务器拿到的数据
          store.setUserInfo(res.result)
        })
        mui.alert("对部分鸿蒙2.0华为手机首页白屏！请换其他机型测试")
        router.push('/home/index')

        // //跳转home后清除所有历史记录
        // const backLength = window.history.length - 1
        // router.go(-backLength)
      }
    })

  }

};
</script>
<style lang="less" scoped>
//最外层包裹部分
.Login_Wrapped {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: linear-gradient(to left, rgba(172, 203, 238, 0.74) 0%, #e7f0fd 100%);
}

//登录上半部分


//登录下半部分
.bd {
  width: 100vw;
  height: 90.06vh;
  border-radius: 40px 40px 0 0;
  margin-top: 20px;
  padding-top: 30px;
  opacity: 1;
  background: rgba(255, 255, 255, 1);

  //表单样式
  .van-form {
    .label {
      font-size: 16px;
      font-weight: 400;
      color: rgba(110, 125, 146, 1);
      text-align: left;
      vertical-align: top;
    }

    .van-cell {
      border: 1px solid rgba(226, 232, 240, 1);
      border-radius: 16px;
      margin: 15px 0;
    }

    .loginBtn {
      width: 327px;
      height: 56px;
      border-radius: 32px;
      background: rgba(37, 99, 235, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 8px 8px 8px;

      .van-button__content {
        width: 50px;
        height: 24px;
        opacity: 1;

        .van-button__text {
          .btnLabel {
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, .25);
            font-size: 16px;
          }

        }

      }


    }
  }

  //忘记密码
  .retrievePassword {
    display: block;
    margin: 13px 0 20px 20px;
    width: 70px;
    height: 21px;
    opacity: 1;
    /** 文本1 */
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 21px;
    color: #2563eb;
    text-align: left;
    vertical-align: top;
  }

  //登录按钮下面那条分割线
  .fgx {
    width: 100vw;
    height: 21px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 50px;

    &::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 85vw;
      background-color: rgba(226, 232, 240, 1);
    }

    //OR
    .or {
      display: flex;
      justify-content: center;
      position: absolute;
      z-index: 1;
      background-color: #fff;
      color: rgba(100, 116, 139, 1);
      width: 50px;
    }
  }

  //其他方式登录
  .otherLogin_wrapped {
    margin-top: 4vh;
    width: 100vw;
    display: flex;
    justify-content: center;

    .otherLogin {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      .otherLogin_item {
        box-sizing: border-box;
        margin: 10px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 52px;
        height: 52px;
        border: 1.3px solid rgba(234, 239, 243, 1);
        border-radius: 100%;

        img {
          width: 32px;
          height: 32px;
        }

        &:nth-child(3) {
          margin-right: 0;
        }
      }
    }
  }

  //去注册那行样式
  .reg {
    display: inline-block;
    width: 100vw;
    text-align: center;
    color: #545454;
    margin-top: 6vh;

    .reg_right {
      color: #1989fa;
    }
  }
}
</style>
