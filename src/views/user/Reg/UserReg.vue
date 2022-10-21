<template>
  <div class="Reg_Wrapped">
    <status-bar/>
    <loading-cps ref="crx"/>
    <!--    顶部导航栏-->
    <van-config-provider :theme-vars="topBar">
      <van-nav-bar @click-left="onClickLeft">
        <!--        自定义顶部返回按钮图案-->
        <template #left>
          <van-icon name="arrow-left" size="20px" color="#000"/>
        </template>
      </van-nav-bar>
    </van-config-provider>
    <div class="bd">
      <!--      分割的盒子-->
      <div class="segmentation_1"></div>
      <!--      装账户卡的盒子-->
      <div class="account_img"><img src="@/assets/img/account.png" alt=""></div>
      <!--      一堆文字的盒子-->
      <div class="font_box_wrapped">
        <div class="font_box">
          <p>注册你的账户</p>
          <h4>帮助您避免欺诈和身份盗窃，并遵守法律法规</h4>
        </div>
      </div>
      <!--      分割的盒子-->
      <div class="segmentation_2"></div>
      <van-radio-group v-model="checked">
        <div class="yz">
          <!--      邮箱验证盒子-->
          <div class="qqEmailYz" :class="checked==='qqEmail'?color.borderObj:''" @click="checked='qqEmail'">
            <!--          左侧图片加文字-->
            <div class="yz_left">
              <!--            图片外层盒子-->
              <div class="img_wrapped_1">
                <img src="@/assets/img/message1.png" alt="">
              </div>
              <div class="yz_font">
                <p>QQ邮箱</p>
                <h4>验证邮箱注册</h4>
              </div>
            </div>
            <!--          右侧选择框-->
            <van-radio name="qqEmail"></van-radio>
          </div>
          <!--        验证手机号盒子-->
          <div class="telYz" :class="checked==='phone'?color.borderObj:''" @click="checked='phone'">
            <!--          左侧图片加文字-->
            <div class="yz_left">
              <!--            图片外层盒子-->
              <div class="img_wrapped_2">
                <img src="@/assets/img/phone.png" alt="">
              </div>
              <div class="yz_font">
                <p>手机号码</p>
                <h4>短信验证码注册</h4>
              </div>
            </div>
            <!--          右侧选择框-->
            <van-radio name="phone"></van-radio>
          </div>
        </div>
      </van-radio-group>
<!--    下一步按钮-->
      <home-button style="margin-top: 143px" :label="btnLabel" @click="go"/>

      <!--      <div class="form">
              <van-form @submit="onSubmit">
                <van-cell-group inset>
                  <van-field
                      v-model="email"
                      type="text"
                      name="QQ邮箱"
                      label="QQ邮箱"
                      placeholder="QQ邮箱"
                      :rules="[{ pattern:patternEmail, message: '请输入合法qq邮箱' }]"
                  />
                  <van-field
                      v-model="code"
                      type="digit"
                      name="验证码"
                      label="验证码"
                      placeholder="验证码"
                      :rules="[{ pattern: patternCode, message: '验证码不是4位数字' }]"
                  >
                    <template #button>
                      <van-button size="small" type="primary" @click="getCode" :disabled="codeBtnDisable">
                      <span v-show="isActive">发送验证码</span>
                      <span v-show="!isActive">{{count}}s后重新发送</span>
                      </van-button>
                    </template>
                  </van-field>
                  <van-field
                      v-model="password"
                      type="password"
                      name="密码"
                      label="密码"
                      placeholder="密码"
                      :rules="[{ required: true,pattern:patterPassword, message: '密码至少八个字符，至少一个字母和一个数字' }]"

                  />
                  <van-field
                      v-model="repeatPassword"
                      type="password"
                      name="重复密码"
                      label="重复密码"
                      placeholder="重复密码"
                      :rules="[{ required: true,validator:validatorRepeatPassword, message: '两次密码输入不一致' }]"
                  />
                </van-cell-group>
                <div style="margin: 16px;">
                  <van-button round block type="primary" native-type="submit">
                    提交
                  </van-button>
                </div>
              </van-form>
            </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">

import LoadingCps from '@/components/LoadingCps.vue'
import { reactive, ref, watch } from "vue";
import { api_getCode,api_reg } from "@/request/api";
import { Toast } from "vant";
import router from "@/router";
import HomeButton from "@/components/HomeButton.vue";
import StatusBar from '@/components/StatusBar.vue'

