<template>
  <div id="app">
    <headerNav></headerNav>
    <router-view></router-view>
  </div>
</template>

<script>
import headerNav from './components/headerNav.vue'

export default {
  name: 'app',
  components: {headerNav}
}
</script>

<style>
 *{
   margin:0;
   padding:0;
 }
 a{
   text-decoration: none;
 }
</style>
