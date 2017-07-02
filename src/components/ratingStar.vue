<template>
  <div id='ratingStar'>
    <span>
      <img src='../assets/star_hollow_hover.png' @mouseenter='rateEnter(1)' @mouseleave='rateLeave(1)' @click='rateScore(1)' ref='rate1' />
      <img src='../assets/star_hollow_hover.png' @mouseenter='rateEnter(2)' @mouseleave='rateLeave(2)' @click='rateScore(2)' ref='rate2' />
      <img src='../assets/star_hollow_hover.png' @mouseenter='rateEnter(3)' @mouseleave='rateLeave(3)' @click='rateScore(3)' ref='rate3' />
      <img src='../assets/star_hollow_hover.png' @mouseenter='rateEnter(4)' @mouseleave='rateLeave(4)' @click='rateScore(4)' ref='rate4 '/>
      <img src='../assets/star_hollow_hover.png' @mouseenter='rateEnter(5)' @mouseleave='rateLeave(5)' @click='rateScore(5)' ref='rate5 '/>
    </span>
    <span class='rating-star-desc'>{{description}}</span>
    <input type='hidden' v-model="score" />
  </div>
</template>
<script>
  export default {
    name:'ratingStar',
    data () {
      return {
        description: ''
      }
    },
    methods:{
      rateEnter (score) {

      },
      rateLeave () {

      },
      rateScore () {

      }
    }
  }
</script>
