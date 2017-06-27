<template>
  <div id='user'>
    <p>
      欢迎回来，{{username}}
    </p>
  </div>
</template>
<script>
  // import {mapGetters} from 'vuex'
  import store from '../store/index'

  export default {
    name: 'user',
    computed: {
      username () {
        return this.$store.state.login.username
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.login.user_id) {
        store.commit('getuser')
      }
      if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.login.user_id) {
          next()
        } else {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      } else {
        next()
      }
    }
  }
</script>
