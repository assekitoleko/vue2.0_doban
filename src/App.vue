<template>
  <div id="app">
    <headerNav></headerNav>
    <router-view></router-view>
    <pageFoot></pageFoot>
  </div>
</template>

<script>
import headerNav from './components/headerNav'
import pageFoot from './components/footer'

export default {
  name: 'app',
  components: {headerNav, pageFoot}
  // created () {
  //   this.$store.state.login.user_id = localStorage.getItem('user_id')
  //   this.$store.state.login.username = localStorage.getItem('username')
  // }
}
</script>

<style lang="scss">
 *{
   margin:0;
   padding:0;
   font-family: "微软雅黑"
 }
 a{
   text-decoration: none;
 }
 li{
   list-style: none;
 }
 .main{
   width: 60%;
   margin:0 auto;
 }
 #app{
   min-height: 500px;
 }
 input{
   outline:none;
 }
</style>
