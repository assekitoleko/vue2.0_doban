<template>
  <div id='SubjectItem'>
    <loading v-if='loading'></loading>
    <div class='subjectWrapper' v-if = '!loading'>
      <div class="item_title">{{subject.title}}</div>
      <div class="subject_rating">
        <rating-star :commitScore='(subject.rating.average)/2'></rating-star>
        <span>{{subject.rating.average}}</span>
        <span>{{subject.rating.numRaters}}人评价</span>
      </div>
      <div class='item_content'>
        <div>
          <img :src="subject.images.medium" />
        </div>
        <div class='item_content_items'>
          <p>
            <span class='item_title'>作者:</span><span class='item_value'>{{author}}</span>
          </p>
          <p>
            <span class='item_title'>出版社:</span><span class='item_value'>{{subject.publisher}}</span>
          </p>
          <p v-if="subject.translator">
            <span class='item_title'>译者:</span><span class='item_value'>{{translator}}</span>
          </p>
          <p>
            <span class='item_title'>出版年:</span></span class='item_value'>{{subject.pubdate}}</span>
          </p>
          <p>
            <span class='item_title'>页数:</span><span class='item_value'>{{subject.pages}}</span>
          </p>
          <p>
            <span class='item_title'>定价:</span><span class='item_value'>{{subject.price}}</span>
          </p>
        </div>
      </div>
      <div>
        <button class='editComment' @click='postComment'>写点评</button>
      </div>
      <div class="item_desc">
        <span style="line-height:30px;">内容简介.......</span>
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
    <postComment :user_id='userInfo.id' :item_id='$route.params.id' :username='userInfo.username' @postCommentCompleted='getNewComment' />
  </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  import marking from '../components/marking'
  import {mapState} from 'vuex'
  import postComment from '../components/postComment'
  import ratingStar from '../components/ratingStar'

  export default {
    name: 'BookItem',
    data () {
      return {
        loading: true,
        showAllSummary: false
      }
    },
    components: {
      loading, ratingStar, postComment, marking
    },
    computed: {
      bookId () {
        return this.$route.params.id
      },
      ...mapState({
        userInfo: state => state.login.userInfo,
        subject: state => state.SubjectItem.subject,
        posts: state => state.SubjectItem.posts,
        sub_summary: state => state.SubjectItem.subject.summary.substring(0, 200)
      }),
      author () {
        return this.subject.author.join(',')
      },
      translator () {
        return this.subject.translator.join(',')
      },
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
      }
    },
    methods: {
      getSingleSubject (classify, id) {
        this.$store.dispatch({
          type: 'getSingleSubject',
          id: id,
          classify: classify
        }).then((res) => {
          this.loading = false
        })
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
      },
      showSummary () {
        this.showAllSummary = true
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
      getNewComment () {
        this.$store.dispatch({
          type: 'getNewComment',
          item_id: this.subject.id
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
      }
    },
    created () {
      console.log('start')
      this.getSingleSubject('book', this.bookId)
    }
  }
</script>
<style lang='scss'>
  @import '../assets/item';
  .item_content_items{
    .item_title{
      color:#666;
      font-size: 12px;
    }
    .item_value{
      color:#111;
      margin-left:4px;
    }
  }
</style>
