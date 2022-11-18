import { post,post1,get1,put,get} from '@/request/request';
//登录请求
 export const login =  (p:object) =>  post('/user/login',p)
//获取注册验证码请求
export const api_getCode =  (p:object) =>  post('/user/email', p)
//注册请求
export const api_reg =  (p:object) =>  post('/user/register', p)
//退出登录
export const api_exit =  () =>  get1('/user/exit')
//获取个人信息
export const getPersonInformation =  () =>  post1('/user')
//修改个人信息
export const api_updatePerson =  (p:object) =>  put('/user/update',p)
//上传头像
export  const api_updateTx=(p:object)=>post('mo/upload',p)
//验证注册验证码
export  const api_yzCode=(p:object)=>post('user/yz',p)
//请求帮忙类型列表
export  const api_bangType=()=>get1('/task')
//发布帮忙
export const api_bangForm=(p:object)=>post('/task/save',p)
//发布2
export const api_fb2=(p:object)=>post('/task/put',p)
//查询我发布的帮忙
export  const api_cx_myForm=()=>get1('/task/my')
//查所有人发布的全部帮忙
export const api_cx_form=(p:object)=>get('/task/page',p)
//通过id查询帮忙
export const api_cx_one=(p:object)=>get('/task/one',p)
//根据id查发布人信息
export const api_cx_person=(p:object)=>post('/user',p)
//查询与某人的聊天记录
export const api_cx_chat=(p:object)=>post('/lt/jl',p)
//查所有与自己聊天的记录
export  const api_cx_chatList=()=>get1('/lt/lb')
//接帮忙
export  const api_jd=(p:object)=>post('/task/pick',p)
//查我接的所有帮忙
export  const api_getAllBang=()=>get1('/task/jie')
//完成任务后提交
export  const api_bangTj=(p:object)=>post('/task/finish',p)
//今日新单
export const api_todayBang=()=>get1('/task/today')
//我的收藏
export  const api_Collection=()=>get1('/task/ll')
//随机任务
export const api_randomBang=(p:object)=>get('/task/random',p)
//收藏
export const api_form_sc=(p:object)=>get('/task/like',p)
//取消收藏
export const api_form_qxsc=(p:object)=>get('/task/noLike',p)
