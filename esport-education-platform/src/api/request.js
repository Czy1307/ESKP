import axios from "axios"

//创建axios实例
const requests = axios.create({
    timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    return res.data;
}, (Error) => {
    return Promise.reject(new Error('faile'))
})

export default requests