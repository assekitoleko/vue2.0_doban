import axios from 'axios'

export default {
  state: {
    subject: {},
    classify: '',
    directors: '',
    casts: '',
    genres: '',
    countries: '',
    aka: '',
    posts: []
  },
  mutations: {
    getSingleSubject (state, payload) {
      state.classify = payload.classify
      state.subject = payload.res
      state.directors = payload.res.directors
      state.casts = payload.res.casts
      state.genres = payload.res.genres.join('/')
      state.countries = payload.res.countries.join('/')
      state.aka = payload.res.aka.join(',')
    },
    getSubjectComment (state, payload) {
      state.posts = payload.res
    }
  },
  actions: {
    getSingleSubject ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = 'https://api.douban.com/v2/' + payload.classify + '/subject/' + payload.id
        axios.all([axios.get(url), axios.get(`/api/comments?item_id=${payload.id}`)])
        .then(axios.spread((res1, res2) => {
          commit({
            type: 'getSingleSubject',
            classify: payload.classify,
            res: res1.data
          })
          commit({
            type: 'getSubjectComment',
            res: res2.data
          })
          resolve(res1)
        }))
        .catch((err) => {
          console.log(err)
        })
        // axios.get(url)
        // .then((res) => {
        //   commit({
        //     type: 'getSingleSubject',
        //     classify: payload.classify,
        //     res: res.data
        //   })
        //   resolve(res)
        // })
      })
    },
    submitComment ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = '/api/comments'
        axios.post(url, {
          user_id: payload.user_id,
          item_id: payload.item_id,
          comment: payload.comment,
          username: payload.username,
          date: payload.date
        })
        .then((res) => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    getNewComment ({commit}, payload) {
      axios.get(`/api/comments?item_id=${payload.item_id}`)
      .then((res) => {
        commit({
          type: 'getSubjectComment',
          res: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
