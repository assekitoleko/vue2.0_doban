<template>
  <div id="indexWrapper">
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

  export default {
    name: 'movie',
    computed: mapState({
      hotMovies: state => state.movie.hotMovies,
      topMovies: state => state.movie.topMovies,
      newMovies: state => state.movie.newMovies
    }),
    methods: {
      getMovie () {
        this.$store.dispatch('getMovie')
      }
    },
    created () {
      this.getMovie()
    }
  }
</script>
<style>
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
