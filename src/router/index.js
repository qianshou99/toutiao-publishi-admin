import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由加载login
import login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
