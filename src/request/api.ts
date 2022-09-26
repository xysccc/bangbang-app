import { post,post1,get1,put} from '@/request/request';
//登录请求
export const login =  (p:object) =>  post('/user/login',p)
//获取注册验证码请求
export const api_getCode =  (p:object) =>  post('/user/account', p)
//注册请求
export const reg =  (p:object) =>  post('/user/register', p)
//退出登录
export const api_exit =  () =>  get1('/user/exit')
//获取个人信息
export const getPersonInformation =  () =>  post1('/user')
//修改个人信息
export const api_updatePerson =  (p:object) =>  put('/user/update',p)
//修改头像
export  const api_updateTx=(p:object)=>post('common/upload',p)
