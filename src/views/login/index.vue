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
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
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
    onSubmit () {
      console.log('submit!')
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
