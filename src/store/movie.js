import axios from 'axios'

export default {
  state: {
    in_theaters: [],
    coming_soon: [],
    top250: [],
    us_box: [],
    noMoreMovie: false
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
        case 'us_box':
          state.us_box = payload.more ? state.us_box.concat(payload.res) : payload.res
          break
        default:
          state.top250 = payload.res
      }
    },
    noMoreMovie (state) {
      state.noMoreMovie = true
    },
    resetMoreStatus (state) {
      state.noMoreMovie = false
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
      return new Promise((resolve, reject) => {
        let url = 'https://api.douban.com/v2/movie/' + payload.sort + '?count=20'
        axios.get(url)
        .then((res) => {
          console.log(res)
          commit({
            type: 'getMovie',
            tag: payload.sort,
            res: res.data.subjects
          })
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    loadMore ({commit, state}, payload) {
      axios.get('https://api.douban.com/v2/movie/' + payload + '?count=20&start=' + state[payload].length)
      .then((res) => {
        console.log(res)
        if (res.data.subjects.length === 0) {
          commit({
            type: 'noMoreMovie'
          })
        } else {
          commit({
            type: 'getMovie',
            tag: payload,
            res: res.data.subjects,
            more: true
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
