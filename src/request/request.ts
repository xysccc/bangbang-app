import { useStore } from "@/stores";
import axios from "axios";
// @ts-ignore
//设置post请求方式请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.baseURL='http://114.116.95.152'
//超时时间
axios.defaults.timeout=10000
const store=useStore()
//请求拦截器
axios.interceptors.request.use(config=>{
    if (localStorage.getItem('token')){
        config.headers!.token = store.getToken;
    }

    return config;
},error => {
    // return Promise.error(error);
    return error
})
export function get(url:string, params:any){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    })
}
export function post(url:string, params:any) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}

