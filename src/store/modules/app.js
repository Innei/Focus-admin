import Cookies from 'js-cookie'
import setting from '@/settings.js'

const state = {
  sidebar: Cookies.get('sidebarStatus')
    ? !!+Cookies.get('sidebarStatus')
    : true,
  device: 'desktop',
  menus: setting.menus || [],
  title: setting.title
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: state => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_MENUS: (state, menus) => {
    state.menus = [...menus]
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
  // initMenus({ commit }) {
  //   commit('SET_MENUS', menus)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
