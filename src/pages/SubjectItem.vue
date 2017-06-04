<template>
  <div id="SubjectItem">
    <div class="subjectWrapper" v-if="!showLoading">
      <div class="movie_title">{{subject.title}} {{subject.original_title}} <span>({{subject.year}})</span></div>
      <div class="movie_content">
        <div>
          <img :src="subject.images.medium" />
        </div>
        <div class="movie_content_items">
          <p><span>导演:</span>{{directors}}</p>
          <p><span>主演:</span>{{casts}}</p>
          <p><span>影片类型:</span>{{genres}}</p>
          <p><span>制片国家/地区:</span>{{countries}}</p>
          <p><span>又名:</span>{{aka}}</p>
        </div>
      </div>
      <marking>
        <template slot="movie">
          <router-link :to="{ name: 'Login'}">{{subject.wish_count}}人想看</router-link>
          <router-link :to="{ name: 'Login'}">{{subject.collect_count}}人看过</router-link>
        </template>
      </marking>
      <div class="movie_desc">
        <span style="line-height:30px;">{{subject.title}}的剧情简介.......</span>
        <p>
          {{subject.summary}}
        </p>
      </div>
    </div>
    <loading v-show="showLoading"></loading>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import loading from '../components/loading'
import marking from '../components/marking'

export default {
  name: 'SubjectItem',
  data () {
    return {
      showLoading: true
    }
  },
  computed: mapState({
    subject: state => state.SubjectItem.subject,
    directors: state => state.SubjectItem.directors,
    casts: state => state.SubjectItem.casts,
    genres: state => state.SubjectItem.genres,
    countries: state => state.SubjectItem.countries,
    aka: state => state.SubjectItem.aka
  }),
  methods: {
    getSingleSubject (classify, id) {
      this.$store.dispatch({
        type: 'getSingleSubject',
        id: id,
        classify: classify
      }).then((res) => {
        this.showLoading = false
      })
    }
  },
  created () {
    const id = this.$route.params.id
    const classify = this.$route.params.classify
    this.getSingleSubject(classify, id)
  },
  components: {loading, marking}
}
</script>
<style>
  #SubjectItem{
    width: 500px;
    margin: 15px auto 0;
    display: flex;
  }
  .movie_content{
    display: flex;
    /*justify-content: center;*/
  }
  .movie_content_items{
    margin-left: 15px;
    color: #111;
    font-size: 14px;
  }
  .movie_content_items p{
    line-height: 22px;
  }
  .movie_content_items span{
    color: #666;
    margin-right: 5px;
  }
  .movie_title{
    font-size: 25px;
    color: #494949;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .movie_title span{
    color: #888;
  }
  .movie_desc{
    color: #072;
    font-size: 15px;
    margin: 20px 0
  }
  .movie_desc p{
    font-size: 12px;
    line-height: 1.72;
    color: #111;
  }
</style>
