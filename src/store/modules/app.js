import Cookies from 'js-cookie'
import setting from '@/settings.js'

const state = {
  sidebar: Cookies.get('sidebarStatus')
    ? !!+Cookies.get('sidebarStatus')
    : true,
  menus: setting.menus || [],
  title: setting.title,
  viewport: null
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar = !state.sidebar
    if (state.sidebar) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: state => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar = false
  },
  SET_MENUS: (state, menus) => {
    state.menus = [...menus]
  },
  SET_VIEWPORT: (state, viewport) => {
    state.viewport = { ...viewport }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  initMenus({ commit }, menus) {
    commit('SET_MENUS', menus)
  },
  updateViewport({ commit }) {
    const viewport = {
      w: document.documentElement.getBoundingClientRect().width,
      h: window.innerHeight,
      mobile: window.screen.width <= 568 || window.innerWidth <= 568,
      pad: window.innerWidth <= 768 && window.innerWidth > 568,
      hpad: window.innerWidth <= 1024 && window.innerWidth > 768,
      wider: window.innerWidth > 1024 && window.innerWidth < 1920,
      widest: window.innerWidth >= 1920
    }
    commit('SET_VIEWPORT', viewport)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
