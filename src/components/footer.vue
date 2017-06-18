<template>
  <div id="pageFoot">
    <div class='footer_left'>© 2005－2017 douban.com, all rights reserved 北京豆网科技有限公司</div>
    <div class="footer_right">
      <a href="https://www.douban.com/about">关于豆瓣</a>
      <a href="https://www.douban.com/jobs">在豆瓣工作</a>
      <a href="https://www.douban.com/about?topic=contactus">联系我们</a>
      <a href="https://www.douban.com/about?policy=disclaimer">免责声明</a>
      <a href="https://help.douban.com/?app=main">帮助中心</a>
      <a href="https://www.douban.com/doubanapp/">移动应用</a>
      <a href="https://www.douban.com/partner/">豆瓣广告</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'pageFoot'
  }
</script>
<style scoped>
  #pageFoot{
    display:flex;
    /*position:s;
    bottom:0;
    left:0;
    right:0;*/
    border-top:1px dashed #ddd;
    width: 60%;
    margin:20px auto 0;
    padding:10px 0;
    justify-content: space-between;
    color:#999;
    font-size:12px;
  }
  #pageFoot .footer_right{
    display:flex;
  }
  #pageFoot .footer_right a{
    color:#666699;
    margin-right: 5px;
  }
</style>
