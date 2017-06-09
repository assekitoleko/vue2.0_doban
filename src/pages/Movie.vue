<template>
  <div id="indexWrapper">
    <sectionHeader :icon="icon" :itemList="itemList" :searchUrl="searchUrl"></sectionHeader>
    <router-view></router-view>
  </div>
</template>
<script>
  import SectionHeader from '../components/SectionHeader'

  export default {
    name: 'movie',
    data () {
      return {
        icon: '../assets/douban_movie_icon',
        searchUrl: '/v2/movie/search?q=',
        itemList: [
          {
            title: '正在热映',
            path: '/movie/in_theaters'
          },
          {
            title: '即将上映',
            path: '/movie/coming_soon'
          },
          {
            title: 'top250',
            path: '/movie/top250'
          },
          {
            title: '北美票房榜',
            path: '/movie/us_box'
          }
        ]
      }
    },
    components: {
      SectionHeader
    }
  }
</script>
<style>

</style>
