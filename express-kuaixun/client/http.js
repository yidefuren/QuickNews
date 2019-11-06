import axios from 'axios'
import {Loading, Message} from 'element-ui'

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {    //使用Element loading-close 方法
    loading.close()
}


const http = axios.create({
    baseURL: 'http://localhost:5000/admin/api'
})

http.interceptors.request.use(config => {
    startLoading()
    if (localStorage.eleToken)
        config.headers.Authorization = localStorage.eleToken
    return config
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)

    const {status} = error.response
    if (status == 401) {
        Message.error('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('eleToken')

        // 页面跳转
        router.push('/login')
    }

    return Promise.reject(error)
})


export default http;