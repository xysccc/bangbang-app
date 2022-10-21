import { createRouter, createWebHashHistory } from 'vue-router'
import {useStore} from "@/stores";


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '/welcome',
            component: () => import('@/views/Welcome.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/user/Login/UserLogin.vue'),
        },
        {
            path: '/reg',
            component: () => import('@/views/user/Reg/UserReg.vue')
        },
        {
            path: '/reg/reg1',
            component: () => import('@/views/user/Reg/RegFirst.vue')
        },
        {
            path: '/reg/reg2',
            component: () => import('@/views/user/Reg/RegSecond.vue')
        },
        {
            path: '/reg/reg3',
            component: () => import('@/views/user/Reg/RegThird.vue')
        },
        {
            path: '/home',
            component: () => import('@/views/home/UserHome.vue'),
            children:[
                {
                    path:"",
                    component:()=>import('@/views/home/UserIndex.vue')
                },
                {
                path:"/home/index",
                component:()=>import('@/views/home/UserIndex.vue')
            },
                {
                    path:"/home/my",
                    component:()=>import('@/views/home/UserMy.vue')
                },
            ]
        },
        {
            path:"/userSz",
            component:()=>import('@/views/other/SzCps.vue')
        },
        {
            path:"/person",
            component:()=>import('@/views/user/userInfo/UserInformation.vue'),
        },
        {
            path:"/person/updateNc",
            component:()=>import('@/views/user/userInfo/UpdateNc.vue')
        },
        {
            path:"/person/bindingPhone",
            component:()=>import('@/views/user/userInfo/BindingPhone.vue')
        }
    ]
})
//路由前置守卫
router.beforeEach((to,from,next)=>{
    //定义白名单
    const whitePath=['/login','/reg','/reg/reg1','/reg/reg2','/reg/reg3']
    //白名单放行
    if(whitePath.includes(to.path)) return next()
    if (to.path==='/welcome'&&localStorage.getItem('first')) return next('/home/index')
    if (to.path==='/welcome'&&!localStorage.getItem('first')) return next()
    const  store=useStore()
    const tokenStr=store.getToken
    if(!tokenStr) return next('/login')
    next()


})

export default router
