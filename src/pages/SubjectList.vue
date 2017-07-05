<template>
  <div id="SubjectList_wrapper">
    <loading v-if='loading'></loading>
    <div v-else>
      <div v-if="isSearch && movieList.length === 0" class="notFound">
        <span>豆瓣没有这部电影</span>
      </div>
      <ul v-else-if="isUsBox">
        <li v-for="movie in movieList">
          <router-link :to="'/movie/subject/' + movie.subject.id" class="movie_item">
            <div><img :src="movie.subject.images.medium" /></div>
            <div class="movie_item_desc">
              <p><span>上周排名:</span>{{movie.rank}}</p>
              <p>{{movie.subject.title}}</p>
              <p><span>上周票房:</span>{{Math.round(movie.box*0.0001)}}万美元</p>
              <p><span>是否新上映:</span>{{movie.new ? 'NEW':'Already on screen'}}</p>
              <p><span>评分:</span>{{movie.subject.rating.average === 0 ? '暂无评分':movie.subject.rating.average}}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-for="movie in movieList">
          <router-link :to="'/movie/subject/' + movie.id" class="movie_item">
            <div><img :src="movie.images.medium" /></div>
            <div class="movie_item_desc">
              <p>{{movie.title}} {{movie.original_title}}</p>
              <p>{{movie.year}}</p>
              <p class='subject_rating'>
                <template v-if='movie.rating.average'>
                  <rating-star :commitScore='(movie.rating.average)/2'></rating-star><span>{{movie.rating.average}}</span>
                </template>
                <template v-else>
                  <p>暂无评分</p>
                </template>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      <InfiniteLoading ref="infiniteLoading" :on-infinite="onInfinite" v-if="!isSearch && !isUsBox">
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
  import ratingStar from '../components/ratingStar'
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
      },
      isUsBox () {
        return this.$route.params.type === 'us_box'
      }
    },
    methods: {
      getMovieList () {
        this.loading = true
        let content = this.$route.params.content
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
        this.$store.commit('resetMoreStatus')
        setTimeout(() => {
          this.loadMore(this.$route.params.type)
          if (this.noMoreMovie) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          }
        }, 3000)
      },
      ...mapActions(['loadMore'])
    },
    created () {
      this.getMovieList()
    },
    components: {
      InfiniteLoading,
      loading,
      ratingStar
    },
    watch: {
      '$route': 'getMovieList'
    }
  }
</script>
<style lang='scss' scoped>
  $fontSize:14px;
  .movie_item{
    display: flex;
    padding:10px 0;
    width: 550px;
    border-bottom: 1px dashed #ddd;
    font-size:$fontSize;

    .movie_item_desc{
      margin-left:15px;
      color: #111;
      line-height: 24px;
      span{
        color:#666;
        margin-right:5px;
      }
    }
  }
  .movie_item:last-child{
    border: none;
  }
  #SubjectList_wrapper{
    width: 60%;
    margin: 10px auto;
  }
  .notFound{
    color:#072;
    font-size: 14px;
    margin-top: 60px;
  }
  .subject_rating{
    display:flex;
    align-items:center;
    margin-top:6px;
    span{
      margin-left:10px;
      line-height:15px;
    }
  }
</style>
