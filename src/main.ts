import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPlug from 'pinia-plugin-persistedstate'
const pinia=createPinia()
import router from './router'


import './assets/css/main.css'
import 'vant/es/toast/style';
import 'vant/es/image-preview/style';
import '//at.alicdn.com/t/c/font_3680670_cjjgze1iwg6.js'
import 'lib-flexible'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import fonts awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
//可以使用solid brands regular 三种类型的图标
import { fas } from '@fortawesome/free-solid-svg-icons'
import {  fab} from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


/* add icons to the library */
library.add(fas)
library.add(fab)
library.add(far)
const app = createApp(App)
app.use(pinia)
//使用持久化插件
pinia.use(piniaPlug)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
