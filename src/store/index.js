import Vue from 'vue'
import Vuex from 'vuex'

import movie from './movie'
import music from './music'
import book from './book'
import group from './group'
import SubjectItem from './SubjectItem'
import search from './search'
import celebrity from './celebrity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie,
    music,
    book,
    group,
    search,
    celebrity,
    SubjectItem
  }
})
