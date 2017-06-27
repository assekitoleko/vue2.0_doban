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
      <li @mouseenter="enter" @mouseleave="leave">
        <router-link :to='loginInfo.route' class="login">{{loginInfo.username}}</router-link>
        <ul class='account_actions' ref='account_actions'>
          <li @click='logout' id='logout'>退出</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  // import {mapState} from 'vuex'
  export default {
    name: 'headerNav',
    computed: {
      logedIn () {
        if (!this.$store.state.login.user_id) {
          this.$store.commit('getuser')
        }
        return this.$store.state.login.user_id
      },
      loginInfo () {
        return {
          username: this.logedIn ? this.$store.state.login.username : '登录',
          route: this.logedIn ? `/user/${this.$store.state.login.user_id}` : '/login'
        }
      }
    },
    methods: {
      enter () {
        if (this.logedIn) {
          this.$refs.account_actions.style.display = 'block'
        }
      },
      leave () {
        this.$refs.account_actions.style.display = 'none'
      },
      logout () {
        this.$store.commit('logout')
        this.$router.push('/login')
      }
      // getuser () {
      //   if (!this.$store.state.login.userInfo.username) {
      //     this.$store.commit('getuser')
      //   }
      //   return this.$store.state.login.userInfo.username
      // }
    }
  }
</script>
<style scoped="" lang='scss'>
  #headerNav{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f3f3f3;
  }
  #headerNav>ul{
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  #headerNav ul li{
    margin-left: 15px;
    position: relative;
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
  .account_actions{
    display:none;
    position:absolute;
    top:15px;
    left:-5px;
    color: #666;
    #logout{
      margin:10px 0 0 0;
      padding:5px;
      cursor: pointer;
      font-size:14px;
      border: 1px solid #ddd;
      white-space: nowrap;
    }
  }
</style>
