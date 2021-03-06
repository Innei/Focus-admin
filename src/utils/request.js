import axios from 'axios'
import { message as Message } from 'ant-design-vue'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken().token
    }
    return config
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.ok !== 1) {
      Message.error(res.msg || 'Error')

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
    Message.error(error.response.data.msg || error.message)

    // if (error.response.status === 401) {
    //   router.push('/login')
    // }
    return Promise.reject(error)
  }
)

export default service
