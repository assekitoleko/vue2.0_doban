<template>
  <div id='bookIndexWrapper'>
    <loading v-show='loading'></loading>
    <div class='main'>
      <div class='scienceFictions'>
        <h3>科幻小说</h3>
        <swiper :options='swiperOptions'>
          <swiper-slide v-for='fiction of scienceFictions' :key='fiction.id'>
            <div class='fiction_item'>
              <img :src='fiction.images.medium' />
              <span class='fiction_item_title'>{{fiction.title}}</span>
              <span class='fiction_item_author'>{{fiction.author.join(',')}}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from '../components/loading'
  import {mapState} from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'BookIndex',
    components: {loading, swiper, swiperSlide},
    data () {
      return {
        loading: true,
        swiperOptions: {
          pagination: null,
          slidesPerView: 5,
          slidesPerColumn: 2,
          spaceBetween: 20
        }
      }
    },
    computed: {
      ...mapState({
        loveBooks: state => state.book.loveBooks,
        scienceFictions: state => state.book.scienceFictions
      })
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
  .scienceFictions{
    margin-top:30px;
    width:650px;
    h3{
      border-bottom:1px solid #ddd;
      margin:25px 0;
      font-size:18px;
      font-weight:bold;
      padding-bottom:5px;
    }
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
</style>
