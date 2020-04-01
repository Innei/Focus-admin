import Rest from '@/api/rest'

const state = () => ({
  category: [],
})

const actions = {
  fetchCategory,
  async getCategory({ state, commit }) {
    if (state.category?.length > 0) {
      return state.category
    }
    return await fetchCategory({ commit })
  },
}

const mutations = {
  LOAD_CATEGORY(state, category) {
    state.category = category
  },
}

export default {
  namespaced: true,
  actions,
  state,
  mutations,
}

async function fetchCategory({ commit }) {
  const { data } = await Rest('getRecently', 'Category')()
  commit('LOAD_CATEGORY', data)
  return data
}
