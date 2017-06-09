<template>
  <div id="SubjectList_wrapper">
    <ul>
      <li v-for="movie in movieList">
        <div class="movie_item">
          <div><img :src="movie.images.medium" /></div>
          <div>
            <p>{{movie.title}} {{movie.original_title}}</p>
            <p>{{movie.year}}</p>
            <p>{{movie.rating.average}}</p>
          </div>
        </div>
      </li>
    </ul>
    <InfiniteLoading ref="infiniteLoading" :on-infinite="onInfinite"></InfiniteLoading>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: 'SubjectList',
    computed: {
      movieList () {
        return this.$store.state.movie[this.$route.params.type]
      }
    },
    methods: {
      getMovieList () {
        let type = this.$route.params.type
        this.$store.dispatch({
          type: 'getMovieList',
          sort: type
        })
      },
      onInfinite () {
        setTimeout(() => {
          this.loadMore(this.$route.params.type)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        }, 3000)
      },
      ...mapActions(['loadMore'])
    },
    created () {
      this.getMovieList()
    },
    components: {
      InfiniteLoading
    }
  }
</script>
<style>
  .movie_item{
    display: flex;
    height: 200px;
  }
  #SubjectList_wrapper{
    width: 60%;
    margin: 0 auto;
  }
</style>
