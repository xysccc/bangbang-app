<template>
  <div class="bang_wrapped">
    <loading-cps ref="crx"/>

      <status-bar/>

      <van-config-provider :theme-vars="topBar">
        <van-nav-bar title="发布帮忙" @click-left="onClickLeft"
                     left-arrow
        >
        </van-nav-bar>

      </van-config-provider>

    <div class="lab">帮忙信息</div>
    <!--  表单-->
    <div class="totalForm">
      <!--      昵称-->
      <van-form @submit="onSubmit" show-error="show-error">
        <van-cell-group inset>
          <van-field
              v-model="bang_name"
              name="帮忙名称"
              :rules="[{required:true}]"
              placeholder="请输入帮忙名称"
              label="帮忙名称"
              input-align="right"
          />
          <van-field
              v-model="bang_type"
              name="帮忙类型"
              :rules="[{required:true}]"
              placeholder="请选择帮忙类型"
              label="帮忙类型"
              right-icon="arrow"
              readonly
              input-align="right"
              @click="goTreeSelect"
          />
          <van-field
              v-model="bang_money"
              name="赏金"
              :rules="[{required:true}]"
              placeholder="请输入赏金金额"
              label="赏金"
              input-align="right"
              type="number"
          />
          <van-field
              v-model="bang_place"
              name="帮忙地点"
              :rules="[{required:true}]"
              placeholder="请输入帮忙地点"
              label="帮忙地点"
              right-icon="arrow"
              readonly
              input-align="right"
              @click="goBangMap"
          />
          <van-field
              v-model="bang_detailPlace"
              name="详细地址"
              :rules="[{required:true}]"
              placeholder="请输入详细地址"
              label="详细地址"
              input-align="right"
          />
          <van-field
              v-model="bang_startTime"
              name="开始时间"
              :rules="[{required:true}]"
              placeholder="开始时间"
              label="开始时间"
              input-align="right"
              @click="showPicker = true"
          />
          <van-field
              v-model="bang_endTime"
              name="结束时间"
              :rules="[{required:true}]"
              placeholder="结束时间"
              label="结束时间"
              input-align="right"
              @click="showPicker_end = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-datetime-picker
                type="datetime"
                title="选择开始时间"
                :columns-order="['month', 'day', 'hour','minute']"
                :formatter="formatter"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
          </van-popup>
          <van-popup v-model:show="showPicker_end" position="bottom">
            <van-datetime-picker
                type="datetime"
                title="选择结束时间"
                :columns-order="['month', 'day', 'hour','minute']"
                :formatter="formatter"
                :min-date="minDate"
                :max-date="maxDate_end"
                @confirm="onConfirm_end"
                @cancel="showPicker_end = false"
            />
          </van-popup>
          <!--        加急-->
          <div class="xb">
            <div class="div_label">是否加急</div>
            <div class="btnGroups">
              <div :class="[bang_urgent==='1'?'btnGroupsBlue':'']" @click="changeUrgent(1)">加急</div>
              <div :class="[bang_urgent==='0'?'btnGroupsBlue':'']" @click="changeUrgent(0)">不加急</div>
            </div>
            <Transition name="xys">
              <div class="tips" v-show="isShowTips">温馨提示：加急需要收取赏金*10%加急费用</div>
            </Transition>
          </div>

          <div class="detail_lab">帮忙介绍</div>
          <van-field
              v-model="bang_detail"
              rows="2"
              type="textarea"
              :rules="[{required:true}]"
              maxlength="100"
              placeholder="请输入帮忙介绍详细说明"
              show-word-limit
          />
          <div class="fileSubmit_lab">
            <div class="detail_lab">详细说明</div>
            <div class="span_1">请拍摄照片或者上传视频，视频15s-30s</div>
          </div>
          <div class="fileSubmit">
            <van-field name="uploader">
              <template #input>
                <van-uploader v-model="value" :max-count="3" :after-read="upload_bang_img"
                />
              </template>
            </van-field>
          </div>
        </van-cell-group>

       <div class="btn_wrapped">
         <van-button square block type="primary" native-type="submit" class="van_btn1">
           发布
         </van-button>
       </div>

      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBar from '@/components/StatusBar.vue'
