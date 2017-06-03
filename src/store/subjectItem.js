import axios from 'axios'

export default {
  state: {
    subject: {},
    classify: '',
    directors: '',
    casts: ''
  },
  mutations: {
    getSingleSubject (state, payload) {
      state.classify = payload.classify
      state.subject = payload.res
      state.directors = payload.res.directors.map((item, index) => {
        return item.name
      }).join('/')
      state.casts = payload.res.casts.map((item, index) => {
        return item.name
      }).join('/')
    }
  },
  actions: {
    getSingleSubject ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = 'https://api.douban.com/v2/' + payload.classify + '/subject/' + payload.id
        axios.get(url)
        .then((res) => {
          console.log(res)
          commit({
            type: 'getSingleSubject',
            classify: payload.classify,
            res: res.data
          })
          resolve(res)
        })
      })
    }
  }
}
