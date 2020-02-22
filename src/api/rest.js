import inflection from 'inflection'
import $axios from '@/utils/request'
const apis = ['Post', 'Note', 'Moment', 'Category', 'Comment']

const checkRest = rest => {
  if (!apis.includes(rest)) {
    throw new Error("Api isn't exist.")
  }
}
const noop = () => {}
const methods = ['get', 'post', 'delete', 'patch', 'put']
const reflectors = [
  'toString',
  'valueOf',
  'inspect',
  'constructor',
  Symbol.toPrimitive,
  Symbol.for('util.inspect.custom')
]
export const pre = () => {
  const route = ['']
  const handler = {
    get(_, name) {
      if (reflectors.includes(name)) return () => route.join('/')
      if (methods.includes(name)) {
        return options =>
          $axios[name](route.join('/'), {
            route: route.join('/'),
            ...options
          })
      }
      route.push(name)
      return new Proxy(noop, handler)
    },
    apply(_, __, args) {
      route.push(...args.filter(x => x !== null))
      return new Proxy(noop, handler)
    }
  }
  return new Proxy(noop, handler)
}
export const rest = pre()
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
