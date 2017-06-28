<template>
  <modal name="postComment">
    <p>给个评价吧?(可选) </p>
    <div class='commentWrapper'>
        <h3>写评价</h3>
        <textarea name='comment' v-model="comment"></textarea>
    </div>
    <div>
      <span @click='submitComment'>发布</span>
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
