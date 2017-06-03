import Vue from 'vue'
import Vuex from 'vuex'

import movie from './movie'
import music from './music'
import book from './book'
import group from './group'
import SubjectItem from './SubjectItem'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie,
    music,
    book,
    group,
    SubjectItem
  }
})
