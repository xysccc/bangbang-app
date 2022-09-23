import { defineStore } from "pinia";
export const useStore = defineStore('XYS',{
    state: () => {
        return {
            isLogin: false,
            token:'',
            user: {},
            isSelect:''
        }
    },
    getters: { //通过getters对状态state进行获取
        getIsLogin: (state) => state.isLogin,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getIsSelect: (state) => state.isSelect
    },
    actions: {
        setIsLogin(isAuth: boolean) {//修改当前登录的状态
            if (isAuth) {
                this.isLogin = isAuth; //在pinia中this指代state
            } else {
                this.isLogin = false;
            }
        },
        setUser(user: any) { //解析的用户
            if (user) {
                this.user = user;
            } else {
                this.user = {};
            }
        },
        setToken(token:string) { //解析的用户
            if (token) {
                this.token = token;
            } else {
                this.token = '';
            }
        },
        setIsSelect(title:string){
            this.isSelect=title
        }
    },
})

