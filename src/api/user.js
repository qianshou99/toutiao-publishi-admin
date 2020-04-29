// 用户相关请求模块
// 加载请求模块
import request from '@/utils/request'
// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 拦截器中已经设置headers
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
// 修改用户头像
// 根据接口要求data 必须传递 FormData 对象
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
