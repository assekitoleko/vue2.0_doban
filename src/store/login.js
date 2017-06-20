import axios from 'axios'

export default {
  state: {
    useraccont: '',
    password: ''
  },
  mutations: {

  },
  actions: {
    login ({commit}, payload) {
      axios.get('/api/posts')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
