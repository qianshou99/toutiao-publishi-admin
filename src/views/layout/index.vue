<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
        <!-- 侧边导航 -->
        <app-aside class="aside-menu"></app-aside>
    </el-aside>
    <el-container>
        <!-- 头部 -->
      <el-header class="header">
          <div>
             <i class="el-icon-s-fold"></i>
             <span>华夏智业测评系统有限责任公司</span>
          </div>
          <el-dropdown>
              <div class="avatar-wrap">
                  <img class="avatar" :src="user.photo" alt="">
                  <span>{{user.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
            <!-- <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 加载组件
import AppAside from './components/aside'
// 加载请求模块
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    // 注册进来
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}// 当前登录用户信息
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {
    getUserProfile().then(res => {
    //   console.log(res)
      this.user = res.data.data// 请求信息
    })
  },
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%
  }
}

.header {
  display: flex;// 水平排列
  justify-content: space-between;// 两边排列
  align-items: center;// 垂直居中
//   background-color: #b3c0d1;
  border-bottom: 1px solid #ccc;
}

.main {
  background-color: #e9eef3;
}
.avatar-wrap{
    display: flex;
    align-items: center;
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
}
</style>
