import axios from 'axios'  // 引入axios
import { message } from 'antd'
import store from '../store'
import {loginOutAction} from '../store/action.js'
// 创建axios实例，在这里可以设置请求的默认配置
const service = axios.create({
    baseURL:process.env.REACT_APP_API+'/api/admin', //根据自己配置的反向代理去设置不同环境的baeUrl
    timeout: 50000, // 请求超时时间,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
//  添加请求拦截器(言外之意就是在发起请求前做什么)
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token =sessionStorage.getItem('token')
	// console.log(token)
	if (token) {
		config.headers.Authorization = 'Bearer ' + token
	}
        return config
    },
    error => {
        // 对请求错误做些什么
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器 添加响应拦截器
service.interceptors.response.use(
    res => {
        // 对响应数据做点什么
        if (res.data.code != 200) {
            
            message.error(res.data.message)
            
            //400 token失效触发重新登录
            if(res.data.code == 400){
                store.dispatch(loginOutAction)
            }
            return Promise.reject(new Error(res.data.message || 'Error'))
        }
        return res.data
    },
    error => {
        console.log('err' + error) // for debug
        message.error(error);
        return Promise.reject(error)
    }
)
export default service