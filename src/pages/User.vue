<template>
  <div id='user' class='main'>
    <div class='person_info'>
      <i class='iconfont icon1'></i>
      <div>
        <span class='username'>{{userInfo.username}}</span>
        <p class='motto'>
          <template v-if='!editState'>
            <span>{{userInfo.motto}}</span>
            <a href='javascript:void(0)' @click='editState = true;tmpMotto = userInfo.motto'>(编辑)</a>
          </template>
          <template v-if='editState'>
            <input v-model='tmpMotto' />
            <button @click='changeMotto'>修改</button>
            <button @click='editState = false'>取消</button>
          </template>
        </p>
      </div>
    </div>
    <div class='person_info_items'>
      <draggable :options="{animation:150, handle:'.user_item_title', ghostClass:'ghost_user_item'}">
        <!-- <transition-group> -->
          <div class='user_info_item' key='1'>
            <p class='user_item_title'><i class='iconfont icon3 icon_item'></i>我的相册......</p>
            <p>可以有自己的相册放自己的照片了</p>
          </div>
          <div class='user_info_item' key='2'>
            <p class='user_item_title'><i class='iconfont icon4 icon_item'></i>我的日记......</p>
            <p>在豆瓣上写日记，记录自己的生活、想法。</p>
          </div>
          <div class='user_info_item' key='3'>
            <p class='user_item_title'><i class='iconfont icon2 icon_item'></i>我喜欢......</p>
          </div>
          <div class='user_info_item' key='4'>
            <p class='user_item_title'><i class='iconfont icon5 icon_item'></i>我关注的小站......</p>
          </div>
          <div class='user_info_item' key='5'>
            <p class='user_item_title'><i class='iconfont icon6 icon_item'></i>留言板......</p>
            <p>
              <textarea rows='3' resize='none'></textarea>
              <button @click='leaveMessage'>留言</button>
            </p>
          </div>
          <div class='user_info_item' key='6'>
            <p class='user_item_title'>
              <i class='iconfont icon7 icon_item'></i>我读......
            </p>
            <div class='mark_item'>
              <span>想读</span>
              <div v-for='(book, index) in like_book' :key='index'>
                <router-link :to="'/movie/subject/' + book.id">
                  <img :src='book.img' />
                </router-link>
              </div>
            </div>
            <div class='mark_item'>
              <span>读过</span>
              <div v-for='(book, index) in read_book' :key='index'>
                <router-link :to="'/movie/subject/' + book.id">
                  <img :src='book.img' />
                </router-link>
              </div>
            </div>
          </div>
          <div class='user_info_item' key='7'>
            <p class='user_item_title'><i class='iconfont icon8 icon_item'></i>我看......</p>
            <div class='mark_item'>
              <span>想看</span>
              <div v-for='(movie, index) in like_movie' :key='index'>
                <router-link :to="'/movie/subject/' + movie.id">
                  <img :src='movie.img' />
                </router-link>
              </div>
            </div>
            <div class='mark_item'>
              <span>看过</span>
              <div v-for='(movie, index) in watched_movie' :key='index'>
                <router-link :to="'/movie/subject/' + movie.id">
                  <img :src='movie.img' />
                </router-link>
              </div>
            </div>
          </div>
        <!-- </transition-group> -->
      </draggable>
    </div>
  </div>
</template>
<script>
  // import {mapGetters} from 'vuex'
  import store from '../store/index'
  import draggable from 'vuedraggable'
  import {mapState} from 'vuex'
  import {likeMovies, watchedMovies, likeBooks, ReadBooks} from '../constants/constants'

  export default {
    name: 'user',
    data () {
      return {
        editState: false,
        tmpMotto: '',
        like_movie: likeMovies,
        watched_movie: watchedMovies,
        like_book: likeBooks,
        read_book: ReadBooks
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.login.userInfo
      })
    },
    components: {
      draggable
    },
    methods: {
      leaveMessage () {

      },
      changeMotto () {
        this.$store.dispatch({
          type: 'changeMotto',
          motto: this.tmpMotto,
          user_id: this.userInfo.id
        })
        this.editState = false
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.login.userInfo.id) {
        store.commit('getuser')
      }
      if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.login.userInfo.id) {
          next()
        } else {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      } else {
        next()
      }
    }
  }
</script>
<style scopde lang='scss'>
@font-face {font-family: "iconfont";
  src: url('../assets/iconfont/iconfont.eot?t=1500808064245'); /* IE9*/
  src: url('../assets/iconfont/iconfont.eot?t=1500808064245#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../assets/iconfont/iconfont.woff?t=1500808064245') format('woff'), /* chrome, firefox */
  url('../assets/iconfont/iconfont.ttf?t=1500808064245') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../assets/iconfont/iconfont.svg?t=1500808064245#iconfont') format('svg'); /* iOS 4.1- */
}
.person_info{
  display: flex;
  margin:20px 0;
  span.username{
    font-size: 24px;
    font-weight: bold;
    color:#494949;
  }
  .motto{
    color:#666;
    font-size:12px;
    margin-top:5px;
  }
  div{
    margin-left: 10px;
    line-height: 20px;
  }
}
.iconfont{
  font-family: 'iconfont';
  font-style:normal;
  color:red;
}
.icon_item{
  font-size: 16px;
  margin-right:5px;
}
.icon1{
  font-size:50px;
}
.icon2:before{
  content:"\e502"
}
.icon1:before{
  content: "\e635"
}
.icon3:before{
  content:"\e60f"
}
.icon4:before{
  content:"\e875"
}
.icon5:before{
  content:"\f000d"
}
.icon6:before{
  content:"\e67a"
}
.icon7:before{
  content:"\e62f"
}
.icon8:before{
  content:"\e503"
}
.person_info_items{
  width:580px;
}
.user_info_item{
  margin:20px 0;
  .user_item_title{
    cursor:move;
    margin-bottom:10px;
    line-height:24px;
    color:#072;
    font-size:15px;
  }
  .user_item_title:hover{
    background-color:#f2fbf2;
  }
  p{
    color:#111;
    font-size:12px;
    textarea{
      width:100%;
      outline:none;
      padding:4px;
      resize:none;
    }
  }
  .mark_item{
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-bottom:15px;
    span{
      color:#acacac;
      font-size:12px;
    }
  }
}
.ghost_user_item{
  opacity:0.5;
  border:2px dashed #060;
  padding:10px;
}
</style>
