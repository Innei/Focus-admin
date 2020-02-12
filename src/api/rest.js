import inflection from 'inflection'
import $axios from '@/utils/request'
const apis = ['Post', 'Note', 'Moment', 'Category', 'Comment']

const checkRest = rest => {
  if (!apis.includes(rest)) {
    throw new Error("Api isn't exist.")
  }
}

export default (api, rest) => {
  // rest = Post | Note | etc.
  checkRest(rest)
  const pluralize = inflection.pluralize(rest).toLowerCase()
  const apis = {
    async getRecently({ page = 1, size = 10 } = {}) {
      const data = await $axios({
        method: 'GET',
        url: `/${pluralize}`,
        params: {
          page,
          size
        }
      })
      return data
    },
    async getOne(id) {
      const data = await $axios.get(`${pluralize}/${id}`)
      return data
    },
    async postNew(body) {
      const data = await $axios.post(`${pluralize}`, body)
      return data
    },
    async modifyOne(id, body) {
      const data = await $axios.put(`${pluralize}/${id}`, body)
      return data
    },
    async deleteOne(id) {
      const data = await $axios.delete(`${pluralize}/${id}`)
      return data
    },
    get gets() {
      return this.getRecently
    },
    get get() {
      return this.getOne
    },
    get post() {
      return this.postNew
    },
    get update() {
      return this.modifyOne
    },
    get del() {
      return this.deleteOne
    },
    get delete() {
      return this.deleteOne
    }
  }

  return apis[api]
}
