// 基于axio封装请求模块
import axios from 'axios'
// 创建一个axios实例,即复制一个axios
// 通过这个实例去发请求,把需要的配置给这个实例来处理
const request = axios.create({
// 基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 导出请求方法
export default request
