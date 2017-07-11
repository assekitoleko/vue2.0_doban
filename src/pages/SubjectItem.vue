<template>
  <div id="SubjectItem">
    <div class="subjectWrapper" v-if="!showLoading">
      <div class="movie_title">{{subject.title}} {{subject.original_title}} <span>({{subject.year}})</span></div>
      <div class="subject_rating">
        <rating-star :commitScore='(subject.rating.average)/2'></rating-star>
        <template v-if='subject.rating.average'>
          <span>{{subject.rating.average}}</span>
          <span>{{subject.ratings_count}}人评价</span>
        </template>
        <span v-else>尚未上映</span>
      </div>
      <div class="movie_content">
        <div>
          <img :src="subject.images.medium" />
        </div>
        <div class="movie_content_items">
          <p><span>导演:</span>
            <router-link v-for="director in directors" :to="'/movie/celebrity/' + director.id" :key="director.id">
              {{director.name}}
            </router-link>
          </p>
          <p><span>主演:</span>
            <router-link v-for="cast in casts" :to="'/movie/celebrity/' + cast.id" :key="cast.id">
              {{cast.name}}
            </router-link>
          </p>
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
      <div>
        <button class='editComment' @click='postComment'>写点评</button>
      </div>
      <div class="movie_desc">
        <span style="line-height:30px;">{{subject.title}}的剧情简介.......</span>
        <p>
          {{subject.summary}}
        </p>
      </div>
      <div class='postsWrapper' v-show='posts.length'>
        <p class='movie_desc'>{{subject.title}}的最新评论......</p>
        <div class='posts'>
          <div v-for="post in posts" class='subject_post'>
            <div class='post_title'>
              <p>
                <span class=post_poster>{{post.username}}</span>
                <span>看过</span>
                <rating-star :commitScore='post.score'></rating-star>
                <span class='post_time'>{{post.date}}</span>
              </p>
              <span class='post_vote'>{{post.vote}} <span @click='votePost(post.id, post.vote)'>有用</span></span>
            </div>
            <div>{{post.comment}}</div>
          </div>
        </div>
      </div>
    </div>
    <loading v-show="showLoading"></loading>
    <postComment :user_id='user_id' :item_id='$route.params.id' :username='username' @postCommentCompleted='getNewComment' />
  </div>
</template>
<script>
import {mapState} from 'vuex'
import loading from '../components/loading'
import marking from '../components/marking'
import postComment from '../components/postComment'
import ratingStar from '../components/ratingStar'

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
    aka: state => state.SubjectItem.aka,
    user_id: state => state.login.user_id,
    username: state => state.login.username,
    posts: state => state.SubjectItem.posts
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
    },
    postComment () {
      if (this.user_id === '') {
        this.$store.commit('getuser')
      }
      if (this.user_id) {
        this.$modal.show('postComment')
      } else {
        this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}})
      }
    },
    getNewComment () {
      this.$store.dispatch({
        type: 'getNewComment',
        item_id: this.subject.id
      })
    },
    votePost (postId, vote) {
      if (this.user_id === '') {
        this.$store.commit('getuser')
      }
      if (this.user_id) {
        let isVoted = localStorage.getItem(`${postId}-${this.user_id}`)
        if (isVoted) {
          alert('您已为此评论投过票')
          return
        } else {
          this.$store.dispatch({
            type: 'votePost',
            post_id: postId,
            vote: vote + 1
          }).then(() => {
            localStorage.setItem(`${postId}-${this.user_id}`, 1)
            this.getNewComment()
          })
        }
      } else {
        this.$route.push({path: '/login', query: {redirect: this.$route.fullPath}})
      }
    }
  },
  created () {
    const id = this.$route.params.id
    const classify = this.$route.params.classify
    this.getSingleSubject(classify, id)
  },
  components: {loading, marking, postComment, ratingStar}
}
</script>
<style lang="scss" scoped>
  $fontSize:14px;
  #SubjectItem{
    width: 500px;
    margin: 15px auto 0;
  }
  .movie_content{
    display: flex;
    /*justify-content: center;*/
  }
  .movie_content_items{
    margin-left: 15px;
    font-size: $fontSize;
  }
  .movie_content_items a{
    color:#111;
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
    margin-bottom: 10px;
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
  .editComment{
    padding: 6px 14px;
    margin-top: 15px;
    border-radius: 3px;
    background: #337ab7;
    color: #fff;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .subject_rating{
    display:flex;
    margin-bottom: 10px;
    span{
      margin-left:10px;
      color: #888;
    }
  }
  .posts{
    .post_title{
      display:flex;
      margin-bottom:6px;
      justify-content: space-between;
      p{
        display:flex;
        span{
          margin-right:10px;
        }
      }
      .post_poster{
        color:#37a;
        margin-right:4px;
      }
      .post_time{
        color:#aaa;
        margin-left:15px;
      }
      .post_vote{
        margin: 0;
        span{
          color:#37a;
        }
      }
    }
    .subject_post{
      padding:14px 0;
      border-top:1px solid #ddd;
      font-size:14px;
      color:#494949;
    }
  }
</style>
