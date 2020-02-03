import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import category from './modules/category'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app,
    category
  },
  getters
})

export default store
