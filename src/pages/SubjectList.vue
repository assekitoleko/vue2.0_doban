<template>
  <div>
    this is a subjectlist component
    <InfiniteLoading ref="infiniteLoading" :on-infinite="onInfinite"></InfiniteLoading>
  </div>
</template>
<script>
  // import {mapState} from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: 'SubjectList',
    // computed: mapState({
    //   movieList: state => state.movie[]
    // }),
    methods: {
      getMovieList () {
        let type = this.$route.params.type
        this.$store.dispatch({
          type: 'getMovieList',
          sort: type
        })
      },
      onInfinite () {

      }
    },
    created () {
      this.getMovieList()
    },
    components: {
      InfiniteLoading
    }
  }
</script>
