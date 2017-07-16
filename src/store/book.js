import axios from 'axios'

export default {
  state: {
    loveBooks: [],
    scienceFictions: []
  },
  mutations: {
    getIndexBooks (state, payload) {
      switch (payload.tag) {
        case '科幻':
          state.scienceFictions = payload.data
          break
        case '爱情':
          state.loveBooks = payload.data
          break
      }
    }
  },
  actions: {
    getIndexBooks ({commit}) {
      return new Promise((resolve, reject) => {
        let url1 = "/doubanapi/v2/book/search?q='科幻'&count=40"
        let url2 = "/doubanapi/v2/book/search?q='爱情'&count=10"
        axios.all([axios.get(url1), axios.get(url2)])
        .then(axios.spread((res1, res2) => {
          // console.log(res1, '::::', res2)
          commit({
            type: 'getIndexBooks',
            tag: '科幻',
            data: res1.data.books
          })
          commit({
            type: 'getIndexBooks',
            tag: '爱情',
            data: res2.data.books
          })
          resolve()
        }))
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
