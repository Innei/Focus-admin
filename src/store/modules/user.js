import { login, logout, getInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const { token = '', id = '' } = getToken() ? JSON.parse(getToken()) : {}

const getDefaultState = () => {
  return {
    token,
    name: '',
    avatar: '',
    username: '',
    id,
    lastLoginIp: '',
    lastLoginTime: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_LOGGED: (state, { token, id, lastLoginIp, lastLoginTime }) => {
    state.token = token
    state.id = id
    state.lastLoginIp = lastLoginIp
    state.lastLoginTime = lastLoginTime
  },
  SET_NAME: (state, { name, username }) => {
    state.name = name
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(data => {
          const { token, id, lastLoginIp = '', lastLoginTime = '' } = data
          commit(
            'SET_LOGGED',
            { token, id, lastLoginIp, lastLoginTime },
            data.expires
          )
          setToken({ token: data.token, id: data.id })

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.id)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { name, avatar, username } = data

          commit('SET_NAME', { name, username })
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
