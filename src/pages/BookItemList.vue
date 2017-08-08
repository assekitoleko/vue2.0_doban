<template>
  <div id='bookList'>
    <loading v-show='loading'></loading>
    <div class='booksWrapper main' v-if='!loading'>
      <div v-for='book in booksList' :key='book.id' class='book_item'>
        <router-link :to="'/book/subject/' + book.id">
          <div><img :src='book.images.medium' /></div>
          <div>
            <p class='book_title'>{{book.title}}</p>
            <p>{{book.author.join(',')}} / {{book.publisher}} / {{book.pubdate}} / {{book.price}}</p>
            <p class='book_rating'>
              <rating-star :commitScore='(book.rating.average)/2'></rating-star>
              <span class='book_rating_score'>{{book.rating.average}}</span>
              <span>({{book.rating.numRaters}}人评价)</span>
            </p>
            <p class="book_summary">{{book.summary}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  import {mapState} from 'vuex'
  import ratingStar from '../components/ratingStar'

  export default {
    name: 'BookItemList',
    data () {
      return {
        loading: true
      }
    },
    components: {
      loading,
      ratingStar
    },
    methods: {
      searchBooks () {
        this.$store.dispatch({
          type: 'searchBooks',
          content: this.$route.params.content
        }).then(() => {
          this.loading = false
        })
      }
    },
    computed: {
      ...mapState({
        booksList: state => state.search.searchResult
      })
    },
    created () {
      this.searchBooks()
    },
    beforeRouteUpdate (to, from, next) {
      this.loaing = true
      this.searchBooks()
      next()
    }
  }
</script>
<style scoped lang='scss'>
  .book_item{
    font-size:12px;
    margin: 15px 0;
    a{
      display: flex;
    }
    p{
      line-height:24px;
      margin-left:10px;
      color: #111;
    }
    p.book_title{
      color:#37a;
    }
    p.book_rating{
      display:flex;
      align-items:center;
      span{
        margin-left:10px;
      }
      span.book_rating_score{
        color:#e09015
      }
    }
    p.book_summary{
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;
      color:#666
    }
  }
</style>
