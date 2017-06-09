<template>
  <div>
    <div class="moviesSection">
      <p>影院热映</p>
      <ul class='hotMovies'>
        <li v-for="movie in hotMovies">
          <router-link :to="'/movie/subject/' + movie.id">
            <img :src="movie.images.medium" />
            <span>{{movie.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="moviesSection">
      <p>即将上映</p>
      <ul class="newMovies">
        <li v-for="movie in newMovies">
          <router-link :to="'/movie/subject/' + movie.id">
            <img :src="movie.images.medium" />
            <span>{{movie.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="moviesSection">
      <p>top250</p>
      <ul class="topMovies">
        <li v-for="movie in topMovies">
          <router-link :to="'/movie/subject/' + movie.id">
            <img :src="movie.images.medium" />
            <span>{{movie.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import SectionHeader from '../components/SectionHeader'

export default {
  name: 'movie',
  data () {
    return {
      icon: '../assets/douban_movie_icon',
      searchUrl: '/v2/movie/search?q=',
      itemList: [
        {
          title: '正在热映',
          path: '/movie/in_theaters'
        },
        {
          title: '即将上映',
          path: '/movie/coming_soon'
        },
        {
          title: 'top250',
          path: '/movie/top250'
        },
        {
          title: '北美票房榜',
          path: '/movie/us_box'
        }
      ]
    }
  },
  computed: mapState({
    hotMovies: state => state.movie.in_theaters,
    topMovies: state => state.movie.top250,
    newMovies: state => state.movie.coming_soon
  }),
  methods: {
    getMovie () {
      this.$store.dispatch('getMovie')
    }
  },
  created () {
    this.getMovie()
  },
  components: {
    SectionHeader
  }
}
</script>
<style scoped>
  #indexWrapper ul li{
    float:left;
  }
  div.moviesSection li{
    display: flex;
    align-items: center;
    flex-direction: column;
    width:100px;
  }
  .hotMovies, .topMovies, .newMovies{
    overflow:hidden;
    font-size:14px;
    /*width: 60%;*/
    display:flex;
    justify-content: space-between;
  }
  #indexWrapper a span{
    width:80px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
    color:#333;
    display:inline-block;
  }
  #indexWrapper a{
    text-align:center;
  }
  .moviesSection{
    width:60%;
    margin:0 auto;
  }
  .moviesSection p{
    margin:10px 0;
  }
</style>
