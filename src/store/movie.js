import axios from 'axios'

export default {
  state: {
    in_theaters: [],
    coming_soon: [],
    top250: []
  },
  mutations: {
    getMovie (state, payload) {
      switch (payload.tag) {
        case 'in_theaters':
          state.in_theaters = payload.more ? state.in_theaters.concat(payload.res) : payload.res
          break
        case 'coming_soon':
          state.coming_soon = payload.more ? state.coming_soon.concat(payload.res) : payload.res
          break
        case 'top250':
          state.top250 = payload.more ? state.top250.concat(payload.res) : payload.res
          break
        default:
          state.top250 = payload.res
      }
    }
  },
  actions: {
    getMovie ({commit}) {
      axios.get('https://api.douban.com/v2/movie/in_theaters?count=8')
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: 'in_theaters',
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
          tag: 'coming_soon',
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
          tag: 'top250',
          res: res.data.subjects
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovieList ({commit}, payload) {
      let url = 'https://api.douban.com/v2/movie/' + payload.sort + '?count=20'
      axios.get(url)
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: payload.sort,
          res: res.data.subjects
        })
      })
    },
    loadMore ({commit, state}, payload) {
      console.log('begin load more')
      axios.get('https://api.douban.com/v2/movie/' + payload + '?count=20&start=' + state[payload].length)
      .then((res) => {
        commit({
          type: 'getMovie',
          tag: payload,
          res: res.data.subjects,
          more: true
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
