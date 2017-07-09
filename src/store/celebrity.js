import axios from 'axios'

export default {
  state: {
    celebrity: {}
  },
  mutations: {
    fetchCelebrity (state, payload) {
      state.celebrity = payload.res
    }
  },
  actions: {
    fetchCelebrity ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = '/doubanapi/v2/movie/celebrity/' + payload.id
        axios.get(url)
        .then((res) => {
          console.log(res)
          commit({
            type: 'fetchCelebrity',
            res: res.data
          })
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
