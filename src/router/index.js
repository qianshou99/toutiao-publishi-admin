import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置路由加载login
import login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'
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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      }
    ]
  }

]

const router = new VueRouter({
  routes
})
// 导航守卫,路由拦截器
router.beforeEach((to, from, next) => {
  // 如果登录了允许通过,如果没有登录,跳转到登录页面
  // to：要去的路由信息
  // from：来自哪里的路由信息
  // next：放行方法
  if (to.path !== '/login') {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 校验非登录页面的登录状态
    if (user) {
      // 如果有token,证明登录了,允许通过
      next()
    } else {
      // 如果没有登录跳转到登录页面
      next('/login')
    }
  } else {
    // 登录了页面正常允许通过
    next()
  }
})
export default router
