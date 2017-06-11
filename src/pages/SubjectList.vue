<template>
  <div id="SubjectList_wrapper">
    <loading v-if='loading'></loading>
    <div v-else>
      <div v-if="isSearch && movieList.length === 0" class="notFound">
        <span>豆瓣没有这部电影</span>
      </div>
      <ul v-else>
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
      <InfiniteLoading ref="infiniteLoading" :on-infinite="onInfinite" v-if="!isSearch">
        <span slot="no-more">客官，我们真的只能找到这么多了...</span>
        <span slot="no-results">对不起 啥都找不到啊！</span>
      </InfiniteLoading>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  import loading from '../components/loading'
  export default {
    name: 'SubjectList',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      movieList () {
        if (this.isSearch) {
          return this.$store.state.search.searchResult
        } else {
          return this.$store.state.movie[this.$route.params.type]
        }
      },
      isSearch () {
        return this.$route.params.content
      },
      noMoreMovie () {
        return this.$store.state.movie.noMoreMovie
      }
    },
    methods: {
      getMovieList () {
        console.log('restart list')
        this.loading = true
        let content = this.$route.params.content
        console.log(content)
        if (!content) {
          let type = this.$route.params.type
          this.$store.dispatch({
            type: 'getMovieList',
            sort: type
          }).then((res) => {
            this.loading = false
          }, (err) => {
            console.log(err)
          })
        } else {
          this.$store.dispatch({
            type: 'searchMovie',
            content: content
          }).then((res) => {
            this.loading = false
          }, (err) => {
            console.log(err)
          })
        }
      },
      onInfinite () {
        if (this.isSearch) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        } else {
          this.$store.commit('resetMoreStatus')
          setTimeout(() => {
            this.loadMore(this.$route.params.type)
            if (this.noMoreMovie) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            } else {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            }
          }, 3000)
        }
      },
      ...mapActions(['loadMore'])
    },
    created () {
      this.getMovieList()
    },
    components: {
      InfiniteLoading,
      loading
    },
    watch: {
      '$route': 'getMovieList'
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
  .notFound{
    color:#072;
    font-size: 14px;
    margin-top: 60px;
  }
</style>