import TopBar from '@/components/TopBar.vue'
import { reactive, ref, toRaw, toRefs, watch, watchEffect } from "vue";
import router from "@/router";
import { store } from "@/utils/useStore";
import { Dialog, Toast } from "vant";
import 'vant/es/dialog/style';
import { getTime, getTime1, getTime3 } from "@/utils/time";
import { api_bangForm, api_fb2, api_updatePerson, api_updateTx } from "@/request/api";
import LoadingCps from '@/components/LoadingCps.vue'
//监听返回键
mui.back=function () {
  onClickLeft()
}
//加载动画的ref
const crx = ref<any>()
const topBar = {
  //高度
  navBarHeight: '56px',
  navBarTitleFontSize: '18px',
  navBarTitleTextColor: 'rgba(0,0,0,1)',
  navBarArrowSize: '20px',
  navBarArrowColor: '#000',

}
const onClickLeft = () => {
  //确认框
  Dialog.confirm({
    title: '提示',
    message:
        '是否保留该草稿',
    confirmButtonColor: '#2563eb'
  })
      .then(() => {
        // on confirm
        router.back()
        store.bangForm.bangStartTime=``
        store.bangForm.bangEndTime=``
      })
      .catch(() => {
        // on cancel
        store.setBangForm()
        router.back()
      });

}
const isShowTips = ref(false)
const goTreeSelect = () => {
  router.push('/bang/treeSelect')
}
const goBangMap = () => {
  router.push('/bang/bangMap')
}
//表单数据
const bang_form: any = store.bangForm
const bang_name = ref(bang_form.bang_name)
const bang_type = ref(bang_form.bang_type.text)
const bang_money = ref(bang_form.bang_money)
const bang_place = ref(bang_form.bang_place.slice(bang_form.bang_place.indexOf('市')+1))
const bang_detailPlace = ref(bang_form.bang_detailPlace)
const bang_urgent = ref(bang_form.bang_urgent)
const bangImgArr = ref(bang_form.bangImgArr)

