<template>
  <div id='user'>
    <p>
      欢迎回来，{{username}}
    </p>
  </div>
</template>
<script>
  // import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    computed: {
      username () {
        return this.$store.state.login.username
      }
    }
  }
</script>
