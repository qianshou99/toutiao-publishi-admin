<template>
  <div class="login-container">
       <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
    </div>
    <el-form  class="login-form" ref="form" :model="user" >
      <el-form-item >
        <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
      </el-form-item>
       <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: true // 是否同意协议的选中状态
    }
  },
  methods: {
    onLogin () {
    // 获取表单数据（根据接口要求绑定数据）
      const user = this.user
      // 表单验证
      // 表单验证通过提交登录
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }).catch(err => {
        console.log('登录失败', err)
        // 登录失败
        this.$message.error('错了哦，这是一条错误消息')
      })
    }
  }
}
</script>

<style>
.login-container{
 position: fixed;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 /* 水平排列 */
 display: flex;
 /* 垂直排列 */
 flex-direction: column;
 /* 垂直居中 */
 justify-content: center;
 /* 水平居中 */
 align-items: center;
 background: url("./login_bg.jpg") no-repeat;
 background-size: cover;
}
.login-form-wrap{
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
}
/* logo */
.login-head{
  display: flex;
  justify-content: center;
}
.logo{
    width: 200px;
    height: 57px;
    background: url("./logo_index.png") no-repeat;
    background-size: contain;
}
/* 按钮 */
.login-btn {
      width: 100%;
 }

</style>
