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
                path:"index",
                component:()=>import('@/views/home/UserIndex.vue')
            },
                {
                    path:"my",
                    component:()=>import('@/views/home/UserMy.vue')
                },
                {
                    path:"message",
                    component:()=>import('@/views/home/UserMessage.vue')
                },
                {
                    path:"shortVideo",
                    component:()=>import('@/views/otherFunction/ShortVideo.vue')
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
            path:"/bang/release",
            component:()=>import('@/views/user/Bang/ReleaseBang.vue')
        },
        {
            path:"/bangHall",
            component:()=>import('@/views/user/Bang/BangHall.vue')
        },
        {
            path:"/bang/treeSelect",
            component:()=>import('@/views/user/Bang/TreeSelect.vue')
        },
        {
            path:"/bang/bangMap",
            component:()=>import('@/views/user/Bang/BangMap.vue')
        },
        {
            path:"/userRelease",
            component:()=>import('@/views/user/userInfo/UserRelease.vue')
        },
        {
            path:"/userBang",
            component:()=>import('@/views/user/userInfo/UserBang.vue')
        },
        {
            path:"/allBang/:id",
            component:()=>import('@/views/user/Bang/AllMyBang.vue')
        },
        {
            path:"/allBangRelease/:id",
            component:()=>import('@/views/user/Bang/AllBang.vue')
        },
        {
            path:`/chat`,
            component:()=>import('@/views/user/Chat/PersonToPerson.vue')
        },
        {
            path:`/sameCity`,
            component:()=>import('@/views/user/Bang/SameCity.vue')
        },
        {
            path:`/today`,
            component:()=>import('@/views/user/Bang/BangToday.vue')
        },
        {
            path:`/userCollection`,
            component:()=>import('@/views/user/userInfo/UserCollection.vue')
        },
        {
            path:`/photoWall`,
            component:()=>import('@/views/otherFunction/PhotoWall.vue')
        },
        {
            path:"/photoWall/:type",
            component:()=>import('@/views/otherFunction/PhotoWallDetail.vue')
        },
        {
            path:"/wyy",
            component:()=>import('@/views/otherFunction/WyyBuzz.vue')
        },

        {
            path:"/userLv",
            component:()=>import('@/views/user/userInfo/UserLv.vue')
        },
        {
            path:"/userFoot",
            component:()=>import('@/views/user/userInfo/UserFootprint.vue')
        },
        {
            path:"/userAccount",
            component:()=>import('@/views/user/userInfo/UserAccount.vue')
        },
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
