<template>
  <div id='ratingStarWrapper'>
    <template v-if='!commitScore'>
      <span class='ratingStar' :style='backgroundPosition'>
        <span v-for='n in 5' @mouseenter='rateEnter(n)' @mouseleave='rateLeave()' @click='rateScore(n)'></span>
      </span>
      <span class='rating-star-desc'>{{description}}</span>
      <input type='hidden' v-model="score" />
    </template>
    <template v-else>
      <span class='ratingStar' :style='backgroundPosition'>
        <span v-for='n in 5'></span>
      </span>
    </template>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: 'ratingStar',
    data () {
      return {
        description: '',
        top: -150
      }
    },
    props: {
      'commitScore': {
        default: 0
      }
    },
    computed: {
      backgroundPosition () {
        return {
          backgroundPosition: '0 ' + (30 * Math.round(this.commitScore) + this.top) + 'px'
        }
      },
      ...mapState({
        score: state => state.SubjectItem.editScore
      })
    },
    methods: {
      rateEnter (score) {
        switch (score) {
          case 1:
            this.description = '太差'
            this.top = -120
            break
          case 2:
            this.description = '较差'
            this.top = -90
            break
          case 3:
            this.description = '一般'
            this.top = -60
            break
          case 4:
            this.description = '较好'
            this.top = -30
            break
          case 5:
            this.description = '力荐'
            this.top = 0
            break
          default:
            break
        }
      },
      rateLeave () {
        if (this.score === '') {
          this.description = ''
          this.top = -150
        } else {
          this.rateEnter(this.score)
        }
      },
      rateScore (score) {
        this.$store.commit({
          type: 'editScore',
          score: score
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
  .ratingStar{
    background-image: url('../assets/ic_rating_m.png');
    background-repeat: no-repeat;
    height:15px;
    display: inline-block;
    span{
      display:inline-block;
      width:15px;
      height:15px;
    }
  }
  #ratingStarWrapper{
    display:inline-flex;
    align-items: center;
    .rating-star-desc{
      margin-left:15px;
    }
  }
</style>
