import Vue from 'vue'
import Vuex from 'vuex'
import movie from './movie'
import book from './book'
import SubjectItem from './SubjectItem'
import search from './search'
import celebrity from './celebrity'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie,
    book,
    search,
    celebrity,
    login,
    SubjectItem
  }
})
