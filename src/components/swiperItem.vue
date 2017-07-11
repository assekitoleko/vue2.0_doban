<template>
  <swiper :options='options'>
    <swiper-slide v-for='movie in swiperList' :key='movie.id'>
      <router-link :to="'/movie/subject/' + movie.id" class='movie_item'>
        <img :src="movie.images.medium" />
        <span>{{movie.title}}</span>
        <div v-if='movie.rating.average'>
          <rating-star :commitScore='(movie.rating.average)/2'></rating-star>
          <div class='movie_item_rating'>{{movie.rating.average}}</div>
        </div>
        <div v-else>
          <span>暂无评分</span>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ratingStar from './ratingStar'
  export default {
    name: 'swiperItem',
    props: ['options', 'swiperList'],
    components: {swiper, swiperSlide, ratingStar}
  }
</script>
<style lang='scss' scoped>
#indexWrapper a span{
  width:100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
  color:#333;
  display:inline-block;
}
#indexWrapper a{
  text-align:center;
}
.movie_item{
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  font-size:12px;
  span{
    margin: 5px 0;
  }
  div{
    margin:0;
    width:100px;
    display:flex;
    .movie_item_rating{
      width:25px;
      color:#e09015;
    }
  }
}
</style>
