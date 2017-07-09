<template>
  <div id="celebrity">
    <loading v-if='loading'></loading>
    <div class='celebrityWrapper main' v-else>
      <p class="celebrity_title">{{celebrity.name}} {{celebrity.name_en}}</p>
      <div class="celebrity_info">
        <div>
          <img :src="celebrity.avatars.medium" />
        </div>
        <div class="celebrity_msg">
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
      <div class='popular_works'>
        <p class="celebrity_works">最受欢迎的5部作品 · · · · · ·</p>
        <ul>
          <li v-for="movie in celebrity.works">
            <router-link :to="'/movie/subject/' + movie.subject.id">
              <h3>{{movie.subject.year}}</h3>
              <div>
                <img :src="movie.subject.images.small" />
                <p class="celebrity_work_title">{{movie.subject.title}}</p>
                <p class="celebrity_work_rating">{{movie.subject.rating.average}}</p>
              </div>
            </router-link>
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
<style lang="scss" scoped>
  $margin:20px 0;
  .celebrity_title{
    font-size: 25px;
    color:#494949;
    font-weight: bold;
    margin:$margin;
  }
  div.popular_works{
    margin-bottom:20px;
    overflow:hidden;
  }
  ul li{
    float:left;
    width:85px;
    text-align: center;
    margin-right: 30px;
    h3{
      margin-bottom: 10px;
      color:#999;
      font-weight: normal;
    }
    .celebrity_work_title{
      color:#27a;
      font-size:12px;
    }
    .celebrity_work_rating{
      color:#e09015;
      font-size:12px;
    }
  }
  .celebrity_info{
    display: flex;
    color:#111;
    font-size: 12px;
    line-height: 22px;
    margin:$margin;

    .celebrity_msg{
      margin-left:15px;
    }
    span{
      color:#666;
    }
  }
  .celebrity_works{
    margin-bottom: 15px;
    color:#333d48;
    font-size: 15px;
  }
</style>
