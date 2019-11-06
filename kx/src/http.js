import axios from 'axios'
import {Loading, Message} from 'element-ui'

let loading

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
    baseURL: 'http://127.0.0.1:5000/api'
})

http.interceptors.request.use(config => {
    startLoading()

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
    console.log(error)
    // Message.error(error.response.data)

    return Promise.reject(error)
})

export default http;