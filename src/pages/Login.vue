<template>
  <div id="login" class="main">
    <h1>登陆豆瓣</h1>
    <form @submit.prevent='submit'>
     <p>
       <label for='username'>账号</label><input type="text" id='username' name='username' v-model="user.username"/>
     </p>
     <p>
       <label for='password'>密码</label><input type='password' id='password' name='password' v-model="user.password" />
     </p>
     <p class='sideInfo'>
      <input type='checkbox' name='autologin' id='autologin' /><label for='autologin'>下次自动登录</label> |
      <span>忘记密码</span>
     </p>
     <input type='submit' name='submit' value="登陆" class='submit' />
    </form>
    <div class='login_right'>
      <p>>还没有豆瓣账号？<router-link to="/register">立即注册</router-link></p>
      <p><a href="https://www.douban.com/mobile/">>点击下载豆瓣移动应用</a></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit () {
        this.$store.dispatch({
          type: 'login',
          username: this.user.username,
          password: this.user.password
        })
        .then((res) => {
          let redirect = decodeURIComponent(this.$route.query.redirect || `/user/${res.data[0].id}`)
          this.$router.push(redirect)
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
  #login{
    min-height: 400px;
    h1{
      font-size:25px;
      padding:0 0 30px;
      margin-top: 20px;
      color:#494949;
    }
    p{
      line-height: 45px;
    }
    input{
      width: 200px;
      padding:5px;
      border-radius: 3px;
      border: 1px solid #c9c9c9;
      margin-left: 10px;
    }
    .submit{
      color:#fff;
      background:#3fa156;
      border: 1px solid #528641;
      padding:6px 26px;
      width:auto;
      cursor:pointer;
      transition: background 0.5s ease;
      font-size:14px;
    }
    .submit:hover{
      background:#4fc16c;
      border-color: #6aad54;
    }
    .sideInfo{
      font-size:12px;
      color:#666;
      cursor: pointer;
      input{
        width: auto;
        vertical-align: middle;
        margin-right:5px;
      }
      span{
        color:#669;
        margin-left:3px;
      }
      label{
        margin-right:3px;
        cursor: pointer;
      }
    }
    .login_right{
      float:right;
      width:310px;
      font-size: 12px;
      color:#666;
      a{
        color:#669;
        cursor: pointer;
      }
      p{
        margin:0 0 10px;
        line-height: 20px;
      }
    }
    form{
      float:left;
    }
  }
</style>
