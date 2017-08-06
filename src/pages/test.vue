<template>
  <div>
    <loading v-if = 'loading'></loading>
    <div v-if = '!loading'>
      <div v-for="(movie, index) in movieList" :key = 'index'>
        <router-link :to="'/movie/subject/' + movie.id">{{movie.title}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import loading from '../components/loading'

  export default{
    name: 'Test',
    data () {
      return {
        name: 'jack',
        movieList: [],
        loading: false
      }
    },
    methods: {
      fetchData () {
        this.loading = true
        let url = '/doubanapi/v2/movie/in_theaters?count=20'
        axios.get(url)
        .then((res) => {
          this.movieList = res.data.subjects
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    created () {
      this.fetchData()
    },
    components: {
      loading
    },
    activated () {
      console.log('this component has been cached')
    }
  }
</script>