//顶部导航栏样式
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
const onClickLeft = () => history.back();
//调用loading的方法的ref
const crx = ref<any>()
//单选框
const checked=ref('qqEmail')
//单选框样式
const color=reactive({
  borderObj:{borderBlue:true}
})
//按钮label
const btnLabel=ref('下一步')
//按钮跳转函数
const go=()=>{
  console.log(checked.value)
  if (checked.value==='qqEmail'){
    router.push('/reg/reg1')
  }
}
// 表单数据
const email = ref('')
const password = ref('')
const code = ref('')
const repeatPassword = ref('')
//表单正则
const patternCode = /^\d{4}$/
const patterPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const patternEmail = /^[1-9][0-9]{4,10}@qq.com$/
//重复密码的函数验证
const validatorRepeatPassword: any = (val: any) => {
  if (password.value !== repeatPassword.value) {
    return false
  }
}
//是否禁用
const codeBtnDisable = ref(true)
//发送验证码button的延时器
const timer: any = ref(null)
//发送验证码按钮的秒数
const count = ref(0)
const time_count = 60
//切换发送验证码文本
const isActive = ref(true)
//监视邮箱栏是否为qq邮箱格式,修改发送验证码按钮的状态
watch(email, (newVal, oldVal) => {
  // patternEmail.test(email.value)&&codeBtnDisable.value=false
  codeBtnDisable.value = !patternEmail.test(email.value);
})
//60s倒计时函数
const countDown = () => {
  console.log('调用了倒计时函数')
  if (!timer.value) {
    count.value = time_count
    codeBtnDisable.value = true
    isActive.value = false
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= time_count) {
        count.value--
      } else {
        clearInterval(timer.value)
        codeBtnDisable.value = false
        isActive.value = true
        timer.value = null
      }
    }, 1000)
  }

}

//表单预验证完成后点击提交的函数
const onSubmit = (values: object) => {
  if (values) {
    new Promise(resolve => {
      crx.value.loading1.true()
      //发送请求
      api_reg({
        "email": email.value,
        "code": code.value,
        "password": password.value
      }).then((res: any) => {
        if (res.code !== 1) {
          Toast.fail('注册失败')
          crx.value.loading1.clear()
        } else {
          Toast.success('注册成功')
          crx.value.loading1.clear()
          router.push('/login')
        }

      })
    })
  }
}
const getCode = () => {
  new Promise(resolve => {
    //开启倒计时60s
    countDown()
    setTimeout(() => {
      // Toast.loading('验证中...');
      crx.value.loading1.true()
      //发送请求
      api_getCode({
        "email": email.value,
      }).then((res: any) => {
        console.log(res)
        // if (res.code!==1) return Toast.fail('获取验证码失败')
        // crx.value.loading1.clear()
        if (res.code !== 1) {
          Toast.fail(`${res.message}`)
          crx.value.loading1.clear()
        } else {
          crx.value.loading1.clear()
        }
      }).catch(
          err => {
            Toast.fail('验证码发送失败,请检查邮箱是否正确')
            crx.value.loading1.clear()
          }
      )
    }, 500)

  })

  // axios.post('/user/email',{
  //   "email":email.value
  // })
}
</script>

<style scoped lang="less">
.Reg_Wrapped {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.bd {
  width: 100vw;
  height: 90.32vh;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  .van-form {
  }

  .segmentation_1 {
    height: 5.34vh;
  }
  .segmentation_2 {
    height: 4.2vh;
  }
  .account_img {
    width: 29.87vw;
    height: 9.16vh;
    margin-left: 34.67vw;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .font_box_wrapped {
    margin-top: 5.73vh;
    display: flex;
    width: 100vw;
    justify-content: center;

    .font_box {
      width: 279px;
      height: 80px;
      p{
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 27px;
        color: rgba(15, 23, 42, 1);
        text-align: center;
        vertical-align: middle;
        margin-bottom: 12px;
      }
      h4{
        width: 297px;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 21px;
        color: rgba(100, 116, 139, 1);
        text-align: center;
        vertical-align: middle;
      }
    }
  }
  .yz{
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .qqEmailYz{
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 87.2vw;
      height: 10.18vh;
      opacity: 1;
      border-radius: 16px;
      //border: 1px solid rgba(37, 99, 235, 1);
      border: 1px solid rgba(226, 232, 240, 1);
      margin-bottom: 16px;
    }
    .yz_left{
      display: flex;
      justify-content: space-around;
      .img_wrapped_1{
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: rgba(37, 99, 235, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 24px;
          height: 24px;
        }
      }
      .img_wrapped_2{
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: rgba(248, 250, 252, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 24px;
          height: 24px;
        }
      }
      .yz_font{
        margin-left: 16px;
        p{
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 22.4px;
          color: rgba(15, 23, 42, 1);
          text-align: left;
          vertical-align: top;
        }
        h4{
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.1px;
          line-height: 18px;
          color: rgba(100, 116, 139, 1);
          text-align: left;
        }
      }
    }

    .telYz{
      width: 87.2vw;
      height: 10.18vh;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      opacity: 1;
      border-radius: 16px;
      //border: 1px solid rgba(37, 99, 235, 1);
      border: 1px solid rgba(226, 232, 240, 1);
    }
    .borderBlue{
      border: 1px solid rgba(37, 99, 235, 1)
    }
  }
  //input[type=radio]{
  //  width: 24px;
  //  height: 24px;
  //  opacity: 1;
  //  background: rgba(37, 99, 235, 1);
  //}

}
</style>
