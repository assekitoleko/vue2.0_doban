<template>
  <div>
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import headerBar from '../components/headerBar'
  export default {
    name: 'Home',
    components: {headerBar}
  }
</script>
