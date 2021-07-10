// 基于axios封装的请求模块
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // withCredentials: true
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  console.log(user)
  console.log('请求发出之前')
  // 在发送请求之前做些什么
  // 如果user为空则把数据的token给Authorization
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 导出请求方法
export default request
