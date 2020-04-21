import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由加载login
import login from '@/views/login/'
import home from '@/views/home/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    // 指向home
    component: home
  }
]

const router = new VueRouter({
  routes
})

export default router
