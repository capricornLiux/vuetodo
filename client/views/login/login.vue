<template>
  <form class="login-form" @submit="doSubmit">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input type="text" class="login-input" placeholder="请输入用户名" v-model="username">
    <input type="password" class="login-input" placeholder="请输入密码" v-model="password">
    <button type="submit" class="login-btn">登录</button>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  metaInfo: {
    title: `login`
  },
  data () {
    return {
      errorMsg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    doSubmit (e) {
      // 默认表单提交并跳转页面, 阻止这些行为
      e.preventDefault()
      if (this.validate()) {
        // 调用登录接口

        // 执行action
        this.login({
          username: this.username,
          password: this.password
        }).then(() => {
          // resolve的时候, 表示登录成功了
          // 进行路由跳转, 使用replace
          this.$router.replace('/app')
        })
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '用户名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;

  h1 {
    font-weight: 100;
    color: #3d3d3d;
  }
}

.login-input {
  appearance: none;
  text-indent: 1em;
  line-height: 30px;
  margin-bottom: 20px;
  border: 1px solid #aaa;
  width: 100%;
  border-radius: 0;
  box-shadow: 0 0 0;
}

.login-btn {
  appearance: none;
  width: 100%;
  line-height: 30px;
  text-align: center;
  background-color: #0d60c7;
  color: #eaeaea;
  cursor: pointer;
  border-color: #0d60c7;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    background-color: darken(#0d60c7, 10);
  }
}

.error-msg {
  font-size: 12px;
  color: red;
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 90%;
  }

  .login-input {
    line-height: 40px;
  }
}
</style>


