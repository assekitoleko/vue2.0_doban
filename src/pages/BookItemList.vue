<template>
  <div id='bookList'>
    <loading v-show='loading'></loading>
    <div class='booksWrapper'>
      <div v-for='book in booksList' :key='book.id'>
        <div><img :src='book.images.medium' /></div>
        <div>
          <p>{{book.title}}</p>
          <p>{{book.author.join(',')}}/{{book.publisher}}/{{book.pubdate}}/{{book.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  import {mapState} from 'vuex'

  export default {
    name: 'BookItemList',
    data () {
      return {
        loading: true
      }
    },
    components: {
      loading
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
    }
  }
</script>
<style scoped lang='scss'>

</style>
