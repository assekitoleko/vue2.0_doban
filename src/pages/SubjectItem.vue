<template>
  <div id="SubjectItem">
    <div class="subjectWrapper" v-if="!showLoading">
      <div class="item_title">{{subject.title}} {{original_title}} <span>({{subject.year}})</span></div>
      <div class="subject_rating">
        <template v-if='subject.rating.average'>
          <rating-star :commitScore='(subject.rating.average)/2'></rating-star>
          <span>{{subject.rating.average}}</span>
          <span>{{subject.ratings_count}}人评价</span>
        </template>
        <span v-else>尚未上映</span>
      </div>
      <div class="item_content">
        <div>
          <img :src="subject.images.medium" />
        </div>
        <div class="item_content_items">
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
          <span @click="addWatchState('like')" :style="likedStyle">{{subject.wish_count}}人想看</span>
          <span @click="addWatchState('watched')" :style="watchedStyle">{{subject.collect_count}}人看过</span>
        </template>
      </marking>
      <div>
        <button class='editComment' @click='postComment'>写点评</button>
      </div>
      <div class="item_desc">
        <span style="line-height:30px;">{{subject.title}}的剧情简介.......</span>
        <p v-if='(sub_summary === subject.summary || showAllSummary)'>
          {{subject.summary}}
        </p>
        <p v-else>
          {{sub_summary}}<span @click='showSummary'>(展开全部)</span>
        </p>
      </div>
      <div class='postsWrapper' v-show='posts.length'>
        <p class='item_desc'>{{subject.title}}的最新评论......</p>
        <div class='posts'>
          <div v-for="post in posts" class='subject_post'>
            <div class='post_title'>
              <p>
                <span class='post_poster'>{{post.username}}</span>
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
    <postComment :user_id='userInfo.id' :item_id='$route.params.id' :username='userInfo.username' @postCommentCompleted='getNewComment' />
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
      showLoading: true,
      showAllSummary: false
    }
  },
  computed: {
    ...mapState({
      subject: state => state.SubjectItem.subject,
      directors: state => state.SubjectItem.directors,
      casts: state => state.SubjectItem.casts,
      genres: state => state.SubjectItem.genres,
      countries: state => state.SubjectItem.countries,
      aka: state => state.SubjectItem.aka,
      posts: state => state.SubjectItem.posts,
      sub_summary: state => state.SubjectItem.subject.summary.substring(0, 200),
      userInfo: state => state.login.userInfo
    }),
    watchedStyle () {
      if (this.userInfo.watched.indexOf(this.subject.id) !== -1) {
        return {
          color: '#fff',
          backgroundColor: '#ffb712'
        }
      } else {
        return {}
      }
    },
    likedStyle () {
      if (this.userInfo.like.indexOf(this.subject.id) !== -1) {
        return {
          color: '#fff',
          backgroundColor: '#ffb712'
        }
      } else {
        return {}
      }
    },
    original_title () {
      return this.subject.title === this.subject.original_title ? '' : this.subject.original_title
    }
  },
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
      if (this.userInfo.id === '') {
        this.$store.commit('getuser')
      }
      if (this.userInfo.id) {
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
      if (this.userInfo.id === '') {
        this.$store.commit('getuser')
      }
      if (this.userInfo.id) {
        let isVoted = localStorage.getItem(`${postId}-${this.userInfo.id}`)
        if (isVoted) {
          alert('您已为此评论投过票')
          return
        } else {
          this.$store.dispatch({
            type: 'votePost',
            post_id: postId,
            vote: vote + 1
          }).then(() => {
            localStorage.setItem(`${postId}-${this.userInfo.id}`, 1)
            this.getNewComment()
          })
        }
      } else {
        this.$route.push({path: '/login', query: {redirect: this.$route.fullPath}})
      }
    },
    showSummary () {
      this.showAllSummary = true
    },
    addWatchState (type) {
      if (this.userInfo.id === '') {
        this.$store.commit('getuser')
      }
      if (this.userInfo.id) {
        let isAdd = this.userInfo[type].indexOf(this.subject.id) !== (-1) ? 0 : 1
        this.$store.dispatch({
          type: 'addWatchState',
          attr: type,
          userInfo: this.userInfo,
          isAdd: isAdd,
          subjectId: this.subject.id
        })
      } else {
        this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}})
      }
    }
  },
  created () {
    const id = this.$route.params.id
    // const classify = this.$route.params.classify
    this.getSingleSubject('movie', id)
  },
  components: {loading, marking, postComment, ratingStar}
}
</script>
<style lang="scss">
  @import '../assets/item'
</style>
