<template>
  <div id=section_header_wrapper>
    <div class="section_header_title">
      <img :src="icon" />
      <input type="search" />
      <a href="#javascript:void(0)" class="search_button"></a>
    </div>
    <div class="section_header_itemList">
      <ul>
        <li v-for="item in itemList">
          <router-link :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SectionHeader',
    props: ['icon', 'itemList', 'searchUrl']
  }
</script>
<style>
  #section_header_wrapper{

    margin:0 atuo;
  }
  .search_button{
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('../assets/search_icon.png') no-repeat 0 -40px;
  }
  .section_header_itemList ul{
    overflow: hidden;
  }
  .section_header_itemList ul li{
    float: left;
  }
  .section_header_title input{
    border: 1px;
    outline: none;
    box-shadow: 2px 2px #eee;
    width: 300px;
    height: 33px;
  }
  .section_header_title{
    background: #e3ebec;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
</style>
