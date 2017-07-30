<template>
  <div id='register' class='main'>
    <h1>欢迎加入豆瓣</h1>
    <form @submit.prevent='register'>
     <p>
       <label for='username'>账号</label><input type="text" id='username' name='username' v-model.trim='username' />
     </p>
     <p>
       <label for='password'>密码</label><input type='password' id='password' name='password' v-model.trim='password' />
     </p>
     <p>
       <label for='confirm'>确认密码</label><input type='password' id='confirm' name='confirm' v-model.trim='confirmPassword' />
     </p>
     <p class='agreement'>
       <input type='checkbox' name='protocol' id='protocol' v-model = 'hasRead' />
       <label for='protocol'>我已经认真阅读并同意豆瓣的《使用协议》。</label>
     </p>
     <input type='submit' name='submit' value="注册" :class='{submitDisabled:!hasRead,submit:hasRead}' :disabled='!hasRead' />
    </form>
    <div class='register_right'>
      <p>已经拥有豆瓣账号？<router-link to="/login">直接登陆</router-link></p>
      <p><a href="https://www.douban.com/mobile/">>点击下载豆瓣移动应用</a></p>
    </div>
    <modal name='registerSucess' :classes="['v--modal', 'successAlert']" height='150' @opened='redirectPage'>
      <div id='registerAlert'>
        <h1>恭喜您加入豆瓣成功</h1>
        <p>5s后自动为您跳转到登陆页面</p>
        <p><router-link to="/login">立即登陆</router-link></p>
      </div>
    </modal>
  </div>
</template>
<script>
  export default {
    name: 'register',
    data () {
      return {
        hasRead: false,
        username: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      register () {
        if (!this.username || !this.password) {
          alert('密码，账号不能为空')
          return
        }
        if (this.username.length < 3) {
          alert('账号长度太短，请重新输入')
          return
        }
        if (this.password.length < 3) {
          alert('密码长度太短，请重新输入')
          return
        }
        if (this.password !== this.confirmPassword) {
          alert('密码输入两次不一致，请重新输入')
          return
        }
        this.$store.dispatch({
          type: 'registerAccount',
          username: this.username,
          password: this.password
        }).then((res) => {
          if (res.length > 0) {
            alert('该用户名已经注册，请重新填写')
          } else {
            this.$modal.show('registerSucess')
          }
        })
      },
      redirectPage () {
        setTimeout(() => {
          this.$router.push({path: '/login'})
        }, 5000)
      }
    }
  }
</script>
<style lang='scss' scoped>
  .successAlert{
    div#registerAlert{
      margin:20px;
      h1{
        padding-bottom:10px;
      }
      p{
        font-size: 14px;
        line-height:35px
      }
      a{
        color:#369;
      }
    }
  }
  #register{
    min-height: 400px;
    font-size: 12px;
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
    input.submitDisabled{
      color: #999;
      background-color: #f0f0f0;
      border:1px solid #b9b9b9;
      width:auto;
      padding: 6px 26px;
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
    form{
      float:left;
      width:400px;
      label{
        display:inline-block;
        text-align:right;
        width:60px;
      }
      .agreement{
        display:flex;
        align-items: center;
        margin-top:20px;
      }
      .agreement label{
        width:auto;
        margin-left:10px;
      }
      .agreement input{
        width:auto;
      }
    }
    .register_right{
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
  }
</style>
