<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
        <!-- 侧边导航 -->
        <app-aside :is-collapse="isCollapse" class="aside-menu"></app-aside>
    </el-aside>
    <el-container>
        <!-- 头部 -->
      <el-header class="header">
          <div>
             <i :class="{'el-icon-s-fold' : isCollapse,
               'el-icon-s-unfold':!isCollapse
              }"
             @click="isCollapse = !isCollapse"
             ></i>
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
                <!-- native你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符 -->
                <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
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
import globalBus from '@/utils/global-bus'
export default {
  name: 'LayoutIndex',
  components: {
    // 注册进来
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边导航栏的展开
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile()
    // 注册自定义事件
    // 当这个事件发布以后，这个注册函数就会被调用到
    globalBus.$on('update-user', (data) => {
      // this.user = data // 注意：不要这么做，对象之间赋值的是引用，会导致相互影响的问题
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
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
