<template>
  <div id="headerNav">
    <span>
      <router-link to="/">豆瓣</router-link>
    </span>
    <ul>
      <li>
        <router-link to="/movie">电影</router-link>
      </li>
      <li>
        <router-link to="/music">音乐</router-link>
      </li>
      <li>
        <router-link to="/book">读书</router-link>
      </li>
      <li>
        <router-link to="/group">小组</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'headerNav'
  }
</script>
<style>
  ul li{
    list-style: none;
  }
</style>
