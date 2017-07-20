import axios from 'axios'

export default {
  state: {
    searchResult: []
  },
  mutations: {
    searchMovie (state, payload) {
      state.searchResult = payload.res
    },
    searchBooks (state, payload) {
      state.searchResult = payload.res
    }
  },
  actions: {
    searchMovie ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = '/doubanapi/v2/movie/search?q=' + payload.content
        axios.get(url)
        .then((res) => {
          commit({
            type: 'searchMovie',
            res: res.data.subjects
          })
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    searchBooks ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = '/doubanapi/v2/book/search?q=' + payload.content
        axios.get(url)
        .then((res) => {
          console.log(res)
          commit({
            type: 'searchBooks',
            res: res.data.books
          })
          resolve()
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
