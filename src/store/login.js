import axios from 'axios'

export default {
  state: {
    userInfo: {
      username: '',
      password: '',
      id: '',
      motto: '编辑个性签名',
      like: [],
      watched: []
    }
  },
  mutations: {
    logedIn (state, payload) {
      state.userInfo = payload.userInfo
      let userString = JSON.stringify(payload.userInfo)
      localStorage.setItem('userInfo', userString)
    },
    logout (state) {
      state.userInfo = {
        username: '',
        user_id: '',
        motto: '编辑个性签名',
        like: [],
        watched: []
      }
      localStorage.removeItem('userInfo')
    },
    getuser (state) {
      console.log(10)
      if (localStorage.getItem('userInfo')) {
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    changeMotto (state, payload) {
      state.userInfo.motto = payload.userInfo.motto
      let userString = JSON.stringify(payload.userInfo)
      localStorage.setItem('userInfo', userString)
    },
    addWatchState (state, payload) {
      state.userInfo.like = payload.userInfo.like
      state.userInfo.watched = payload.userInfo.watched
      let userString = JSON.stringify(payload.userInfo)
      localStorage.setItem('userInfo', userString)
    }
  },
  actions: {
    login ({commit}, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        console.log(`/api/accounts?username=${payload.username}&password=${payload.password}`)
        axios.get(`/api/accounts?username=${payload.username}&password=${payload.password}`)
        .then((res) => {
          console.log(res)
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
    },
    changeMotto ({commit}, payload) {
      console.log(payload)
      let url = `/api/accounts/${payload.user_id}`
      axios.patch(url, {
        motto: payload.motto
      })
      .then((res) => {
        console.log(res)
        commit({
          type: 'changeMotto',
          userInfo: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fetchUserInfo ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url = `/api/accounts/${payload.user_id}`
        axios.get(url)
        .then((res) => {
          console.log(res)
          commit({
            type: 'fetchUserInfo',
            userInfo: res.data
          })
          resolve()
        })
        .catch((err) => {
          console.log(err)
        })
      })
    },
    addWatchState ({commit}, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload.userInfo)
        let watchArr = payload.userInfo[payload.attr]
        if (payload.isAdd) {
          watchArr.push(payload.subjectId)
        } else {
          watchArr = watchArr.reduce(function (prev, cur) {
            if (cur !== payload.subjectId) {
              prev.push(cur)
            }
            return prev
          }, [])
        }
        let url = `/api/accounts/${payload.user_id}`
        axios.patch(url, {
          [payload.attr]: watchArr
        })
        .then((res) => {
          commit({
            type: 'addWatchState',
            userInfo: res.data
          })
        })
      })
    },
    registerAccount ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let url1 = `/api/accounts?username=${payload.username}`
        let url2 = '/api/accounts'
        axios.get(url1)
        .then((res) => {
          if (res.data.length > 0) {
            resolve(res.data)
          } else {
            axios.post(url2, {
              username: payload.username,
              password: payload.password,
              motto: '编辑个性签名',
              like: [],
              watched: []
            })
            .then((res) => {
              resolve(res.data)
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
  }
}
