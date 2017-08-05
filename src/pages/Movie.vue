<template>
  <div id="indexWrapper">
    <sectionHeader :icon="icon" :itemList="itemList" :searchUrl="searchUrl" :searchPlaceholder='searchPlaceholder' :style="{backgroundColor:'#f0f3f5'}"></sectionHeader>
    <keep-alive include="SubjectList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import SectionHeader from '../components/SectionHeader'

  export default {
    name: 'movie',
    data () {
      return {
        icon: require('../assets/doban_movie_icon.png'),
        searchUrl: '/movie/search/',
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
        ],
        searchPlaceholder: '电影 影人'
      }
    },
    components: {
      SectionHeader
    }
  }
</script>
<style>

</style>
