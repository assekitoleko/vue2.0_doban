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
          <swiper-slide v-for='fiction of scienceFictions' :key='fiction.id'>
            <router-link class='fiction_item' :to="'/book/subject/' + fiction.id">
              <img :src='fiction.images.medium' />
              <span class='fiction_item_title'>{{fiction.title}}</span>
              <span class='fiction_item_author'>{{fiction.author.join(',')}}</span>
            </router-link>
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
                  <p>{{love.title}}</p>
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
        }
      }
    },
    methods: {
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
      .fiction_item_title{
        color:#3377aa
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
      margin-bottom:15px;
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
      }
      p:first-child{
        font-size: 14px;
        color: #37a
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
      margin-top:10px;
      line-height:20px;
    }
  }
</style>
