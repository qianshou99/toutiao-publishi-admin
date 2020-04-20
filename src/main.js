import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 加载全局样式
import './styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 创建vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
