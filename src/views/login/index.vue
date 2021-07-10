<template>
  <div class="login-container">
    <div class="from-group">
      <div class="login-Logo"></div>
      <el-form ref="login-form" :model="user" :rules="formRules"  v-loading="loading">
        <el-form-item prop="mobile">
            <el-input v-model="user.mobile"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
             <div style="text-align: right">
                  <el-button style="font-size: 14px" class="" type="text" @click="sendCode">发送验证码</el-button>
             </div>
        </el-form-item>
        <el-form-item prop="agree">
         <el-checkbox v-model="user.agree" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="log-btn"  round @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loading: false,
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
      // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.Login()
      })
    },
    Login () {
      // 获取表单数据
      const user = this.user
      // 点击登录后，加载
      this.loading = true
      // 利用封装好的axios验证表单通过，提交登录
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then((result) => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 将用户相关的数据存储到本地，方便应用
        window.localStorage.setItem('user', JSON.stringify(result.data.data))
        // console.log(result)
        this.$router.push({
          name: 'home'
        })
      }).catch((err) => {
        this.$message.error('登录失败！无效的手机号或验证码错误')
        console.log('登录失败' + err)
        this.loading = false
      })
      // console.log('登录成功')
    },
    sendCode () {
      request({
        methods: 'GET',
        URL: '/member/sendCode?phone=' + this.phone
      }).then(resp => {
        if (resp.data === 'OK') {
          alert('发送短信验证码成功')
        } else {
          alert('发送短信验证码失败')
        }
      })
    }
  }
}
</script>

<style>
.login-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: url(./ttbg.jpg)  no-repeat ;
  background-size: cover;
}
.from-group{
  width: 300px;
  height: 300px;
  padding-top:50px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #fff;
  position: absolute;
  top: 300px;
  left: 300px;
  border-radius: 5%;
}
.log-btn{
  width: 300px;
  position: absolute;
  top:20px;
}
</style>
