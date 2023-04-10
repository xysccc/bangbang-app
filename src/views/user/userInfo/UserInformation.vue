<template>
  <div class="userInformation_Wrapped">
    <status-bar/>
    <!--    顶部导航栏-->
    <van-config-provider :theme-vars="topBar">
      <van-nav-bar @click-left="onClickLeft">
        <!--        自定义顶部返回按钮图案-->
        <template #left>
          <van-icon name="arrow-left" size="20px" color="#000"/>
          <span class="label">信息编辑</span>
        </template>
      </van-nav-bar>
    </van-config-provider>


    <div class="tx_Wrapped">
      <van-uploader :upload-text="upload_text" :before-read="before_upload_tx" :after-read="upload_tx" class="txSc"/>
      <img :src="userInfo.head" class="txImg">
      <img src="https://s1.ax1x.com/2022/10/17/xDfLaF.png" class="img1">
    </div>
    <div class="totalForm">
      <!--      昵称-->
      <van-form @submit="onSubmit">
        <div class="div_label">昵称</div>
        <van-cell-group inset>
          <van-field
              v-model="user_nc"
              name="昵称"
              :rules="[{validator,message:'只能输入中英文及下划线,长度不能超过7位' }]"
              placeholder="昵称"
              class="xys1"
          />
          <div class="div_label bir">出生日期</div>
          <div class="rq">
            <div class="lf" :class="[userInfo.birthday?'':'font1']">{{
                userInfo.birthday ? userInfo.birthday : '请设置生日'
              }}
            </div>
            <div class="rg"><img src="https://s1.ax1x.com/2022/10/17/xDIpMn.png" style="width: 100%;height: 100%;"
            @click="showPicker=true"></div>
          </div>
          <van-popup v-model:show="showPicker" position="bottom">
            <van-datetime-picker
                type="date"
                title="选择你的生日"
                :columns-order="['month', 'day', 'hour','minute']"
                :formatter="formatter"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
          </van-popup>

          <!--        性别-->
          <div class="xb">
            <div class="div_label lab_xb">性别</div>
            <div class="btnGroups">
              <div :class="[userInfo.sex===1?'btnGroupsBlue':'']" @click="changeSex(1)">男</div>
              <div :class="[userInfo.sex===0?'btnGroupsBlue':'']" @click="changeSex(0)">女</div>
            </div>
          </div>
          <!--          邮箱-->
          <div class="div_label lab_yx">邮箱</div>
          <div class="email">{{ userInfo.email }}</div>
          <!--          手机号-->
          <div class="div_label lab_phone">电话号码</div>
          <van-field
              v-model="user_phone"
              name="手机号"
              :rules="[{pattern:pattern_phone,message:'请输入合法手机号' }]"
              placeholder="请输入手机号"
              class="xys2"/>
        </van-cell-group>

        <van-button square block type="primary" native-type="submit" class="van_btn1">
          保存
        </van-button>

      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import { onMounted, reactive, ref, toRaw, watchEffect } from "vue";
import { store } from "@/utils/useStore";
import { api_updatePerson, api_updateTx } from "@/request/api";
import router from "@/router";
import { Toast } from "vant";
import { getTime, getTime1 } from "@/utils/time";


const label = ref('个人资料')
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
const userInfo: any = store.getUserInfo
console.log(userInfo)
// const emit=defineEmits(['userInfo'])
// emit('userInfo',userInfo)


//上传头像之前的函数
const before_upload_tx = (file: any) => {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    Toast('请上传 jpg/png 格式图片');
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    Toast('图片大小5M以内');
    return false
  }
  return true;
}
const upload_text = ref('上传图片')
//上传头像函数
const upload_tx = (file: any) => {
  const formData = new FormData()
  formData.append('file', file.file)
  api_updateTx(formData).then((res: any) => {
    if (res.code !== 1) return Toast.fail('头像上传失败')
    userInfo.head = res.message
    api_updatePerson({head: res.message}).then((res: any) => {
      if (res.code !== 1) return Toast.fail('头像修改失败')
      Toast.success('修改成功')
    })

  })
}
//修改性别
const sex = ref('1')
const changeSex = (i: any) => {
  sex.value = i
  userInfo.sex = i
}
//修改昵称
const user_nc = ref(`${userInfo.username}`)
//中文数字字母下滑线
const pattern_nc = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
const validator = (val: any) => /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(val) && val.length < 8
const onSubmit = () => {
  api_updatePerson({
    username: user_nc.value,
    birthday: date1.value,
    phone: user_phone.value,
    sex: sex.value
  }).then((res: any) => {
    if (res.code !== 1) return alert('修改失败')
    router.back()
    mui.toast('修改成功')
  })
}
//修改手机号
const user_phone = ref(`${userInfo.phone}`)
const pattern_phone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

