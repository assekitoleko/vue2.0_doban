<template>
  <div id="headerNav">
    <span>
      <router-link to="/">豆瓣</router-link>
    </span>
    <ul>
      <li>
        <router-link to="/movie" class="movie_option">电影</router-link>
      </li>
      <li>
        <router-link to="/music" class="music_option">音乐</router-link>
      </li>
      <li>
        <router-link to="/book" class="book_option">读书</router-link>
      </li>
      <li>
        <router-link to="/group" class="group_option">小组</router-link>
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
  #headerNav{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f3f3f3;
  }
  #headerNav ul{
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  #headerNav ul li{
    margin-left: 15px;
  }
  #headerNav span{
    margin-left: 25px;
    font-size: 25px;
  }
  #headerNav span a{
    color: #072;
  }
  .movie_option{
    color:#27a
  }
  .music_option{
    color:#E4A813
  }
  .book_option{
    color:#614e3c
  }
  .group_option{
    color:#2AB8CC
  }
</style>
