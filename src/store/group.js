import axios from 'axios'

export default {
  state: {
    hotMovies: [],
    newMovies: [],
    topMovies: []
  },
  mutations: {
    getMovie (state, payload) {
      switch (payload.tag) {
        case 'hotMovies':
          state.hotMovies = payload.res
          break
        case 'newMovies':
          state.newMovies = payload.res
          break
        case 'topMovies':
          state.topMovies = payload.res
          break
        default:
          state.hotMovies = payload.res
      }
    }
  },
  actions: {
    getMovie ({commit}) {
      axios.get('/doubanapi/v2/movie/in_theaters?count=8')
      .then((res) => {
        console.log(res)
        commit({
          type: 'getMovie',
          tag: 'hotMovies',
          res: res.body.subjects
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
