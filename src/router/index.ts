import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home/index'
        },
        {
            path: '/welcome',
            component: () => import('@/views/Welcome.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/user/UserLogin.vue'),
        },
        {
            path: '/reg',
            component: () => import('@/views/user/UserReg.vue')
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
            component:()=>import('@/views/user/UserInformation.vue'),
        },
        {
            path:"/person/updateNc",
            component:()=>import('@/views/user/UpdateNc.vue')
        },
        {
            path:"/person/bindingPhone",
            component:()=>import('@/views/user/BindingPhone.vue')
        }
    ]
})
//路由前置守卫
router.beforeEach((to,from,next)=>{
    //定义白名单
    const whitePath=['/login','/welcome','/reg']
    //白名单放行
    if(whitePath.includes(to.path)) return next()
    const tokenStr=localStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

export default router
