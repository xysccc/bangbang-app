import { post,get} from '@/request/request';
//登录请求
export const login =  (p:object) =>  post('/user/login', p)
//获取注册验证码请求
export const api_getCode =  (p:object) =>  post('/user/account', p)
//注册请求
export const reg =  (p:object) =>  post('/user/register', p)
//退出请求 原生axios

//获取个人信息