const changeUrgent = (i: number) => {
  bang_urgent.value = i + ''
  isShowTips.value = !!i;
}
//帮忙介绍
const bang_detail = ref(bang_form.bang_detail)
watch([bang_name, bang_money, bang_detailPlace, bang_urgent, bang_detail], (newVal, oldVal) => {
      store.bangForm.bang_name = bang_name.value
      store.bangForm.bang_money = bang_money.value
      store.bangForm.bang_detailPlace = bang_detailPlace.value
      store.bangForm.bang_urgent = bang_urgent.value
       store.bangForm.bang_detail = bang_detail.value

})
watchEffect(() => {
  isShowTips.value = bang_urgent.value === '1';
})
//时间选择器
const bang_startTime = ref(getTime1(bang_form.bangStartTime));
const bang_endTime = ref(getTime1(bang_form.bangEndTime));
const showPicker = ref(false);
const showPicker_end = ref(false);
const minDate = new Date()
const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 2, minDate.getHours(), minDate.getMinutes())
const maxDate_end = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() + 2, minDate.getHours(), minDate.getMinutes())
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
const onConfirm = (value: any) => {
  store.bangForm.bangStartTime = value
  //用户选择的开始时间 value是时间对象
  bang_startTime.value = getTime1(value)
  showPicker.value = false;
};
const onConfirm_end = (value: any) => {
  store.bangForm.bangEndTime = value
  //用户选择的结束时间
  bang_endTime.value = getTime1(value)
  showPicker_end.value = false;
};
//文件上传
let ImgArr=ref([])
const value: any = ref(bang_form.bangImg);
const upload_bang_img = (file: any) => {
  bang_form.bangImg = value.value

  const formData = new FormData()
  formData.append('file', file.file)
  api_updateTx(formData).then((res: any) => {
    if (res.code !== 1) return Toast.fail('图片上传失败')
    // userInfo.head = res.message
    const xys1 = value.value.map((item: any) => {
      if (!item.img) {
        item.img = `${res.message}`
      }
      return item
    })
      ImgArr.value= xys1.map(item=>{
        return item.img
      })
    store.bangForm.bangImgArr=ImgArr.value
    bangImgArr.value=ImgArr.value
  })
}
//发布函数
const onSubmit = (values: any) => {
if (values){
  crx.value.loading1.true()
  console.log('1')
  const releaseTime=ref(new Date())
api_bangForm({
    name:bang_name.value,
    typeId:bang_form.bang_type.type,
    kindId:bang_form.bang_type.kind,
    money:bang_form.bang_money,
    location:bang_form.bang_place+bang_form.bang_detailPlace,
    startTime:getTime(bang_form.bangStartTime),
    limitTime:getTime(bang_form.bangEndTime),
    urgent:Number(bang_form.bang_urgent),
  material:bangImgArr.value.join(','),
  releaseTime:getTime3(releaseTime.value),
  details:bang_form.bang_detail
  // material:ImgArr,
}).then((res:any)=>{
  if (res.code !== 1) {
    mui.toast(`${res.message}`)
    crx.value.loading1.clear()
  }else {
    console.log('1')
    mui.toast('发布成功')
    store.setBangForm()
  }
})
setTimeout(()=>{
  api_fb2({
    name:bang_name.value,
    typeId:bang_form.bang_type.type,
    kindId:bang_form.bang_type.kind,
    money:bang_form.bang_money,
    location:bang_form.bang_place+bang_form.bang_detailPlace,
    startTime:getTime(bang_form.bangStartTime),
    limitTime:getTime(bang_form.bangEndTime),
    urgent:Number(bang_form.bang_urgent),
    material:bangImgArr.value.join(),
    releaseTime:getTime3(releaseTime.value),
    details:bang_form.bang_detail
  }).then((res:any)=>{
    if (res.code!==1) {
      Toast.fail('gg')
      crx.value.loading1.clear()
    }
    crx.value.loading1.clear()
    router.back()
    console.log('2')
    console.log(res)
  })
},1000)
}
}


// console.log(str.lastIndexOf('\''))
</script>

<style scoped lang="less">
.bang_wrapped {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
}

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

.lab {
  height: 25px;
  margin: 14px 0 0 32px;
  /** 文本1 */
  font-size: 18px;
  font-weight: 400;
  color: rgba(33, 33, 33, 1);
}

.totalForm {
  margin-top: 20px;
  height: 652px;
  overflow: auto;
  :deep(.van_btn1) {
    border-radius: 10px;
    width: 315px;
    height: 46px;
    margin-left: 50%;
    bottom: 55px;
    transform: translate(-50%, 60px);
    background-color: rgba(37, 99, 235, 1);
  }

  .detail_lab {
    width: 80px;
    font-size: 18px;
    margin: 10px 0 5px 20px;
  }

  .fileSubmit_lab {
    display: flex;
    justify-content: space-between;

    .span_1 {
      display: flex;
      align-items: center;
    }
  }

  :deep(.van-field__control--min-height) {
    height: 80px;
    background-color: rgba(245, 245, 245, 1);
  }

  :deep(label) {
    font-size: 14px;
  }

  .div_label {
    font-size: 14px;
    margin-left: 15px;
  }

  .tips {
    margin: 10px 0 10px 15px;
    width: 100vw;
    height: 17px;
    /** 文本1 */
    font-size: 12px;
    font-weight: 400;
    color: rgba(42, 130, 228, 1);
  }

  .xys-enter-active {
    transition: all 1s;
  }

  .xys-leave-active {
    transition: all;
    /*添加定位 删除的时候才有动画*/
    position: absolute;
  }

  .xys-enter, .xys-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .xys-move {
    transition: transform 1s;
  }

  :deep(.van-picker__columns .van-picker-column) {
    &:nth-child(5) {
      display: none;
    }
  }
  .btn_wrapped{
    height: 100px;
  }
}
</style>
