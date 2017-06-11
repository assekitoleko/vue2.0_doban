import axios from 'axios'

export default {
  state: {
    searchResult: []
  },
  mutations: {
    searchMovie (state, payload) {
      state.searchResult = payload.res
    }
  },
  actions: {
    searchMovie ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = 'https://api.douban.com/v2/movie/search?q=' + payload.content
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
    }
  }
}
