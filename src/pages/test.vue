<template>
  <div id='test'>
    <span @mouseenter='showtooltip' @mouseleave='showtooltip(false)'>test hover tooltip</span>
    <div id='tooltip' :style='tooltipStyle'>
      <div>最好的迅雷电影下载网,分享最新电影,高清电影、综艺、动漫、电视剧等下载!... ·
        [最新电影下载]2017年科幻惊悚恐怖《异形:契约》BD中英双字幕 2017-08-02 ·[最新...
      </div>
    </div>
  </div>
</template>
<script>

  export default{
    name: 'Test',
    data () {
      return {
        tooltipStyle: {
          display: 'none'
        }
      }
    },
    methods: {
      showtooltip (show = true) {
        this.tooltipStyle.display = show ? 'block' : 'none'
      }
    }
  }
</script>
<style lang='scss' scoped>
  #test{
    padding:20px;
    min-height:500px;
    #tooltip{
      width: 300px;
      top: 106px;
      left: 317.5px;
      padding: 12px 15px 2px;
      position: fixed;
      z-index: 999;
      color: #666;
      border: 1px solid #acacac;
      background: #f9f9f7;
      border-radius: 3px;
      box-shadow: 0 1px 1px #fdfdfd inset, 0 1px 1px #dcdbd4;
    }
    #tooltip:after{
      border-right-color: #f9f9f7;
      border-width: 7px;
      top: 50%;
      margin-top: -7px;
    }
    #tooltip:before,#tooltip:after{
      right: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    #tooltip:before{
      border-right-color: #acacac;
      border-width: 8px;
      top: 50%;
      margin-top: -8px;
    }
  }
</style>
