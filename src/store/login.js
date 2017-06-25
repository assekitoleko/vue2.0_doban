import axios from 'axios'

export default {
  state: {
    username: '',
    user_id: ''
  },
  mutations: {
    logedIn (state, payload) {
      state.user_id = payload.userInfo.id
      state.username = payload.userInfo.username
      localStorage.setItem('user_id', payload.userInfo.id)
      localStorage.setItem('username', payload.userInfo.username)
    },
    logout (state) {
      state.username = ''
      state.user_id = ''
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
    },
    getuser (state) {
      console.log('get user')
      state.user_id = localStorage.getItem('user_id')
      state.username = localStorage.getItem('username')
    }
  },
  actions: {
    login ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/accounts?username=${payload.username}&password=${payload.password}`)
        .then((res) => {
          // console.log(res)
          if (res.data.length === 0) {
            alert('没有该账户，请重新输入')
            return
          } else {
            alert('登陆成功！')
            commit({
              type: 'logedIn',
              userInfo: res.data[0]
            })
            resolve(res)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
