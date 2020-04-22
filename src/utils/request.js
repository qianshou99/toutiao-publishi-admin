// 基于axio封装请求模块
import axios from 'axios'
// 创建一个axios实例,即复制一个axios
// 通过这个实例去发请求,把需要的配置给这个实例来处理
const request = axios.create({
// 基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 所有请求经过这里,config是请求相关的信息
  // 获取登录页token
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 请求失败进入这里
  return Promise.reject(error)
})

// 导出请求方法
export default request
