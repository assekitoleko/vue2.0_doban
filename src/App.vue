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
  // beforeCreate () {
  //   console.log('l wanna see some thing')
  //   localStorage.removeItem('userInfo')
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
 .linkStyle{
   color:#37a;
 }
 .linkStyle:hover{
   color:#fff;
   background-color:#37a;
 }
</style>
