import { useStore } from "@/stores";
import axios from "axios";
import { config } from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
//设置post请求方式请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const requests=axios.create({
    baseURL:'http://114.116.95.152',
    headers:{'Content-Type':'application/json;charset=utf-8'},
    timeout:5000
})
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
//超时时间
// axios.defaults.timeout=10000
const store=useStore()
//请求拦截器
requests.interceptors.request.use(config=>{
    if (store.getIsLogin){
        config.headers!.token = store.getToken;
    }
    return config;
},error => {
    return Promise.reject(new Error('request failed'))
})
//响应拦截器
requests.interceptors.response.use(res=>{
    return res.data
},error => {
    return Promise.reject(new Error('response failed'))
})
export function get(url:string, params:any){
    return new Promise((resolve, reject) =>{
        requests.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err.data)
        })
    })
}
export function get1(url:string){
    return new Promise((resolve, reject) =>{
        requests.get(url).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err.data)
        })
    })
}
export function post(url:string, params:any) {
    return new Promise((resolve, reject) => {
        requests.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
export function post1(url:string) {
    return new Promise((resolve, reject) => {
        requests.post(url)
            .then(res => {
                resolve(res);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
export function put(url: string, params: object) {
    return new Promise((resolve, reject) => {
        requests.put(url,params)
            .then(res => {
                resolve(res);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}


export default requests
