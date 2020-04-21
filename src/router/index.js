import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由加载login
import login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/',
    // name: 'layout',
    // 指向Layout
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
