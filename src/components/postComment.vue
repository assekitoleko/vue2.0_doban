<template>
  <modal name="postComment" :classes="['v--modal', 'postComment']">
    <div class='commentWrapper'>
      <p>给个评价吧?(可选) </p>
      <div class=''>
          <h3>写评价</h3>
          <textarea name='comment' v-model="comment" rows='6'></textarea>
      </div>
      <div>
        <span @click='submitComment'>发布</span>
      </div>
    </div>
  </modal>
</template>
<script>
  export default {
    name: 'postComment',
    props: ['user_id', 'item_id'],
    data () {
      return {
        comment: ''
      }
    },
    methods: {
      submitComment () {
        this.$store.dispatch({
          type: 'submitComment',
          user_id: this.user_id,
          item_id: this.item_id,
          comment: this.comment
        })
      }
    }
  }
</script>
<style scopde lang='scss'>
  .postComment{
    div.commentWrapper{
      padding:15px;
    }
    p{
      margin-bottom:15px;
    }
    h3{
      font-size:16px;
      margin-bottom: 10px;
    }
    textarea{
      box-sizing: border-box;
      padding:6px;
      width:100%;
    }
    span{
      cursor: pointer;
      display: inline-block;
      padding: 6px 16px;
      background: #268dcd;
      border-radius: 3px;
      color: #fff;
      margin-top: 10px;
    }
  }
</style>
