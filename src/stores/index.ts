import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('XYS', {
    state: () => {

        return {

            isLogin: false,
            token: '',
            //通过token解析出来的user对象
            user: {},
            isSelect: '首页',
            // user详细信息
            userInfo: {},
            timeInfo: {
                //发送验证码button的延时器
                timer: ref(),
                //当前剩余秒数
                count: ref(0),
                //发送验证码按钮的秒数
                time_count: 60,
                //切换发送验证码文本
                isActive: ref(true)
            },
            regInfo: {
                nowRegEmail: ''
            },
            bangForm: {
                bang_name: '',
                bang_money: '',
                bang_place:'',
                bang_detailPlace: '',
                bang_urgent: '0',
                bang_detail: '',
                bang_type: {
                    type: '',
                    kind: '',
                    text: ''
                },
                bangStartTime:'',
                bangEndTime:'',
                bangImg:[],
                bangImgArr:[]
            },
            myBangInfo:{},
            myBangInfo_shz:{},
            myBangInfo_yjd:{},
            myBangInfo_ywc:{},
            myBangInfo_ygb:{},
            allChat:[]
        }
    },
    persist: true,
    getters: { //通过getters对状态state进行获取
        getIsLogin: (state) => state.isLogin,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getIsSelect: (state) => state.isSelect,
        getUserInfo: (state) => state.userInfo,
        getTimerInfo: (state) => state.timeInfo,
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
        setToken(token: string) { //解析的用户
            if (token) {
                this.token = token;
            } else {
                this.token = '';
            }
        },
        setIsSelect(title: string) {
            this.isSelect = title
        },
        setUserInfo(title: any) {
            this.userInfo = title
        },
        setBangForm() {
            this.bangForm = {
                bangImgArr: [],
                bang_place: "",
                bangEndTime: "", bangImg: [], bangStartTime: "",
                bang_type: {kind: '', text: '', type: ''},
                bang_detail: "",
                bang_detailPlace: "",
                bang_money: "",
                bang_name: "",
                bang_urgent: "0"
            }
        }
    },
})

