<template>
  <div id="headerBar">
    <h1>
      <router-link to="/pages">豆瓣</router-link>
    </h1>
    <ul>
      <li>
        <router-link to="/pages/movie">电影</router-link>
      </li>
      <li>
        <router-link to="/pages/music">音乐</router-link>
      </li>
      <li>
        <router-link to="/pages/book">图书</router-link>
      </li>
      <li>
        <router-link to="/pages/group">小组</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'header-bar',
    data () {
      return {}
    }
  }
</script>
<style>

</style>