//时间选择器
const showPicker = ref(false);
const minDate = new Date(1922)
const maxDate = new Date()
const formatter = (type: string, val: string) => {
  if (type === 'year') {
    return val + '年';
  }
  if (type === 'hour') {
    return val + '时';
  }
  if (type === 'minute') {
    return val + '分';
  }
  if (type === 'month') {
    return val + '月';
  }
  if (type === 'day') {
    return val + '日';
  }
  return val;
};
const date1=ref()
const onConfirm = (value: any) => {
  store.bangForm.bangStartTime = value
  //用户选择的开始时间 value是时间对象
  // userInfo.birthday = getTime1(value)
  date1.value=getTime(value)
  userInfo.birthday=`${value.getFullYear()}年${value.getMonth()+1}月${value.getDate()}日`
  showPicker.value = false;
};
</script>

<style scoped lang="less">
.userInformation_Wrapped {
  height: 100vh;
  overflow: hidden;
}

.userInformation_Wrapped {
  height: 100vh;
  background-color: #fff;
}

.label {
  display: inline-block;
  width: 72px;
  height: 22px;
  margin-left: 20px;
  opacity: 1;
  /** 文本1 */
  font-size: 18px;
  font-weight: 400;
  color: rgba(33, 33, 33, 1);
}

.tx_Wrapped {
  position: relative;
  margin-top: 30px;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .txImg {
    display: block;
    width: 10vh;
    height: 10vh;
    border-radius: 10%;
  }

  .img1 {
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 10%;
    right: 39%;
  }

  //头像上传的小相机图标
  //头像上传器
  .txSc {
    position: absolute;
    z-index: 1;
    overflow: hidden;
    opacity: 0;
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
  }
}


:deep(.xys1 input) {
  font-size: 18px;
  padding-left: 30px;
}

:deep(.xys2 input) {
  font-size: 18px;
  padding-left: 20px;
}

.totalForm {
  margin-top: 30px;

  .rq {
    margin-top: 20px;
    display: flex;
    height: 30px;

    .lf {
      display: flex;
      font-size: 18px;
      flex: 1;
      padding-left: 43px;
    }

    .font1 {
      color: #d4d4d4;
    }

    .rg {
      width: 24px;
      height: 24px;
      margin-right: 48px;
    }
  }

  .xb {
    margin-top: 20px;


    .btnGroups {
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
      padding-left: 30px;
      font-size: 15px;

      .btnGroupsBlue {
        background-color: rgba(37, 99, 235, 1);
        color: #fff;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: none;
        width: 87px;
        height: 34px;
        border-radius: 6px;
        margin-left: 6px;
        border: 1px solid #d7d7d7;
      }
    }

  }

  .div_label {
    width: 100%;
    height: 27px;
    margin-left: 45px;
    margin-top: 0;
    opacity: 0.4;
    /** 文本1 */
    font-size: 18px;
    font-weight: 400;
    line-height: 26.64px;
    color: rgba(52, 52, 52, 1);
  }

  .bir {
    margin-left: 30px;
    margin-top: 10px;
  }

  .lab_xb {
    margin-left: 30px;
  }

  .lab_yx {
    margin-top: 10px;
    margin-left: 30px;
  }

  .lab_phone {
    margin-top: 10px;
    margin-left: 30px;
  }

  .email {
    margin-top: 0px;
    display: flex;
    align-items: center;
    font-size: 18px;
    padding-left: 38px;
    height: 60px;
  }

}

:deep(.van_btn1) {
  border-radius: 10px;
  width: 315px;
  height: 46px;
  margin-left: 50%;
  bottom: 40px;
  transform: translate(-50%, 60px);
  background-color: rgba(37, 99, 235, 1);
}

:deep(.van-calendar__selected-day) {
  background-color: #1989fa;
}

:deep(.van-safe-area-bottom button) {
  background-color: #1989fa;
  border: 0;
}

</style>
