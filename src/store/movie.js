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
      axios.get('https://api.douban.com/v2/movie/in_theaters?count=8')
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: 'hotMovies',
          res: res.data.subjects
        })
      })
      .catch((err) => {
        console.log(err)
      })
      axios.get('https://api.douban.com/v2/movie/coming_soon?count=8')
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: 'newMovies',
          res: res.data.subjects
        })
      })
      .catch((err) => {
        console.log(err)
      })
      axios.get('https://api.douban.com/v2/movie/top250?count=8')
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: 'topMovies',
          res: res.data.subjects
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
