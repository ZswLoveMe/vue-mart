<template>
  <div class="login-wrapper">
    <el-container>
      <el-main>
        <div class="login-box">
          <el-form :model="loginForm" :rules="rulesFrom">
            <el-form-item label="用户名" prop="username" required>
              <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
              <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-button type="primary" class="submit-login" @click="handleLogin">登录</el-button>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rulesFrom: {
          username: {
            required: true,
            trigger: 'blur',
            message: '用户名为必填项'
          },
          password: {
            required: true,
            trigger: 'blur',
            message: '密码为必填项'
          }
        }
      }
    },
    methods: {
      async handleLogin() {
        let res = await this.$http.get('/api/login', {
          params: {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        })
        console.log('res:', res)
        const {code, token, message} = res.data
        if (code == 0) {
          localStorage.setItem("token", token)//缓存进本地
          this.$store.commit('setToken', token)//从入store
          console.log(' this.$route.query：',  this.$route.query)
          const redirect = this.$route.query.redirect|| '/'
          //     回跳
          this.$router.push(redirect);
        } else {
          this.$message({
            showClose: true,
            message: message || '登录失败',
            type: 'warning'
          })
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .login-wrapper {
    .login-box {
      width: 50%;
      margin: 100px auto;

      .submit-login {
        margin-left: 50%;
        transform: translateX(-50%);
        width: 150px;
      }
    }
  }


</style>
