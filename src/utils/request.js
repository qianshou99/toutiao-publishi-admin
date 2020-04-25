// 基于axio封装请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建一个axios实例,即复制一个axios
// 通过这个实例去发请求,把需要的配置给这个实例来处理
const request = axios.create({
// 基础路径
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
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
