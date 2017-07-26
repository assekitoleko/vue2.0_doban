import axios from 'axios'

export default {
  state: {
    username: '',
    user_id: '',
    userInfo: {
      motto: '编辑个性签名',
      like: [],
      watched: []
    }
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
      state.user_id = localStorage.getItem('user_id')
      state.username = localStorage.getItem('username')
    },
    changeMotto (state, payload) {
      state.userInfo.motto = payload.userInfo.motto
    },
    fetchUserInfo (state, payload) {
      state.userInfo.motto = payload.userInfo.motto
    },
    addWatchState (state, payload) {
      state.userInfo.like = payload.userInfo.like
      state.userInfo.watched = payload.userInfo.watched
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
    }
  }
}
