<template>
  <div id="celebrity">
    <loading v-if='loading'></loading>
    <div class='celebrityWrapper main'>
      <p>{{celebrity.name}} {{celebrity.name_en}}</p>
      <div>
        <div>
          <img :src="celebrity.avatars.medium" />
        </div>
        <div>
          <p><span>出生地:</span> {{celebrity.born_place}}</p>
          <p><span>性别:</span> {{celebrity.gender}}</p>
          <p><span>更多中文名:</span>
            <span v-for="name in celebrity.aka">{{name}}</span>
          </p>
          <p><span>更多英文名:</span>
            <span v-for="name in celebrity.aka_en">{{name}}</span>
          </p>
        </div>
      </div>
      <div>
        <p>最受欢迎的5部作品</p>
        <ul>
          <li v-for="movie in celebrity.works">
              <div>
                <img :src="movie.subject.images.small" />
                <p>{{movie.subject.title}}</p>
                <p>{{movie.subject.rating.average}}</p>
                <p>{{movie.subject.year}}</p>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  // import mapState from 'vuex'

  export default {
    name: 'Celebrity',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      celebrity () {
        return this.$store.state.celebrity.celebrity
      }
    },
    methods: {
      fetchCelebrity () {
        let id = this.$route.params.id
        this.$store.dispatch({
          type: 'fetchCelebrity',
          id: id
        }).then((res) => {
          this.loading = false
        })
      }
    },
    created () {
      this.fetchCelebrity()
    },
    components: {
      loading
    }
  }
</script>
<style scoped>
  ul li{
    float:left;
  }
</style>
