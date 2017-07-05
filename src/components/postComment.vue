<template>
  <modal name="postComment" :classes="['v--modal', 'postComment']">
    <div class='commentWrapper'>
      <p><span>给个评价吧?</span><rating-star></rating-star></p>
      <div class=''>
          <h3>写评价</h3>
          <textarea name='comment' v-model="comment" rows='6'></textarea>
      </div>
      <div>
        <span @click='submitComment' class='commit'>发布</span>
      </div>
    </div>
  </modal>
</template>
<script>
  import {getDateFormat} from '../util/baseUtil'
  import ratingStar from './ratingStar'
  import {mapState} from 'vuex'

  export default {
    name: 'postComment',
    props: ['user_id', 'item_id', 'username'],
    data () {
      return {
        comment: ''
      }
    },
    computed: mapState({
      score: state => state.SubjectItem.editScore
    }),
    methods: {
      submitComment () {
        if (this.comment.trim() === '') {
          alert('评论内容为空')
          return
        }
        if (this.score === '') {
          alert('拜托打个分吧')
          return
        }
        let d = getDateFormat()
        this.$store.dispatch({
          type: 'submitComment',
          user_id: this.user_id,
          item_id: this.item_id,
          comment: this.comment,
          username: this.username,
          score: this.score,
          date: d
        }).then((res) => {
          this.comment = ''
          this.$modal.hide('postComment')
          this.$emit('postCommentCompleted')
        }, (err) => {
          console.log(err)
        })
      }
    },
    components: {
      ratingStar
    }
  }
</script>
<style scoped lang='scss'>
  .postComment{
    div.commentWrapper{
      padding:15px;
    }
    p{
      display:flex;
      align-items:center;
      margin-bottom:15px;
      span{
        margin-right:30px;
      }
    }
    h3{
      font-size:16px;
      margin-bottom: 10px;
    }
    textarea{
      box-sizing: border-box;
      padding:6px;
      width:100%;
      resize: none;
    }
    span.commit{
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
