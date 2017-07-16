 <template>
  <div id='section_header_wrapper'>
    <div class="section_header_title main">
      <img :src="icon" />
      <div class="inp"><input type="text" :placeholder="searchPlaceholder" v-model="content" /></div>
      <router-link :to="searchUrl + content" class="search_button"></router-link>
    </div>
    <div class="section_divider"></div>
    <div class="section_header_itemList main">
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
    props: ['icon', 'itemList', 'searchUrl', 'searchPlaceholder'],
    data () {
      return {
        content: ''
      }
    }
  }
</script>
<style scoped lang='scss'>
  .search_button{
    display: inline-block;
    width: 34px;
    height: 34px;
    background: url('../assets/search_icon.png') no-repeat 0 -40px;
  }
  .section_header_itemList ul{
    overflow: hidden;
    padding:10px 0;
  }
  .section_header_itemList a{
    color:#27a;
    font-size:14px;
  }
  .section_header_itemList ul li{
    float: left;
    margin-right: 10px;
  }
  .section_header_title input{
    border: 1px;
    appearance:none;
    outline: none;
    width: 96%;
    height: 30px;
    padding-left: 10px;
    color: #bbb
  }
  .inp{
    background: url('../assets/search_bg.png') no-repeat;
    height: 34px;
    color: #111;
    width: 300px;
  }
  .section_header_title{
    // background: #f0f3f5;
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
  }
  .section_header_title img{
    margin-right: 40px;
  }
  .main{
    width: 60%;
    margin:0 auto;
  }
  .section_divider{
    height: 0;
    border-bottom: 1px solid #e3ebec;
  }
</style>
