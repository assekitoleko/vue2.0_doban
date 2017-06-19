<template>
  <div id="login" class="main">
    <p>登陆豆瓣</p>
    <form @submit.prevent='submit'>
     <p>
       <label for='account'>账号</label><input type="text" id='account' name='account' v-model="user.account"/>
     </p>
     <p>
       <label for='password'>密码</label><input type='password' id='password' name='password' v-model="user.password" />
     </p>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        user: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      submit () {
        let jsonValue = JSON.stringfy(this.user)
        this.$store.dispath({
          type: 'login',
          formData: jsonValue
        })
      }
    }
  }
</script>
<style lang='scss'>
  #login{
    min-height: 400px;
  }
</style>
