<template>
  <div id="rating">

  </div>
</template>
<script>
  export default {
    name: 'rating',
    props: ['rating'],
    data () {
      return {
        full: 0,
        half: 0,
        gray: 0
      }
    },
    created () {
      let average = this.rating.average
      this.full = Math.floor(average/2)
      this.half = average%2 === 0 ? 0:1
      this.gray = 5 - this.full - this.half
    }
  }
</script>
<style>

</style>
