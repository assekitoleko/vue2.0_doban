<template>
  <div id='bookIndexWrapper'>
    <loading v-show='loading'></loading>
    <div class='main' v-if='!loading'>
      <div class='scienceFictions'>
        <h3>科幻小说
          <span @click='swiper.slideNext()' class='slideTurn'>›</span>
          <span @click='swiper.slidePrev()' class='slideTurn'>‹</span>
        </h3>
        <swiper :options='swiperOptions' ref='mySwiper'>
          <swiper-slide v-for='(fiction, index) of scienceFictions' :key='fiction.id' class='swiper_slide'>
            <router-link class='fiction_item' :to="'/book/subject/' + fiction.id">
              <img :src='fiction.images.medium' @mouseenter='switchMoreInfo(index)' @mouseleave='switchMoreInfo' />
              <span><span  class='linkStyle'>{{fiction.title}}</span></span>
              <span class='fiction_item_author'>{{fiction.author.join(',')}}</span>
            </router-link>
            <div class='book_more_info' :style="{display:index === moreInfoIndex ? 'block' : 'none'}">
              {{fiction.summary}}
            </div>
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <div class='loveBooks'>
        <h3>爱情小说</h3>
        <div class='loveBooksWrapper'>
          <div v-for='love of loveBooks' :key='love.id' class='love_book'>
            <router-link :to="'/book/subject/' + love.id">
              <div class='love_info'>
                <div class='love_cover'><img :src='love.images.small' /></div>
                <div>
                  <p><span class='linkStyle'>{{love.title}}</span></p>
                  <p class='love_rating'>
                    <rating-star :commitScore='(love.rating.average/2)'></rating-star><span>{{love.rating.average}}</span>
                  </p>
                  <p>作者: {{love.author.join(',')}}</p>
                  <p>{{love.publisher}}</p>
                </div>
              </div>
              <div class='love_summary'>
                {{love.summary}}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  import {mapState} from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ratingStar from '../components/ratingStar'

  export default {
    name: 'BookIndex',
    components: {loading, swiper, swiperSlide, ratingStar},
    data () {
      return {
        loading: true,
        swiperOptions: {
          pagination: null,
          slidesPerView: 5,
          slidesPerColumn: 2,
          spaceBetween: 20,
          notNextTick: true
          // paginationClickable: true
        },
        moreInfoIndex: ''
      }
    },
    methods: {
      switchMoreInfo (index = '') {
        this.moreInfoIndex = index
      }
    },
    computed: {
      ...mapState({
        loveBooks: state => state.book.loveBooks,
        scienceFictions: state => state.book.scienceFictions
      }),
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    created () {
      this.$store.dispatch({
        type: 'getIndexBooks'
      }).then(() => {
        this.loading = false
      })
    }
  }
</script>
<style scoped lang='scss'>
  h3{
    border-bottom:1px solid #ddd;
    margin:25px 0;
    font-size:18px;
    font-weight:bold;
    padding-bottom:5px;
    span{
      background-color: #9b9a8e;
      width:18px;
      height:18px;
      border-radius:9px;
      font-size:16px;
      color:#fff;
      display:inline-block;
      text-align: center;
      line-height:16px;
      cursor: pointer;
      float:right;
      margin-left:10px;
    }
    span:hover{
      opacity: 0.8;
    }
  }
  .scienceFictions{
    margin-top:30px;
    width:650px;
    .fiction_item{
      display:flex;
      flex-direction: column;
      span{
        margin-top:5px;
        font-size:12px;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space: nowrap;
      }
      .fiction_item_author{
        color:#333;
      }
    }
    .swiper_slide{
      position:relative;
      .book_more_info{
        position:absolute;
        border:1px solid #acacac;
        background:#f9f9f7;
        border-radius: 3px;
        color:#666;
        padding:12px 15px 2px;
        z-index: 1000;
        width:300px;
        top:-40px;
        left:110%;
        display:none;
        height:208px;
      }
      .book_more_info:before,.book_more_info:after{
        border:solid transparent;
        width:0;
        height:0;
        content:' ';
        position:absolute;
        overflow:hidden;
        text-overflow: ellipsis;
        right:100%;
        top:50%;
        pointer-events: none;
      }
      .book_more_info:before{
        border-right-color:#acacac;
        border-width:8px;
        margin-top: -8px;
      }
      .book_more_info:after{
        border-right-color: #f9f9f7;
        border-width: 7px;
        margin-top: -7px;
      }
    }
  }
  .loveBooks{
    width:650px;
    font-size:12px;
    .loveBooksWrapper{
      display:flex;
      flex-wrap: wrap;
    }
    .love_book{
      display:flex;
      flex-direction: column;
      width:290px;
      margin-bottom:20px;
      padding-right:20px;
    }
    .love_book:nth-of-type(odd){
      margin-right:20px;
    }
    .love_info{
      display:flex;
      .love_cover{
        margin-right:20px;
      }
      p{
        line-height:20px;
        color: #111;
      }
      p:first-child{
        font-size: 14px;
      }
      p.love_rating{
        display:flex;
        align-items: center;
        span{
          color: #e09015;
          margin-left:10px;
        }
      }
    }
    .love_summary{
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      color:#666;
      margin-top:5px;
      line-height:20px;
    }
  }
</style>
