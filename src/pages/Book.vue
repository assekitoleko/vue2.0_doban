<template>
  <div id="bookWrapper">
    <SectionHeader :icon='icon' :itemList='itemList' :searchUrl='searchUrl' :searchPlaceholder='searchPlaceholder' :style="{backgroundColor:'#f6f6f1'}"></SectionHeader>
    <keep-alive include="BookItemList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import SectionHeader from '../components/SectionHeader'

  export default {
    name: 'book',
    data () {
      return {
        icon: require('../assets/douban_book_icon.png'),
        searchUrl: '/book/search/',
        itemList: [
          {
            title: '购书单',
            path: '/book'
          },
          {
            title: '电子图书',
            path: '/book'
          },
          {
            title: '纸书',
            path: '/book'
          },
          {
            title: '2016图书榜单',
            path: '/book'
          }
        ],
        searchPlaceholder: '书名、作者、ISBN'
      }
    },
    methods: {
      doThat (event) {
        alert('i am been clicked')
        if (event) {
          alert(event.target.tagName)
        }
      }
    },
    components: {SectionHeader}
  }
</script>
