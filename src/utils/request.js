// 基于axio封装请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'
// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'
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
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 所有响应码为 2xx 的响应都会进入这里

  // response 是响应处理
  // 注意：一定要把响应结果 return，否则真正发请求的位置拿不到数据
  return response
}, function (error) {
  // console.dir()可以显示一个对象的所有属性和方法
  // console.dir(error)
  // 任何超出 2xx 的响应码都会进入这里
  const { status } = error.response
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }

  return Promise.reject(error)
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
