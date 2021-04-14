import axios from 'axios'
import Vue from 'vue'

//引用路由便于后续路由跳转
import router from './router'

const http = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || 'admin/api'
    baseURL: 'http://localhost:3001/admin/api'
})

http.interceptors.request.use(function(config) {
    if(localStorage.token){
        config.headers.Authorization = 'Bearer '+ (localStorage.token || ' ')
    }
    return config;
}, function(error){
    return Promise.reject(error);
})

//err全局捕获 不用每个页面监听错误 axios.interceptors 拦截器
http.interceptors.response.use(res=>{
    return res
},err =>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'err',
            message: err.response.data.message
        })  
    }

    console.log(err.response);
    if(err.response.status === 401){
        router.push('/login')
    }

    return Promise.reject(err);
})

export default http

